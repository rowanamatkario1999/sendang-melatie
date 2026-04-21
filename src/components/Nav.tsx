import React, { useState } from 'react';
import type { Tweaks } from '../types';
import { NAV_ITEMS } from '../constants';
import { LogoMark } from './ui';
import { useBreakpoint } from '../hooks/useBreakpoint';

const listStyle: React.CSSProperties = {
  display: 'flex',
  gap: 28,
  listStyle: 'none',
  padding: 0,
  margin: 0,
  alignItems: 'center',
};

function NavLink({ label, href, onClick }: { label: string; href: string; onClick?: () => void }) {
  return (
    <li>
      <a
        href={href}
        onClick={onClick}
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

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      {open ? (
        <>
          <line x1="4" y1="4" x2="20" y2="20" />
          <line x1="20" y1="4" x2="4" y2="20" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      )}
    </svg>
  );
}

export function Nav({ tweaks, scrolled }: { tweaks: Tweaks; scrolled: boolean }) {
  const { isMobile } = useBreakpoint();
  const [menuOpen, setMenuOpen] = useState(false);
  const isCenter = tweaks.navLayout === 'center';
  const bigSize = Math.max(tweaks.logoSize * 2.4, 180);
  const hPad = 'clamp(16px, 4vw, 40px)';

  if (isMobile) {
    return (
      <>
        <nav
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            padding: `${scrolled ? '14px' : '18px'} ${hPad}`,
            background: scrolled || menuOpen ? 'rgba(23,64,61,0.96)' : 'rgba(23,64,61,0.35)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderBottom: scrolled || menuOpen ? '1px solid var(--line)' : '1px solid transparent',
            transition: 'all 280ms ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          } as React.CSSProperties}
        >
          <a href="#top" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <LogoMark size={32} accent={tweaks.accent} />
            <span
              style={{
                fontFamily: `'${tweaks.titleFont}', serif`,
                fontSize: 16,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--text)',
              } as React.CSSProperties}
            >
              Sendang Melatie
            </span>
          </a>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Sluit menu' : 'Open menu'}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: 'var(--text)', lineHeight: 0 }}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </nav>

        {menuOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 49,
              background: 'rgba(23,64,61,0.97)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            } as React.CSSProperties}
          >
            <ul style={{ ...listStyle, flexDirection: 'column', gap: 36, textAlign: 'center' }}>
              {NAV_ITEMS.map((i) => (
                <NavLink key={i.label} {...i} onClick={() => setMenuOpen(false)} />
              ))}
            </ul>
          </div>
        )}
      </>
    );
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: scrolled ? `14px ${hPad}` : `24px ${hPad}`,
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
