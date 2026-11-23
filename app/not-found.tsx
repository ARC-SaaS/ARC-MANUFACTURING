import InfoPage from '@/components/info-page';
import Link from 'next/link';
export const metadata = {
  title: 'Page not found | ARC',
  robots: { index: false, follow: true },
};
export default function NotFound() {
  return (
    <InfoPage title="Page not found">
      <p>
        This address does not point to an ARC page. You can return home or
        contact our team.
      </p>
      <p>
        <Link className="site-primary" href="/">
          Back to ARC
        </Link>
      </p>
    </InfoPage>
  );
}
