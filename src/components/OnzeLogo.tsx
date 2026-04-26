import React from 'react';
import type { Tweaks } from '../types';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useLang } from '../context/LanguageContext';
import { translations } from '../translations';
import { BatikPattern, LogoMark, SectionLabel, sectionStyle, container, paragraphStyle, h2Style } from './ui';

export function OnzeLogo({ tweaks }: { tweaks: Tweaks }) {
  const { isMobile } = useBreakpoint();
  const { lang } = useLang();
  const t = translations[lang].logo;
  return (
    <section
      id="logo"
      style={{ ...sectionStyle, background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}
    >
      <BatikPattern color={tweaks.accent} opacity={0.06} motif="parang" secondary="#2E4A6B" />
      <div style={{ ...container, position: 'relative' }}>
        <SectionLabel num="02" label={t.sectionLabel} accent={tweaks.accent} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 40 : 80,
            alignItems: 'center',
            marginTop: 48,
          }}
        >
          <div
            style={{
              display: 'grid',
              placeItems: 'center',
              padding: isMobile ? 32 : 48,
              background: 'var(--surface-2)',
              border: '1px solid var(--line)',
              position: 'relative',
              overflow: 'hidden',
              minHeight: isMobile ? 260 : 480,
            } as React.CSSProperties}
          >
            <BatikPattern color={tweaks.accent} opacity={0.14} motif="truntum" secondary="#A83232" />
            <div style={{ position: 'relative' }}>
              <LogoMark size={isMobile ? 220 : 360} accent={tweaks.accent} variant="full" />
            </div>
          </div>
          <div>
            <h2 style={h2Style(tweaks.titleFont)}>
              {t.h2}
            </h2>
            <p style={{ ...paragraphStyle, marginTop: 28 }}>
              {t.p1pre}
              <em style={{ color: tweaks.accent, fontStyle: 'italic' }}>{t.p1em}</em>
              {t.p1post}
            </p>
            <p style={{ ...paragraphStyle, marginTop: 20 }}>
              {t.p2}
            </p>
            <blockquote
              style={{
                margin: '28px 0 0',
                padding: '20px 24px',
                borderLeft: `2px solid ${tweaks.accent}`,
                fontFamily: `'${tweaks.titleFont}', serif`,
                fontStyle: 'italic',
                fontSize: isMobile ? 17 : 20,
                lineHeight: 1.5,
                color: 'var(--text)',
              }}
            >
              {t.blockquote}
            </blockquote>
            <p style={{ ...paragraphStyle, marginTop: 28 }}>
              {t.symbolsPre1}
              <strong style={{ color: 'var(--text)', fontWeight: 500 }}>{t.symbolsTerm1}</strong>
              {t.symbolsMid1}
              <strong style={{ color: 'var(--text)', fontWeight: 500 }}>{t.symbolsTerm2}</strong>
              {t.symbolsMid2}
              <strong style={{ color: 'var(--text)', fontWeight: 500 }}>{t.symbolsTerm3}</strong>
              {t.symbolsEnd}
            </p>
            <ul style={{ marginTop: 32, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {t.listItems.map(([k, v]) => (
                <li
                  key={k}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '100px 1fr' : '160px 1fr',
                    gap: 16,
                    paddingBottom: 14,
                    borderBottom: '1px solid var(--line)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: tweaks.accent,
                    } as React.CSSProperties}
                  >
                    {k}
                  </span>
                  <span style={{ color: 'var(--text-dim)', fontSize: 14, lineHeight: 1.6 }}>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
