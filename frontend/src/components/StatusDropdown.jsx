import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Reusable Status Dropdown Component for Admin Panels (Projects, Related Products, etc.)
 * Provides an elegant Active / Inactive status toggle with a floating dropdown menu.
 * 
 * @param {boolean} isActive - Whether the current item is active
 * @param {string} status - Optional 'active' | 'inactive' string
 * @param {function} onChange - Callback invoked with (newStatusString, newBoolean)
 * @param {boolean} disabled - Whether the dropdown is disabled
 * @param {string} size - 'sm' (default) or 'md'
 * @param {string} align - 'left' | 'center' | 'right' (default 'center')
 */
export default function StatusDropdown({
  isActive = true,
  status,
  onChange,
  disabled = false,
  size = 'sm',
  align = 'center',
  direction = 'down'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Normalize active state from boolean or string
  const currentActive = typeof isActive === 'boolean'
    ? isActive
    : (status ? status === 'active' : true);

  // Close dropdown on click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (newStatus) => {
    setIsOpen(false);
    if (disabled || !onChange) return;
    const isAct = newStatus === 'active';
    onChange(newStatus, isAct);
  };

  const isSmall = size === 'sm';

  return (
    <div
      ref={dropdownRef}
      className="winera-status-dropdown-wrapper"
      style={{
        position: 'relative',
        display: 'inline-block',
        textAlign: 'left'
      }}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!disabled) setIsOpen(prev => !prev);
        }}
        style={{
          background: currentActive ? '#ecfdf5' : '#fef2f2',
          color: currentActive ? '#059669' : '#dc2626',
          border: `1.5px solid ${currentActive ? '#a7f3d0' : '#fecaca'}`,
          padding: isSmall ? '5px 12px' : '7px 16px',
          borderRadius: '20px',
          fontSize: isSmall ? '12px' : '13px',
          fontWeight: '800',
          cursor: disabled ? 'not-allowed' : 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 0.2s ease',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          opacity: disabled ? 0.6 : 1,
          userSelect: 'none'
        }}
        title="Click to change visibility status (Active / Inactive)"
      >
        <span
          style={{
            width: isSmall ? '8px' : '9px',
            height: isSmall ? '8px' : '9px',
            borderRadius: '50%',
            background: currentActive ? '#10b981' : '#ef4444',
            flexShrink: 0
          }}
        />
        <span>{currentActive ? 'Active' : 'Inactive'}</span>
        <ChevronDown
          style={{
            width: isSmall ? '13px' : '14px',
            height: isSmall ? '13px' : '14px',
            marginLeft: '2px',
            opacity: 0.7,
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s ease'
          }}
        />
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            ...(direction === 'up' ? { bottom: 'calc(100% + 6px)' } : { top: 'calc(100% + 6px)' }),
            ...(align === 'right' ? { right: 0 } : (align === 'left' ? { left: 0 } : { left: '50%', transform: 'translateX(-50%)' })),
            background: '#ffffff',
            borderRadius: '12px',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 12px 28px rgba(0,0,0,0.18), 0 4px 10px rgba(0,0,0,0.08)',
            padding: '6px',
            minWidth: '135px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}
        >
          {/* Option 1: Active */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSelect('active');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '7px 12px',
              borderRadius: '8px',
              border: 'none',
              background: currentActive ? '#f0fdf4' : 'transparent',
              color: '#059669',
              fontSize: '12px',
              fontWeight: '800',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
              transition: 'background 0.15s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#f0fdf4'; }}
            onMouseLeave={(e) => { if (!currentActive) e.currentTarget.style.background = 'transparent'; }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
            <span>Active</span>
            {currentActive && <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#10b981', fontWeight: '900' }}>✓</span>}
          </button>

          {/* Option 2: Inactive */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSelect('inactive');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '7px 12px',
              borderRadius: '8px',
              border: 'none',
              background: !currentActive ? '#fef2f2' : 'transparent',
              color: '#dc2626',
              fontSize: '12px',
              fontWeight: '800',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
              transition: 'background 0.15s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#fef2f2'; }}
            onMouseLeave={(e) => { if (currentActive) e.currentTarget.style.background = 'transparent'; }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', flexShrink: 0 }} />
            <span>Inactive</span>
            {!currentActive && <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#ef4444', fontWeight: '900' }}>✓</span>}
          </button>
        </div>
      )}
    </div>
  );
}
