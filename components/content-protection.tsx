'use client';
import { useEffect } from 'react';
import { installCopyProtection } from '@/shared/copy-protection.mjs';

export default function ContentProtection() {
  useEffect(() => installCopyProtection(), []);
  return null;
}
