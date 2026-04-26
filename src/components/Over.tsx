import React from 'react';
import type { Tweaks } from '../types';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useLang } from '../context/LanguageContext';
import { translations } from '../translations';
import { BatikPattern, JasmineSprinkle, SectionLabel, sectionStyle, container, paragraphStyle, h2Style } from './ui';

export function Over({ tweaks }: { tweaks: Tweaks }) {
  const { isMobile } = useBreakpoint();
  const { lang } = useLang();
  const t = translations[lang].over;
  return (
    <section id="over" style={{ ...sectionStyle, position: 'relative', overflow: 'hidden' }}>
      <BatikPattern color={tweaks.accent} opacity={0.05} motif="kawung" secondary="#8B4513" />
      <JasmineSprinkle
        items={[
          { top: '12%', right: '6%', size: 52, rotate: 18, opacity: 0.55 },
          { bottom: '18%', left: '4%', size: 36, rotate: -24, opacity: 0.4 },
        ]}
      />
      <div style={{ ...container, position: 'relative' }}>
        <SectionLabel num="01" label={t.sectionLabel} accent={tweaks.accent} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr',
            gap: isMobile ? 32 : 80,
            alignItems: 'start',
            marginTop: 48,
          }}
        >
          <div>
            <h2 style={h2Style(tweaks.titleFont)}>
              {t.h2Part1}
              <em style={{ color: tweaks.accent }}>{t.h2Accent}</em>
              {t.h2Part2}
            </h2>
            <div
              style={{
                marginTop: 20,
                fontSize: 13,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: tweaks.accent,
              } as React.CSSProperties}
            >
              {t.subtitle}
            </div>
          </div>
          <div>
            <p style={paragraphStyle}>
              {t.p1pre}
              <em style={{ color: tweaks.accent, fontStyle: 'italic' }}>{t.p1em}</em>
              {t.p1post}
            </p>
            <p style={{ ...paragraphStyle, marginTop: 20 }}>
              {t.p2}
            </p>
            <p style={{ ...paragraphStyle, marginTop: 20 }}>
              {t.p3}
            </p>
            <p
              style={{
                ...paragraphStyle,
                marginTop: 20,
                color: 'var(--text)',
                fontStyle: 'italic',
                fontFamily: `'${tweaks.titleFont}', serif`,
                fontSize: 19,
                lineHeight: 1.55,
              }}
            >
              {t.quote}
            </p>
            <div
              style={{
                marginTop: 40,
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gap: 24,
                paddingTop: 32,
                borderTop: '1px solid var(--line)',
              }}
            >
              {[
                { k: t.stat1k, v: t.stat1v },
                { k: t.stat2k, v: t.stat2v },
                { k: t.stat3k, v: t.stat3v },
              ].map((p) => (
                <div key={p.k}>
                  <div
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      color: 'var(--text-mute)',
                      marginBottom: 6,
                    } as React.CSSProperties}
                  >
                    {p.k}
                  </div>
                  <div style={{ fontSize: 15, color: 'var(--text)' }}>{p.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
