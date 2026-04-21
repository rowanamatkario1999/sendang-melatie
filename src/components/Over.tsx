import React from 'react';
import type { Tweaks } from '../types';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { BatikPattern, JasmineSprinkle, SectionLabel, sectionStyle, container, paragraphStyle, h2Style } from './ui';

export function Over({ tweaks }: { tweaks: Tweaks }) {
  const { isMobile } = useBreakpoint();
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
        <SectionLabel num="01" label="Wie zijn wij" accent={tweaks.accent} />
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
              Een brug tussen <em style={{ color: tweaks.accent }}>Java</em> en Nederland.
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
              Jongeren Gamelangroep Sendang Melatie
            </div>
          </div>
          <div>
            <p style={paragraphStyle}>
              Krawitan Sendang Melatie is een jongeren-gamelangroep die staat voor vernieuwing vanuit traditie. De naam
              betekent <em style={{ color: tweaks.accent, fontStyle: 'italic' }}>'Bron van Jasmijn'</em> – een symbool
              voor zuiverheid, groei en nieuwe generaties die voortkomen uit de rijke Surinaams-Javaanse cultuur.
            </p>
            <p style={{ ...paragraphStyle, marginTop: 20 }}>
              Net zoals een bron voortdurend blijft stromen, is Krawitan Sendang Melatie een levende plek waar jongeren
              de klank, de waarden en de spirit van de gamelan leren kennen en verder ontwikkelen.
            </p>
            <p style={{ ...paragraphStyle, marginTop: 20 }}>
              Binnen de groep krijgen jongeren de ruimte om niet alleen traditionele gendhings te leren spelen, maar
              ook om samen nieuwe muzikale ideeën te ontdekken, terwijl respect voor de oudere kennisdragers centraal
              blijft staan.
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
              Zo vormt Krawitan Sendang Melatie een brug tussen verleden en toekomst: geworteld in erfgoed, gericht op
              ontwikkeling.
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
                { k: 'Taal', v: 'Nederlands / Javaans' },
                { k: 'Muziek', v: 'Gamelan ensemble' },
                { k: 'Erfgoed', v: 'Surinaams-Javaans' },
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
