import React, { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAY_NAMES = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function WineraDateTimePicker({
  value,
  onChange,
  onSave,
  minDate,
  disabled = false,
  placeholder = 'Select Date & Time...',
  popupAlign = 'left',
  style = {}
}) {
  const containerRef = useRef(null);
  const hourScrollRef = useRef(null);
  const minuteScrollRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // Parse initial value or fallback to tomorrow 10:00 AM
  const getInitialDate = () => {
    if (value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) return d;
    }
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(10, 0, 0, 0);
    return d;
  };

  const [selectedDate, setSelectedDate] = useState(getInitialDate);
  const [viewYear, setViewYear] = useState(() => getInitialDate().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => getInitialDate().getMonth());

  // Keep state in sync with external value prop
  useEffect(() => {
    if (value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        setSelectedDate(d);
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
      }
    }
  }, [value]);

  // Click outside listener to close popup
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Auto-scroll selected hour and minute into view when popup opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (hourScrollRef.current) {
          const selectedHourBtn = hourScrollRef.current.querySelector('[data-selected="true"]');
          if (selectedHourBtn) {
            selectedHourBtn.scrollIntoView({ block: 'center', behavior: 'smooth' });
          }
        }
        if (minuteScrollRef.current) {
          const selectedMinuteBtn = minuteScrollRef.current.querySelector('[data-selected="true"]');
          if (selectedMinuteBtn) {
            selectedMinuteBtn.scrollIntoView({ block: 'center', behavior: 'smooth' });
          }
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Helpers for time
  const currentHours24 = selectedDate.getHours();
  const currentMinutes = selectedDate.getMinutes();
  const isPM = currentHours24 >= 12;
  const currentHours12 = currentHours24 % 12 === 0 ? 12 : currentHours24 % 12;

  const minDateTime = minDate ? new Date(minDate).getTime() : Date.now();

  // Navigation
  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(y => y - 1);
    } else {
      setViewMonth(m => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(y => y + 1);
    } else {
      setViewMonth(m => m + 1);
    }
  };

  // Select day
  const handleSelectDay = (day) => {
    const updated = new Date(selectedDate);
    updated.setFullYear(viewYear);
    updated.setMonth(viewMonth);
    updated.setDate(day);
    setSelectedDate(updated);
    if (onChange) onChange(updated.toISOString());
  };

  // Change Hour (1-12)
  const handleSelectHour = (h12) => {
    const updated = new Date(selectedDate);
    let h24 = h12;
    if (isPM) {
      h24 = h12 === 12 ? 12 : h12 + 12;
    } else {
      h24 = h12 === 12 ? 0 : h12;
    }
    updated.setHours(h24);
    setSelectedDate(updated);
    if (onChange) onChange(updated.toISOString());
  };

  // Change Minute (0-59)
  const handleSelectMinute = (m) => {
    const updated = new Date(selectedDate);
    updated.setMinutes(m);
    setSelectedDate(updated);
    if (onChange) onChange(updated.toISOString());
  };

  // Change AM/PM
  const handleToggleAmPm = (toPm) => {
    const updated = new Date(selectedDate);
    let h24 = updated.getHours();
    if (toPm && h24 < 12) {
      h24 += 12;
    } else if (!toPm && h24 >= 12) {
      h24 -= 12;
    }
    updated.setHours(h24);
    setSelectedDate(updated);
    if (onChange) onChange(updated.toISOString());
  };

  // Handle Clear
  const handleClear = () => {
    if (onChange) onChange(null);
    setIsOpen(false);
  };

  // Handle Today
  const handleToday = () => {
    const now = new Date();
    // Default to +1 hour so it's not in the past
    now.setHours(now.getHours() + 1, 0, 0, 0);
    setSelectedDate(now);
    setViewYear(now.getFullYear());
    setViewMonth(now.getMonth());
    if (onChange) onChange(now.toISOString());
  };

  // Handle Save (closes the box and triggers onSave)
  const handleSaveAndClose = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const isoString = selectedDate.toISOString();
    if (onChange) onChange(isoString);
    if (onSave) onSave(isoString);
    setIsOpen(false);
  };

  // Format display text
  const formatDisplay = () => {
    if (!value) return '';
    try {
      const d = new Date(value);
      if (isNaN(d.getTime())) return '';
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      let hours = d.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      const strHours = String(hours).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      return `${day}/${month}/${year}, ${strHours}:${minutes} ${ampm}`;
    } catch (e) {
      return '';
    }
  };

  // Calendar matrix calculation
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const minutesList = Array.from({ length: 60 }, (_, i) => i);
  const hoursList = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      {/* Trigger Input Display Box */}
      <div
        onClick={() => {
          if (!disabled) setIsOpen(!isOpen);
        }}
        style={{
          width: '100%',
          padding: '10px 14px',
          borderRadius: '10px',
          border: '1.5px solid #fcd34d',
          background: '#ffffff',
          color: '#b45309',
          fontWeight: '700',
          fontSize: '13px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          userSelect: 'none',
          boxSizing: 'border-box',
          boxShadow: isOpen ? '0 0 0 3px rgba(2, 132, 199, 0.15)' : 'none',
          ...style
        }}
      >
        <span>{formatDisplay() || placeholder}</span>
        <CalendarIcon style={{ width: '16px', height: '16px', color: '#b45309', flexShrink: 0 }} />
      </div>

      {/* Pop-up Box (Matches screenshot layout with Save button inside) */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          ...(popupAlign === 'right' ? { right: 0 } : { left: 0 }),
          zIndex: 999999,
          background: '#ffffff',
          border: '1.5px solid #0f172a',
          borderRadius: '14px',
          boxShadow: '0 20px 45px rgba(0, 0, 0, 0.28)',
          padding: '16px',
          width: '420px',
          maxWidth: '94vw',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxSizing: 'border-box'
        }}>
          <style>{`
            .winera-time-col::-webkit-scrollbar {
              display: none !important;
              width: 0 !important;
              height: 0 !important;
            }
          `}</style>

          <div style={{ display: 'flex', gap: '16px' }}>
            {/* LEFT SIDE: CALENDAR */}
            <div style={{ flex: 1 }}>
              {/* Month/Year Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontWeight: '800', fontSize: '13.5px', color: '#0f172a' }}>
                  {MONTH_NAMES[viewMonth]} {viewYear}
                </span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    type="button"
                    onClick={prevMonth}
                    style={{ background: '#f1f5f9', border: 'none', borderRadius: '6px', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#334155' }}
                  >
                    <ChevronLeft style={{ width: '15px', height: '15px' }} />
                  </button>
                  <button
                    type="button"
                    onClick={nextMonth}
                    style={{ background: '#f1f5f9', border: 'none', borderRadius: '6px', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#334155' }}
                  >
                    <ChevronRight style={{ width: '15px', height: '15px' }} />
                  </button>
                </div>
              </div>

              {/* Day Headers (S M T W T F S) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '6px' }}>
                {DAY_NAMES.map((d, i) => (
                  <span key={i} style={{ fontSize: '11px', fontWeight: '800', color: '#64748b' }}>{d}</span>
                ))}
              </div>

              {/* Dates Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', textAlign: 'center' }}>
                {/* Prev Month Days */}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => {
                  const dayNum = daysInPrevMonth - firstDayOfMonth + i + 1;
                  return (
                    <span key={`prev-${i}`} style={{ padding: '6px 0', fontSize: '12px', color: '#cbd5e1' }}>
                      {dayNum}
                    </span>
                  );
                })}

                {/* Current Month Days */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const dateObj = new Date(viewYear, viewMonth, dayNum, 23, 59, 59);
                  const isPast = dateObj.getTime() < minDateTime - 86400000;
                  const isSelected = selectedDate.getFullYear() === viewYear &&
                    selectedDate.getMonth() === viewMonth &&
                    selectedDate.getDate() === dayNum;

                  return (
                    <button
                      key={`curr-${dayNum}`}
                      type="button"
                      disabled={isPast}
                      onClick={() => handleSelectDay(dayNum)}
                      style={{
                        padding: '6px 0',
                        fontSize: '12px',
                        fontWeight: isSelected ? '800' : '600',
                        background: isSelected ? '#0284c7' : 'transparent',
                        color: isSelected ? '#ffffff' : (isPast ? '#cbd5e1' : '#0f172a'),
                        border: 'none',
                        borderRadius: '6px',
                        cursor: isPast ? 'not-allowed' : 'pointer',
                        transition: 'all 0.1s ease'
                      }}
                    >
                      {dayNum}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT SIDE: TIME PICKER (Hours, Minutes, AM/PM) */}
            <div style={{ width: '150px', borderLeft: '1.5px solid #f1f5f9', paddingLeft: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* AM / PM Toggle */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => handleToggleAmPm(false)}
                  style={{
                    flex: 1,
                    padding: '6px 0',
                    fontSize: '11.5px',
                    fontWeight: '800',
                    borderRadius: '8px',
                    border: !isPM ? '1.5px solid #0284c7' : '1px solid #e2e8f0',
                    background: !isPM ? '#0284c7' : '#f8fafc',
                    color: !isPM ? '#ffffff' : '#475569',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  AM
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleAmPm(true)}
                  style={{
                    flex: 1,
                    padding: '6px 0',
                    fontSize: '11.5px',
                    fontWeight: '800',
                    borderRadius: '8px',
                    border: isPM ? '1.5px solid #0284c7' : '1px solid #e2e8f0',
                    background: isPM ? '#0284c7' : '#f8fafc',
                    color: isPM ? '#ffffff' : '#475569',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  PM
                </button>
              </div>

              {/* Hours & Minutes Side-by-Side Scroll Columns */}
              <div style={{ display: 'flex', gap: '8px', height: '185px' }}>
                {/* Hours column */}
                <div
                  ref={hourScrollRef}
                  className="winera-time-col"
                  style={{
                    flex: 1,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                  }}
                >
                  <div style={{
                    position: 'sticky',
                    top: 0,
                    background: '#ffffff',
                    zIndex: 10,
                    fontSize: '11px',
                    fontWeight: '800',
                    color: '#64748b',
                    textAlign: 'center',
                    padding: '2px 0 4px',
                    borderBottom: '1px solid #f1f5f9',
                    marginBottom: '2px'
                  }}>
                    HR
                  </div>
                  {hoursList.map(h => {
                    const isSelected = currentHours12 === h;
                    return (
                      <button
                        key={h}
                        type="button"
                        data-selected={isSelected}
                        onClick={() => handleSelectHour(h)}
                        style={{
                          padding: '5px 0',
                          fontSize: '12.5px',
                          fontWeight: isSelected ? '800' : '600',
                          borderRadius: '8px',
                          border: isSelected ? '1.5px solid #0284c7' : 'none',
                          background: isSelected ? '#0284c7' : 'transparent',
                          color: isSelected ? '#ffffff' : '#1e293b',
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'all 0.1s ease',
                          flexShrink: 0
                        }}
                      >
                        {String(h).padStart(2, '0')}
                      </button>
                    );
                  })}
                </div>

                {/* Minutes column */}
                <div
                  ref={minuteScrollRef}
                  className="winera-time-col"
                  style={{
                    flex: 1,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                  }}
                >
                  <div style={{
                    position: 'sticky',
                    top: 0,
                    background: '#ffffff',
                    zIndex: 10,
                    fontSize: '11px',
                    fontWeight: '800',
                    color: '#64748b',
                    textAlign: 'center',
                    padding: '2px 0 4px',
                    borderBottom: '1px solid #f1f5f9',
                    marginBottom: '2px'
                  }}>
                    MIN
                  </div>
                  {minutesList.map(m => {
                    const isSelected = currentMinutes === m;
                    return (
                      <button
                        key={m}
                        type="button"
                        data-selected={isSelected}
                        onClick={() => handleSelectMinute(m)}
                        style={{
                          padding: '5px 0',
                          fontSize: '12.5px',
                          fontWeight: isSelected ? '800' : '600',
                          borderRadius: '8px',
                          border: isSelected ? '1.5px solid #0284c7' : 'none',
                          background: isSelected ? '#0284c7' : 'transparent',
                          color: isSelected ? '#ffffff' : '#1e293b',
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'all 0.1s ease',
                          flexShrink: 0
                        }}
                      >
                        {String(m).padStart(2, '0')}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM ACTIONS BAR WITH DIRECT SAVE BUTTON */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #e2e8f0',
            paddingTop: '10px',
            marginTop: '2px'
          }}>
            <button
              type="button"
              onClick={handleClear}
              style={{ background: 'none', border: 'none', color: '#0284c7', fontSize: '12.5px', fontWeight: '700', cursor: 'pointer', padding: 0 }}
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleToday}
              style={{ background: 'none', border: 'none', color: '#0284c7', fontSize: '12.5px', fontWeight: '700', cursor: 'pointer', padding: 0 }}
            >
              Today
            </button>
            {/* DIRECT SAVE BUTTON INSIDE THE BOX */}
            <button
              type="button"
              onClick={handleSaveAndClose}
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: '#ffffff',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.35)'
              }}
            >
              <Check style={{ width: '13px', height: '13px' }} />
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
