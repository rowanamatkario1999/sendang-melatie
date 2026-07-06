import React, { useEffect, useMemo, useState } from 'react';
import type { Tweaks } from '../types';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useLang } from '../context/LanguageContext';
import { translations } from '../translations';
import {
  BatikPattern,
  JasmineSprinkle,
  SectionLabel,
  sectionStyle,
  container,
  paragraphStyle,
  h2Style,
} from './ui';
import { supabase } from '../lib/supabase';

type AttendanceStatus = 'none' | 'present' | 'absent';

type EventAttendance = {
  eventId: string;
  name: string;
  status: AttendanceStatus;
  updatedAt: string;
};

const STORAGE_KEY = 'sendang-melatie-internal-rsvp';

const buttonBase: React.CSSProperties = {
  border: 'none',
  borderRadius: 999,
  padding: '10px 18px',
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: 14,
};

function loadStoredAttendances(): EventAttendance[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as EventAttendance[]) : [];
  } catch {
    return [];
  }
}

function saveStoredAttendances(attendances: EventAttendance[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attendances));
}

export function InternalEventsPage({ tweaks }: { tweaks: Tweaks }) {
  const { lang } = useLang();
  const { isMobile } = useBreakpoint();
  const t = translations[lang].events;
  const events = useMemo(
    () => {
      const base = t.items.map((item, index) => ({ ...item, id: `events-${index}` }));
      const internalOnly = { id: 'events-invite-bruiloft', date: '12 SEP', title: 'Bruiloft', loc: 'Privé' };
      return [...base, internalOnly];
    },
    [t.items],
  );
  const oefeningItems = useMemo(
    () => [
      { id: 'oefening-0', date: '25 JUL', title: 'Oefenening + Overleg en Eten', loc: 'Wateringen' },

    ],
    [],
  );
  const [activeTab, setActiveTab] = useState<'events' | 'oefening'>('events');
  const [attendances, setAttendances] = useState<EventAttendance[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formValues, setFormValues] = useState<Record<string, string>>(() =>
    Object.fromEntries([...events, ...oefeningItems].map((item) => [item.id, ''])),
  );
  const currentItems = activeTab === 'events' ? events : oefeningItems;

  useEffect(() => {
    setFormValues(Object.fromEntries([...events, ...oefeningItems].map((item) => [item.id, ''])));
  }, [events.length, oefeningItems.length]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('attendances')
          .select('event_id, name, status, updated_at');
        if (!error && data) {
          const mapped = (data as any[]).map((d) => ({
            eventId: d.event_id,
            name: d.name,
            status: d.status as AttendanceStatus,
            updatedAt: d.updated_at,
          }));
          if (mounted) {
            setAttendances(mapped);
            saveStoredAttendances(mapped);
          }
          return;
        }
      } catch (e) {
        // fallback to local
      }

      const local = loadStoredAttendances();
      if (mounted) setAttendances(local);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const eventAttendances = useMemo(
    () =>
      [...events, ...oefeningItems].map((item) => ({
        eventId: item.id,
        list: attendances
          .filter((entry) => entry.eventId === item.id)
          .sort((a, b) =>
            a.status === b.status ? a.name.localeCompare(b.name) : a.status === 'present' ? -1 : 1,
          ),
      })),
    [attendances, events, oefeningItems],
  );

  const updateFormValue = (id: string, value: string) => {
    setFormValues((current) => ({ ...current, [id]: value }));
    setErrors((current) => ({ ...current, [id]: '' }));
  };

  const handleSubmit = (eventId: string, status: AttendanceStatus, eventName: string) => {
    const name = formValues[eventId]?.trim();
    if (!name) {
      setErrors((current) => ({ ...current, [eventId]: 'Vul eerst je naam in.' }));
      return;
    }

    setAttendances((current) => {
      const correctedName = name.replace(/\s+/g, ' ').trim();
      const cleaned = current.filter(
        (entry) => !(entry.eventId === eventId && entry.name.toLowerCase() === correctedName.toLowerCase()),
      );
      const next = [
        ...cleaned,
        {
          eventId,
          name: correctedName,
          status,
          updatedAt: new Date().toISOString(),
        },
      ];
      saveStoredAttendances(next);

      // Best-effort: persist to Supabase so multiple devices see updates.
      (async () => {
        try {
          // Remove exact-match (same event and name) then insert new row
          await supabase.from('attendances').delete().match({ event_id: eventId, name: correctedName });
          await supabase.from('attendances').insert({
            event_id: eventId,
            event_name: eventName,
            name: correctedName,
            status,
            updated_at: new Date().toISOString(),
          });
        } catch (e) {
          // Ignore network errors; localStorage remains authoritative offline
        }
      })();

      return next;
    });

    setErrors((current) => ({ ...current, [eventId]: '' }));
    setFormValues((current) => ({ ...current, [eventId]: name }));
  };

  const getStatusLabel = (status: AttendanceStatus) =>
    status === 'present' ? 'Aanwezig' : status === 'absent' ? 'Afwezig' : 'Nog geen keuze';

  return (
    <section
      style={{
        ...sectionStyle,
        background: 'var(--surface)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
      }}
    >
      <BatikPattern color={tweaks.accent} opacity={0.06} motif="kawung" secondary="#8B4513" />
      <JasmineSprinkle
        items={
          isMobile
            ? [{ top: '12%', left: '4%', size: 32, opacity: 0.3 }]
            : [
                { top: '12%', right: '8%', size: 40, rotate: -20, opacity: 0.35 },
                { bottom: '10%', left: '10%', size: 48, rotate: 55, opacity: 0.32 },
              ]
        }
      />
      <div style={{ ...container, position: 'relative' }}>
        <SectionLabel num="04" label="Interne RSVP" accent={tweaks.accent} />
        <div style={{ display: 'grid', gap: 32, marginTop: 48 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
            {(['events', 'oefening'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                style={{
                  borderRadius: 999,
                  padding: '12px 22px',
                  background: activeTab === tab ? tweaks.accent : 'transparent',
                  color: activeTab === tab ? '#fff' : 'var(--text)',
                  border: `1px solid ${activeTab === tab ? tweaks.accent : 'var(--line)'}`,
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                {tab === 'events' ? 'Events' : 'Oefening'}
              </button>
            ))}
          </div>

          <div style={{ maxWidth: 720 }}>
            <h2 style={h2Style(tweaks.titleFont)}>
              {t.h2}
              <em style={{ color: tweaks.accent }}>{t.h2Accent}</em>
              {t.h2End}
            </h2>
            <p style={paragraphStyle}>
              Deze interne pagina is speciaal voor aanmelden. Kies een tab en vul je naam in met aanwezig of afwezig.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))',
              gap: 24,
            }}
          >
            {currentItems.map((eventItem) => {
              const eventId = eventItem.id;
              const attendeesForEvent = eventAttendances.find((entry) => entry.eventId === eventId)?.list ?? [];
              const existingEntry = attendeesForEvent.find(
                (entry) => entry.name.toLowerCase() === formValues[eventId]?.trim().toLowerCase(),
              );

              return (
                <article
                  key={eventId}
                  style={{
                    background: 'var(--surface-2)',
                    borderRadius: 30,
                    padding: 28,
                    boxShadow: '0 20px 50px rgba(0,0,0,0.06)',
                    border: `1px solid var(--line)`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20,
                  }}
                >
                  <div>
                    <div style={{ textTransform: 'uppercase', letterSpacing: '0.25em', fontSize: 11, color: 'var(--text-dim)' }}>
                      {eventItem.date}
                    </div>
                    <h3 style={{ margin: '14px 0 8px', fontSize: 22, lineHeight: 1.1 }}>{eventItem.title}</h3>
                    <div style={{ color: 'var(--text-dim)', fontSize: 14 }}>{eventItem.loc}</div>
                  </div>

                  <div style={{ display: 'grid', gap: 18 }}>
                    <label style={{ display: 'grid', gap: 8, color: 'var(--text)' }}>
                      <span style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>
                        Naam
                      </span>
                      <input
                        type="text"
                        value={formValues[eventId] ?? ''}
                        onChange={(event) => updateFormValue(eventId, event.currentTarget.value)}
                        placeholder="Vul je naam in"
                        style={{
                          width: '100%',
                          padding: '16px 18px',
                          borderRadius: 18,
                          border: '1px solid var(--line)',
                          background: 'transparent',
                          color: 'var(--text)',
                          fontSize: 15,
                          outline: 'none',
                        }}
                      />
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
                      <button
                        type="button"
                        onClick={() => handleSubmit(eventId, 'present', eventItem.title)}
                        style={{
                          ...buttonBase,
                          background: '#0b7a3b',
                          color: '#fff',
                        }}
                      >
                        Aanwezig
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSubmit(eventId, 'absent', eventItem.title)}
                        style={{
                          ...buttonBase,
                          background: '#c9231a',
                          color: '#fff',
                        }}
                      >
                        Afwezig
                      </button>
                      {existingEntry ? (
                        <span style={{ color: existingEntry.status === 'present' ? '#0b7a3b' : '#c9231a', fontWeight: 700 }}>
                          Status: {getStatusLabel(existingEntry.status)}
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-dim)' }}>Nog geen registratie</span>
                      )}
                    </div>
                    {errors[eventId] && <div style={{ color: '#c9231a', fontSize: 14 }}>{errors[eventId]}</div>}
                  </div>

                  <div style={{ display: 'grid', gap: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 600 }}>{attendeesForEvent.length} aanmelding(en)</span>
                      <span style={{ color: 'var(--text-dim)', fontSize: 14 }}>
                        {attendeesForEvent.filter((entry) => entry.status === 'present').length} aanwezig
                        , {attendeesForEvent.filter((entry) => entry.status === 'absent').length} afwezig
                      </span>
                    </div>
                    <div style={{ display: 'grid', gap: 10 }}>
                      {attendeesForEvent.length === 0 ? (
                        <div style={{ color: 'var(--text-dim)', fontSize: 14 }}>Nog geen aanmeldingen.</div>
                      ) : (
                        attendeesForEvent.map((entry) => (
                          <div
                            key={`${eventId}-${entry.name}`}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              gap: 12,
                              padding: '12px 16px',
                              borderRadius: 20,
                              background: 'transparent',
                              border: '1px solid rgba(0,0,0,0.06)',
                            }}
                          >
                            <div>
                              <div style={{ fontWeight: 600, color: 'var(--text)' }}>{entry.name}</div>
                              <div style={{ color: 'var(--text-dim)', fontSize: 13 }}>
                                Bijgewerkt: {new Date(entry.updatedAt).toLocaleString(lang === 'nl' ? 'nl-NL' : 'en-US', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                            <div
                              style={{
                                display: 'inline-flex',
                                padding: '8px 12px',
                                borderRadius: 999,
                                color: entry.status === 'present' ? '#0b7a3b' : '#c9231a',
                                background: entry.status === 'present' ? '#e9f5ea' : '#fde8e8',
                                fontWeight: 700,
                              }}
                            >
                              {getStatusLabel(entry.status)}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
