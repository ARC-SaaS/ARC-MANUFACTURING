import type { AnchorHTMLAttributes } from 'react';

interface StandaloneLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/** Native anchor fallback for the single-file standalone export. */
export default function StandaloneLink({
  href,
  children,
  ...attributes
}: StandaloneLinkProps) {
  return (
    <a href={href} {...attributes}>
      {children}
    </a>
  );
}
