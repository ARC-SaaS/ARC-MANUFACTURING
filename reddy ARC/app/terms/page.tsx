import InfoPage from '@/components/info-page';
import { pageMetadata, siteOrigin } from '@/lib/seo';
import site from '@/lib/site.json';
export const metadata = {
  ...pageMetadata(
    'Website Terms | ARC',
    'Terms for using the ARC website and its read-only sample verification.',
    '/terms',
  ),
  robots: { index: Boolean(siteOrigin) && site.legalReviewed, follow: Boolean(siteOrigin) },
};
export default function Terms() {
  return (
    <InfoPage title="Website terms" className="legal-page">
      {!site.legalReviewed && (
        <p className="policy-status">
          Draft for owner review · Updated 9 September 2026
        </p>
      )}
      <section>
        <h2>Website purpose</h2>
        <p>
          This website introduces ARC and provides a demonstration of component
          verification. Product descriptions are informational. Any supply of
          software, equipment, or services requires a separate agreement with
          ARC.
        </p>
      </section>
      <section>
        <h2>Demonstration limits</h2>
        <p>
          Sample results use fixed records. They are not a safety certification,
          manufacturing instruction, or authorization to assemble physical
          parts. No reservation or assembly takes place when you use the sample
          form.
        </p>
      </section>
      <section>
        <h2>Responsible use</h2>
        <p>
          Do not attempt unauthorized access, interfere with the website,
          introduce malicious code, or submit confidential production
          information through the demonstration.
        </p>
      </section>
      <section>
        <h2>Content and links</h2>
        <p>
          ARC branding and website material remain subject to the rights of
          their respective owners. Links to email, telephone, or other services
          are provided for convenience; those services operate under their own
          terms.
        </p>
      </section>
      <section>
        <h2>Availability and accuracy</h2>
        <p>
          Website content and availability may change. Confirm technical
          specifications and commercial details directly with ARC before relying
          on them. These website terms do not replace a signed customer
          agreement or limit rights that cannot legally be limited.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to{' '}
          <a href="mailto:saas@arc-ai.in">saas@arc-ai.in</a>.
        </p>
      </section>
      {!site.legalReviewed && (
        <p className="policy-status">
          The legal operator, jurisdiction, and any applicable commercial terms
          must be confirmed by the owner before approval.
        </p>
      )}
    </InfoPage>
  );
}
