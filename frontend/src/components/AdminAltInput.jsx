import React, { useState, useEffect } from 'react';

/**
 * Common Reusable Alt Text Input Component for Admin Dashboard
 * Standardizes the SEO Alt Text field across all sections.
 * Automatically displays the default SEO Alt keyword when no custom value is saved,
 * and allows the admin to edit/replace it with new custom keywords.
 */
export default function AdminAltInput({
  label = "🏷️ Image Alt Text (SEO Keyword)",
  value = "",
  onChange,
  placeholder = "e.g. Commercial Game Zone Setup - Winera",
  compact = false,
  style = {},
  inputStyle = {}
}) {
  // Extract default SEO alt text from placeholder by removing prefixes like "e.g. " or "🏷️ "
  const defaultAlt = (placeholder || '')
    .replace(/^e\.g\.\s*/i, '')
    .replace(/^🏷️\s*/i, '')
    .trim();

  // Keep track of user's typing in current session
  const [localText, setLocalText] = useState(null);

  // Sync when prop value changes from parent (e.g. section switched or data loaded)
  useEffect(() => {
    if (value !== undefined && value !== null && value !== '') {
      setLocalText(value);
    } else {
      setLocalText(null);
    }
  }, [value, placeholder]);

  // Display value:
  // If user has typed in localText (even if empty string while typing), use localText.
  // Else if value prop exists, use value.
  // Otherwise, fallback to defaultAlt!
  const displayValue = localText !== null ? localText : (value || defaultAlt);

  const isCustomized = (value !== undefined && value !== null && value.trim() !== '') ||
    (localText !== null && localText.trim() !== '' && localText.trim() !== defaultAlt);

  const handleChange = (e) => {
    const newVal = e.target.value;
    setLocalText(newVal);
    if (onChange) {
      onChange(e);
    }
  };

  const handleFocus = (e) => {
    e.currentTarget.style.borderColor = '#38bdf8';
    // If field currently has no custom value, populate it with defaultAlt on first focus
    // so user can easily edit, append, or delete from the default text!
    if ((!value || value.trim() === '') && localText === null && defaultAlt) {
      setLocalText(defaultAlt);
      if (onChange) {
        onChange({ target: { value: defaultAlt } });
      }
    }
  };

  const handleBlur = (e) => {
    e.currentTarget.style.borderColor = '#cbd5e1';
    // If user cleared everything and clicked outside, restore defaultAlt
    if (localText !== null && localText.trim() === '' && defaultAlt) {
      setLocalText(null);
      if (onChange) {
        onChange({ target: { value: '' } });
      }
    }
  };

  const handleResetToDefault = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLocalText(null);
    if (onChange) {
      onChange({ target: { value: '' } });
    }
  };

  return (
    <div style={{ marginTop: compact ? '8px' : '10px', ...style }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? '2px' : '4px', gap: '8px', flexWrap: 'wrap' }}>
        <label
          style={{
            fontSize: compact ? '10px' : '11px',
            fontWeight: '800',
            color: compact ? '#64748b' : '#475569',
            letterSpacing: '0.2px'
          }}
        >
          {label}
        </label>
        {defaultAlt && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontSize: '9.5px',
                fontWeight: '700',
                padding: '1px 6px',
                borderRadius: '4px',
                background: isCustomized ? '#fef3c7' : '#e0f2fe',
                color: isCustomized ? '#b45309' : '#0284c7'
              }}
            >
              {isCustomized ? '✎ Custom SEO Alt' : '✓ Default SEO Active'}
            </span>
            {isCustomized && (
              <button
                type="button"
                onClick={handleResetToDefault}
                title="Reset back to default SEO Alt text"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  fontSize: '9.5px',
                  fontWeight: '700',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                Reset Default
              </button>
            )}
          </div>
        )}
      </div>
      <input
        type="text"
        value={displayValue || ''}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: compact ? '6px 10px' : '9px 12px',
          borderRadius: compact ? '8px' : '10px',
          border: '1.5px solid #cbd5e1',
          fontSize: compact ? '11.5px' : '12.5px',
          background: '#ffffff',
          color: '#0f172a',
          outline: 'none',
          transition: 'border-color 0.15s ease',
          fontFamily: 'inherit',
          ...inputStyle
        }}
      />
    </div>
  );
}
