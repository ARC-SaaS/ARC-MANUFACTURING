'use client';
import { useEffect, useRef, useState } from 'react';
import site from '@/lib/site.json';
import { getSiteOrigin } from '@/shared/site-config.mjs';
export default function ShareButton() {
  const [message, setMessage] = useState('');
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    },
    [],
  );
  function showMessage(nextMessage: string) {
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    setMessage(nextMessage);
    dismissTimer.current = setTimeout(() => setMessage(''), 2200);
  }
  function shareUrl() {
    return (
      getSiteOrigin(site.url) ||
      (/^https?:$/.test(location.protocol)
        ? location.origin + location.pathname
        : '')
    );
  }
  async function copyLink() {
    const url = shareUrl();
    if (!url) {
      showMessage('Open the hosted website to share its link.');
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      showMessage('Link copied.');
    } catch {
      showMessage('Copy the website address from your browser to share it.');
    }
  }
  async function share() {
    const url = shareUrl();
    if (!url) {
      showMessage('Open the hosted website to share its link.');
      return;
    }
    try {
      if (navigator.share)
        await navigator.share({
          title: site.title,
          text: site.description,
          url,
        });
      else {
        await navigator.clipboard.writeText(url);
        showMessage('Link copied.');
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError'))
        showMessage('Copy the website address from your browser to share it.');
    }
  }
  return (
    <>
      <button
        className="footer-action"
        type="button"
        onClick={share}
        aria-label="Share the ARC website"
      >
        Share ARC
      </button>
      <span className="copy-control">
        <button
          className="footer-action"
          type="button"
          onClick={copyLink}
          aria-label="Copy the ARC website link"
        >
          Copy link
        </button>
        <output
          className={`share-toast${message ? ' is-visible' : ''}`}
          aria-live="polite"
          aria-atomic="true"
        >
          {message}
        </output>
      </span>
    </>
  );
}
