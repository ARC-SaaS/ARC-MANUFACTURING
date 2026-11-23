'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import BrandLogo from '@/components/brand-logo';

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const dismissOutside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const desktop = matchMedia('(min-width: 851px)');
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };

    document.addEventListener('pointerdown', dismissOutside);
    document.addEventListener('keydown', handleEscape);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      document.removeEventListener('pointerdown', dismissOutside);
      document.removeEventListener('keydown', handleEscape);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [menuOpen]);

  return (
    <header className="site-header" ref={header}>
      <a href="#home" className="site-logo" aria-label="ARC home">
        <BrandLogo />
      </a>
      <button
        ref={menuButton}
        className="mobile-menu"
        type="button"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <X size={26} aria-hidden="true" />
        ) : (
          <Menu size={26} aria-hidden="true" />
        )}
      </button>
      <nav
        id="main-navigation"
        className={`site-nav${menuOpen ? ' expanded' : ''}`}
        aria-label="Main navigation"
      >
        <a href="#about" onClick={() => setMenuOpen(false)}>
          About ARC
        </a>
        <a href="#process" onClick={() => setMenuOpen(false)}>
          How it works
        </a>
        <a href="#traceability" onClick={() => setMenuOpen(false)}>
          Traceability
        </a>
      </nav>
      <Link className="nav-cta" href="/contact">
        Talk to the ARC team <ArrowUpRight size={15} aria-hidden="true" />
      </Link>
    </header>
  );
}
