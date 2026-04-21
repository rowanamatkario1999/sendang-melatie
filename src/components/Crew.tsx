import React from 'react';
import type { Tweaks } from '../types';
import { BatikPattern, JasmineSprinkle, Placeholder, SectionLabel, sectionStyle, container, h2Style } from './ui';

export function Crew({ tweaks }: { tweaks: Tweaks }) {
  const crew = [
    'Rowan', 'Cherrolaine', 'Fano', 'Macy', 'Ferrino',
    'Donovan', 'Orlando', 'Marta', 'Bruce', 'Jermaine', 'Renell', 'Mitchell',
  ].map((name, i) => ({ name, role: `Speler ${i + 1}` }));

  return (
    <section id="crew" style={{ ...sectionStyle, position: 'relative', overflow: 'hidden' }}>
      <BatikPattern color={tweaks.accent} opacity={0.045} motif="ceplok" secondary="#2E4A6B" />
      <JasmineSprinkle
        items={[
          { top: '8%', left: '3%', size: 44, rotate: 36, opacity: 0.5 },
          { top: '55%', right: '2%', size: 58, rotate: -12, opacity: 0.55 },
        ]}
      />
      <div style={{ ...container, position: 'relative' }}>
        <SectionLabel num="03" label="The crew" accent={tweaks.accent} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: 80,
            marginTop: 48,
            alignItems: 'end',
          }}
        >
          <h2 style={h2Style(tweaks.titleFont)}>
            Mensen die de <em style={{ color: tweaks.accent }}>stichting</em> dragen.
          </h2>
          <div />
        </div>
        <div
          style={{
            marginTop: 64,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
          }}
        >
          {crew.map((p, i) => (
            <div key={p.name} style={{ position: 'relative' }}>
              <Placeholder label={`PORTRET ${String(i + 1).padStart(2, '0')}`} ratio="3/4" />
              <div style={{ paddingTop: 16 }}>
                <div
                  style={{
                    fontFamily: `'${tweaks.titleFont}', serif`,
                    fontSize: 22,
                    color: 'var(--text)',
                  }}
                >
                  {p.name}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: tweaks.accent,
                    marginTop: 4,
                  } as React.CSSProperties}
                >
                  {p.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
