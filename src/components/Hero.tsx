import React from 'react';
import type { Tweaks } from '../types';
import {
  BatikPattern,
  JasmineSprinkle,
  Placeholder,
  Rule,
  CTA,
  ScrollCue,
} from './ui';

function HeroBackdrop({ overlay, accent }: { overlay: number; accent: string }) {
  return (
    <>
      <Placeholder
        label="Hero foto – gamelan ensemble"
        ratio="auto"
        hideLabel
        style={{ position: 'absolute', inset: 0, aspectRatio: 'unset', height: '100%' } as React.CSSProperties}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, rgba(23,64,61,${overlay}) 0%, rgba(23,64,61,${Math.min(overlay + 0.25, 0.95)}) 100%)`,
        } as React.CSSProperties}
      />
      <BatikPattern color={accent} opacity={0.09} motif="kawung" secondary="#A83232" />
      <JasmineSprinkle
        items={[
          { top: '14%', left: '8%', size: 64, rotate: 18, opacity: 0.45 },
          { top: '62%', right: '12%', size: 46, rotate: -28, opacity: 0.4 },
          { bottom: '20%', left: '22%', size: 38, rotate: 52, opacity: 0.35 },
          { top: '30%', right: '30%', size: 30, rotate: 70, opacity: 0.3 },
        ]}
      />
    </>
  );
}

function HeroClassic({ tweaks }: { tweaks: Tweaks }) {
  const words = tweaks.headline.split(' ');
  return (
    <section
      id="top"
      style={{ position: 'relative', minHeight: '100vh', display: 'grid', placeItems: 'center', overflow: 'hidden' } as React.CSSProperties}
    >
      <HeroBackdrop overlay={tweaks.overlay} accent={tweaks.accent} />
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', maxWidth: 880 } as React.CSSProperties}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 28 }}>
          <Rule accent={tweaks.accent} />
          <span
            style={{
              fontSize: 11,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: tweaks.accent,
            } as React.CSSProperties}
          >
            {tweaks.eyebrow}
          </span>
          <Rule accent={tweaks.accent} />
        </div>
        <div
          style={{
            fontFamily: `'${tweaks.titleFont}', serif`,
            fontStyle: 'italic',
            fontSize: 'clamp(18px, 2vw, 26px)',
            fontWeight: 300,
            letterSpacing: '0.08em',
            color: tweaks.accent,
            marginBottom: 10,
            opacity: 0.85,
          }}
        >
          Krawitan
        </div>
        <h1
          style={{
            fontFamily: `'${tweaks.titleFont}', serif`,
            fontSize: 'clamp(56px, 9vw, 128px)',
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: '-0.01em',
            margin: '0 0 28px',
            color: 'var(--text)',
          }}
        >
          <em style={{ color: tweaks.accent, fontWeight: 300 }}>{words[0]}</em>
          {words.length > 1 && (
            <>
              <br />
              {words.slice(1).join(' ')}
            </>
          )}
        </h1>
        <p
          style={{
            fontSize: 20,
            lineHeight: 1.55,
            color: 'var(--text)',
            maxWidth: 640,
            margin: '0 auto 40px',
            fontWeight: 300,
            fontFamily: `'${tweaks.titleFont}', serif`,
            fontStyle: 'italic',
          }}
        >
          {tweaks.subheadline}
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <CTA primary accent={tweaks.accent}>
            Ontdek onze verhaal
          </CTA>
          <CTA accent={tweaks.accent}>Kom naar een event</CTA>
        </div>
      </div>
      <ScrollCue accent={tweaks.accent} />
    </section>
  );
}

function HeroAsymmetric({ tweaks }: { tweaks: Tweaks }) {
  const words = tweaks.headline.split(' ');
  return (
    <section id="top" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <HeroBackdrop overlay={tweaks.overlay} accent={tweaks.accent} />
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100vh',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          alignItems: 'end',
          gap: 40,
          padding: '0 64px 96px',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: tweaks.accent,
              marginBottom: 24,
            } as React.CSSProperties}
          >
            01 — {tweaks.eyebrow}
          </div>
          <div
            style={{
              fontFamily: `'${tweaks.titleFont}', serif`,
              fontStyle: 'italic',
              fontSize: 'clamp(18px, 1.6vw, 24px)',
              fontWeight: 300,
              letterSpacing: '0.08em',
              color: tweaks.accent,
              marginBottom: 10,
              opacity: 0.85,
            }}
          >
            Krawitan
          </div>
          <h1
            style={{
              fontFamily: `'${tweaks.titleFont}', serif`,
              fontSize: 'clamp(64px, 11vw, 160px)',
              fontWeight: 400,
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              margin: '0 0 32px',
              color: 'var(--text)',
            }}
          >
            {words.map((w, i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  paddingLeft: i * 48,
                  fontStyle: i === 1 ? 'italic' : 'normal',
                  color: i === 1 ? tweaks.accent : 'inherit',
                }}
              >
                {w}
              </span>
            ))}
          </h1>
        </div>
        <div style={{ paddingBottom: 20 }}>
          <div style={{ width: 60, height: 1, background: tweaks.accent, marginBottom: 24 }} />
          <p
            style={{
              fontSize: 22,
              lineHeight: 1.5,
              color: 'var(--text)',
              fontWeight: 300,
              marginBottom: 32,
              fontFamily: `'${tweaks.titleFont}', serif`,
              fontStyle: 'italic',
            }}
          >
            {tweaks.subheadline}
          </p>
          <CTA primary accent={tweaks.accent}>
            Maak kennis met ons
          </CTA>
        </div>
      </div>
    </section>
  );
}

function HeroEditorial({ tweaks }: { tweaks: Tweaks }) {
  const words = tweaks.headline.split(' ');
  return (
    <section
      id="top"
      style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', background: 'var(--bg)' }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            padding: '160px 72px 64px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: tweaks.accent,
              marginBottom: 32,
            } as React.CSSProperties}
          >
            {tweaks.eyebrow}
          </div>
          <div
            style={{
              fontFamily: `'${tweaks.titleFont}', serif`,
              fontStyle: 'italic',
              fontSize: 'clamp(18px, 1.6vw, 24px)',
              fontWeight: 300,
              letterSpacing: '0.08em',
              color: tweaks.accent,
              marginBottom: 10,
              opacity: 0.85,
            }}
          >
            Krawitan
          </div>
          <h1
            style={{
              fontFamily: `'${tweaks.titleFont}', serif`,
              fontSize: 'clamp(56px, 7vw, 104px)',
              fontWeight: 300,
              lineHeight: 1.02,
              letterSpacing: '-0.015em',
              margin: '0 0 32px',
              color: 'var(--text)',
            }}
          >
            {words[0]}
            {words.length > 1 && (
              <>
                <br />
                <em style={{ color: tweaks.accent }}>{words.slice(1).join(' ')}</em>
              </>
            )}
          </h1>
          <div style={{ width: 40, height: 1, background: 'var(--line)', margin: '0 0 32px' }} />
          <p
            style={{
              fontSize: 19,
              lineHeight: 1.55,
              color: 'var(--text)',
              fontWeight: 300,
              maxWidth: 480,
              marginBottom: 48,
              fontFamily: `'${tweaks.titleFont}', serif`,
              fontStyle: 'italic',
            }}
          >
            {tweaks.subheadline}
          </p>
          <div style={{ display: 'flex', gap: 40, fontSize: 13, color: 'var(--text-mute)' }}>
            <div>
              <div style={{ fontSize: 32, color: tweaks.accent, fontFamily: `'${tweaks.titleFont}', serif`, fontWeight: 400 }}>
                38
              </div>
              <div style={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: 10 } as React.CSSProperties}>
                Jaar gemeenschap
              </div>
            </div>
            <div>
              <div style={{ fontSize: 32, color: tweaks.accent, fontFamily: `'${tweaks.titleFont}', serif`, fontWeight: 400 }}>
                24
              </div>
              <div style={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: 10 } as React.CSSProperties}>
                Evenementen / jaar
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: 'relative', borderLeft: '1px solid var(--line)' }}>
          <Placeholder
            label="Portret / cultureel moment"
            ratio="auto"
            hideLabel
            style={{ position: 'absolute', inset: 0, height: '100%' } as React.CSSProperties}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(180deg, rgba(11,27,46,${tweaks.overlay * 0.6}) 0%, rgba(11,27,46,${tweaks.overlay}) 100%)`,
            } as React.CSSProperties}
          />
          <BatikPattern color={tweaks.accent} opacity={0.1} motif="parang" secondary="#A83232" />
        </div>
      </div>
    </section>
  );
}

export function Hero({ tweaks }: { tweaks: Tweaks }) {
  if (tweaks.variant === 'asymmetric') return <HeroAsymmetric tweaks={tweaks} />;
  if (tweaks.variant === 'editorial') return <HeroEditorial tweaks={tweaks} />;
  return <HeroClassic tweaks={tweaks} />;
}
