import React from 'react';
import type { Tweaks } from '../types';
import { NAV_ITEMS } from '../constants';
import { LogoMark } from './ui';

const listStyle: React.CSSProperties = {
  display: 'flex',
  gap: 28,
  listStyle: 'none',
  padding: 0,
  margin: 0,
  alignItems: 'center',
};

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <li>
      <a
        href={href}
        style={{
          fontSize: 12,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--text-dim)',
          transition: 'color 200ms',
          position: 'relative',
          padding: '6px 0',
        } as React.CSSProperties}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
      >
        {label}
      </a>
    </li>
  );
}

export function Nav({ tweaks, scrolled }: { tweaks: Tweaks; scrolled: boolean }) {
  const isCenter = tweaks.navLayout === 'center';
  const bigSize = Math.max(tweaks.logoSize * 2.4, 180);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: scrolled ? '14px 40px' : '24px 40px',
        background: scrolled ? 'rgba(23,64,61,0.92)' : 'rgba(23,64,61,0.35)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
        transition: 'all 280ms ease',
        display: 'grid',
        gridTemplateColumns: isCenter ? '1fr auto 1fr' : 'auto 1fr auto',
        alignItems: 'center',
        gap: 24,
        overflow: 'visible',
      } as React.CSSProperties}
    >
      {isCenter ? (
        <>
          <ul style={listStyle}>
            {NAV_ITEMS.slice(0, 3).map((i) => (
              <NavLink key={i.label} {...i} />
            ))}
          </ul>
          <a
            href="#top"
            style={{
              position: 'relative',
              width: bigSize * 0.6,
              height: scrolled ? tweaks.logoSize : 20,
              display: 'grid',
              placeItems: 'center',
              transition: 'height 280ms ease',
            } as React.CSSProperties}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: scrolled
                  ? `translate(-50%, -50%) scale(${tweaks.logoSize / bigSize})`
                  : 'translate(-50%, -10%)',
                transformOrigin: 'center center',
                transition: 'transform 280ms ease',
                width: bigSize,
                height: bigSize,
                pointerEvents: 'none',
              } as React.CSSProperties}
            >
              <LogoMark size={bigSize} accent={tweaks.accent} />
            </div>
          </a>
          <ul style={{ ...listStyle, justifyContent: 'flex-end' }}>
            {NAV_ITEMS.slice(3).map((i) => (
              <NavLink key={i.label} {...i} />
            ))}
          </ul>
        </>
      ) : (
        <>
          <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <LogoMark size={tweaks.logoSize} accent={tweaks.accent} />
            <span
              style={{
                fontFamily: `'${tweaks.titleFont}', serif`,
                fontSize: 20,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--text)',
              } as React.CSSProperties}
            >
              Sendang Melatie
            </span>
          </a>
          <ul style={{ ...listStyle, justifyContent: 'center' }}>
            {NAV_ITEMS.map((i) => (
              <NavLink key={i.label} {...i} />
            ))}
          </ul>
          <div />
        </>
      )}
    </nav>
  );
}
