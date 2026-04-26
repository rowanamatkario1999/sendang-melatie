import React from 'react';
import type { Tweaks } from '../types';
import { NAV_ITEMS } from '../constants';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { LogoMark, BatikDivider } from './ui';

export function Footer({ tweaks }: { tweaks: Tweaks }) {
  const { isMobile } = useBreakpoint();
  return (
    <footer
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--line)',
        padding: `clamp(32px, 5vw, 56px) clamp(16px, 4vw, 48px) clamp(16px, 3vw, 32px)`,
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto 32px', display: 'flex', justifyContent: 'center', opacity: 0.5 }}>
        <BatikDivider color={tweaks.accent} width={220} />
      </div>
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr auto',
          gap: isMobile ? 24 : 40,
          alignItems: 'center',
          textAlign: isMobile ? 'center' : 'left',
        } as React.CSSProperties}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, justifyContent: isMobile ? 'center' : 'flex-start' }}>
          <LogoMark size={36} accent={tweaks.accent} />
          <span
            style={{
              fontFamily: `'${tweaks.titleFont}', serif`,
              fontSize: 18,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            } as React.CSSProperties}
          >
            Sendang Melatie
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? 16 : 28, flexWrap: 'wrap' }}>
          {NAV_ITEMS.map((i) => (
            <a
              key={i.label}
              href={i.href}
              style={{
                fontSize: 11,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--text-mute)',
              } as React.CSSProperties}
            >
              {i.label}
            </a>
          ))}
        </div>
        <div
          style={{
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-mute)',
          } as React.CSSProperties}
        >
          © 2026 · Stichting Sendang Melatie
        </div>
      </div>
      <div
        style={{
          maxWidth: 1280,
          margin: '32px auto 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          borderTop: '1px solid var(--line)',
          paddingTop: 24,
        }}
      >
        <span
          style={{
            fontSize: 10,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--text-mute)',
          } as React.CSSProperties}
        >
          Sponsored by
        </span>
        <img
          src="/assets/logo-sushi-by-sugi-light-v2.png"
          alt="Sushi by Sugi"
          style={{ height: 48, objectFit: 'contain' }}
        />
      </div>
    </footer>
  );
}
