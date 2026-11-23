'use client';
import { useState } from 'react';
import site from '@/lib/site.json';
import { getSiteOrigin } from '@/shared/site-config.mjs';
export default function ShareButton() {
  const [message, setMessage] = useState('');
  function shareUrl() {
    return getSiteOrigin(site.url) ||
      (/^https?:$/.test(location.protocol) ? location.origin + location.pathname : '');
  }
  async function copyLink() {
    const url = shareUrl();
    if (!url) {
      setMessage('Open the hosted website to share its link.');
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setMessage('Link copied.');
    } catch {
      setMessage('Copy the website address from your browser to share it.');
    }
  }
  async function share() {
    const url = shareUrl();
    if (!url) {
      setMessage('Open the hosted website to share its link.');
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
        setMessage('Link copied.');
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError'))
        setMessage('Copy the website address from your browser to share it.');
    }
  }
  return (
    <span className="share-control">
      <button type="button" onClick={share}>
        Share ARC
      </button>
      {' · '}
      <button type="button" onClick={copyLink}>
        Copy link
      </button>
      <span aria-live="polite">{message}</span>
    </span>
  );
}
