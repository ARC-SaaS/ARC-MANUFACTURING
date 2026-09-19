import InfoPage from '@/components/info-page';
import { pageMetadata, siteOrigin } from '@/lib/seo';
import site from '@/lib/site.json';
export const metadata = {
  ...pageMetadata(
    'Privacy Policy | ARC',
    'How the ARC website handles sample inputs, contact information and cookie preferences.',
    '/privacy',
  ),
  robots: { index: Boolean(siteOrigin) && site.legalReviewed, follow: Boolean(siteOrigin) },
};
export default function Privacy() {
  return (
    <InfoPage title="Privacy policy" className="legal-page">
      {!site.legalReviewed && (
        <p className="policy-status">
          Draft for owner review · Updated 9 September 2026
        </p>
      )}
      <section>
        <h2>About this notice</h2>
        <p>
          This notice covers the ARC website and its sample verification tool.
          For questions about your information, contact{' '}
          <a href="mailto:saas@arc-ai.in">saas@arc-ai.in</a>.
        </p>
      </section>
      <section>
        <h2>Sample verification</h2>
        <p>
          Sample serial numbers are checked in your browser against fixed
          demonstration records. The verification form does not send its inputs
          to a factory, create an account, reserve a part, or store a production
          record. Please do not enter confidential production data.
        </p>
      </section>
      <section>
        <h2>Contacting us</h2>
        <p>
          Email and telephone links open your own email or calling application.
          If you contact ARC, the information you choose to share is used to
          respond to your enquiry. Your email or telephone provider also
          processes that communication under its own terms.
        </p>
      </section>
      <section>
        <h2>Cookies and optional analytics</h2>
        <p>
          We save your cookie choice in this browser for up to six months. This
          preference is necessary to remember your decision. Optional analytics
          is disabled unless configured and you select Accept analytics.
          Rejecting analytics does not restrict the website.
        </p>
        <p>
          {site.analyticsId
            ? 'If you accept, Google Analytics receives page-view information such as page path and browser/device information. Sample serial numbers are not included in our analytics events. Google processes network information when receiving requests.'
            : 'No analytics provider is currently active on this website.'}{' '}
          You can withdraw permission using Cookie settings at any time.
        </p>
      </section>
      <section>
        <h2>Hosting and security</h2>
        <p>
          The hosting service may process connection information, such as IP
          addresses and request logs, to deliver and secure the website. The
          website does not offer uploads, payments, or user accounts.
        </p>
      </section>
      <section>
        <h2>Your choices</h2>
        <p>
          You can clear saved browser preferences, reject analytics, or contact
          ARC about access, correction, or deletion of information you have
          provided. Available rights depend on the laws that apply to you.
        </p>
      </section>
      {!site.legalReviewed && (
        <section>
          <h2>Information awaiting confirmation</h2>
          <p>
            The owner must confirm the legal operator and address, applicable
            jurisdiction, enquiry and hosting-log retention periods, service
            providers, and any international transfers before this draft is
            approved.
          </p>
        </section>
      )}
      <section>
        <h2>Updates</h2>
        <p>
          Changes will be reflected on this page. Review this notice before
          sharing personal or confidential information.
        </p>
      </section>
    </InfoPage>
  );
}
