import React, { useState } from 'react';

export default function WhatsAppFloat({ whatsAppUrl }) {
  const [isHovered, setIsHovered] = useState(false);
  const targetUrl = whatsAppUrl || 'https://wa.me/919428989488';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}
    >
      <style>{`
        @keyframes wineraWaPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6), 0 10px 25px rgba(37, 211, 102, 0.35);
          }
          70% {
            box-shadow: 0 0 0 16px rgba(37, 211, 102, 0), 0 10px 25px rgba(37, 211, 102, 0.35);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0), 0 10px 25px rgba(37, 211, 102, 0.35);
          }
        }

        .winera-wa-float-btn {
          animation: wineraWaPulse 2.4s infinite;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .winera-wa-float-btn:hover {
          transform: scale(1.1) rotate(5deg);
        }

        @media (max-width: 640px) {
          .winera-wa-float-container {
            bottom: 20px !important;
            right: 20px !important;
          }
          .winera-wa-float-tooltip {
            display: none !important;
          }
        }
      `}</style>

      {/* Tooltip badge */}
      <div
        className="winera-wa-float-tooltip"
        style={{
          background: '#0f172a',
          color: '#ffffff',
          padding: '8px 14px',
          borderRadius: '12px',
          fontSize: '13px',
          fontWeight: '700',
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
          border: '1px solid rgba(255,255,255,0.1)',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          opacity: isHovered ? 1 : 0.85,
          transform: isHovered ? 'translateX(0)' : 'translateX(4px)',
          transition: 'all 0.25s ease'
        }}
      >
        Chat with Us 👋
      </div>

      {/* Floating WhatsApp Action Button */}
      <a
        href={targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Winera International on WhatsApp"
        title="Chat with Winera International on WhatsApp"
        className="winera-wa-float-btn"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          textDecoration: 'none',
          cursor: 'pointer'
        }}
      >
        {/* WhatsApp Official SVG Icon */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}
        >
          <path
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662a11.87 11.87 0 005.707 1.456h.005c6.554 0 11.889-5.335 11.893-11.893 0-3.177-1.238-6.164-3.487-8.412"
            fill="currentColor"
          />
        </svg>
      </a>
    </div>
  );
}
