import React from 'react';
import type { Tweaks } from '../types';
import { BatikPattern, JasmineSprinkle, SectionLabel, sectionStyle, container, paragraphStyle, h2Style } from './ui';

export function Events({ tweaks }: { tweaks: Tweaks }) {
  const events = [
    { date: '17 MEI', title: 'Gamelan-avond', loc: 'Cultureel Centrum Den Haag', tag: 'Muziek' },
    { date: '22 JUN', title: 'Pasar Malam Sendang', loc: 'Zuiderpark, Rotterdam', tag: 'Festival' },
    { date: '14 SEP', title: 'Wayang Kulit voorstelling', loc: 'Theater De Vaillant', tag: 'Theater' },
    { date: '19 OKT', title: 'Basa Jawa workshop', loc: 'Stichtingshuis, Utrecht', tag: 'Taal' },
  ];

  return (
    <section
      id="events"
      style={{ ...sectionStyle, background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}
    >
      <BatikPattern color={tweaks.accent} opacity={0.065} motif="kawung" secondary="#8B4513" />
      <JasmineSprinkle
        items={[
          { top: '20%', right: '8%', size: 40, rotate: -30, opacity: 0.45 },
          { bottom: '10%', left: '12%', size: 48, rotate: 55, opacity: 0.5 },
        ]}
      />
      <div style={{ ...container, position: 'relative' }}>
        <SectionLabel num="04" label="Evenementen" accent={tweaks.accent} />
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
            Kom erbij, <em style={{ color: tweaks.accent }}>proef mee</em>.
          </h2>
          <p style={paragraphStyle}>
            Van intieme gamelan-avonden tot het jaarlijkse Pasar Malam – onze agenda staat open voor iedereen.
          </p>
        </div>
        <div style={{ marginTop: 64, borderTop: '1px solid var(--line)' }}>
          {events.map((e) => (
            <a
              key={e.title}
              href="#contact"
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr 1fr auto',
                gap: 40,
                alignItems: 'center',
                padding: '32px 0',
                borderBottom: '1px solid var(--line)',
                transition: 'padding-left 200ms',
              } as React.CSSProperties}
              onMouseEnter={(ev) => (ev.currentTarget.style.paddingLeft = '16px')}
              onMouseLeave={(ev) => (ev.currentTarget.style.paddingLeft = '0')}
            >
              <div
                style={{
                  fontSize: 13,
                  letterSpacing: '0.2em',
                  color: tweaks.accent,
                  fontWeight: 500,
                } as React.CSSProperties}
              >
                {e.date}
              </div>
              <div style={{ fontFamily: `'${tweaks.titleFont}', serif`, fontSize: 30, color: 'var(--text)' }}>
                {e.title}
              </div>
              <div style={{ color: 'var(--text-dim)', fontSize: 14 }}>{e.loc}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color: 'var(--text-mute)',
                    padding: '6px 10px',
                    border: '1px solid var(--line)',
                  } as React.CSSProperties}
                >
                  {e.tag}
                </span>
                <span style={{ color: tweaks.accent, fontSize: 20 }}>→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
