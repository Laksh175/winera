import React from 'react';
import { Trash2, AlertCircle } from 'lucide-react';

/**
 * Common Reusable Confirmation Modal Component
 * Used across admin management, editor, and delete actions so
 * confirmation modal code does not need to be duplicated.
 */
export default function ConfirmModal({
  isOpen,
  modal,
  title,
  message,
  iconType = 'delete',
  confirmText,
  cancelText = 'Cancel',
  onConfirm,
  onClose
}) {
  const active = Boolean(isOpen || modal);
  if (!active) return null;

  const resolvedTitle = modal?.title || title || 'Are you sure?';
  const resolvedMessage = modal?.message || message || 'Are you sure you want to proceed? This action cannot be undone.';
  const resolvedIconType = modal?.iconType || iconType || 'delete';
  const isDelete = resolvedIconType === 'delete';
  const resolvedConfirmText = modal?.confirmText || confirmText || (isDelete ? 'Yes, Delete' : 'Confirm');
  const resolvedCancelText = modal?.cancelText || cancelText || 'Cancel';
  const resolvedOnConfirm = modal?.onConfirm || onConfirm;

  const handleConfirmClick = async (e) => {
    e?.stopPropagation?.();
    try {
      if (typeof resolvedOnConfirm === 'function') {
        await resolvedOnConfirm();
      }
    } finally {
      if (typeof onClose === 'function') {
        onClose();
      }
    }
  };

  const handleCancelClick = (e) => {
    e?.stopPropagation?.();
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleCancelClick(e);
        }
      }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <style>{`
        @keyframes modalPopIn {
          0% { transform: scale(0.9) translateY(10px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          maxWidth: '440px',
          width: '100%',
          padding: '32px 28px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #e2e8f0',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          animation: 'modalPopIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: isDelete ? '#fee2e2' : '#fef3c7',
            color: isDelete ? '#ef4444' : '#d97706',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '18px',
            boxShadow: isDelete ? '0 8px 20px rgba(239, 68, 68, 0.25)' : '0 8px 20px rgba(217, 119, 6, 0.25)'
          }}
        >
          {isDelete ? (
            <Trash2 style={{ width: '32px', height: '32px' }} />
          ) : (
            <AlertCircle style={{ width: '32px', height: '32px' }} />
          )}
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', margin: '0 0 8px' }}>
          {resolvedTitle}
        </h3>

        <p style={{ fontSize: '13.5px', color: '#64748b', margin: '0 0 24px', lineHeight: 1.55, fontWeight: '500' }}>
          {resolvedMessage}
        </p>

        <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
          <button
            type="button"
            onClick={handleCancelClick}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '12px',
              background: '#f1f5f9',
              border: '1.5px solid #cbd5e1',
              color: '#475569',
              fontWeight: '800',
              fontSize: '13.5px',
              cursor: 'pointer',
              transition: 'background 0.2s ease'
            }}
          >
            {resolvedCancelText}
          </button>
          <button
            type="button"
            onClick={handleConfirmClick}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '12px',
              background: isDelete
                ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                : 'linear-gradient(135deg, #f59e0b, #d97706)',
              border: 'none',
              color: '#ffffff',
              fontWeight: '900',
              fontSize: '13.5px',
              cursor: 'pointer',
              boxShadow: isDelete
                ? '0 4px 14px rgba(239, 68, 68, 0.4)'
                : '0 4px 14px rgba(245, 158, 11, 0.4)'
            }}
          >
            {resolvedConfirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
