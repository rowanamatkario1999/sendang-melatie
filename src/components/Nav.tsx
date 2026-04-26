import React, { useState } from 'react';
import type { Tweaks } from '../types';
import { LogoMark } from './ui';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useLang, type Lang } from '../context/LanguageContext';
import { translations } from '../translations';

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

const FLAGS: { lang: Lang; flag: string; title: string }[] = [
  { lang: 'nl', flag: '🇳🇱', title: 'Nederlands' },
  { lang: 'en', flag: '🇬🇧', title: 'English' },
  { lang: 'jv', flag: '🇮🇩', title: 'Basa Jawa' },
];

function LangToggle(_: { accent: string }) {
  const { lang, setLang } = useLang();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {FLAGS.map(({ lang: l, flag, title }, i) => (
        <React.Fragment key={l}>
          {i > 0 && (
            <span style={{ color: 'var(--text-mute)', fontSize: 10, userSelect: 'none' }}>|</span>
          )}
          <button
            onClick={() => setLang(l)}
            title={title}
            style={{
              background: 'none',
              border: 'none',
              padding: '2px 4px',
              cursor: lang === l ? 'default' : 'pointer',
              fontSize: 20,
              lineHeight: 1,
              opacity: lang === l ? 1 : 0.35,
              transition: 'opacity 200ms',
            } as React.CSSProperties}
            onMouseEnter={(e) => { if (lang !== l) e.currentTarget.style.opacity = '0.7'; }}
            onMouseLeave={(e) => { if (lang !== l) e.currentTarget.style.opacity = '0.35'; }}
          >
            {flag}
          </button>
        </React.Fragment>
      ))}
    </div>
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
  const { lang } = useLang();
  const t = translations[lang];
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <LangToggle accent={tweaks.accent} />
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Sluit menu' : 'Open menu'}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: 'var(--text)', lineHeight: 0 }}
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
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
              {t.nav.map((i) => (
                <NavLink key={i.href} {...i} onClick={() => setMenuOpen(false)} />
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
            {t.nav.slice(0, 3).map((i) => (
              <NavLink key={i.href} {...i} />
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
            {t.nav.slice(3).map((i) => (
              <NavLink key={i.href} {...i} />
            ))}
            <li>
              <LangToggle accent={tweaks.accent} />
            </li>
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
            {t.nav.map((i) => (
              <NavLink key={i.href} {...i} />
            ))}
          </ul>
          <LangToggle accent={tweaks.accent} />
        </>
      )}
    </nav>
  );
}
