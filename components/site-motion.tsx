'use client';

import { useEffect } from 'react';

/** Shared lifecycle for decorative motion; content never depends on animation. */
export default function SiteMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const ambient = document.querySelector<HTMLElement>('.site-hero');
    const header = document.querySelector<HTMLElement>('.site-header');
    const syncHeaderHeight = () => {
      if (header) root.style.setProperty('--arc-header-height', `${header.offsetHeight}px`);
    };
    const headerObserver = new ResizeObserver(syncHeaderHeight);
    if (header) headerObserver.observe(header);
    syncHeaderHeight();
    const visual = document.querySelector<HTMLElement>('.trace-example');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = matchMedia('(hover: hover) and (pointer: fine)');
    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.hero-passport, .about-body > h2, .about-body > p, .principles > div, .about-case-study, .section-heading-simple, .process-steps article, .trace-copy, .trace-example, .faq-section > h2, .faq-section details, .closing-section, .footer-grid > *, .footer-bottom, .repair-note',
      ),
    );
    const targets = [
      ...new Set([
        ...reveals,
        ...document.querySelectorAll<HTMLElement>('.site-main > section'),
      ]),
    ];
    reveals.forEach((element) => {
      const index = Array.from(element.parentElement?.children ?? []).indexOf(
        element,
      );
      element.style.setProperty('--arc-delay', `${Math.min(index, 4) * 90}ms`);
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          target.classList.toggle('arc-in-view', isIntersecting);
          if (isIntersecting && reveals.includes(target as HTMLElement))
            target.classList.add('arc-reveal-visible');
        });
      },
      { threshold: 0.08 },
    );
    targets.forEach((element) => observer.observe(element));

    let frame = 0;
    const updateScroll = () => {
      frame = 0;
      root.classList.toggle('arc-scrolled', scrollY > 24);
    };
    const scheduleScroll = () => {
      if (!frame && !document.hidden)
        frame = requestAnimationFrame(updateScroll);
    };
    const resetPointer = () => {
      visual?.style.removeProperty('--arc-tilt-x');
      visual?.style.removeProperty('--arc-tilt-y');
      visual?.style.removeProperty('--arc-pointer-y');
    };
    let pointerFrame = 0;
    let ambientFrame = 0;
    const clearAmbientPointer = () => {
      cancelAnimationFrame(ambientFrame);
      ambientFrame = 0;
      ambient?.style.removeProperty('--hero-pointer-x');
      ambient?.style.removeProperty('--hero-pointer-y');
    };
    const moveAmbientPointer = (event: PointerEvent) => {
      if (!ambient || reduced.matches || !pointer.matches || document.hidden)
        return;
      cancelAnimationFrame(ambientFrame);
      ambientFrame = requestAnimationFrame(() => {
        const bounds = ambient.getBoundingClientRect();
        ambient.style.setProperty('--hero-pointer-x', `${event.clientX - bounds.left}px`);
        ambient.style.setProperty('--hero-pointer-y', `${event.clientY - bounds.top}px`);
      });
    };
    const movePointer = (event: PointerEvent) => {
      if (!visual || reduced.matches || !pointer.matches || document.hidden)
        return;
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        const bounds = visual.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        visual.style.setProperty('--arc-tilt-x', `${-y * 2}deg`);
        visual.style.setProperty('--arc-tilt-y', `${x * 2}deg`);
        visual.style.setProperty('--arc-pointer-y', `${y * 3}px`);
      });
    };
    const leavePointer = () => {
      cancelAnimationFrame(pointerFrame);
      resetPointer();
    };
    const syncPreferences = () => {
      leavePointer();
      if (reduced.matches || !pointer.matches) clearAmbientPointer();
      updateScroll();
    };
    const syncVisibility = () => {
      root.classList.toggle('arc-page-hidden', document.hidden);
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
        leavePointer();
        clearAmbientPointer();
      } else updateScroll();
    };
    updateScroll();
    syncVisibility();
    window.addEventListener('scroll', scheduleScroll, { passive: true });
    document.addEventListener('visibilitychange', syncVisibility);
    reduced.addEventListener('change', syncPreferences);
    pointer.addEventListener('change', syncPreferences);
    visual?.addEventListener('pointermove', movePointer);
    visual?.addEventListener('pointerleave', leavePointer);
    window.addEventListener('pointermove', moveAmbientPointer, { passive: true });
    window.addEventListener('pointerleave', clearAmbientPointer);
    return () => {
      observer.disconnect();
      headerObserver.disconnect();
      root.style.removeProperty('--arc-header-height');
      cancelAnimationFrame(frame);
      cancelAnimationFrame(pointerFrame);
      cancelAnimationFrame(ambientFrame);
      window.removeEventListener('scroll', scheduleScroll);
      document.removeEventListener('visibilitychange', syncVisibility);
      reduced.removeEventListener('change', syncPreferences);
      pointer.removeEventListener('change', syncPreferences);
      visual?.removeEventListener('pointermove', movePointer);
      visual?.removeEventListener('pointerleave', leavePointer);
      window.removeEventListener('pointermove', moveAmbientPointer);
      window.removeEventListener('pointerleave', clearAmbientPointer);
      targets.forEach((element) => {
        element.classList.remove('arc-in-view', 'arc-reveal-visible');
        element.style.removeProperty('--arc-delay');
      });
      root.classList.remove('arc-scrolled', 'arc-page-hidden');
      resetPointer();
      clearAmbientPointer();
    };
  }, []);
  return null;
}
