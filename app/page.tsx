import Link from 'next/link';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import TraceabilityVerifier from '@/components/traceability-verifier';
import ReloadScreen from '@/components/reload-screen';
import SiteMotion from '@/components/site-motion';
import { sampleRecordCounts } from '@/lib/api';

import {
  ArrowRight,
  ArrowUpRight,
  Activity,
  ScanLine,
  GitMerge,
  ChevronDown,
  Check,
  Barcode,
  CircleCheck,
  Boxes,
  ShieldCheck,
} from 'lucide-react';

const steps = [
  ['01', 'Identify', 'Give every component a unique serial number.'],
  ['02', 'Test', 'Check for leakage and fire resistance.'],
  ['03', 'Inspect', 'Verify quality before moving forward.'],
  ['04', 'Assemble', 'Match the right parent and child components.'],
  ['05', 'Release', 'Send only verified products to final output.'],
];

export default function Home() {
  return (
    <>
      <ReloadScreen />
      <SiteMotion />
      <div className="simple-site">
        <SiteHeader />
        <main id="main-content" className="site-main" tabIndex={-1}>
          <section id="home" className="site-hero">
            <div className="hero-ambient" aria-hidden="true">
              <span className="hero-orb hero-orb--blue" />
              <span className="hero-orb hero-orb--cyan" />
              <span className="hero-orb hero-orb--violet" />
              <span className="hero-light-wave hero-light-wave--one" />
              <span className="hero-light-wave hero-light-wave--two" />
              <i className="hero-particle" />
              <i className="hero-particle" />
              <i className="hero-particle" />
              <i className="hero-particle" />
              <i className="hero-particle" />
              <i className="hero-particle" />
              <i className="hero-particle" />
              <i className="hero-particle" />
              <i className="hero-particle" />
              <i className="hero-particle" />
              <i className="hero-pointer-glow" />
            </div>
            <div className="hero-content">
              <div className="hero-copy">
                <div className="hero-kicker">
                  <span /> COMPONENT RECORDS, CONNECTED
                </div>
                <h1>
                  Trace every part <span>from inspection through assembly.</span>
                </h1>
                <div className="hero-actions">
                  <Link className="site-primary" href="/contact">
                    Talk to the ARC team <ArrowUpRight size={17} />
                  </Link>
                  <a href="#traceability" className="text-link">
                    See how parts connect <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
              <aside className="hero-passport" aria-label="Sample component record">
                <div className="passport-topline">
                  <span><Barcode size={15} /> COMPONENT PASSPORT</span>
                  <span className="passport-sample">SAMPLE</span>
                </div>
                <div className="passport-title">
                  <div className="passport-part-icon"><Boxes size={25} /></div>
                  <div>
                    <small>PARENT ASSEMBLY</small>
                    <strong>Exhaust assembly</strong>
                  </div>
                  <CircleCheck className="passport-check" size={20} />
                </div>
                <div className="passport-serial">ARC-26-A001</div>
                <div className="passport-events" aria-label="Record events">
                  <div className="passport-event is-complete">
                    <span className="event-marker"><Check size={11} /></span>
                    <div><strong>Identity assigned</strong><small>Unique serial recorded</small></div>
                    <span className="event-state">RECORDED</span>
                  </div>
                  <div className="passport-event is-complete">
                    <span className="event-marker"><Check size={11} /></span>
                    <div><strong>Inspection passed</strong><small>Quality check on file</small></div>
                    <span className="event-state">PASSED</span>
                  </div>
                  <div className="passport-event is-next">
                    <span className="event-marker"><GitMerge size={11} /></span>
                    <div><strong>Assembly match</strong><small>Parent–child relationship</small></div>
                    <span className="event-state">NEXT</span>
                  </div>
                </div>
                <div className="passport-foot"><span>RECORD STATUS</span><b><i /> Ready for verification</b></div>
              </aside>
            </div>
            <div className="hero-bottom">
              <span>IDENTITY <i /> INSPECTION <i /> ASSEMBLY</span>
              <a href="#about" aria-label="Scroll to about ARC">
                <span>SCROLL TO EXPLORE</span>
                <ChevronDown size={15} />
              </a>
            </div>
          </section>
          <section id="about" className="about-section">
            <div className="section-label">
              <span>01 / ABOUT ARC</span>
            </div>
            <div className="about-body">
              <h2>
                A record at every step.
                <br />
                <span>A clearer view of each part.</span>
              </h2>
              <p>
                Before a part moves on, your team needs to know what it is,
                which checks it has passed, and where it belongs. ARC brings
                those details together. This example shows how that can work on
                a manufacturing line.
              </p>
              <div className="principles">
                <div>
                  <ScanLine size={21} />
                  <h3>Identify each part</h3>
                  <p>
                    A unique serial number lets your team follow the same part
                    through production.
                  </p>
                </div>
                <div>
                  <ShieldCheck size={21} />
                  <h3>Check its history</h3>
                  <p>
                    See whether a part has passed the inspections it needs
                    before moving on.
                  </p>
                </div>
                <div>
                  <GitMerge size={21} />
                  <h3>Check the fit</h3>
                  <p>
                    Confirm that a component belongs with its parent assembly
                    before putting them together.
                  </p>
                </div>
              </div>
              <aside className="about-case-study" aria-labelledby="sample-workflow-title">
                <div className="case-study-heading">
                  <span className="case-study-kicker">ILLUSTRATIVE WORKFLOW</span>
                  <span className="case-study-context">EXHAUST ASSEMBLY · SAMPLE DATA</span>
                  <h3 id="sample-workflow-title">Check the record before making the connection.</h3>
                </div>
                <div className="case-study-detail">
                  <p>
                    In the sample, the verifier checks inspection history,
                    production order and product type before linking an exhaust
                    parent to a child. A001/B001 passes; A005 fails inspection
                    and B005 is already reserved.
                  </p>
                  <a href="#traceability">
                    See the sample verification <ArrowRight size={14} />
                  </a>
                </div>
              </aside>
            </div>
          </section>
          <section id="process" className="process-section">
            <div className="section-label">02 / THE PROCESS</div>
            <div className="section-heading-simple">
              <h2>
                From the first scan
                <br />
                <span>to the finished product.</span>
              </h2>
              <p>
                Five stages to follow.
                <br />A record of what happens at each one.
              </p>
            </div>
            <div className="process-steps">
              {steps.map(([n, title, description]) => (
                <article key={n}>
                  <div className="step-top">
                    <span>{n}</span>
                    {n !== '05' && <ArrowRight size={17} />}
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
            <div className="repair-note">
              <Activity size={15} />
              <p>
                If a part fails a check, it needs repair and another inspection
                before it can move on.
              </p>
            </div>
          </section>
          <section id="traceability" className="trace-section">
            <div className="trace-copy">
              <div className="section-label">03 / TRACEABILITY</div>
              <h2>
                Do these parts
                <br />
                <span>belong together?</span>
              </h2>
              <p>
                A matching name is only the start. The sample checker looks at
                each part’s serial number, inspection history, production order,
                and any existing assignment before confirming a match.
              </p>
              <ul>
                <li>
                  <Check size={16} /> Check that both parts have passed
                  inspection.
                </li>
                <li>
                  <Check size={16} /> Check that neither part is already
                  assigned.
                </li>
                <li>
                  <Check size={16} /> Explain why a pair cannot be used.
                </li>
              </ul>
              <div className="trace-sample-metrics" aria-label="Sample record counts">
                <div className="metrics-label">IN THE SAMPLE DATA</div>
                <div className="metrics-values">
                  <div><strong>{sampleRecordCounts.total}</strong><span>component records</span></div>
                  <div><strong>{sampleRecordCounts.parents}</strong><span>parent serials</span></div>
                  <div><strong>{sampleRecordCounts.children}</strong><span>child serials</span></div>
                </div>
              </div>
              <small className="sample-note">
                Uses sample records. No real parts are changed.
              </small>
            </div>
            <div className="trace-example">
              <div className="example-top">
                <GitMerge size={19} />
                <span>INTERACTIVE WALKTHROUGH</span>
                <span className="sample-label">SAMPLE DATA</span>
              </div>
              <h3>Check a parent and child before they connect.</h3>
              <ol className="walkthrough-steps">
                <li><span>1</span><div><strong>Enter two serials</strong><p>Use sample parent A001 and child B001 to start.</p></div></li>
                <li><span>2</span><div><strong>Review the checks</strong><p>Inspection, product type, order and assignment are checked.</p></div></li>
                <li><span>3</span><div><strong>See why it passes or stops</strong><p>Try A005 or B005 to see a blocked connection.</p></div></li>
              </ol>
              <TraceabilityVerifier />
              <small className="sample-note">The demonstration uses fixed records. It never changes real parts.</small>
            </div>
          </section>
          <section id="faq" className="faq-section" aria-labelledby="faq-title">
            <h2 id="faq-title">Frequently asked questions</h2>
            <details>
              <summary>What does ARC help manufacturers track?</summary>
              <p>
                ARC brings together component identity, inspection and
                parent–child traceability. This website introduces the workflow
                using an exhaust manufacturing example.
              </p>
            </details>
            <details>
              <summary>Does sample verification use live factory data?</summary>
              <p>
                No. The checker uses fixed sample records in your browser. It
                does not reserve, assemble, or change real parts.
              </p>
            </details>
            <details>
              <summary>Which serial numbers can I try?</summary>
              <p>
                Use ARC-26-A001 through ARC-26-A010 for parents and ARC-26-B001
                through ARC-26-B010 for children. A001/B001 is valid. A005 has
                failed inspection and B005 is reserved. Compatible parts do not
                need matching numeric suffixes.
              </p>
            </details>
            <details>
              <summary>Why can a connection be blocked?</summary>
              <p>
                Checks include inspection history, assembly stage, production
                order, product type and existing assignments. The sample permits
                one child per parent.
              </p>
            </details>
            <details>
              <summary>How do I discuss my production line?</summary>
              <p>
                Contact details will be published after the team confirms the
                public business contact channels. Do not include
                confidential production data in the sample checker.
              </p>
            </details>
            <details>
              <summary>Can I use this website without analytics?</summary>
              <p>
                Yes. Rejecting optional analytics does not restrict the site or
                the sample verification. You can change your preference using
                Cookie settings.
              </p>
            </details>
          </section>
          <section className="closing-section">
            <Activity size={27} />
            <h2>
              Know what passed before parts connect.
            </h2>
            <p>See how a connected component record could fit your production line.</p>
            <Link className="site-primary" href="/contact">Talk to the ARC team <ArrowUpRight size={17} /></Link>
          </section>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
