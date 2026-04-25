import React from 'react';
import type { Tweaks } from '../types';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { BatikPattern, JasmineSprinkle, SectionLabel, sectionStyle, container, h2Style } from './ui';

const CREW_MEMBERS = [
  'Rowan | Peking', 'Cherrolaine | Demung', 'Stefano | Ketuk-Kenong / Backstage', 'Macy | Saron', 'Ferrino | Kendhang',
  'Donovan | Bonang Penerus', 'Orlando | Kendhang', 'Martha | Kethuk-Kenong', 'Bruce | Gong', 'Jermaine | Bonang Barung', 'Renell | Saron Wilahan Sanga', 'Mitchell | Saron/ Cameraman',
].map((entry) => { const [name, role] = entry.split(' | '); return { name, role }; });

const CREW_SPRINKLES = [
  { top: '8%', left: '3%', size: 44, rotate: 36, opacity: 0.5 },
  { top: '55%', right: '2%', size: 58, rotate: -12, opacity: 0.55 },
];

export function Crew({ tweaks }: { tweaks: Tweaks }) {
  const { isMobile } = useBreakpoint();
  return (
    <section id="crew" style={{ ...sectionStyle, position: 'relative', overflow: 'hidden' }}>
      <BatikPattern color={tweaks.accent} opacity={0.045} motif="ceplok" secondary="#2E4A6B" />
      <JasmineSprinkle items={CREW_SPRINKLES} />
      <div style={{ ...container, position: 'relative' }}>
        <SectionLabel num="03" label="The crew" accent={tweaks.accent} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr',
            gap: isMobile ? 16 : 80,
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
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: isMobile ? 16 : 24,
          }}
        >
          {CREW_MEMBERS.map((p) => (
            <div key={p.name} style={{ position: 'relative' }}>
              <img
                src="/assets/coming soon sendang melatie.png"
                alt={p.name}
                style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ paddingTop: 16 }}>
                <div
                  style={{
                    fontFamily: `'${tweaks.titleFont}', serif`,
                    fontSize: isMobile ? 18 : 22,
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
