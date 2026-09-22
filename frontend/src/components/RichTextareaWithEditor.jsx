import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

/**
 * Converts Markdown or plain text into formatted HTML for Quill
 */
export const markdownToHtml = (md) => {
  if (!md || typeof md !== 'string') return '';
  let html = md;

  // Clean cursor artifacts if any
  html = html.replace(/<span class="ql-cursor">.*?<\/span>/gi, '');

  // If it already has HTML paragraphs and no raw markdown, return
  if (html.includes('<p>') && !html.includes('**') && !html.includes('~~') && !html.includes('[')) {
    return html;
  }

  // Convert Markdown bold **text** to <strong>text</strong>
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  
  // Convert Markdown italic *text* to <em>text</em>
  html = html.replace(/(^|[^\*])\*(?!\*)(.+?)\*(?!\*)/g, '$1<em>$2</em>');
  
  // Convert Markdown strikethrough ~~text~~ to <del>text</del>
  html = html.replace(/~~(.+?)~~/g, '<del>$1</del>');

  // Convert Markdown links [title](url) to <a href="url">title</a>
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Convert paragraphs and lists
  const blocks = html.split(/\n\n+/);
  if (blocks.length > 1) {
    html = blocks.map(block => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const items = trimmed.split(/\n[-*]\s+/).map(it => it.replace(/^[-*]\s+/, '').trim()).filter(Boolean);
        return `<ul>${items.map(it => `<li>${it}</li>`).join('')}</ul>`;
      }
      if (/^\d+\.\s+/.test(trimmed)) {
        const items = trimmed.split(/\n\d+\.\s+/).map(it => it.replace(/^\d+\.\s+/, '')).filter(Boolean);
        return `<ol>${items.map(it => `<li>${it}</li>`).join('')}</ol>`;
      }
      return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
    }).join('');
  } else {
    if (html.includes('\n- ') || html.startsWith('- ')) {
      const items = html.split(/\n[-*]\s+/).map(it => it.replace(/^[-*]\s+/, '').trim()).filter(Boolean);
      html = `<ul>${items.map(it => `<li>${it}</li>`).join('')}</ul>`;
    } else if (html.includes('\n')) {
      html = `<p>${html.replace(/\n/g, '<br>')}</p>`;
    } else if (html && !html.startsWith('<')) {
      html = `<p>${html}</p>`;
    }
  }

  return html;
};

/**
 * Converts Quill HTML into clean Markdown/text format
 */
export const htmlToMarkdown = (html) => {
  if (!html || typeof html !== 'string') return '';
  let md = html;

  // Strip cursor artifacts
  md = md.replace(/<span class="ql-cursor">.*?<\/span>/gi, '');

  // Convert paragraphs and linebreaks
  md = md.replace(/<div><br\s*\/?><\/div>/gi, '\n\n');
  md = md.replace(/<div>(.*?)<\/div>/gi, '\n$1');
  md = md.replace(/<p>(.*?)<\/p>/gi, '$1\n\n');
  md = md.replace(/<br\s*\/?>/gi, '\n');

  // Convert lists
  md = md.replace(/<ul>([\s\S]*?)<\/ul>/gi, (match, listContent) => {
    return '\n' + listContent.replace(/<li>(.*?)<\/li>/gi, '- $1\n').trim() + '\n\n';
  });
  md = md.replace(/<ol>([\s\S]*?)<\/ol>/gi, (match, listContent) => {
    let idx = 1;
    return '\n' + listContent.replace(/<li>(.*?)<\/li>/gi, () => `${idx++}. $1\n`).trim() + '\n\n';
  });

  // Convert inline tags to markdown
  md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
  md = md.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
  md = md.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
  md = md.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');
  md = md.replace(/<u[^>]*>(.*?)<\/u>/gi, '<u>$1</u>');
  md = md.replace(/<del[^>]*>(.*?)<\/del>/gi, '~~$1~~');
  md = md.replace(/<s[^>]*>(.*?)<\/s>/gi, '~~$1~~');
  md = md.replace(/<strike[^>]*>(.*?)<\/strike>/gi, '~~$1~~');
  md = md.replace(/<a[^>]+href="([^"]+)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');

  // Decode HTML entities
  md = md.replace(/&nbsp;/g, ' ')
         .replace(/&amp;/g, '&')
         .replace(/&lt;/g, '<')
         .replace(/&gt;/g, '>')
         .replace(/&quot;/g, '"');

  md = md.replace(/\n{3,}/g, '\n\n');
  return md.trim();
};

/**
 * Production Quill Rich Text Editor
 */
export default function RichTextareaWithEditor({
  value = '',
  onChange,
  placeholder = 'Enter content...',
  rows = 4,
  label = null,
  required = false,
  showHeadingTool = false,
  style = {},
  editorStyle = {}
}) {
  const containerRef = useRef(null);
  const quillRef = useRef(null);
  const lastEmittedValueRef = useRef(value || '');
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Initialize Quill instance once on mount
  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = '';
    const editorDiv = document.createElement('div');
    containerRef.current.appendChild(editorDiv);

    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ];

    if (showHeadingTool) {
      toolbarOptions.unshift([{ 'header': [3, false] }]);
    }

    const quill = new Quill(editorDiv, {
      theme: 'snow',
      placeholder: placeholder,
      modules: {
        toolbar: {
          container: toolbarOptions,
          handlers: {
            link: function (val) {
              if (val) {
                const range = this.quill.getSelection();
                if (!range || range.length === 0) {
                  const url = prompt('Enter link URL (e.g. https://winera.in):', 'https://');
                  if (url && url.trim()) {
                    const text = prompt('Enter link text:', url.trim());
                    if (text) {
                      const idx = range ? range.index : this.quill.getLength();
                      this.quill.insertText(idx, text, 'link', url.trim());
                    }
                  }
                  return;
                }
                const currentLink = this.quill.getFormat(range).link;
                const url = prompt('Enter link URL (e.g. https://winera.in):', currentLink || 'https://');
                if (url && url.trim()) {
                  this.quill.format('link', url.trim());
                } else if (url === '') {
                  this.quill.format('link', false);
                }
              } else {
                this.quill.format('link', false);
              }
            }
          }
        }
      }
    });

    quillRef.current = quill;

    // Set initial content
    if (value) {
      const initialHtml = markdownToHtml(value);
      quill.root.innerHTML = initialHtml;
      lastEmittedValueRef.current = value;
    }

    // Text change listener
    quill.on('text-change', (delta, oldDelta, source) => {
      if (source !== 'user') return;
      const html = quill.root.innerHTML;
      const isEmpty = quill.getText().trim().length === 0;
      const output = isEmpty ? '' : htmlToMarkdown(html);
      lastEmittedValueRef.current = output;
      if (onChangeRef.current) {
        onChangeRef.current(output);
      }
    });

    return () => {
      quillRef.current = null;
    };
  }, []);

  // Update when value changes externally
  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;

    if (value === lastEmittedValueRef.current) {
      return;
    }

    lastEmittedValueRef.current = value;
    const incomingHtml = markdownToHtml(value);
    if (quill.root.innerHTML !== incomingHtml) {
      const sel = quill.getSelection();
      quill.root.innerHTML = incomingHtml || '';
      if (sel) {
        quill.setSelection(sel.index, sel.length);
      }
    }
  }, [value]);

  const minHeightPx = Math.max(100, rows * 28);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', ...style }}>
      {label && (
        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>
          <span>
            {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
          </span>
          <span style={{ fontSize: '11px', color: '#0284c7', fontWeight: '700', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px' }}>
            Rich Text Editor
          </span>
        </label>
      )}

      {/* Quill Wrapper Container */}
      <div
        className="winera-quill-editor-wrapper"
        style={{
          border: '1.5px solid #cbd5e1',
          borderRadius: '12px',
          overflow: 'visible',
          background: '#ffffff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          position: 'relative',
          ...editorStyle
        }}
      >
        <div ref={containerRef} style={{ minHeight: `${minHeightPx}px` }} />
      </div>

      <style>{`
        .winera-quill-editor-wrapper .ql-toolbar.ql-snow {
          border: none !important;
          border-bottom: 1.5px solid #e2e8f0 !important;
          background: #f8fafc !important;
          padding: 8px 10px !important;
          border-top-left-radius: 11px !important;
          border-top-right-radius: 11px !important;
        }
        .winera-quill-editor-wrapper .ql-container.ql-snow {
          border: none !important;
          font-family: 'Open Sans', sans-serif !important;
          font-size: 15px !important;
          color: #334155 !important;
          line-height: 1.8 !important;
        }
        .winera-quill-editor-wrapper .ql-editor {
          min-height: ${minHeightPx}px !important;
          padding: 14px 16px !important;
          font-family: 'Open Sans', sans-serif !important;
          font-size: 15px !important;
          color: #334155 !important;
          line-height: 1.8 !important;
        }
        .winera-quill-editor-wrapper .ql-editor strong,
        .winera-quill-editor-wrapper .ql-editor b,
        .winera-quill-editor-wrapper .ql-editor * strong,
        .winera-quill-editor-wrapper .ql-editor * b {
          font-weight: 800 !important;
          color: #0f172a !important;
        }
        .winera-quill-editor-wrapper .ql-editor em,
        .winera-quill-editor-wrapper .ql-editor i,
        .winera-quill-editor-wrapper .ql-editor * em,
        .winera-quill-editor-wrapper .ql-editor * i {
          font-style: italic !important;
        }
        .winera-quill-editor-wrapper .ql-editor u,
        .winera-quill-editor-wrapper .ql-editor * u {
          text-decoration: underline !important;
        }
        .winera-quill-editor-wrapper .ql-editor s,
        .winera-quill-editor-wrapper .ql-editor strike,
        .winera-quill-editor-wrapper .ql-editor del,
        .winera-quill-editor-wrapper .ql-editor * s,
        .winera-quill-editor-wrapper .ql-editor * strike,
        .winera-quill-editor-wrapper .ql-editor * del {
          text-decoration: line-through !important;
        }
        .winera-quill-editor-wrapper .ql-editor a,
        .winera-quill-editor-wrapper .ql-editor * a {
          color: #0284c7 !important;
          text-decoration: underline !important;
          font-weight: 700 !important;
          cursor: pointer !important;
        }
        .winera-quill-editor-wrapper .ql-editor.ql-blank::before {
          color: #94a3b8 !important;
          font-style: normal !important;
          font-size: 14px !important;
          left: 16px !important;
        }
        .winera-quill-editor-wrapper .ql-snow .ql-stroke {
          stroke: #475569 !important;
        }
        .winera-quill-editor-wrapper .ql-snow .ql-fill {
          fill: #475569 !important;
        }
        .winera-quill-editor-wrapper .ql-snow .ql-picker {
          color: #475569 !important;
        }
        .winera-quill-editor-wrapper .ql-snow.ql-toolbar button:hover,
        .winera-quill-editor-wrapper .ql-snow .ql-toolbar button:hover,
        .winera-quill-editor-wrapper .ql-snow.ql-toolbar button.ql-active,
        .winera-quill-editor-wrapper .ql-snow .ql-toolbar button.ql-active {
          background: #e0f2fe !important;
          border-radius: 6px !important;
        }
        .winera-quill-editor-wrapper .ql-snow.ql-toolbar button.ql-active .ql-stroke,
        .winera-quill-editor-wrapper .ql-snow .ql-toolbar button.ql-active .ql-stroke {
          stroke: #0284c7 !important;
        }
        .winera-quill-editor-wrapper .ql-snow.ql-toolbar button.ql-active .ql-fill,
        .winera-quill-editor-wrapper .ql-snow .ql-toolbar button.ql-active .ql-fill {
          fill: #0284c7 !important;
        }
      `}</style>
    </div>
  );
}
