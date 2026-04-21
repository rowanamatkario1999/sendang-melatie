import React from 'react';
import type { Tweaks } from '../types';
import { BatikPattern, LogoMark, SectionLabel, sectionStyle, container, paragraphStyle, h2Style } from './ui';

export function OnzeLogo({ tweaks }: { tweaks: Tweaks }) {
  return (
    <section
      id="logo"
      style={{ ...sectionStyle, background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}
    >
      <BatikPattern color={tweaks.accent} opacity={0.06} motif="parang" secondary="#2E4A6B" />
      <div style={{ ...container, position: 'relative' }}>
        <SectionLabel num="02" label="Onze logo" accent={tweaks.accent} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'center',
            marginTop: 48,
          }}
        >
          <div
            style={{
              display: 'grid',
              placeItems: 'center',
              padding: 48,
              background: 'var(--surface-2)',
              border: '1px solid var(--line)',
              position: 'relative',
              overflow: 'hidden',
              minHeight: 480,
            } as React.CSSProperties}
          >
            <BatikPattern color={tweaks.accent} opacity={0.14} motif="truntum" secondary="#A83232" />
            <div style={{ position: 'relative' }}>
              <LogoMark size={360} accent={tweaks.accent} variant="full" />
            </div>
          </div>
          <div>
            <h2 style={h2Style(tweaks.titleFont)}>
              De betekenis achter <em style={{ color: tweaks.accent }}>het logo.</em>
            </h2>
            <p style={{ ...paragraphStyle, marginTop: 28 }}>
              De naam <em style={{ color: tweaks.accent, fontStyle: 'italic' }}>Krawitan Sendang Melatie</em> – 'Bron
              van Jasmijn' – symboliseert een plek waar talent kan bloeien en waar jonge spelers worden geïnspireerd om
              hun eigen klank te ontdekken, terwijl zij tegelijk verbonden blijven met de kennis en ervaring van oudere
              generaties.
            </p>
            <p style={{ ...paragraphStyle, marginTop: 20 }}>
              Zo vormt Krawitan Sendang Melatie een levende gemeenschap waarin muziek mensen verbindt en culturele
              identiteit zichtbaar en hoorbaar blijft, zowel lokaal als internationaal.
            </p>
            <blockquote
              style={{
                margin: '28px 0 0',
                padding: '20px 24px',
                borderLeft: `2px solid ${tweaks.accent}`,
                fontFamily: `'${tweaks.titleFont}', serif`,
                fontStyle: 'italic',
                fontSize: 20,
                lineHeight: 1.5,
                color: 'var(--text)',
              }}
            >
              "Het laten voortleven van de Surinaams-Javaanse gamelan door jongeren, voor jongeren, en met de
              gemeenschap."
            </blockquote>
            <p style={{ ...paragraphStyle, marginTop: 28 }}>
              De <strong style={{ color: 'var(--text)', fontWeight: 500 }}>gong</strong> symboliseert het hart van de
              gamelantraditie. De <strong style={{ color: 'var(--text)', fontWeight: 500 }}>golvende lijnen</strong>{' '}
              staan voor de voortdurende stroom van kennis tussen generaties en continenten. De{' '}
              <strong style={{ color: 'var(--text)', fontWeight: 500 }}>jasmijnbloem</strong> verbeeldt de jongeren die
              als nieuwe bloemen tot bloei komen.
            </p>
            <ul style={{ marginTop: 32, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                ['Gong', 'Het hart van de gamelantraditie'],
                ['Golvende lijnen', 'Stroom van kennis tussen generaties en continenten'],
                ['Jasmijnbloem', 'Jongeren die als nieuwe bloemen tot bloei komen'],
              ].map(([k, v]) => (
                <li
                  key={k}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '160px 1fr',
                    gap: 24,
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
