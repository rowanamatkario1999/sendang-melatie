import React from 'react';
import type { Tweaks } from '../types';
import { NAV_ITEMS } from '../constants';
import { LogoMark, BatikDivider } from './ui';

export function Footer({ tweaks }: { tweaks: Tweaks }) {
  return (
    <footer
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--line)',
        padding: '56px 48px 32px',
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
          gridTemplateColumns: 'auto 1fr auto',
          gap: 40,
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
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
        <div style={{ display: 'flex', justifyContent: 'center', gap: 28 }}>
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
    </footer>
  );
}
