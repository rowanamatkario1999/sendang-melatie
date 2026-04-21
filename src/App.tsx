import { useState, useEffect } from 'react';
import { TWEAK_DEFAULTS } from './constants';
import type { Tweaks } from './types';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Over } from './components/Over';
import { OnzeLogo } from './components/OnzeLogo';
import { Crew } from './components/Crew';
import { Events } from './components/Events';
import { Media } from './components/Media';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { TweaksPanel } from './components/TweaksPanel';

function App() {
  const [tweaks, setTweaks] = useState<Tweaks>(TWEAK_DEFAULTS);
  const [scrolled, setScrolled] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e?.data?.type === '__activate_edit_mode') setEditMode(true);
      if (e?.data?.type === '__deactivate_edit_mode') setEditMode(false);
    };
    window.addEventListener('message', handler);
    try {
      window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    } catch {}
    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <div style={{ '--accent': tweaks.accent } as React.CSSProperties}>
      <Nav tweaks={tweaks} scrolled={scrolled} />
      <Hero tweaks={tweaks} />
      <Over tweaks={tweaks} />
      <OnzeLogo tweaks={tweaks} />
      <Crew tweaks={tweaks} />
      <Events tweaks={tweaks} />
      <Media tweaks={tweaks} />
      <Contact tweaks={tweaks} />
      <Footer tweaks={tweaks} />
      <TweaksPanel visible={editMode} tweaks={tweaks} setTweaks={setTweaks} />
    </div>
  );
}

export default App;
