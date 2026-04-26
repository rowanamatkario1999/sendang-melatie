import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import type { Tweaks } from '../types';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useLang } from '../context/LanguageContext';
import { translations } from '../translations';
import {
  BatikPattern,
  JasmineSprinkle,
  SocialIcon,
  Field,
  SectionLabel,
  sectionStyle,
  container,
  paragraphStyle,
  h2Style,
} from './ui';

const EMAILJS_SERVICE  = 'service_274a2po';
const EMAILJS_TEMPLATE = 'template_tihz5qh';
const EMAILJS_KEY      = 'iicpjfjtkg7BqiCJD';

export function Contact({ tweaks }: { tweaks: Tweaks }) {
  const { isMobile } = useBreakpoint();
  const { lang } = useLang();
  const t = translations[lang].contact;
  const [form, setForm] = useState({ name: '', email: '', msg: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const socials = [
    { icon: 'tiktok', label: '@sendangmelatie', platform: 'TikTok', href: 'https://tiktok.com/@sendangmelatie' },
    { icon: 'instagram', label: '@sendang.melatie', platform: 'Instagram', href: 'https://instagram.com/sendang.melatie' },
    { icon: 'facebook', label: 'Krawitan Sendang Melatie', platform: 'Facebook', href: 'https://www.facebook.com/people/Krawitan-Sendang-Melatie/61581632217897/' },
    { icon: 'youtube', label: 'Krawitan Sendang Melatie', platform: 'YouTube', href: 'https://www.youtube.com/@KrawitanSendangMelatie' },
  ];

  return (
    <section
      id="contact"
      style={{
        ...sectionStyle,
        background: 'var(--surface)',
        paddingBottom: 96,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <BatikPattern color={tweaks.accent} opacity={0.07} motif="truntum" secondary="#2E4A6B" />
      <JasmineSprinkle items={[{ top: '18%', right: '10%', size: 50, rotate: 22, opacity: 0.5 }]} />
      <div style={{ ...container, position: 'relative' }}>
        <SectionLabel num="06" label={t.sectionLabel} accent={tweaks.accent} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 48 : 80,
            marginTop: 48,
          }}
        >
          <div>
            <h2 style={h2Style(tweaks.titleFont)}>
              {t.h2}
              <em style={{ color: tweaks.accent }}>{t.h2Accent}</em>
            </h2>
            <p style={{ ...paragraphStyle, marginTop: 28 }}>
              {t.intro}
            </p>
            <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
                ['E-mail', 'info@sendangmelatie.nl'],
                ['KvK', '42009424'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 16 }}>
                  <span
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      color: 'var(--text-mute)',
                    } as React.CSSProperties}
                  >
                    {k}
                  </span>
                  <span style={{ color: 'var(--text)', fontSize: 15 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid var(--line)' }}>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'var(--text-mute)',
                  marginBottom: 18,
                } as React.CSSProperties}
              >
                {t.followLabel}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {socials.map((s) => (
                  <a
                    key={s.platform}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '40px 1fr auto',
                      gap: 16,
                      alignItems: 'center',
                      padding: '14px 0',
                      borderBottom: '1px solid var(--line)',
                      transition: 'padding-left 200ms',
                    } as React.CSSProperties}
                    onMouseEnter={(e) => (e.currentTarget.style.paddingLeft = '8px')}
                    onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = '0')}
                  >
                    <SocialIcon icon={s.icon} color={tweaks.accent} />
                    <div>
                      <div style={{ color: 'var(--text)', fontSize: 15 }}>{s.label}</div>
                      <div
                        style={{
                          fontSize: 10,
                          letterSpacing: '0.24em',
                          textTransform: 'uppercase',
                          color: 'var(--text-mute)',
                          marginTop: 2,
                        } as React.CSSProperties}
                      >
                        {s.platform}
                      </div>
                    </div>
                    <span style={{ color: tweaks.accent, fontSize: 16 }}>→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setSending(true);
              setError(null);
              try {
                await emailjs.send(
                  EMAILJS_SERVICE,
                  EMAILJS_TEMPLATE,
                  { from_name: form.name, from_email: form.email, message: form.msg },
                  EMAILJS_KEY,
                );
                setSent(true);
                setForm({ name: '', email: '', msg: '' });
              } catch {
                setError(t.errorMsg);
              } finally {
                setSending(false);
              }
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
          >
            <Field
              label={t.fieldName}
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              accent={tweaks.accent}
            />
            <Field
              label={t.fieldEmail}
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              accent={tweaks.accent}
            />
            <Field
              label={t.fieldMsg}
              textarea
              value={form.msg}
              onChange={(v) => setForm({ ...form, msg: v })}
              accent={tweaks.accent}
            />
            {error && (
              <p style={{ color: '#c0392b', fontSize: 13, margin: 0 }}>{error}</p>
            )}
            <button
              type="submit"
              disabled={sent || sending}
              style={{
                marginTop: 8,
                padding: '18px 28px',
                background: sent ? 'transparent' : tweaks.accent,
                color: sent ? tweaks.accent : '#0B1B2E',
                border: `1px solid ${tweaks.accent}`,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                cursor: sent || sending ? 'default' : 'pointer',
                transition: 'all 200ms',
                opacity: sending ? 0.6 : 1,
              } as React.CSSProperties}
            >
              {sent ? t.btnSent : sending ? t.btnSending : t.btnSend}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
