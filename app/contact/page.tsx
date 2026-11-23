import InfoPage from '@/components/info-page';
import { pageMetadata } from '@/lib/seo';
import './contact.css';

export const metadata = pageMetadata(
  'Contact ARC | Production Automation & Traceability',
  'Learn how to reach ARC about production automation, component inspection and traceability.',
  '/contact',
);

export default function Contact() {
  return (
    <InfoPage title="Let’s talk about your production." className="contact-page">
      <div className="contact-intro">
        <p>Have a question about ARC or want to explore the sample walkthrough? Business contact details will appear here once the team confirms the public email and phone lines.</p>
      </div>
      <div className="contact-grid">
        <section className="contact-card" aria-labelledby="contact-details">
          <span className="section-label">CONTACT ARC</span>
          <h2 id="contact-details">Business contact details are being confirmed</h2>
          <p>In the meantime, explore the interactive component verification example on the homepage. Please do not enter confidential production data.</p>
          <a className="site-primary" href="/#traceability">Explore the sample walkthrough <span aria-hidden="true">↗</span></a>
        </section>
      </div>
    </InfoPage>
  );
}
