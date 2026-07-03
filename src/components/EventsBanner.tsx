import React from 'react';
import type { Tweaks } from '../types';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useLang } from '../context/LanguageContext';
import { translations } from '../translations';

export const BANNER_HEIGHT = 44;

export function EventsBanner({
  tweaks,
  visible,
  onClose,
}: {
  tweaks: Tweaks;
  visible: boolean;
  onClose: () => void;
}) {
  const { isMobile } = useBreakpoint();
  const { lang } = useLang();
  const t = translations[lang].eventsBanner;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        height: visible ? BANNER_HEIGHT : 0,
        overflow: 'hidden',
        transition: 'height 260ms ease',
        background: `linear-gradient(120deg, ${tweaks.accent} 0%, #C9A04A 100%)`,
      } as React.CSSProperties}
    >
      <div
        style={{
          position: 'relative',
          height: BANNER_HEIGHT,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: isMobile ? 8 : 14,
          padding: `0 ${isMobile ? 40 : 48}px`,
        }}
      >
        <a
          href="#events"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? 6 : 12,
            textDecoration: 'none',
            color: '#17403D',
            minWidth: 0,
          }}
        >
          <span aria-hidden style={{ fontSize: 14, flexShrink: 0 }}>
            ✦
          </span>
          <span
            style={{
              fontFamily: `'${tweaks.titleFont}', serif`,
              fontSize: isMobile ? 13 : 15,
              whiteSpace: isMobile ? 'nowrap' : 'normal',
              overflow: isMobile ? 'hidden' : 'visible',
              textOverflow: isMobile ? 'ellipsis' : 'clip',
            }}
          >
            {t.text}
            <em style={{ fontStyle: 'italic', fontWeight: 300 }}>{t.textAccent}</em>
          </span>
          <span
            style={{
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              borderBottom: '1px solid rgba(23,64,61,0.5)',
              paddingBottom: 1,
            } as React.CSSProperties}
          >
            {t.cta}
            <span style={{ fontSize: 13 }}>→</span>
          </span>
        </a>
        <button
          onClick={onClose}
          aria-label="Sluiten"
          style={{
            position: 'absolute',
            right: isMobile ? 10 : 16,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#17403D',
            opacity: 0.65,
            padding: 8,
            lineHeight: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.65')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="4" x2="20" y2="20" />
            <line x1="20" y1="4" x2="4" y2="20" />
          </svg>
        </button>
      </div>
    </div>
  );
}
