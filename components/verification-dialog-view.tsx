'use client';

import type { SyntheticEvent } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import type { request } from '@/lib/api';

type SampleResult = Awaited<ReturnType<typeof request>>;

interface VerificationDialogViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  parent: string;
  child: string;
  onParentChange: (value: string) => void;
  onChildChange: (value: string) => void;
  busy: boolean;
  error: string;
  result: SampleResult | null;
  onSubmit: (event: SyntheticEvent<HTMLFormElement>) => void;
  onTryValid: () => void;
}

export default function VerificationDialogView({
  open,
  onOpenChange,
  parent,
  child,
  onParentChange,
  onChildChange,
  busy,
  error,
  result,
  onSubmit,
  onTryValid,
}: VerificationDialogViewProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="verification-dialog">
        <DialogTitle>Check a sample connection</DialogTitle>
        <DialogDescription>
          Try the valid sample pair first. Then change either serial to A005
          or B005 to see why a connection can be blocked.
        </DialogDescription>
        <form onSubmit={onSubmit}>
          <label htmlFor="parent-serial">
            Parent serial number
            <Input
              id="parent-serial"
              autoComplete="off"
              spellCheck={false}
              maxLength={64}
              value={parent}
              onChange={(event) => onParentChange(event.target.value)}
              required
            />
          </label>
          <label htmlFor="child-serial">
            Child serial number
            <Input
              id="child-serial"
              autoComplete="off"
              spellCheck={false}
              maxLength={64}
              value={child}
              onChange={(event) => onChildChange(event.target.value)}
              required
            />
          </label>
          <div className="verify-actions">
            <Button type="submit" disabled={busy}>
              {busy ? 'Checking…' : 'Verify connection'}
              <ArrowRight size={15} aria-hidden="true" />
            </Button>
            <Button variant="outline" type="button" onClick={onTryValid}>
              Try valid pair
            </Button>
          </div>
        </form>
        {error && (
          <p role="alert" className="verify-error">
            {error}
          </p>
        )}
        {result && (
          <output
            aria-live="polite"
            className={`verify-result ${result.assembly_allowed ? 'pass' : 'fail'}`}
          >
            <ShieldCheck size={20} aria-hidden="true" />
            <div>
              <strong>
                {result.assembly_allowed
                  ? 'Match verified'
                  : 'Assembly blocked'}
              </strong>
              <p>{result.reason}</p>
            </div>
          </output>
        )}
      </DialogContent>
    </Dialog>
  );
}
