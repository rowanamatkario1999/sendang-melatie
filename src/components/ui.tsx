import React, { useState } from 'react';
import { BATIK_COLORS } from '../constants';

// ─── Types ────────────────────────────────────────────────────
type BatikMotif = 'ceplok' | 'kawung' | 'parang' | 'truntum';

export interface SprinkleItem {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size?: number;
  rotate?: number;
  opacity?: number;
}

// ─── BatikPattern ─────────────────────────────────────────────
export function BatikPattern({
  color = '#C08451',
  secondary,
  opacity = 0.08,
  motif = 'ceplok',
}: {
  color?: string;
  secondary?: string;
  opacity?: number;
  motif?: BatikMotif;
}) {
  const c2 = secondary || BATIK_COLORS.sogan;
  const uid = `${motif}-${(color + c2).replace(/[^a-z0-9]/gi, '')}`;

  const patterns: Record<BatikMotif, React.ReactNode> = {
    ceplok: (
      <pattern id={`batik-${uid}`} x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
        <circle cx="60" cy="60" r="34" fill="none" stroke={color} strokeWidth="0.8" />
        <circle cx="60" cy="60" r="18" fill="none" stroke={c2} strokeWidth="0.6" />
        <circle cx="60" cy="60" r="3" fill={c2} />
        <circle cx="0" cy="0" r="6" fill={color} />
        <circle cx="120" cy="0" r="6" fill={color} />
        <circle cx="0" cy="120" r="6" fill={color} />
        <circle cx="120" cy="120" r="6" fill={color} />
        <path d="M 0 60 Q 30 40 60 60 T 120 60" fill="none" stroke={c2} strokeWidth="0.5" />
      </pattern>
    ),
    kawung: (
      <pattern id={`batik-${uid}`} x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <ellipse cx="20" cy="20" rx="16" ry="22" fill="none" stroke={color} strokeWidth="0.7" />
        <ellipse cx="60" cy="20" rx="16" ry="22" fill="none" stroke={c2} strokeWidth="0.7" />
        <ellipse cx="20" cy="60" rx="16" ry="22" fill="none" stroke={c2} strokeWidth="0.7" />
        <ellipse cx="60" cy="60" rx="16" ry="22" fill="none" stroke={color} strokeWidth="0.7" />
        <circle cx="20" cy="20" r="2" fill={color} />
        <circle cx="60" cy="20" r="2" fill={c2} />
        <circle cx="20" cy="60" r="2" fill={c2} />
        <circle cx="60" cy="60" r="2" fill={color} />
      </pattern>
    ),
    parang: (
      <pattern id={`batik-${uid}`} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <path d="M 0 15 Q 15 5 30 15 T 60 15" fill="none" stroke={color} strokeWidth="1" />
        <path d="M 0 35 Q 15 25 30 35 T 60 35" fill="none" stroke={c2} strokeWidth="1" />
        <circle cx="15" cy="15" r="1.4" fill={color} />
        <circle cx="45" cy="15" r="1.4" fill={c2} />
        <circle cx="15" cy="35" r="1.4" fill={c2} />
        <circle cx="45" cy="35" r="1.4" fill={color} />
      </pattern>
    ),
    truntum: (
      <pattern id={`batik-${uid}`} x="0" y="0" width="70" height="70" patternUnits="userSpaceOnUse">
        <g fill="none" strokeWidth="0.7">
          <path d="M 35 20 L 38 32 L 50 35 L 38 38 L 35 50 L 32 38 L 20 35 L 32 32 Z" stroke={color} />
          <circle cx="35" cy="35" r="2.5" fill={c2} stroke="none" />
          <circle cx="0" cy="0" r="2" fill={color} stroke="none" />
          <circle cx="70" cy="0" r="2" fill={color} stroke="none" />
          <circle cx="0" cy="70" r="2" fill={color} stroke="none" />
          <circle cx="70" cy="70" r="2" fill={color} stroke="none" />
        </g>
      </pattern>
    ),
  };

  return (
    <svg
      width="100%"
      height="100%"
      style={{ position: 'absolute', inset: 0, opacity, pointerEvents: 'none' } as React.CSSProperties}
      aria-hidden
    >
      <defs>{patterns[motif]}</defs>
      <rect width="100%" height="100%" fill={`url(#batik-${uid})`} />
    </svg>
  );
}

// ─── BatikDivider ─────────────────────────────────────────────
export function BatikDivider({ color, width = 180, accent2 }: { color: string; width?: number; accent2?: string }) {
  const red = accent2 || BATIK_COLORS.mengkudu;
  return (
    <svg width={width} height="18" viewBox="0 0 180 18" aria-hidden style={{ display: 'block' }}>
      <g fill="none" stroke={color} strokeWidth="1">
        <line x1="0" y1="9" x2="60" y2="9" />
        <line x1="120" y1="9" x2="180" y2="9" />
        <circle cx="72" cy="9" r="2" fill={color} />
        <circle cx="108" cy="9" r="2" fill={color} />
        <path d="M 82 9 Q 86 3 90 9 T 98 9" />
        <path d="M 82 9 Q 86 15 90 9 T 98 9" />
        <circle cx="90" cy="9" r="3" fill="none" />
      </g>
      <circle cx="90" cy="9" r="1.2" fill={red} />
    </svg>
  );
}

// ─── Jasmine ──────────────────────────────────────────────────
export function Jasmine({
  size = 48,
  petalColor = '#FBF4E6',
  centerColor = '#E5B769',
  opacity = 1,
  rotate = 0,
  style,
}: {
  size?: number;
  petalColor?: string;
  centerColor?: string;
  opacity?: number;
  rotate?: number;
  style?: React.CSSProperties;
}) {
  const petals = [0, 72, 144, 216, 288];
  return (
    <svg
      width={size}
      height={size}
      viewBox="-50 -50 100 100"
      aria-hidden
      style={{ display: 'block', opacity, transform: `rotate(${rotate}deg)`, ...style }}
    >
      {petals.map((deg) => (
        <g key={deg} transform={`rotate(${deg})`}>
          <path
            d="M 0 -6 C -14 -14, -18 -32, 0 -40 C 18 -32, 14 -14, 0 -6 Z"
            fill={petalColor}
            opacity="0.95"
          />
          <path
            d="M 0 -10 C -6 -18, -6 -28, 0 -36"
            fill="none"
            stroke={centerColor}
            strokeWidth="0.6"
            opacity="0.4"
          />
        </g>
      ))}
      <circle r="5" fill={centerColor} />
      <circle r="2" fill={petalColor} />
    </svg>
  );
}

// ─── JasmineSprinkle ──────────────────────────────────────────
export function JasmineSprinkle({ items }: { items: SprinkleItem[] }) {
  return (
    <div
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' } as React.CSSProperties}
      aria-hidden
    >
      {items.map((it, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: it.top,
            left: it.left,
            right: it.right,
            bottom: it.bottom,
            animation: `jasmine-float ${8 + (i % 4) * 2}s ease-in-out ${i * 0.6}s infinite alternate`,
          }}
        >
          <Jasmine size={it.size ?? 40} rotate={it.rotate ?? 0} opacity={it.opacity ?? 0.5} />
        </div>
      ))}
    </div>
  );
}

// ─── Placeholder ──────────────────────────────────────────────
export function Placeholder({
  label,
  ratio = '16/9',
  tone = 'dark',
  style,
  hideLabel = false,
}: {
  label: string;
  ratio?: string;
  tone?: 'dark' | 'light';
  style?: React.CSSProperties;
  hideLabel?: boolean;
}) {
  const bg = tone === 'dark' ? '#1A4845' : '#235752';
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: ratio,
        background: `repeating-linear-gradient(135deg, ${bg} 0 14px, rgba(246,237,217,0.04) 14px 28px)`,
        border: '1px solid rgba(246,237,217,0.10)',
        display: 'grid',
        placeItems: hideLabel ? 'unset' : 'center',
        ...style,
      }}
    >
      {!hideLabel && (
        <span
          style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(246,237,217,0.55)',
            background: 'rgba(23,64,61,0.75)',
            padding: '6px 12px',
            border: '1px solid rgba(246,237,217,0.12)',
          }}
        >
          {label}
        </span>
      )}
      {hideLabel && (
        <span
          style={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 9,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(246,237,217,0.35)',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

// ─── LogoMark ─────────────────────────────────────────────────
export function LogoMark({
  size = 56,
  accent = '#E5B769',
  variant = 'crop',
}: {
  size?: number;
  accent?: string;
  variant?: 'crop' | 'full';
}) {
  if (variant === 'full') {
    return (
      <div style={{ position: 'relative', display: 'inline-block', padding: 32 }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 50% 45%, ${accent}22 0%, transparent 65%)`,
            pointerEvents: 'none',
          } as React.CSSProperties}
        />
        <img
          src="/assets/logo.png"
          alt="Krawitan Sendang Melatie"
          style={{
            width: size,
            height: size,
            objectFit: 'contain',
            display: 'block',
            position: 'relative',
            filter: `drop-shadow(0 12px 40px ${accent}55) drop-shadow(0 0 24px rgba(0,0,0,0.3))`,
          }}
        />
      </div>
    );
  }
  return (
    <img
      src="/assets/logo.png"
      alt="Krawitan Sendang Melatie"
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        display: 'block',
        filter: `drop-shadow(0 2px 8px ${accent}55)`,
      }}
    />
  );
}

// ─── Rule ─────────────────────────────────────────────────────
export function Rule({ accent, width = 48 }: { accent: string; width?: number }) {
  return <div style={{ width, height: 1, background: accent, opacity: 0.7 }} />;
}

const ctaBase: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  padding: '16px 32px',
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.24em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  transition: 'all 200ms',
  textDecoration: 'none',
};

// ─── CTA ──────────────────────────────────────────────────────
export function CTA({ children, primary, accent }: { children: React.ReactNode; primary?: boolean; accent: string }) {
  return (
    <a
      href="#over"
      style={primary
        ? { ...ctaBase, border: `1px solid ${accent}`, background: accent, color: '#0B1B2E' }
        : { ...ctaBase, border: `1px solid ${accent}`, background: 'transparent', color: 'var(--text)' }
      }
    >
      {children}
      <span style={{ fontSize: 14 }}>→</span>
    </a>
  );
}

// ─── ScrollCue ────────────────────────────────────────────────
export function ScrollCue({ accent }: { accent: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        fontSize: 9,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: 'rgba(246,237,217,0.35)',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    >
      <div style={{ width: 1, height: 28, background: `linear-gradient(180deg, transparent 0%, ${accent}80 100%)` }} />
    </div>
  );
}

// ─── SectionLabel ─────────────────────────────────────────────
export function SectionLabel({ num, label, accent }: { num: string; label: string; accent: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        fontSize: 11,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
      } as React.CSSProperties}
    >
      <span style={{ color: accent, fontWeight: 500 }}>{num}</span>
      <div style={{ width: 24, height: 1, background: accent }} />
      <span style={{ color: 'var(--text-dim)' }}>{label}</span>
      <div style={{ marginLeft: 8, opacity: 0.7 }}>
        <BatikDivider color={accent} width={80} />
      </div>
    </div>
  );
}

// ─── Field ────────────────────────────────────────────────────
export function Field({
  label,
  value,
  onChange,
  textarea,
  type = 'text',
  accent,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  type?: string;
  accent: string;
}) {
  const [focus, setFocus] = useState(false);
  const common: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${focus ? accent : 'var(--line)'}`,
    color: 'var(--text)',
    fontFamily: 'inherit',
    fontSize: 15,
    padding: '14px 0',
    outline: 'none',
    transition: 'border-color 200ms',
    resize: 'vertical',
  };
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span
        style={{
          fontSize: 10,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: focus ? accent : 'var(--text-mute)',
          transition: 'color 200ms',
        } as React.CSSProperties}
      >
        {label}
      </span>
      {textarea ? (
        <textarea
          rows={4}
          value={value}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => onChange(e.target.value)}
          style={common}
        />
      ) : (
        <input
          type={type}
          value={value}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => onChange(e.target.value)}
          style={common}
        />
      )}
    </label>
  );
}

// ─── SocialIcon ───────────────────────────────────────────────
export function SocialIcon({ icon, color }: { icon: string; color: string }) {
  const sz = 22;
  const props = {
    width: sz,
    height: sz,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  if (icon === 'tiktok')
    return (
      <svg {...props}>
        <path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5" />
        <path d="M14 4c0 2.5 2 4.5 4.5 4.5" />
      </svg>
    );
  if (icon === 'instagram')
    return (
      <svg {...props}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill={color} />
      </svg>
    );
  if (icon === 'facebook')
    return (
      <svg {...props}>
        <path d="M14 8h2V5h-2.5A3.5 3.5 0 0 0 10 8.5V11H8v3h2v7h3v-7h2.5l.5-3H13V8.5c0-.3.2-.5.5-.5H14Z" />
      </svg>
    );
  if (icon === 'youtube')
    return (
      <svg {...props}>
        <rect x="2" y="5" width="20" height="14" rx="3" />
        <path d="M10 9l5 3-5 3V9Z" fill={color} stroke="none" />
      </svg>
    );
  return null;
}

// ─── Shared style helpers ─────────────────────────────────────
export const sectionStyle: React.CSSProperties = { padding: 'clamp(64px, 10vw, 128px) 0', position: 'relative' };
export const container: React.CSSProperties = { maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' };
export const paragraphStyle: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.7,
  color: 'var(--text-dim)',
  fontWeight: 300,
  margin: 0,
};
export const h2Style = (font: string): React.CSSProperties => ({
  fontFamily: `'${font}', serif`,
  fontSize: 'clamp(36px, 4.2vw, 58px)',
  fontWeight: 400,
  lineHeight: 1.05,
  letterSpacing: '-0.01em',
  margin: 0,
  color: 'var(--text)',
});
