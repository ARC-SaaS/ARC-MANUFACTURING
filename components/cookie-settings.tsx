'use client';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import site from '@/lib/site.json';
const key = 'arc-cookie-choice-v1',
  eventName = 'arc-cookie-choice';
let memory = '';
function snapshot() {
  try {
    return localStorage.getItem(key) || memory;
  } catch {
    return memory;
  }
}
function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(eventName, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(eventName, callback);
  };
}
function choice(value: string) {
  try {
    const parsed = JSON.parse(value);
    return parsed.expires > Date.now() &&
      ['accepted', 'rejected'].includes(parsed.value)
      ? parsed.value
      : 'unknown';
  } catch {
    return 'unknown';
  }
}
type AnalyticsWindow = Window & {
  dataLayer?: unknown[][];
  gtag?: (...args: unknown[]) => void;
} & Record<`ga-disable-${string}`, boolean>;
export default function CookieSettings() {
  const saved = useSyncExternalStore(subscribe, snapshot, () => ''),
    consent = choice(saved);
  const [open, setOpen] = useState(false);
  const configured = /^G-[A-Z0-9]+$/.test(site.analyticsId);
  const panel = useRef<HTMLElement>(null);
  const visible = open || (configured && consent === 'unknown');
  useEffect(() => {
    if (!visible) return;
    const previous = document.activeElement;
    panel.current?.focus();
    return () => {
      if (previous instanceof HTMLElement && previous.isConnected) previous.focus();
    };
  }, [visible]);
  function save(value: 'accepted' | 'rejected') {
    memory = JSON.stringify({
      value,
      expires: Date.now() + 180 * 24 * 60 * 60 * 1000,
    });
    try {
      localStorage.setItem(key, memory);
    } catch {
      /* Session-only preference when storage is unavailable. */
    }
    window.dispatchEvent(new Event(eventName));
    setOpen(false);
  }
  useEffect(() => {
    const w = window as unknown as AnalyticsWindow,
      id = site.analyticsId;
    if (!configured) return;
    if (consent !== 'accepted') {
      w[`ga-disable-${id}`] = true;
      document.getElementById('arc-analytics')?.remove();
      // Remove analytics cookies at the host and parent-domain levels after withdrawal.
      for (const item of document.cookie.split(';')) {
        const name = item.split('=')[0].trim();
        if (!/^_ga(?:_|$)/.test(name)) continue;
        const parts = location.hostname.split('.');
        for (let i = 0; i < parts.length - 1; i++)
          document.cookie = `${name}=; Max-Age=0; Path=/; Domain=${parts.slice(i).join('.')}`;
        document.cookie = `${name}=; Max-Age=0; Path=/`;
      }
      return;
    }
    if (document.getElementById('arc-analytics')) return;
    w[`ga-disable-${id}`] = false;
    w.dataLayer = w.dataLayer || [];
    w.gtag = (...args: unknown[]) => w.dataLayer?.push(args);
    w.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    w.gtag('js', new Date());
    w.gtag('config', id, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_expires: 15552000,
    });
    w.gtag('event', 'page_view', {
      page_location: location.origin + location.pathname,
      page_title: document.title,
      page_referrer: '',
    });
    const script = document.createElement('script');
    script.id = 'arc-analytics';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);
  }, [consent, configured]);
  return (
    <>
      <button
        type="button"
        className="cookie-settings-trigger"
        onClick={() => setOpen(true)}
      >
        Cookie settings
      </button>
      {visible && (
        <section
          ref={panel}
          tabIndex={-1}
          className="cookie-panel"
          aria-labelledby="cookie-title"
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.preventDefault();
              if (consent === 'unknown') save('rejected');
              else setOpen(false);
            }
          }}
        >
          <h2 id="cookie-title">Your cookie choices</h2>
          <p>
            {configured
              ? 'Optional Google Analytics helps us understand page visits. It stays off unless you accept.'
              : 'Optional analytics is currently disabled. We only save your choice in this browser.'}{' '}
            You can change your choice here at any time.{' '}
            <a href="/privacy">Privacy policy</a>
          </p>
          <div className="cookie-actions">
            <button type="button" onClick={() => save('rejected')}>
              Reject analytics
            </button>
            <button type="button" onClick={() => save('accepted')}>
              Accept analytics
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                if (consent === 'unknown') save('rejected');
              }}
            >
              Close
            </button>
          </div>
        </section>
      )}
    </>
  );
}
