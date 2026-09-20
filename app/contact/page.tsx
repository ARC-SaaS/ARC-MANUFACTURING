import InfoPage from '@/components/info-page';
import BrandLogo from '@/components/brand-logo';
import { pageMetadata } from '@/lib/seo';
import './contact.css';

export const metadata = pageMetadata(
  'Contact ARC | Production Automation & Traceability',
  'Contact ARC to discuss production automation, component inspection and traceability. Reach our team by email or phone in Chennai, India and Doha, Qatar.',
  '/contact',
);

export default function Contact() {
  return (
    <InfoPage title="Let’s talk about your production." className="contact-page" showFooter showLegalNav={false}>
      <div className="contact-intro">
        <BrandLogo />
        <p>Have a question about ARC or want to explore a demo? Tell us about your production process and the checks you want to bring together.</p>
      </div>
      <div className="contact-grid">
        <section className="contact-card" aria-labelledby="contact-email">
          <span className="section-label">START A CONVERSATION</span>
          <h2 id="contact-email">Email our team</h2>
          <p>For product questions, demonstrations, and enquiries.</p>
          <a className="contact-detail" href="mailto:saas@arc-ai.in">saas@arc-ai.in</a>
          <a className="site-primary" href="mailto:saas@arc-ai.in?subject=ARC%20enquiry">Send an email <span aria-hidden="true">↗</span></a>
        </section>
        <section className="contact-card" aria-labelledby="contact-phone">
          <span className="section-label">SPEAK WITH US</span>
          <h2 id="contact-phone">Call ARC</h2>
          <p>Talk through your component tracking and inspection needs.</p>
          <a className="contact-detail" href="tel:+916380436024">+91 6380436024</a>
          <a className="text-link" href="tel:+916380436024">Call our team <span aria-hidden="true">↗</span></a>
        </section>
      </div>
    </InfoPage>
  );
}
