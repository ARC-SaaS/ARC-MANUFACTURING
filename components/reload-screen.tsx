'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import '@/app/reload.css';

export default function ReloadScreen() {
  const [phase, setPhase] = useState('loading');
  useEffect(() => {
    const started = performance.now();
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let scheduled = false;
    let fade: ReturnType<typeof setTimeout>;
    let remove: ReturnType<typeof setTimeout>;
    const finish = () => {
      if (scheduled) return;
      scheduled = true;
      fade = setTimeout(() => {
        setPhase('hidden');
        remove = setTimeout(() => setPhase('done'), reduced ? 0 : 500);
      }, Math.max(0, (reduced ? 0 : 1200) - (performance.now() - started)));
    };
    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });
    const fallback = setTimeout(finish, 5000);
    return () => {
      window.removeEventListener('load', finish);
      clearTimeout(fallback); clearTimeout(fade); clearTimeout(remove);
    };
  }, []);
  if (phase === 'done') return null;
  return <div className={`arc-orbit-loader ${phase === 'hidden' ? 'is-hidden' : ''}`} aria-hidden="true">
    <div className="arc-orbit-loader-mark">
      <span className="arc-orbit-loader-ring" />
      <Image unoptimized src="/arc-logo.png" alt="" width={448} height={224} priority />
    </div>
    <span className="arc-orbit-loader-name">Initializing production intelligence</span>
    <span className="arc-orbit-loader-line" />
  </div>;
}
