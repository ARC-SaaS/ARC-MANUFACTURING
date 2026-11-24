import type { ComponentProps } from 'react';

// The file:// export has no image server. Assets are embedded by the exporter.
export default function StandaloneImage({
  unoptimized: _unoptimized,
  priority,
  alt,
  ...props
}: ComponentProps<'img'> & { unoptimized?: boolean; priority?: boolean }) {
  // A standalone file has no Next image server; the exporter embeds the image.
  // oxlint-disable-next-line nextjs/no-img-element
  return <img {...props} alt={alt ?? ''} loading={priority ? 'eager' : props.loading} />;
}
