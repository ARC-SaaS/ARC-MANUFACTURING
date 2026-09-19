'use client';

import { useEffect } from 'react';

/** Shared lifecycle for decorative motion; content never depends on animation. */
export default function SiteMotion() {
  useEffect(() => {
    const root = document.documentElement;
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
        '.about-body > h2, .about-body > p, .principles > div, .section-heading-simple, .process-steps article, .trace-copy, .trace-example, .faq-section > h2, .faq-section > details, .closing-section, .footer-grid > *, .footer-bottom, .repair-note',
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
      updateScroll();
    };
    const syncVisibility = () => {
      root.classList.toggle('arc-page-hidden', document.hidden);
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
        leavePointer();
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
    return () => {
      observer.disconnect();
      headerObserver.disconnect();
      root.style.removeProperty('--arc-header-height');
      cancelAnimationFrame(frame);
      cancelAnimationFrame(pointerFrame);
      window.removeEventListener('scroll', scheduleScroll);
      document.removeEventListener('visibilitychange', syncVisibility);
      reduced.removeEventListener('change', syncPreferences);
      pointer.removeEventListener('change', syncPreferences);
      visual?.removeEventListener('pointermove', movePointer);
      visual?.removeEventListener('pointerleave', leavePointer);
      targets.forEach((element) => {
        element.classList.remove('arc-in-view', 'arc-reveal-visible');
        element.style.removeProperty('--arc-delay');
      });
      root.classList.remove('arc-scrolled', 'arc-page-hidden');
      resetPointer();
    };
  }, []);
  return null;
}
