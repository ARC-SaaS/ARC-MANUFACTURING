import Image from 'next/image';
import '@/app/brand-logo.css';
import { loaderImage } from '@/shared/loader-image.mjs';

export default function BrandLogo({ variant = 'header' }: { variant?: 'header' | 'footer' | 'loader' }) {
  return (
    <span className={`brand-logo brand-logo--${variant}`}>
      <span className="brand-art">
        <Image unoptimized={variant === 'loader'} src={variant === 'loader' ? loaderImage : "/arc-logo-transparent.png"} alt="ARC — Automate, Optimize, Elevate" width={1774} height={887}
          priority={variant !== 'footer'} fetchPriority={variant === 'loader' ? 'high' : 'auto'}
          decoding={variant === 'loader' ? 'sync' : 'async'} />
      </span>
      <span className="brand-tagline" aria-hidden="true">AUTOMATE · OPTIMIZE · ELEVATE</span>
    </span>
  );
}
