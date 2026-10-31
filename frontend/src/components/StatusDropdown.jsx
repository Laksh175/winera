import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Clock, Check, Calendar, ArrowLeft } from 'lucide-react';
import WineraDateTimePicker from './WineraDateTimePicker';

/**
 * Formats ISO date string to a clean readable format: "Nov 5, 2:30 PM"
 */
export const formatScheduledDate = (isoStr) => {
  if (!isoStr) return '';
  try {
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    }) + ', ' + d.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch (_) {
    return '';
  }
};

/**
 * Reusable Status Dropdown Component for Admin Panels (Projects, Blogs, etc.)
 * Provides an elegant Active / Inactive / Scheduled status toggle with inline datetime picker.
 * 
 * @param {boolean} isActive - Whether the current item is active
 * @param {string} status - 'active' | 'inactive' | 'scheduled'
 * @param {string|Date} scheduledAt - Target ISO string for scheduled auto-publishing
 * @param {function} onChange - Callback invoked with (newStatusString, newBoolean, newScheduledAt)
 * @param {boolean} disabled - Whether the dropdown is disabled
 * @param {string} size - 'sm' (default) or 'md'
 * @param {string} align - 'left' | 'center' | 'right' (default 'center')
 * @param {string} direction - 'up' | 'down' (default 'down')
 */
export default function StatusDropdown({
  isActive = true,
  status,
  scheduledAt = null,
  onChange,
  disabled = false,
  size = 'sm',
  align = 'center',
  direction = 'down'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showScheduleView, setShowScheduleView] = useState(false);
  const [pickedDateTime, setPickedDateTime] = useState('');
  const [scheduleError, setScheduleError] = useState('');
  const dropdownRef = useRef(null);

  // Determine current effective state
  const isScheduled = status === 'scheduled';
  const schedTime = scheduledAt ? new Date(scheduledAt).getTime() : null;
  const isFutureScheduled = isScheduled && schedTime && schedTime > Date.now();
  const isPastScheduled = isScheduled && schedTime && schedTime <= Date.now();

  const currentActive = isFutureScheduled
    ? false
    : (typeof isActive === 'boolean'
      ? isActive
      : (status ? status === 'active' : true));

  // Initialize pickedDateTime from existing scheduledAt or default to +1 day 09:00 AM
  useEffect(() => {
    if (scheduledAt) {
      try {
        const d = new Date(scheduledAt);
        if (!isNaN(d.getTime())) {
          // Format as YYYY-MM-DDTHH:mm for datetime-local input
          const pad = (n) => String(n).padStart(2, '0');
          const localStr = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
          setPickedDateTime(localStr);
          return;
        }
      } catch (_) {}
    }
    // Default to tomorrow at 10:00 AM
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    const pad = (n) => String(n).padStart(2, '0');
    setPickedDateTime(`${tomorrow.getFullYear()}-${pad(tomorrow.getMonth() + 1)}-${pad(tomorrow.getDate())}T${pad(tomorrow.getHours())}:${pad(tomorrow.getMinutes())}`);
  }, [scheduledAt, isOpen]);

  // Close dropdown on click outside
  useEffect(() => {
    if (!isOpen) {
      setShowScheduleView(false);
      setScheduleError('');
      return;
    }

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setShowScheduleView(false);
        setScheduleError('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectStatus = (newStatus) => {
    if (disabled || !onChange) return;

    if (newStatus === 'scheduled') {
      setShowScheduleView(true);
      return;
    }

    setIsOpen(false);
    setShowScheduleView(false);
    const isAct = newStatus === 'active';
    onChange(newStatus, isAct, null);
  };

  const handleConfirmSchedule = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!pickedDateTime) {
      setScheduleError('Please pick a date & time');
      return;
    }

    const targetDate = new Date(pickedDateTime);
    if (isNaN(targetDate.getTime())) {
      setScheduleError('Invalid date format');
      return;
    }

    if (targetDate.getTime() <= Date.now()) {
      setScheduleError('Scheduled time must be in the future');
      return;
    }

    setScheduleError('');
    setIsOpen(false);
    setShowScheduleView(false);

    if (disabled || !onChange) return;
    onChange('scheduled', false, targetDate.toISOString());
  };

  const isSmall = size === 'sm';
  const formattedScheduledText = isScheduled && scheduledAt ? formatScheduledDate(scheduledAt) : '';

  // Button styling based on current state
  let btnBg = '#ecfdf5';
  let btnColor = '#059669';
  let btnBorder = '#a7f3d0';
  let dotBg = '#10b981';
  let btnText = 'Active';

  if (isFutureScheduled) {
    btnBg = '#fffbeb';
    btnColor = '#b45309';
    btnBorder = '#fde68a';
    dotBg = '#f59e0b';
    btnText = formattedScheduledText ? `Scheduled (${formattedScheduledText})` : 'Scheduled';
  } else if (!currentActive) {
    btnBg = '#fef2f2';
    btnColor = '#dc2626';
    btnBorder = '#fecaca';
    dotBg = '#ef4444';
    btnText = 'Inactive';
  } else if (isPastScheduled) {
    btnBg = '#ecfdf5';
    btnColor = '#059669';
    btnBorder = '#a7f3d0';
    dotBg = '#10b981';
    btnText = 'Active (Published)';
  }

  // Minimum date for datetime-local picker (current local time)
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const minDateTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;

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
          background: btnBg,
          color: btnColor,
          border: `1.5px solid ${btnBorder}`,
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
          userSelect: 'none',
          whiteSpace: 'nowrap'
        }}
        title={isFutureScheduled ? `Scheduled for auto-publishing at: ${formattedScheduledText}` : 'Click to change visibility status'}
      >
        {isFutureScheduled ? (
          <Clock style={{ width: isSmall ? '12px' : '13px', height: isSmall ? '12px' : '13px', color: '#d97706', flexShrink: 0 }} />
        ) : (
          <span
            style={{
              width: isSmall ? '8px' : '9px',
              height: isSmall ? '8px' : '9px',
              borderRadius: '50%',
              background: dotBg,
              flexShrink: 0
            }}
          />
        )}
        <span>{btnText}</span>
        <ChevronDown
          style={{
            width: isSmall ? '13px' : '14px',
            height: isSmall ? '13px' : '14px',
            marginLeft: '2px',
            opacity: 0.7,
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s ease',
            flexShrink: 0
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
            borderRadius: '14px',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 14px 32px rgba(15,23,42,0.18), 0 4px 10px rgba(0,0,0,0.08)',
            padding: showScheduleView ? '12px 14px' : '8px',
            minWidth: showScheduleView ? '300px' : '185px',
            maxWidth: '380px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}
        >
          {!showScheduleView ? (
            <>
              <div style={{ padding: '4px 8px 6px', borderBottom: '1px solid #f1f5f9', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Change Visibility
              </div>

              {/* Option 1: Active (Publish Now) */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSelectStatus('active');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: currentActive && !isFutureScheduled ? '#f0fdf4' : 'transparent',
                  color: '#059669',
                  fontSize: '12.5px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  transition: 'background 0.15s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#f0fdf4'; }}
                onMouseLeave={(e) => { if (!currentActive || isFutureScheduled) e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
                <span>Active (Publish Now)</span>
                {currentActive && !isFutureScheduled && <Check style={{ marginLeft: 'auto', width: '14px', height: '14px', color: '#10b981' }} />}
              </button>

              {/* Option 2: Inactive (Hide / Draft) */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSelectStatus('inactive');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: !currentActive && !isFutureScheduled ? '#fef2f2' : 'transparent',
                  color: '#dc2626',
                  fontSize: '12.5px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  transition: 'background 0.15s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#fef2f2'; }}
                onMouseLeave={(e) => { if (currentActive || isFutureScheduled) e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', flexShrink: 0 }} />
                <span>Inactive (Draft / Hidden)</span>
                {!currentActive && !isFutureScheduled && <Check style={{ marginLeft: 'auto', width: '14px', height: '14px', color: '#ef4444' }} />}
              </button>

              {/* Option 3: Schedule Auto-Publishing (HIDDEN when item is already Active) */}
              {(!currentActive || isFutureScheduled) && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSelectStatus('scheduled');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: isFutureScheduled ? '#fffbeb' : 'transparent',
                    color: '#b45309',
                    fontSize: '12.5px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#fffbeb'; }}
                  onMouseLeave={(e) => { if (!isFutureScheduled) e.currentTarget.style.background = 'transparent'; }}
                >
                  <Clock style={{ width: '13px', height: '13px', color: '#f59e0b', flexShrink: 0 }} />
                  <span>Schedule Publishing...</span>
                  {isFutureScheduled && <Check style={{ marginLeft: 'auto', width: '14px', height: '14px', color: '#b45309' }} />}
                </button>
              )}
            </>
          ) : (
            /* Subview: Set Schedule Date & Time */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowScheduleView(false);
                    setScheduleError('');
                  }}
                  style={{ background: 'none', border: 'none', padding: '2px', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}
                  title="Back"
                >
                  <ArrowLeft style={{ width: '15px', height: '15px' }} />
                </button>
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>
                  ⏰ Schedule Auto-Publish
                </span>
              </div>

              <p style={{ margin: 0, fontSize: '11.5px', color: '#64748b', lineHeight: 1.4 }}>
                Set exact date & time. It will automatically publish and go live without manual work:
              </p>

              <div>
                <WineraDateTimePicker
                  value={pickedDateTime}
                  minDate={minDateTime}
                  popupAlign={align === 'right' ? 'right' : 'left'}
                  onChange={(val) => {
                    setPickedDateTime(val);
                    if (scheduleError) setScheduleError('');
                  }}
                  onSave={(val) => {
                    if (!val) {
                      setScheduleError('Please pick a date & time');
                      return;
                    }
                    const targetDate = new Date(val);
                    if (isNaN(targetDate.getTime()) || targetDate.getTime() <= Date.now()) {
                      setScheduleError('Scheduled time must be in the future');
                      return;
                    }
                    setScheduleError('');
                    setIsOpen(false);
                    setShowScheduleView(false);
                    if (disabled || !onChange) return;
                    onChange('scheduled', false, targetDate.toISOString());
                  }}
                />
                {scheduleError && (
                  <span style={{ display: 'block', fontSize: '11px', color: '#dc2626', fontWeight: '700', marginTop: '4px' }}>
                    {scheduleError}
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '2px' }}>
                <button
                  type="button"
                  onClick={handleConfirmSchedule}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(16, 185, 129, 0.35)',
                    transition: 'opacity 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  💾 Save & Schedule
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowScheduleView(false);
                    setScheduleError('');
                  }}
                  style={{
                    background: '#f1f5f9',
                    color: '#475569',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
