import React from 'react';

/**
 * Common Reusable Alt Text Input Component for Admin Dashboard
 * Standardizes the SEO Alt Text field across all sections.
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
  const handleChange = (e) => {
    if (!onChange) return;
    onChange(e);
  };

  return (
    <div style={{ marginTop: compact ? '8px' : '10px', ...style }}>
      <label
        style={{
          display: 'block',
          fontSize: compact ? '10px' : '11px',
          fontWeight: '800',
          color: compact ? '#64748b' : '#475569',
          marginBottom: compact ? '2px' : '4px',
          letterSpacing: '0.2px'
        }}
      >
        {label}
      </label>
      <input
        type="text"
        value={value || ''}
        onChange={handleChange}
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
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#38bdf8';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = '#cbd5e1';
        }}
      />
    </div>
  );
}
