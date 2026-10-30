import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { Table, Plus, Trash2, Image as ImageIcon, X } from 'lucide-react';
import ConfirmModal from './ConfirmModal';

/**
 * Normalizes initial incoming value to valid HTML for Quill.
 * Handles both existing HTML and legacy markdown formats.
 */
export const prepareBlogContentForEditor = (raw) => {
  if (!raw || typeof raw !== 'string') return '';
  let content = raw.trim();

  // Convert literal string representations of newlines to real newlines
  content = content.replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n').replace(/\\r/g, '\n');

  // If already full HTML, clean up any cursor artifacts and return
  const hasHtmlTags = /<\/?(?:p|h[1-6]|ul|ol|li|table|tr|td|th|img|blockquote|div|span|strong|em|u|a)[\s>]/i.test(content);
  if (hasHtmlTags) {
    return content.replace(/<span class="ql-cursor">.*?<\/span>/gi, '');
  }

  // Legacy Markdown to HTML converter
  let html = content;
  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic
  html = html.replace(/(^|[^\*])\*(?!\*)(.+?)\*(?!\*)/g, '$1<em>$2</em>');
  // Strikethrough
  html = html.replace(/~~(.+?)~~/g, '<del>$1</del>');
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Headings & paragraphs
  const blocks = html.split(/\n\n+/);
  html = blocks.map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '<p><br></p>';
    if (trimmed.startsWith('#### ')) {
      return `<h4>${trimmed.substring(5)}</h4>`;
    }
    if (trimmed.startsWith('### ')) {
      return `<h3>${trimmed.substring(4)}</h3>`;
    }
    if (trimmed.startsWith('## ')) {
      return `<h2>${trimmed.substring(3)}</h2>`;
    }
    if (trimmed.startsWith('# ')) {
      return `<h1>${trimmed.substring(2)}</h1>`;
    }
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

  return html;
};

/**
 * Executive Blog Rich WYSIWYG Content Editor
 * Supports:
 * - Direct Computer File Chooser on Image click
 * - Beautiful Styled CSS Modal for Table Rows & Columns
 * - Drag-to-Resize Table Columns on Hover & Drag
 * - Headings (H1, H2, H3, H4, Paragraph)
 * - Text color & background highlights
 * - Exact whitespace & multiple line break preservation
 */
export default function BlogRichEditor({
  value = '',
  onChange,
  uploadImageFile,
  adminToken,
  placeholder = 'Write or paste your full blog article content here... Format headings, add tables, images, and paragraphs freely.',
  minHeight = '480px',
  showNotification,
  onRequestConfirm
}) {
  const containerRef = useRef(null);
  const quillContainerRef = useRef(null);
  const quillRef = useRef(null);
  const lastEmittedValueRef = useRef(value || '');
  const onChangeRef = useRef(onChange);
  const [stats, setStats] = useState({ words: 0, characters: 0 });
  const [localConfirmModal, setLocalConfirmModal] = useState(null);

  // Styled Table Modal State
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);

  // Active Table selection & editing state
  const [activeTable, setActiveTable] = useState(false);
  const activeTableElementRef = useRef(null);
  const savedRangeRef = useRef(null);
  const lastSelectedRangeRef = useRef(null);
  const [tableBarPos, setTableBarPos] = useState(null);
  const updateTablePosRef = useRef(null);

  // Active Image selection & deletion state
  const [activeImage, setActiveImage] = useState(null);
  const activeImageElementRef = useRef(null);
  const [imageBarPos, setImageBarPos] = useState(null);
  const updateImagePosRef = useRef(null);

  const updateTableBarPosition = () => {
    const table = activeTableElementRef.current;
    const container = quillContainerRef.current;
    if (!table || !container) {
      setTableBarPos(null);
      return;
    }
    const tableRect = table.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const top = tableRect.top - containerRect.top;
    const left = tableRect.left - containerRect.left;

    // Position directly above where the table starts
    setTableBarPos({
      top: Math.max(0, top - 44),
      left: Math.max(8, left),
      width: tableRect.width
    });
  };
  updateTablePosRef.current = updateTableBarPosition;

  const updateImageBarPosition = () => {
    const img = activeImageElementRef.current;
    const container = quillContainerRef.current;
    if (!img || !container) {
      setImageBarPos(null);
      return;
    }
    const imgRect = img.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const top = imgRect.top - containerRect.top;
    const right = containerRect.right - imgRect.right;
    const left = imgRect.left - containerRect.left;

    setImageBarPos({
      top: Math.max(10, top + 10),
      right: Math.max(12, right + 12),
      left: Math.max(12, left + 12),
      width: imgRect.width
    });
  };
  updateImagePosRef.current = updateImageBarPosition;

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Initialize Quill instance
  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = '';
    const editorDiv = document.createElement('div');
    containerRef.current.appendChild(editorDiv);

    // Full Executive Toolbar Configuration (Google Docs Style H1-H6, Colors, Alignments, Media)
    const toolbarOptions = [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'table'],
      ['clean']
    ];

    const quill = new Quill(editorDiv, {
      theme: 'snow',
      placeholder: placeholder,
      modules: {
        table: true,
        toolbar: {
          container: toolbarOptions,
          handlers: {
            // Direct Bulletproof Color Handler (preserves text selection)
            color: function (val) {
              const quillInst = this.quill;
              let range = quillInst.getSelection();
              if ((!range || range.length === 0) && lastSelectedRangeRef.current) {
                quillInst.setSelection(lastSelectedRangeRef.current);
                range = lastSelectedRangeRef.current;
              }
              if (range && range.length > 0) {
                quillInst.formatText(range.index, range.length, 'color', val, Quill.sources.USER);
                quillInst.setSelection(range);
              } else {
                quillInst.format('color', val, Quill.sources.USER);
              }
            },

            // Direct Bulletproof Background Highlight Handler
            background: function (val) {
              const quillInst = this.quill;
              let range = quillInst.getSelection();
              if ((!range || range.length === 0) && lastSelectedRangeRef.current) {
                quillInst.setSelection(lastSelectedRangeRef.current);
                range = lastSelectedRangeRef.current;
              }
              if (range && range.length > 0) {
                quillInst.formatText(range.index, range.length, 'background', val, Quill.sources.USER);
                quillInst.setSelection(range);
              } else {
                quillInst.format('background', val, Quill.sources.USER);
              }
            },

            // Table Handler: Opens sleek styled CSS modal
            table: function () {
              const quillInst = this.quill;
              const sel = quillInst.getSelection();
              if (sel) {
                savedRangeRef.current = sel;
              }
              const tableMod = quillInst.getModule('table');
              let inCell = false;
              const range = sel || savedRangeRef.current;
              if (tableMod && range) {
                try {
                  const [t, r, cell] = tableMod.getTable(range);
                  if (cell) inCell = true;
                } catch (e) {}
              }
              if (!inCell) {
                setActiveTable(false);
                setTableBarPos(null);
                activeTableElementRef.current = null;
              }
              setIsTableModalOpen(true);
            },

            // Image Handler: Directly opens computer file dialog for instant upload
            image: function () {
              const quillInst = this.quill;
              const fileInput = document.createElement('input');
              fileInput.type = 'file';
              fileInput.accept = 'image/png, image/jpeg, image/webp, image/gif';
              fileInput.click();

              fileInput.onchange = async () => {
                const file = fileInput.files && fileInput.files[0];
                if (!file) return;

                if (typeof uploadImageFile === 'function') {
                  try {
                    if (showNotification) {
                      showNotification('Uploading image from your computer...', 'info');
                    }
                    const res = await uploadImageFile(file, adminToken);
                    const uploadedUrl = res?.url || res?.imageUrl || (typeof res === 'string' ? res : null);
                    if (uploadedUrl) {
                      const range = quillInst.getSelection(true);
                      const idx = range ? range.index : quillInst.getLength();
                      quillInst.insertEmbed(idx, 'image', uploadedUrl, 'user');
                      quillInst.setSelection(idx + 1);
                      if (showNotification) {
                        showNotification('Image uploaded and inserted successfully!', 'success');
                      }
                    } else {
                      throw new Error('No URL returned from server');
                    }
                  } catch (err) {
                    console.error('Image upload failed:', err);
                    alert('Image upload failed: ' + (err.message || 'Unknown error'));
                  }
                } else {
                  // Fallback to local Data URI if upload function unavailable
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const range = quillInst.getSelection(true);
                    const idx = range ? range.index : quillInst.getLength();
                    quillInst.insertEmbed(idx, 'image', e.target.result, 'user');
                    quillInst.setSelection(idx + 1);
                  };
                  reader.readAsDataURL(file);
                }
              };
            },

            // 3. Link Handler
            link: function (val) {
              const quillInst = this.quill;
              if (val) {
                let range = quillInst.getSelection();
                if (!range || range.length === 0) {
                  const url = prompt('Enter Link URL (e.g. https://... or /contact):', 'https://');
                  if (url && url.trim()) {
                    const text = prompt('Enter Link Display Text:', url.trim());
                    if (text) {
                      const idx = range ? range.index : Math.max(0, quillInst.getLength() - 1);
                      quillInst.insertText(idx, text, 'link', url.trim(), 'user');
                      quillInst.setSelection(idx + text.length, 0);
                    }
                  }
                } else {
                  const currentLink = quillInst.getFormat(range).link;
                  const url = prompt('Enter Link URL:', currentLink || 'https://');
                  if (url && url.trim()) {
                    quillInst.format('link', url.trim(), 'user');
                  } else if (url === '') {
                    quillInst.format('link', false, 'user');
                  }
                }
              } else {
                quillInst.format('link', false, 'user');
              }
            }
          }
        }
      }
    });

    quillRef.current = quill;

    // Set initial content
    if (value) {
      const initialHtml = prepareBlogContentForEditor(value);
      quill.root.innerHTML = initialHtml;
      lastEmittedValueRef.current = initialHtml;
      // Initial stats
      const text = quill.getText().trim();
      const words = text ? text.split(/\s+/).length : 0;
      setStats({ words, characters: text.length });
    }

    // Text Change Listener: Emits clean HTML directly so spaces and line breaks are 100% preserved
    quill.on('text-change', () => {
      const text = quill.getText().trim();
      const isEmpty = text.length === 0 && !quill.root.querySelector('img, table');
      const htmlOutput = isEmpty ? '' : quill.root.innerHTML;

      // Update stats
      const words = text ? text.split(/\s+/).length : 0;
      setStats({ words, characters: text.length });

      if (htmlOutput === lastEmittedValueRef.current) return;
      lastEmittedValueRef.current = htmlOutput;
      if (onChangeRef.current) {
        onChangeRef.current(htmlOutput);
      }
    });

    // ── Table Column Resizing Mechanism: Hover & Drag Column Borders ──
    const editorElement = editorDiv.querySelector('.ql-editor') || editorDiv;
    let isResizing = false;
    let startX = 0;
    let startWidth = 0;
    let activeCell = null;
    let colIndex = -1;
    let targetTable = null;

    const handleCellMouseMove = (e) => {
      if (isResizing) return;
      const cell = e.target.closest('td, th');
      if (cell && editorElement.contains(cell)) {
        const rect = cell.getBoundingClientRect();
        // Near right border (within 7px)
        if (e.clientX >= rect.right - 7 && e.clientX <= rect.right + 2) {
          cell.style.cursor = 'col-resize';
        } else {
          cell.style.cursor = '';
        }
      }
    };

    const handleCellMouseDown = (e) => {
      const cell = e.target.closest('td, th');
      if (!cell || !editorElement.contains(cell)) return;

      const rect = cell.getBoundingClientRect();
      if (e.clientX >= rect.right - 7 && e.clientX <= rect.right + 2) {
        e.preventDefault();
        e.stopPropagation();
        isResizing = true;
        startX = e.clientX;
        startWidth = rect.width;
        activeCell = cell;
        targetTable = cell.closest('table');
        colIndex = Array.from(cell.parentElement.children).indexOf(cell);

        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';

        const onMouseMove = (moveEvent) => {
          if (!isResizing) return;
          const diff = moveEvent.clientX - startX;
          const newWidth = Math.max(45, Math.round(startWidth + diff));

          if (targetTable && colIndex >= 0) {
            const allRows = targetTable.querySelectorAll('tr');
            allRows.forEach(row => {
              const c = row.children[colIndex];
              if (c) {
                c.style.width = `${newWidth}px`;
                c.style.minWidth = `${newWidth}px`;
              }
            });
          } else if (activeCell) {
            activeCell.style.width = `${newWidth}px`;
            activeCell.style.minWidth = `${newWidth}px`;
          }
        };

        const onMouseUp = () => {
          if (isResizing) {
            isResizing = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);

            // Emit updated HTML so resized column widths are saved
            setTimeout(() => {
              const html = quill.root.innerHTML;
              lastEmittedValueRef.current = html;
              if (onChangeRef.current) {
                onChangeRef.current(html);
              }
            }, 50);
          }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
      }
    };

    editorElement.addEventListener('mousemove', handleCellMouseMove);
    editorElement.addEventListener('mousedown', handleCellMouseDown);

    // ── Table Focus & Active Detection ──
    const updateTableFocus = (e) => {
      const cell = (e ? e.target : document.activeElement)?.closest?.('td, th');
      if (cell && editorElement.contains(cell)) {
        activeTableElementRef.current = cell.closest('table');
        setActiveTable(true);
        const sel = quill.getSelection();
        if (sel) savedRangeRef.current = sel;
        setTimeout(() => {
          if (updateTablePosRef.current) updateTablePosRef.current();
        }, 10);
      } else {
        const domSel = window.getSelection();
        const node = domSel && domSel.anchorNode;
        const cellFromNode = node && (node.nodeType === 1 ? node : node.parentElement)?.closest?.('td, th');
        if (cellFromNode && editorElement.contains(cellFromNode)) {
          activeTableElementRef.current = cellFromNode.closest('table');
          setActiveTable(true);
          const sel = quill.getSelection();
          if (sel) savedRangeRef.current = sel;
          setTimeout(() => {
            if (updateTablePosRef.current) updateTablePosRef.current();
          }, 10);
        } else if (!e || (!e.target.closest('.winera-blog-table-controls-bar') && !e.target.closest('.winera-blog-table-modal'))) {
          setActiveTable(false);
          setTableBarPos(null);
          activeTableElementRef.current = null;
        }
      }
    };

    quill.on('selection-change', (range) => {
      if (range) {
        savedRangeRef.current = range;
        if (range.length > 0) {
          lastSelectedRangeRef.current = range;
        }
        const tableModule = quill.getModule('table');
        if (tableModule) {
          try {
            const [table, row, cell] = tableModule.getTable(range);
            if (cell) {
              setActiveTable(true);
              activeTableElementRef.current = cell.domNode ? cell.domNode.closest('table') : editorElement.querySelector('table');
              setTimeout(() => {
                if (updateTablePosRef.current) updateTablePosRef.current();
              }, 10);
              return;
            }
          } catch {
            // Ignore selection check errors
          }
        }
      }
    });

    const handleWindowScrollResize = () => {
      if (updateTablePosRef.current) {
        updateTablePosRef.current();
      }
      if (updateImagePosRef.current) {
        updateImagePosRef.current();
      }
    };
    window.addEventListener('scroll', handleWindowScrollResize, { passive: true });
    window.addEventListener('resize', handleWindowScrollResize, { passive: true });

    // Image click handler
    const handleEditorImageClick = (e) => {
      const img = e.target.closest('img');
      if (img && editorElement.contains(img)) {
        if (activeImageElementRef.current && activeImageElementRef.current !== img) {
          activeImageElementRef.current.classList.remove('winera-selected-editor-img');
        }
        activeImageElementRef.current = img;
        img.classList.add('winera-selected-editor-img');
        setActiveImage(img);
        setTimeout(() => {
          if (updateImagePosRef.current) updateImagePosRef.current();
        }, 10);
      } else if (!e.target.closest('.winera-blog-image-controls-bar')) {
        if (activeImageElementRef.current) {
          activeImageElementRef.current.classList.remove('winera-selected-editor-img');
          activeImageElementRef.current = null;
        }
        setActiveImage(null);
        setImageBarPos(null);
      }
    };

    // Keyboard shortcut: Backspace/Delete to delete selected image
    const handleEditorKeyDown = (e) => {
      if ((e.key === 'Backspace' || e.key === 'Delete') && activeImageElementRef.current) {
        e.preventDefault();
        deleteSelectedImage();
      }
    };

    // Handle paste of image files (e.g. screenshot or copied image) -> upload to Cloudinary
    const handleEditorPaste = async (e) => {
      const clipboardData = e.clipboardData;
      if (!clipboardData || !clipboardData.items) return;
      for (let i = 0; i < clipboardData.items.length; i++) {
        const item = clipboardData.items[i];
        if (item.type && item.type.indexOf('image') !== -1) {
          const file = item.getAsFile();
          if (file && typeof uploadImageFile === 'function') {
            e.preventDefault();
            try {
              if (showNotification) showNotification('Uploading pasted image to Cloudinary...', 'info');
              const res = await uploadImageFile(file, adminToken);
              const uploadedUrl = res?.url || res?.imageUrl || (typeof res === 'string' ? res : null);
              if (uploadedUrl) {
                const range = quill.getSelection(true);
                const idx = range ? range.index : quill.getLength();
                quill.insertEmbed(idx, 'image', uploadedUrl, 'user');
                quill.setSelection(idx + 1);
                if (showNotification) showNotification('Pasted image uploaded to Cloudinary successfully!', 'success');
              }
            } catch (err) {
              console.error('Pasted image upload failed:', err);
              if (showNotification) showNotification('Failed to upload pasted image: ' + (err.message || 'Error'), 'error');
            }
            break;
          }
        }
      }
    };

    // Handle drag and drop of image files into editor -> upload to Cloudinary
    const handleEditorDrop = async (e) => {
      const files = e.dataTransfer && e.dataTransfer.files;
      if (files && files.length > 0 && files[0].type.startsWith('image/')) {
        if (typeof uploadImageFile === 'function') {
          e.preventDefault();
          try {
            if (showNotification) showNotification('Uploading dropped image to Cloudinary...', 'info');
            const res = await uploadImageFile(files[0], adminToken);
            const uploadedUrl = res?.url || res?.imageUrl || (typeof res === 'string' ? res : null);
            if (uploadedUrl) {
              const range = quill.getSelection(true);
              const idx = range ? range.index : quill.getLength();
              quill.insertEmbed(idx, 'image', uploadedUrl, 'user');
              quill.setSelection(idx + 1);
              if (showNotification) showNotification('Image uploaded to Cloudinary successfully!', 'success');
            }
          } catch (err) {
            console.error('Dropped image upload failed:', err);
            if (showNotification) showNotification('Failed to upload image: ' + (err.message || 'Error'), 'error');
          }
        }
      }
    };

    editorElement.addEventListener('click', updateTableFocus);
    editorElement.addEventListener('keyup', updateTableFocus);
    editorElement.addEventListener('click', handleEditorImageClick);
    editorElement.addEventListener('keydown', handleEditorKeyDown);
    editorElement.addEventListener('paste', handleEditorPaste);
    editorElement.addEventListener('drop', handleEditorDrop);

    return () => {
      window.removeEventListener('scroll', handleWindowScrollResize);
      window.removeEventListener('resize', handleWindowScrollResize);
      editorElement.removeEventListener('mousemove', handleCellMouseMove);
      editorElement.removeEventListener('mousedown', handleCellMouseDown);
      editorElement.removeEventListener('click', updateTableFocus);
      editorElement.removeEventListener('keyup', updateTableFocus);
      editorElement.removeEventListener('click', handleEditorImageClick);
      editorElement.removeEventListener('keydown', handleEditorKeyDown);
      editorElement.removeEventListener('paste', handleEditorPaste);
      editorElement.removeEventListener('drop', handleEditorDrop);
      quillRef.current = null;
    };
  }, []);

  // Sync external value changes (e.g. when opening a different blog)
  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;

    if (value === lastEmittedValueRef.current) return;

    const currentHtml = quill.root.innerHTML;
    if (currentHtml === value) {
      lastEmittedValueRef.current = value;
      return;
    }

    const incomingHtml = prepareBlogContentForEditor(value);
    lastEmittedValueRef.current = incomingHtml;
    if (quill.root.innerHTML !== incomingHtml) {
      const sel = quill.getSelection();
      quill.root.innerHTML = incomingHtml || '';
      if (sel) {
        quill.setSelection(sel.index, sel.length);
      }
      const text = quill.getText().trim();
      const words = text ? text.split(/\s+/).length : 0;
      setStats({ words, characters: text.length });
    }
  }, [value]);

  // Table Management Actions (Row Add/Remove, Column Add/Remove, Delete Table)
  const handleTableAction = (action) => {
    const quill = quillRef.current;
    if (!quill) return;

    if (savedRangeRef.current && !quill.getSelection()) {
      quill.setSelection(savedRangeRef.current, Quill.sources.SILENT);
    }

    const tableModule = quill.getModule('table');

    if (action === 'deleteTable') {
      const executeDeleteTable = () => {
        let deleted = false;
        if (tableModule) {
          try {
            const [table] = tableModule.getTable();
            if (table) {
              tableModule.deleteTable();
              deleted = true;
            }
          } catch (e) {
            console.warn('Quill deleteTable fallback:', e);
          }
        }

        if (!deleted && activeTableElementRef.current) {
          activeTableElementRef.current.remove();
          quill.update(Quill.sources.USER);
          deleted = true;
        }

        setActiveTable(false);
        setTableBarPos(null);
        activeTableElementRef.current = null;

        setTimeout(() => {
          const html = quill.root.innerHTML;
          lastEmittedValueRef.current = html;
          if (onChangeRef.current) onChangeRef.current(html);
          if (showNotification) showNotification('Table deleted successfully', 'info');
        }, 50);
      };

      const confirmData = {
        title: 'Delete Entire Table?',
        message: 'Are you sure you want to delete this entire table from the article? All data inside this table will be permanently removed.',
        iconType: 'delete',
        confirmText: 'Yes, Delete Table',
        onConfirm: executeDeleteTable
      };

      if (typeof onRequestConfirm === 'function') {
        onRequestConfirm(confirmData);
      } else {
        setLocalConfirmModal(confirmData);
      }
      return;
    }

    if (!tableModule) return;

    try {
      if (action === 'insertRowAbove') {
        tableModule.insertRowAbove();
        if (showNotification) showNotification('Row inserted above', 'success');
      } else if (action === 'insertRowBelow') {
        tableModule.insertRowBelow();
        if (showNotification) showNotification('Row inserted below', 'success');
      } else if (action === 'deleteRow') {
        tableModule.deleteRow();
        if (showNotification) showNotification('Row deleted', 'info');
      } else if (action === 'insertColumnLeft') {
        tableModule.insertColumnLeft();
        if (showNotification) showNotification('Column inserted left', 'success');
      } else if (action === 'insertColumnRight') {
        tableModule.insertColumnRight();
        if (showNotification) showNotification('Column inserted right', 'success');
      } else if (action === 'deleteColumn') {
        tableModule.deleteColumn();
        if (showNotification) showNotification('Column deleted', 'info');
      }

      setTimeout(() => {
        const range = quill.getSelection();
        const [table] = tableModule.getTable(range);
        if (!table && !quill.root.querySelector('table')) {
          setActiveTable(false);
          setTableBarPos(null);
          activeTableElementRef.current = null;
        } else if (updateTablePosRef.current) {
          updateTablePosRef.current();
        }
        const html = quill.root.innerHTML;
        lastEmittedValueRef.current = html;
        if (onChangeRef.current) onChangeRef.current(html);
      }, 50);
    } catch (err) {
      console.error('Table action error:', err);
    }
  };

  // Insert a clean regular paragraph line below the currently active table
  const insertParagraphBelowTable = () => {
    const quill = quillRef.current;
    if (!quill) return;

    const tableModule = quill.getModule('table');
    const range = quill.getSelection() || savedRangeRef.current;
    let targetTableBlot = null;

    if (tableModule && range) {
      try {
        const [table] = tableModule.getTable(range);
        if (table) targetTableBlot = table;
      } catch (e) {}
    }
    if (!targetTableBlot && activeTableElementRef.current) {
      try {
        targetTableBlot = Quill.find(activeTableElementRef.current);
      } catch (e) {}
    }

    if (targetTableBlot) {
      const idx = quill.getIndex(targetTableBlot);
      const len = targetTableBlot.length();
      const insertPos = idx + len;
      quill.insertText(insertPos, '\n', Quill.sources.USER);
      quill.setSelection(insertPos, 0, Quill.sources.USER);
      quill.focus();
    } else if (activeTableElementRef.current) {
      const p = document.createElement('p');
      p.innerHTML = '<br>';
      activeTableElementRef.current.after(p);
      quill.update(Quill.sources.USER);
    }

    setActiveTable(false);
    setTableBarPos(null);
    activeTableElementRef.current = null;
    if (showNotification) {
      showNotification('New line added below table', 'info');
    }
  };

  // ── Image Actions: Delete Image, Width Resizing, Alignment ──
  const deleteSelectedImage = () => {
    const img = activeImageElementRef.current;
    if (!img) return;

    const executeDelete = () => {
      const quill = quillRef.current;
      if (quill) {
        try {
          const blot = Quill.find(img);
          if (blot) {
            blot.deleteAt(0, 1);
          } else {
            img.remove();
          }
        } catch {
          img.remove();
        }
        const html = quill.root.innerHTML;
        lastEmittedValueRef.current = html;
        if (onChangeRef.current) onChangeRef.current(html);
      } else {
        img.remove();
      }

      if (activeImageElementRef.current) {
        activeImageElementRef.current.classList.remove('winera-selected-editor-img');
        activeImageElementRef.current = null;
      }
      setActiveImage(null);
      setImageBarPos(null);

      if (typeof showNotification === 'function') {
        showNotification('Image deleted successfully!', 'delete');
      }
    };

    const confirmData = {
      title: 'Delete Image?',
      message: 'Are you sure you want to remove this image from the article content?',
      iconType: 'delete',
      confirmText: 'Yes, Delete Image',
      onConfirm: executeDelete
    };

    if (typeof onRequestConfirm === 'function') {
      onRequestConfirm(confirmData);
    } else {
      setLocalConfirmModal(confirmData);
    }
  };

  const setImageWidth = (w) => {
    const img = activeImageElementRef.current;
    if (!img) return;
    img.style.width = w;
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    const quill = quillRef.current;
    if (quill) {
      const html = quill.root.innerHTML;
      lastEmittedValueRef.current = html;
      if (onChangeRef.current) onChangeRef.current(html);
    }
    setTimeout(() => {
      if (updateImagePosRef.current) updateImagePosRef.current();
    }, 10);
  };

  // Insert Table via Styled Modal
  const handleInsertTableFromModal = () => {
    const quill = quillRef.current;
    if (!quill) {
      setIsTableModalOpen(false);
      return;
    }

    const tableModule = quill.getModule('table');
    const rows = Math.max(1, Math.min(25, parseInt(tableRows, 10) || 3));
    const cols = Math.max(1, Math.min(12, parseInt(tableCols, 10) || 3));

    if (!tableModule) {
      setIsTableModalOpen(false);
      return;
    }

    const range = quill.getSelection() || savedRangeRef.current;
    
    // Check if the current cursor position is strictly inside an existing table cell
    let inCell = false;
    let existingTableBlot = null;

    if (range) {
      try {
        const [table, row, cell] = tableModule.getTable(range);
        if (cell) {
          inCell = true;
          existingTableBlot = table;
        }
      } catch (e) {}
    }

    if (inCell && existingTableBlot) {
      // Cursor is inside an existing table cell: insert a new separate table below it
      const tableIndex = quill.getIndex(existingTableBlot);
      const tableLength = existingTableBlot.length();
      const insertIndex = tableIndex + tableLength;

      quill.insertText(insertIndex, '\n', Quill.sources.USER);
      quill.setSelection(insertIndex + 1, 0, Quill.sources.SILENT);
      tableModule.insertTable(rows, cols);
    } else {
      // Cursor is at ANY location in the article (paragraphs, headings, blank lines, or end):
      // Insert the table exactly at that cursor location!
      const targetIndex = range ? range.index : Math.max(0, quill.getLength() - 1);
      
      quill.insertText(targetIndex, '\n', Quill.sources.USER);
      quill.setSelection(targetIndex, 0, Quill.sources.SILENT);
      tableModule.insertTable(rows, cols);
    }

    // Always ensure an empty paragraph after table for seamless typing/editing
    setTimeout(() => {
      try {
        const sel = quill.getSelection();
        if (sel) {
          const [tbl] = tableModule.getTable(sel);
          if (tbl) {
            const idx = quill.getIndex(tbl);
            const len = tbl.length();
            quill.insertText(idx + len, '\n', Quill.sources.USER);
          }
        }
      } catch (e) {}

      const html = quill.root.innerHTML;
      lastEmittedValueRef.current = html;
      if (onChangeRef.current) onChangeRef.current(html);
      if (showNotification) {
        showNotification(`New table inserted (${rows} rows x ${cols} columns).`, 'success');
      }
    }, 50);

    setIsTableModalOpen(false);
  };

  // Table Button Styles
  const tableBtnStyle = {
    background: '#ffffff',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    padding: '6px 11px',
    fontSize: '12px',
    fontWeight: '700',
    color: '#1e293b',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
    transition: 'all 0.15s ease'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      {/* Editor Container Box */}
      <div
        ref={quillContainerRef}
        className="winera-blog-quill-container"
        style={{
          border: '1.5px solid #cbd5e1',
          borderRadius: '16px',
          overflow: 'visible',
          background: '#ffffff',
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
          position: 'relative'
        }}
      >
        {/* ── Table Quick Actions Toolbar (Positioned directly ABOVE where the table starts) ── */}
        {activeTable && tableBarPos && (
          <div
            className="winera-blog-table-controls-bar"
            style={{
              position: 'absolute',
              top: `${tableBarPos.top}px`,
              left: `${tableBarPos.left}px`,
              zIndex: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '6px',
              padding: '6px 12px',
              background: '#ffffff',
              border: '1.5px solid #0284c7',
              borderRadius: '8px',
              boxShadow: '0 4px 14px rgba(2, 132, 199, 0.16)',
              fontSize: '12px',
              flexWrap: 'wrap',
              maxWidth: 'calc(100% - 16px)',
              transition: 'top 0.08s ease, left 0.08s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 800, color: '#0369a1', display: 'flex', alignItems: 'center', gap: '5px', marginRight: '4px' }}>
                <Table size={15} strokeWidth={2.2} style={{ color: '#0284c7' }} />
                <span>Table:</span>
              </span>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); handleTableAction('insertRowAbove'); }}
                style={tableBtnStyle}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#e0f2fe'; e.currentTarget.style.borderColor = '#0284c7'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
                title="Insert row above current row"
              >
                <Plus size={13} strokeWidth={2.5} style={{ color: '#0284c7' }} />
                Row Above
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); handleTableAction('insertRowBelow'); }}
                style={tableBtnStyle}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#e0f2fe'; e.currentTarget.style.borderColor = '#0284c7'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
                title="Insert row below current row"
              >
                <Plus size={13} strokeWidth={2.5} style={{ color: '#0284c7' }} />
                Row Below
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); handleTableAction('deleteRow'); }}
                style={{ ...tableBtnStyle, color: '#dc2626', borderColor: '#fca5a5' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.borderColor = '#ef4444'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.borderColor = '#fca5a5'; }}
                title="Delete current row"
              >
                <Trash2 size={13} strokeWidth={2} style={{ color: '#dc2626' }} />
                Delete Row
              </button>
              <span style={{ color: '#cbd5e1', margin: '0 2px' }}>|</span>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); handleTableAction('insertColumnLeft'); }}
                style={tableBtnStyle}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#e0f2fe'; e.currentTarget.style.borderColor = '#0284c7'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
                title="Insert column to the left"
              >
                <Plus size={13} strokeWidth={2.5} style={{ color: '#0284c7' }} />
                Col Left
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); handleTableAction('insertColumnRight'); }}
                style={tableBtnStyle}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#e0f2fe'; e.currentTarget.style.borderColor = '#0284c7'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
                title="Insert column to the right"
              >
                <Plus size={13} strokeWidth={2.5} style={{ color: '#0284c7' }} />
                Col Right
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); handleTableAction('deleteColumn'); }}
                style={{ ...tableBtnStyle, color: '#dc2626', borderColor: '#fca5a5' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.borderColor = '#ef4444'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.borderColor = '#fca5a5'; }}
                title="Delete current column"
              >
                <Trash2 size={13} strokeWidth={2} style={{ color: '#dc2626' }} />
                Delete Col
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); insertParagraphBelowTable(); }}
                style={{
                  ...tableBtnStyle,
                  background: '#f0fdf4',
                  borderColor: '#86efac',
                  color: '#166534',
                  fontWeight: '700'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#dcfce7'; e.currentTarget.style.borderColor = '#22c55e'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#f0fdf4'; e.currentTarget.style.borderColor = '#86efac'; }}
                title="Insert regular text line below this table"
              >
                <Plus size={13} strokeWidth={2.5} style={{ color: '#16a34a' }} />
                Line Below Table
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); handleTableAction('deleteTable'); }}
                style={{
                  ...tableBtnStyle,
                  background: '#fef2f2',
                  color: '#b91c1c',
                  borderColor: '#ef4444',
                  fontWeight: '800'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.borderColor = '#dc2626'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.borderColor = '#ef4444'; }}
                title="Delete this entire table from the article"
              >
                <Trash2 size={13} strokeWidth={2.2} style={{ color: '#b91c1c' }} />
                Delete Entire Table
              </button>
            </div>
          </div>
        )}

        {/* ── Image Quick Actions Floating Toolbar (Appears on click of any image inside editor) ── */}
        {activeImage && imageBarPos && (
          <div
            className="winera-blog-image-controls-bar"
            style={{
              position: 'absolute',
              top: `${imageBarPos.top}px`,
              right: `${imageBarPos.right}px`,
              zIndex: 45,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              background: '#0f172a',
              color: '#ffffff',
              border: '1.5px solid #0284c7',
              borderRadius: '10px',
              boxShadow: '0 8px 25px rgba(2, 132, 199, 0.35), 0 4px 12px rgba(0,0,0,0.4)',
              fontSize: '12px',
              flexWrap: 'wrap',
              maxWidth: 'calc(100% - 24px)',
              transition: 'top 0.08s ease, right 0.08s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 800, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '5px', marginRight: '4px' }}>
                <ImageIcon size={14} style={{ color: '#38bdf8' }} />
                <span>Image:</span>
              </span>

              {/* Width Scaling */}
              <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.12)', borderRadius: '6px', padding: '2px', gap: '2px' }}>
                {['100%', '75%', '50%'].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); setImageWidth(w); }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#0284c7'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                    title={`Resize image to ${w}`}
                  >
                    {w}
                  </button>
                ))}
              </div>

              <span style={{ color: 'rgba(255, 255, 255, 0.25)', margin: '0 2px' }}>|</span>

              {/* 🗑️ Prominent DELETE IMAGE button */}
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); deleteSelectedImage(); }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#ef4444',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '7px',
                  padding: '5px 12px',
                  fontSize: '12px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(239, 68, 68, 0.45)',
                  transition: 'background 0.15s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#dc2626'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#ef4444'; }}
                title="Delete this image (or press Backspace / Delete key)"
              >
                <Trash2 size={13} strokeWidth={2.5} />
                Delete Image
              </button>
            </div>

            {/* Deselect ✕ */}
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                if (activeImageElementRef.current) {
                  activeImageElementRef.current.classList.remove('winera-selected-editor-img');
                  activeImageElementRef.current = null;
                }
                setActiveImage(null);
                setImageBarPos(null);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                fontSize: '13px',
                fontWeight: 'bold',
                cursor: 'pointer',
                padding: '2px 5px',
                marginLeft: '4px'
              }}
              title="Deselect image"
            >
              <X size={14} />
            </button>
          </div>
        )}

        <div ref={containerRef} style={{ minHeight }} />

        {/* Bottom Bar: Word Counter */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '6px 16px',
            background: '#f8fafc',
            borderTop: '1px solid #e2e8f0',
            fontSize: '12px',
            color: '#64748b',
            fontWeight: '600'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>{stats.words} words</span>
            <span>•</span>
            <span>{stats.characters} chars</span>
          </div>
        </div>
      </div>

      {/* ── STYLED POPUP MODAL FOR TABLE CREATION ── */}
      {isTableModalOpen && (
        <div
          className="winera-blog-table-modal"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeInModal 0.2s ease-out'
          }}
          onClick={() => setIsTableModalOpen(false)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '28px 26px',
              maxWidth: '460px',
              width: '100%',
              boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.35)',
              border: '1.5px solid #e2e8f0',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: '#f0f9ff',
                  border: '1.5px solid #bae6fd',
                  color: '#0284c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px'
                }}
              >
                📊
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  Insert Table
                </h3>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: '2px 0 0' }}>
                  Select rows and columns. Table will be inserted at your current cursor position.
                </p>
              </div>
            </div>

            {/* Quick Presets */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>
                Quick Presets:
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { r: 2, c: 2, label: '2 x 2' },
                  { r: 3, c: 3, label: '3 x 3' },
                  { r: 4, c: 3, label: '4 x 3' },
                  { r: 5, c: 4, label: '5 x 4' }
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setTableRows(preset.r);
                      setTableCols(preset.c);
                    }}
                    style={{
                      flex: 1,
                      padding: '8px 10px',
                      borderRadius: '10px',
                      border: (tableRows === preset.r && tableCols === preset.c) ? '1.5px solid #0284c7' : '1px solid #cbd5e1',
                      background: (tableRows === preset.r && tableCols === preset.c) ? '#e0f2fe' : '#f8fafc',
                      color: (tableRows === preset.r && tableCols === preset.c) ? '#0284c7' : '#334155',
                      fontWeight: '700',
                      fontSize: '12.5px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Row & Column Inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                  Rows Count:
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #cbd5e1', borderRadius: '12px', overflow: 'hidden' }}>
                  <button
                    type="button"
                    onClick={() => setTableRows(r => Math.max(1, r - 1))}
                    style={{ width: '36px', height: '40px', background: '#f8fafc', border: 'none', borderRight: '1px solid #cbd5e1', cursor: 'pointer', fontWeight: '800', color: '#475569' }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="25"
                    value={tableRows}
                    onChange={(e) => setTableRows(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    style={{ width: '100%', height: '40px', border: 'none', textAlign: 'center', fontSize: '15px', fontWeight: '700', color: '#0f172a', outline: 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => setTableRows(r => Math.min(25, r + 1))}
                    style={{ width: '36px', height: '40px', background: '#f8fafc', border: 'none', borderLeft: '1px solid #cbd5e1', cursor: 'pointer', fontWeight: '800', color: '#475569' }}
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                  Columns Count:
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #cbd5e1', borderRadius: '12px', overflow: 'hidden' }}>
                  <button
                    type="button"
                    onClick={() => setTableCols(c => Math.max(1, c - 1))}
                    style={{ width: '36px', height: '40px', background: '#f8fafc', border: 'none', borderRight: '1px solid #cbd5e1', cursor: 'pointer', fontWeight: '800', color: '#475569' }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={tableCols}
                    onChange={(e) => setTableCols(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    style={{ width: '100%', height: '40px', border: 'none', textAlign: 'center', fontSize: '15px', fontWeight: '700', color: '#0f172a', outline: 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => setTableCols(c => Math.min(12, c + 1))}
                    style={{ width: '36px', height: '40px', background: '#f8fafc', border: 'none', borderLeft: '1px solid #cbd5e1', cursor: 'pointer', fontWeight: '800', color: '#475569' }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setIsTableModalOpen(false)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '12px',
                  border: '1.5px solid #cbd5e1',
                  background: '#f8fafc',
                  color: '#475569',
                  fontWeight: '700',
                  fontSize: '13.5px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertTableFromModal}
                style={{
                  padding: '10px 22px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  color: '#ffffff',
                  fontWeight: '800',
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>✓</span> Insert Table ({tableRows}x{tableCols})
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInModal {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }

        /* Quill Snow Toolbar Refinements (Sticky at top of screen on scroll) */
        .winera-blog-quill-container .ql-toolbar.ql-snow {
          position: sticky !important;
          top: 0 !important;
          z-index: 100 !important;
          border: none !important;
          border-bottom: 1.5px solid #cbd5e1 !important;
          background: #ffffff !important;
          padding: 10px 14px !important;
          display: flex !important;
          flex-wrap: wrap !important;
          align-items: center !important;
          gap: 4px !important;
          border-top-left-radius: 16px !important;
          border-top-right-radius: 16px !important;
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.06) !important;
        }
        .winera-blog-quill-container .ql-formats {
          margin-right: 12px !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 2px !important;
        }

        /* Headings Dropdown Label (Google Docs Style) */
        .winera-blog-quill-container .ql-snow .ql-picker.ql-header {
          width: 140px !important;
        }
        .winera-blog-quill-container .ql-snow .ql-picker.ql-header .ql-picker-label::before,
        .winera-blog-quill-container .ql-snow .ql-picker.ql-header .ql-picker-item::before {
          content: 'Normal text' !important;
          font-family: 'Open Sans', sans-serif !important;
        }
        .winera-blog-quill-container .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
        .winera-blog-quill-container .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
          content: 'Heading 1' !important;
        }
        .winera-blog-quill-container .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
        .winera-blog-quill-container .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
          content: 'Heading 2' !important;
        }
        .winera-blog-quill-container .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
        .winera-blog-quill-container .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
          content: 'Heading 3' !important;
        }
        .winera-blog-quill-container .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
        .winera-blog-quill-container .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
          content: 'Heading 4' !important;
        }
        .winera-blog-quill-container .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
        .winera-blog-quill-container .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
          content: 'Heading 5' !important;
        }
        .winera-blog-quill-container .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
        .winera-blog-quill-container .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
          content: 'Heading 6' !important;
        }

        /* Google Docs Dropdown Item Typography Previews */
        .winera-blog-quill-container .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
          font-size: 19px !important;
          font-weight: 800 !important;
        }
        .winera-blog-quill-container .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
          font-size: 16.5px !important;
          font-weight: 700 !important;
        }
        .winera-blog-quill-container .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
          font-size: 14.5px !important;
          font-weight: 700 !important;
        }
        .winera-blog-quill-container .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
          font-size: 13.5px !important;
          font-weight: 600 !important;
        }
        .winera-blog-quill-container .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
          font-size: 12.5px !important;
          font-weight: 600 !important;
        }
        .winera-blog-quill-container .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
          font-size: 11.5px !important;
          font-weight: 600 !important;
          text-transform: uppercase !important;
        }

        /* Color Picker Dropdown Popover */
        .winera-blog-quill-container .ql-snow .ql-picker.ql-expanded .ql-picker-options {
          z-index: 100 !important;
          background: #ffffff !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
          border: 1.5px solid #cbd5e1 !important;
          border-radius: 10px !important;
          padding: 6px !important;
        }
        .winera-blog-quill-container .ql-snow .ql-color-picker.ql-expanded .ql-picker-options {
          width: 172px !important;
        }

        /* Editor Area Typography & Layout */
        .winera-blog-quill-container .ql-container.ql-snow {
          border: none !important;
          font-family: 'Open Sans', sans-serif !important;
          font-size: 15.5px !important;
          color: #334155;
          line-height: 1.85 !important;
        }
        .winera-blog-quill-container .ql-editor {
          min-height: ${minHeight} !important;
          padding: 24px 28px !important;
          font-family: 'Open Sans', sans-serif !important;
          font-size: 15.5px !important;
          color: #334155;
          line-height: 1.85 !important;
        }

        /* Line Break & Paragraph Heights */
        .winera-blog-quill-container .ql-editor p {
          margin: 0 0 16px 0 !important;
          min-height: 1.6em !important;
        }

        /* Headings Styling Inside Editor (Google Docs Exact Proportions & Hierarchy) */
        .winera-blog-quill-container .ql-editor h1 {
          font-size: 28px !important;
          font-weight: 800 !important;
          color: #0f172a;
          margin: 30px 0 14px !important;
          line-height: 1.3 !important;
          font-family: 'Open Sans', sans-serif !important;
        }
        .winera-blog-quill-container .ql-editor h2 {
          font-size: 23px !important;
          font-weight: 700 !important;
          color: #0f172a;
          margin: 26px 0 12px !important;
          line-height: 1.35 !important;
          font-family: 'Open Sans', sans-serif !important;
        }
        .winera-blog-quill-container .ql-editor h3 {
          font-size: 19px !important;
          font-weight: 700 !important;
          color: #0f172a;
          margin: 22px 0 10px !important;
          line-height: 1.4 !important;
          font-family: 'Open Sans', sans-serif !important;
        }
        .winera-blog-quill-container .ql-editor h4 {
          font-size: 16.5px !important;
          font-weight: 700 !important;
          color: #0f172a;
          margin: 18px 0 8px !important;
          line-height: 1.45 !important;
          font-family: 'Open Sans', sans-serif !important;
        }
        .winera-blog-quill-container .ql-editor h5 {
          font-size: 15px !important;
          font-weight: 700 !important;
          color: #0f172a;
          margin: 16px 0 6px !important;
          line-height: 1.5 !important;
          font-family: 'Open Sans', sans-serif !important;
        }
        .winera-blog-quill-container .ql-editor h6 {
          font-size: 13.5px !important;
          font-weight: 700 !important;
          color: #475569;
          margin: 14px 0 6px !important;
          line-height: 1.5 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
          font-family: 'Open Sans', sans-serif !important;
        }

        /* Support Text Colors & Background Highlights:
           Children of colored elements inherit the color, but the colored element itself is never forced to inherit */
        .winera-blog-quill-container .ql-editor [style*="color"] strong,
        .winera-blog-quill-container .ql-editor [style*="color"] b,
        .winera-blog-quill-container .ql-editor [style*="color"] em,
        .winera-blog-quill-container .ql-editor [style*="color"] i {
          color: inherit !important;
        }
        .winera-blog-quill-container .ql-editor span[style*="color"],
        .winera-blog-quill-container .ql-editor span[style*="background"] {
          display: inline !important;
        }

        /* Table Styling Inside Editor with Column Resizing */
        .winera-blog-quill-container .ql-editor table {
          border-collapse: collapse !important;
          width: 100% !important;
          margin: 20px 0 !important;
          border: 1.5px solid #cbd5e1 !important;
          background: #ffffff !important;
          table-layout: auto !important;
        }
        .winera-blog-quill-container .ql-editor th,
        .winera-blog-quill-container .ql-editor td {
          border: 1px solid #cbd5e1 !important;
          padding: 10px 14px !important;
          min-width: 45px !important;
          font-size: 14.5px !important;
          color: #334155 !important;
          line-height: 1.6 !important;
          vertical-align: top !important;
          position: relative !important;
          box-sizing: border-box !important;
        }
        .winera-blog-quill-container .ql-editor th {
          background: #f1f5f9 !important;
          font-weight: 700 !important;
          color: #0f172a !important;
        }

        /* Images Inside Editor */
        .winera-blog-quill-container .ql-editor img {
          max-width: 100% !important;
          height: auto !important;
          border-radius: 12px !important;
          margin: 18px auto !important;
          display: block !important;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08) !important;
          cursor: pointer !important;
          transition: outline 0.15s ease, box-shadow 0.15s ease !important;
        }
        .winera-blog-quill-container .ql-editor img:hover {
          outline: 2.5px dashed #0284c7 !important;
          outline-offset: 3px !important;
        }
        .winera-blog-quill-container .ql-editor img.winera-selected-editor-img {
          outline: 3.5px solid #0284c7 !important;
          outline-offset: 3px !important;
          box-shadow: 0 0 0 7px rgba(2, 132, 199, 0.28), 0 8px 24px rgba(0,0,0,0.12) !important;
        }

        /* Bold & Italic Inside Editor */
        .winera-blog-quill-container .ql-editor strong,
        .winera-blog-quill-container .ql-editor b {
          font-weight: 800 !important;
        }
        .winera-blog-quill-container .ql-editor a {
          color: #0284c7 !important;
          text-decoration: underline !important;
          font-weight: 700 !important;
        }

        /* Toolbar Button States */
        .winera-blog-quill-container .ql-snow .ql-toolbar button:hover,
        .winera-blog-quill-container .ql-snow .ql-toolbar button.ql-active {
          background: #e0f2fe !important;
          border-radius: 6px !important;
        }
        .winera-blog-quill-container .ql-snow .ql-toolbar button.ql-active .ql-stroke {
          stroke: #0284c7 !important;
        }
        .winera-blog-quill-container .ql-snow .ql-toolbar button.ql-active .ql-fill {
          fill: #0284c7 !important;
        }
      `}</style>

      {/* Reusable Confirmation Modal fallback if not handled by parent */}
      {!onRequestConfirm && (
        <ConfirmModal
          modal={localConfirmModal}
          onClose={() => setLocalConfirmModal(null)}
        />
      )}
    </div>
  );
}
