import React from 'react';
import type { Tweaks } from '../types';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useLang } from '../context/LanguageContext';
import { translations } from '../translations';
import { BatikPattern, JasmineSprinkle, SectionLabel, sectionStyle, container, h2Style } from './ui';

const TILES = [
  { label: "PASAR MALAM '25", ratio: '4/5', span: 1, src: '/assets/image00010.jpeg' },
  { label: 'GAMELAN REPETITIE', ratio: '1/1', span: 1, src: '/assets/image00024.jpeg' },
  { label: 'WAYANG KULIT', ratio: '3/4', span: 1, src: '/assets/image00009.jpeg' },
  { label: 'DANSGROEP', ratio: '16/11', span: 2, src: '/assets/image00004.jpeg' },
  { label: 'WORKSHOP BASA JAWA', ratio: '4/5', span: 1, src: '/assets/image00019.jpeg' },
];

export function Media({ tweaks }: { tweaks: Tweaks }) {
  const { isMobile } = useBreakpoint();
  const { lang } = useLang();
  const t = translations[lang].media;
  return (
    <section id="media" style={{ ...sectionStyle, position: 'relative', overflow: 'hidden' }}>
      <BatikPattern color={tweaks.accent} opacity={0.05} motif="parang" secondary="#A83232" />
      <JasmineSprinkle
        items={[
          { top: '15%', left: '6%', size: 56, rotate: 8, opacity: 0.5 },
          { bottom: '25%', right: '5%', size: 36, rotate: -40, opacity: 0.45 },
        ]}
      />
      <div style={{ ...container, position: 'relative' }}>
        <SectionLabel num="05" label={t.sectionLabel} accent={tweaks.accent} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 16 : 80,
            marginTop: 48,
            alignItems: 'end',
          }}
        >
          <h2 style={h2Style(tweaks.titleFont)}>
            {t.h2}
            <em style={{ color: tweaks.accent }}>{t.h2Accent}</em>
            {t.h2End}
          </h2>
          <a
            href="#"
            style={{
              justifySelf: isMobile ? 'start' : 'end',
              fontSize: 11,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: tweaks.accent,
              borderBottom: `1px solid ${tweaks.accent}`,
              paddingBottom: 4,
            } as React.CSSProperties}
          >
            {t.gallery}
          </a>
        </div>
        <div
          style={{
            marginTop: 64,
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: 16,
          }}
        >
          {TILES.map((tile, i) => (
            <div key={i} style={{ gridColumn: !isMobile && tile.span === 2 ? 'span 2' : 'span 1' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: tile.ratio,
                  overflow: 'hidden',
                  border: '1px solid rgba(246,237,217,0.10)',
                }}
              >
                <img
                  src={tile.src}
                  alt={tile.label}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
