'use client';

import { useState, useEffect, useRef } from 'react';

import BrandLogo from '@/components/brand-logo';
import FooterLocations from '@/components/footer-locations';

import ReloadScreen from '@/components/reload-screen';
import SiteMotion from '@/components/site-motion';

import {
  ArrowRight,
  ArrowUpRight,
  Activity,
  ScanLine,
  ShieldCheck,
  GitMerge,
  ChevronDown,
  Check,
  X,
  Menu,
} from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';

import { request } from '@/lib/api';

import ShareButton from '@/components/share-button';

import site from '@/lib/site.json';

type SampleResult = Awaited<ReturnType<typeof request>>;

interface SampleInput {
  parentSerial: string;
  childSerial: string;
}

interface ModelContext {
  registerTool(
    tool: {
      name: string;
      description: string;
      inputSchema: object;
      annotations: { readOnlyHint: boolean };
      execute: (input: SampleInput) => Promise<{ assembly_allowed: boolean; reason: string }>;
    },
    options: { signal: AbortSignal },
  ): unknown;
}

const steps = [
  ['01', 'Identify', 'Give every component a unique serial number.'],
  ['02', 'Test', 'Check for leakage and fire resistance.'],
  ['03', 'Inspect', 'Verify quality before moving forward.'],
  ['04', 'Assemble', 'Match the right parent and child components.'],
  ['05', 'Release', 'Send only verified products to final output.'],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    const dismiss = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const desktop = matchMedia('(min-width: 851px)');
    const resize = () => { if (desktop.matches) setMenuOpen(false); };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', escape);
    desktop.addEventListener('change', resize);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', escape);
      desktop.removeEventListener('change', resize);
    };
  }, [menuOpen]);
  const [open, setOpen] = useState(false),
    [parent, setParent] = useState('ARC-26-A005'),
    [child, setChild] = useState('ARC-26-B005'),
    [result, setResult] = useState<SampleResult | null>(null),
    [busy, setBusy] = useState(false),
    [error, setError] = useState('');

  const revision = useRef(0);

  function clearFeedback() {
    revision.current++;
    setResult(null);
    setError('');
    setBusy(false);
  }

  useEffect(() => {
    const mc = (document as Document & { modelContext?: ModelContext }).modelContext;
    if (!mc?.registerTool) return;
    const lifecycle = new AbortController();
    Promise.resolve()
      .then(() => {
        if (lifecycle.signal.aborted) return;
        return mc.registerTool(
          {
            name: 'verify_sample_arc_connection',
            description: 'Check two sample ARC serials and show the compatibility result. Does not reserve or assemble parts.',
            inputSchema: { type: 'object', properties: { parentSerial: { type: 'string' }, childSerial: { type: 'string' } }, required: ['parentSerial', 'childSerial'], additionalProperties: false },
            annotations: { readOnlyHint: true },
            execute: async (input: SampleInput) => {
              clearFeedback(); setOpen(true);
              const ticket = revision.current;
              try {
                if (typeof input.parentSerial !== 'string' || typeof input.childSerial !== 'string') throw new Error('Both serial numbers must be strings.');
                const r = await request('/traceability/validate', 'POST', input);
                if (ticket === revision.current) { setParent(input.parentSerial.trim()); setChild(input.childSerial.trim()); setResult(r); }
                return { assembly_allowed: r.assembly_allowed, reason: r.reason };
              } catch (error: unknown) {
                if (ticket === revision.current) setError(error instanceof Error ? error.message : 'Verification failed.');
                throw error;
              }
            },
          },
          { signal: lifecycle.signal },
        );
      })
      .catch(() => {});
    return () => lifecycle.abort();
  }, []);

  async function verify(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault(); clearFeedback(); const ticket = revision.current;
    setBusy(true);
    try { const r = await request('/traceability/validate', 'POST', { parentSerial: parent, childSerial: child }); if (ticket === revision.current) setResult(r); }
    catch (e: unknown) { if (ticket === revision.current) setError(e instanceof Error ? e.message : 'Verification failed.'); }
    finally { if (ticket === revision.current) setBusy(false); }
  }

  return (
    <>
      <ReloadScreen />
      <SiteMotion />
      <div className="simple-site">
        <header className="site-header" ref={header}>
        <a href="#home" className="site-logo" aria-label="ARC home">
          <BrandLogo />
        </a>
        <button ref={menuButton} className="mobile-menu" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
        </button>
        <nav id="main-navigation" className={`site-nav${menuOpen ? ' expanded' : ''}`} aria-label="Main navigation">
          <a href="#about" onClick={() => setMenuOpen(false)}>About ARC</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#traceability" onClick={() => setMenuOpen(false)}>Traceability</a>
          <a href="/contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <a className="nav-cta" href="#process">
          Explore ARC <ArrowUpRight size={15} />
        </a>
      </header>
      <main id="main-content" className="site-main" tabIndex={-1}>
        <section id="home" className="site-hero">
          <div className="hero-kicker"><span /> BUILT FOR AUTOMOTIVE MANUFACTURING</div>
          <h1>Know your parts.<br /><span>Follow every step.</span></h1>
          <p>Keep track of each automotive component, its inspections, and where it belongs.<br className="desktop-break" /> See how ARC brings these checks together before assembly.</p>
          <div className="hero-actions">
            <a className="site-primary" href="/contact">Talk to the ARC team <ArrowUpRight size={17} /></a>
            <a href="#traceability" className="text-link">Explore traceability <ArrowUpRight size={16} /></a>
          </div>
          <div className="hero-bottom">
            <span>PARTS, INSPECTIONS, AND PRODUCTION</span>
            <a href="#about" aria-label="Scroll to about ARC"><span>SCROLL TO EXPLORE</span><ChevronDown size={15} /></a>
          </div>
        </section>
        <section id="about" className="about-section">
          <div className="section-label"><span>01 / ABOUT ARC</span></div>
          <div className="about-body">
            <h2>Less guesswork.<br /><span>A clearer view of each part.</span></h2>
            <p>Before a part moves on, your team needs to know what it is, which checks it has passed, and where it belongs. ARC brings those details together. This example shows how that can work on an automotive production line.</p>
            <div className="principles">
              <div><ScanLine size={21} /><h3>Identify each part</h3><p>A unique serial number lets your team follow the same part through production.</p></div>
              <div><ShieldCheck size={21} /><h3>Check its history</h3><p>See whether a part has passed the inspections it needs before moving on.</p></div>
              <div><GitMerge size={21} /><h3>Check the fit</h3><p>Confirm that a component belongs with its parent assembly before putting them together.</p></div>
            </div>
          </div>
        </section>
        <section id="process" className="process-section">
          <div className="section-label">02 / THE PROCESS</div>
          <div className="section-heading-simple"><h2>From the first scan<br /><span>to the finished product.</span></h2><p>Five stages to follow.<br />A record of what happens at each one.</p></div>
          <div className="process-steps">
            {steps.map(([n, title, description]) => (
              <article key={n}>
                <div className="step-top"><span>{n}</span>{n !== '05' && <ArrowRight size={17} />}</div>
                <h3>{title}</h3><p>{description}</p>
              </article>
            ))}
          </div>
          <div className="repair-note"><Activity size={15} /><p>If a part fails a check, it needs repair and another inspection before it can move on.</p></div>
        </section>
        <section id="traceability" className="trace-section">
          <div className="trace-copy">
            <div className="section-label">03 / TRACEABILITY</div>
            <h2>Do these parts<br /><span>belong together?</span></h2>
            <p>A matching name is only the start. The sample checker looks at each part’s serial number, inspection history, production order, and any existing assignment before confirming a match.</p>
            <ul>
              <li><Check size={16} /> Check that both parts have passed inspection.</li>
              <li><Check size={16} /> Check that neither part is already assigned.</li>
              <li><Check size={16} /> Explain why a pair cannot be used.</li>
            </ul>
            <button className="site-primary" onClick={() => { setOpen(true); clearFeedback(); }}>Try the sample checker <ArrowUpRight size={17} /></button>
            <small className="sample-note">Uses sample records. No real parts are changed.</small>
          </div>
          <div className="trace-example">
            <div className="example-top"><GitMerge size={19} /><span>A VERIFIED CONNECTION</span><span className="sample-label">EXAMPLE</span></div>
            <div className="example-part" tabIndex={0}><span>01 / PARENT COMPONENT</span><div><strong>Exhaust assembly</strong><span className="example-pass"><Check size={12} /> Inspected</span></div><code>ARC-26-A001</code></div>
            <div className="example-connector"><span /><GitMerge size={20} /><span /></div>
            <div className="example-part" tabIndex={0}><span>02 / CHILD COMPONENT</span><div><strong>Exhaust component</strong><span className="example-pass"><Check size={12} /> Inspected</span></div><code>ARC-26-B001</code></div>
            <div className="example-result"><ShieldCheck size={19} /><div><b>Every check. Before every connection.</b><p>Verified identity · Compatible parts · Clear history</p></div></div>
          </div>
        </section>
        <section id="faq" className="faq-section" aria-labelledby="faq-title">
          <h2 id="faq-title">Frequently asked questions</h2>
          <details><summary>What does ARC help manufacturers track?</summary><p>ARC brings together component identity, inspection and parent–child traceability. This website introduces the workflow using an exhaust manufacturing example.</p></details>
          <details><summary>Does sample verification use live factory data?</summary><p>No. The checker uses fixed sample records in your browser. It does not reserve, assemble, or change real parts.</p></details>
          <details><summary>Which serial numbers can I try?</summary><p>Use ARC-26-A001 through ARC-26-A010 for parents and ARC-26-B001 through ARC-26-B010 for children. A001/B001 is valid. A005 has failed inspection and B005 is reserved. Compatible parts do not need matching numeric suffixes.</p></details>
          <details><summary>Why can a connection be blocked?</summary><p>Checks include inspection history, assembly stage, production order, product type and existing assignments. The sample permits one child per parent.</p></details>
          <details><summary>How do I discuss my production line?</summary><p><a href="mailto:saas@arc-ai.in?subject=ARC%20demo%20enquiry">Email the ARC team</a>{' '}with a brief description of your needs. Do not include confidential production data in the sample checker.</p></details>
          <details><summary>Can I use this website without analytics?</summary><p>Yes. Rejecting optional analytics does not restrict the site or the sample verification. You can change your preference using Cookie settings.</p></details>
        </section>
        <section className="closing-section">
          <Activity size={27} />
          <h2>Know what passed.<br /><span>Know what needs attention.</span></h2>
        </section>
      </main>
      <footer className="arc-footer">
        <svg className="footer-pulse" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12h10l3-7 5 14 2-5" /></svg>
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#home" aria-label="ARC home"><BrandLogo variant="footer" /></a>
            <p>ARC brings part records and inspection checks together to help production teams understand what can move forward and what needs attention.</p>
            <div className="footer-assurance">
              <div><svg className="" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6z" /></svg><span>Every check. Before every connection.</span></div>
              <p>Verified identity · Compatible parts · Clear history</p>
            </div>
          </div>
          <nav className="footer-column" aria-label="Footer navigation"><h2>Navigate</h2><a href="#about">About ARC</a><a href="#process">How it works</a><a href="#traceability">Traceability</a></nav>
          <div className="footer-column" id="footer-industries"><h2>Industries</h2><span>Automotive</span><span>Electronics</span><span>Industrial</span><span>Pharmaceutical</span><span>Food &amp; Beverage</span><span>Textile</span></div>
          <address className="footer-column footer-contact"><h2>Contact</h2><a href="tel:+916380436024"><svg className="" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" /></svg><span>+91 6380436024</span></a><a href="mailto:saas@arc-ai.in"><svg className="" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 5 10 8L22 5" /></svg><span>saas@arc-ai.in</span></a><span className="footer-social"><svg className="" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 10v7m0-10v.01M11 17v-7m0 3a3 3 0 0 1 6 0v4" /></svg><span>LinkedIn</span></span><FooterLocations /></address>
        </div>
        <div className="footer-bottom">
          <small>© 2026 ARC. All rights reserved. · v{site.version}</small>
          <nav className="legal-links" aria-label="Legal and sharing">
            <a href="/privacy">Privacy policy</a><a href="/terms">Terms</a><a href="#faq">FAQ</a><a href="/contact">Contact</a><ShareButton />
          </nav>
          <a href="#home">Back to the top{' '}<svg className="" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5m-5 5 5-5 5 5" /></svg></a>
        </div>
      </footer>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="verification-dialog">
          <DialogTitle>Check a sample connection</DialogTitle>
          <DialogDescription>Try two sample parts. ARC-26-A005 has failed inspection, and ARC-26-B005 is already reserved. Choose “Try valid pair” to see a match that passes.</DialogDescription>
          <form onSubmit={verify}>
            <label htmlFor="parent-serial">Parent serial number<Input id="parent-serial" autoComplete="off" spellCheck={false} maxLength={64} value={parent} onChange={(e) => { setParent(e.target.value); clearFeedback(); }} required /></label>
            <label htmlFor="child-serial">Child serial number<Input id="child-serial" autoComplete="off" spellCheck={false} maxLength={64} value={child} onChange={(e) => { setChild(e.target.value); clearFeedback(); }} required /></label>
            <div className="verify-actions">
              <Button type="submit" disabled={busy}>{busy ? 'Checking…' : 'Verify connection'}<ArrowRight size={15} /></Button>
              <Button variant="outline" type="button" onClick={() => { setParent('ARC-26-A001'); setChild('ARC-26-B001'); clearFeedback(); }}>Try valid pair</Button>
            </div>
          </form>
          {error && <p role="alert" className="verify-error">{error}</p>}
          {result && <output aria-live="polite" className={'verify-result ' + (result.assembly_allowed ? 'pass' : 'fail')}><ShieldCheck size={20} /><div><strong>{result.assembly_allowed ? 'Match verified' : 'Assembly blocked'}</strong><p>{result.reason}</p></div></output>}
        </DialogContent>
      </Dialog>
    </div>
    </>
  );
}
