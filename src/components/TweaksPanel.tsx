import React from 'react';
import type { Tweaks } from '../types';
import { FONT_OPTIONS, ACCENT_SWATCHES } from '../constants';

const VARIANT_LABELS: Record<Tweaks['variant'], string> = {
  classic: 'Klassiek',
  asymmetric: 'Asym',
  editorial: 'Editorial',
};

function TwkBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div
        style={{
          fontSize: 10,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--text-dim)',
          marginBottom: 8,
        } as React.CSSProperties}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

const inputStyle = (accent: string): React.CSSProperties => ({
  width: '100%',
  padding: '8px 10px',
  background: 'rgba(237,227,211,0.04)',
  border: '1px solid var(--line)',
  color: 'var(--text)',
  fontFamily: 'inherit',
  fontSize: 12,
  outline: 'none',
});

const tglBtn = (active: boolean, accent: string): React.CSSProperties => ({
  padding: '8px 6px',
  fontSize: 10,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  background: active ? accent : 'transparent',
  color: active ? '#0B1B2E' : 'var(--text-dim)',
  border: `1px solid ${active ? accent : 'var(--line)'}`,
  cursor: 'pointer',
  fontFamily: 'inherit',
});

export function TweaksPanel({
  visible,
  tweaks,
  setTweaks,
}: {
  visible: boolean;
  tweaks: Tweaks;
  setTweaks: (t: Tweaks) => void;
}) {
  if (!visible) return null;

  const set = (k: keyof Tweaks, v: Tweaks[keyof Tweaks]) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    try {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
    } catch {}
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 100,
        width: 320,
        maxHeight: 'calc(100vh - 48px)',
        overflowY: 'auto',
        background: 'rgba(11,27,46,0.96)',
        backdropFilter: 'blur(16px)',
        border: `1px solid ${tweaks.accent}`,
        padding: 24,
        color: 'var(--text)',
        fontFamily: 'Inter, sans-serif',
      } as React.CSSProperties}
    >
      <div
        style={{
          fontSize: 10,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: tweaks.accent,
          marginBottom: 20,
        } as React.CSSProperties}
      >
        Tweaks
      </div>

      <TwkBlock label="Variant">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
          {(['classic', 'asymmetric', 'editorial'] as const).map((k) => (
            <button key={k} onClick={() => set('variant', k)} style={tglBtn(tweaks.variant === k, tweaks.accent)}>
              {VARIANT_LABELS[k]}
            </button>
          ))}
        </div>
      </TwkBlock>

      <TwkBlock label="Accentkleur">
        <div style={{ display: 'flex', gap: 8 }}>
          {ACCENT_SWATCHES.map((c) => (
            <button
              key={c}
              onClick={() => set('accent', c)}
              style={{
                width: 28,
                height: 28,
                background: c,
                border: tweaks.accent === c ? '2px solid #EDE3D3' : '1px solid var(--line)',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </TwkBlock>

      <TwkBlock label="Titel-lettertype">
        <select
          value={tweaks.titleFont}
          onChange={(e) => set('titleFont', e.target.value)}
          style={inputStyle(tweaks.accent)}
        >
          {FONT_OPTIONS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </TwkBlock>

      <TwkBlock label="Headline tekst">
        <input
          value={tweaks.headline}
          onChange={(e) => set('headline', e.target.value)}
          style={inputStyle(tweaks.accent)}
        />
      </TwkBlock>

      <TwkBlock label="Eyebrow (boven titel)">
        <input
          value={tweaks.eyebrow}
          onChange={(e) => set('eyebrow', e.target.value)}
          style={inputStyle(tweaks.accent)}
        />
      </TwkBlock>

      <TwkBlock label="Slogan">
        <textarea
          rows={2}
          value={tweaks.subheadline}
          onChange={(e) => set('subheadline', e.target.value)}
          style={{ ...inputStyle(tweaks.accent), resize: 'vertical' }}
        />
      </TwkBlock>

      <TwkBlock label={`Overlay donkerte: ${Math.round(tweaks.overlay * 100)}%`}>
        <input
          type="range"
          min="0"
          max="0.95"
          step="0.05"
          value={tweaks.overlay}
          onChange={(e) => set('overlay', parseFloat(e.target.value))}
          style={{ width: '100%', accentColor: tweaks.accent } as React.CSSProperties}
        />
      </TwkBlock>

      <TwkBlock label="Navigatie layout">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {(['center', 'left'] as const).map((k) => (
            <button key={k} onClick={() => set('navLayout', k)} style={tglBtn(tweaks.navLayout === k, tweaks.accent)}>
              {k === 'center' ? 'Centraal' : 'Links'}
            </button>
          ))}
        </div>
      </TwkBlock>

      <TwkBlock label={`Logo grootte: ${tweaks.logoSize}px`}>
        <input
          type="range"
          min="40"
          max="160"
          step="4"
          value={tweaks.logoSize}
          onChange={(e) => set('logoSize', parseInt(e.target.value))}
          style={{ width: '100%', accentColor: tweaks.accent } as React.CSSProperties}
        />
      </TwkBlock>
    </div>
  );
}
