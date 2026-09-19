'use client';

import { useEffect, useState } from 'react';
import BrandLogo from '@/components/brand-logo';
import '@/app/reload.css';

export default function ReloadScreen() {
  const [phase, setPhase] = useState('loading');

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cancelled = false;
    let fade: ReturnType<typeof setTimeout>;
    let remove: ReturnType<typeof setTimeout>;

    // Count startup time too, so React does not restart the loading delay.
    const finish = () => {
      if (cancelled) return;
      fade = setTimeout(
        () => {
          setPhase('hidden');
          remove = setTimeout(() => setPhase('done'), reduced ? 0 : 200);
        },
        reduced ? 0 : Math.max(0, 800 - performance.now()),
      );
    };

    finish();

    return () => {
      cancelled = true;
      clearTimeout(fade);
      clearTimeout(remove);
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      className={`arc-orbit-loader ${phase === 'hidden' ? 'is-hidden' : ''}`}
      aria-hidden="true"
    >
      <div className="arc-orbit-loader-mark">
        <span className="arc-orbit-loader-ring" />
        <BrandLogo variant="loader" />
      </div>
      <span className="arc-orbit-loader-name">
        Initializing production intelligence
      </span>
      <span className="arc-orbit-loader-line" />
    </div>
  );
}
