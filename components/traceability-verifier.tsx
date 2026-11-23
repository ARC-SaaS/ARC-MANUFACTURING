'use client';

import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { SyntheticEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { request } from '@/lib/api';

type SampleResult = Awaited<ReturnType<typeof request>>;

interface SampleInput {
  parentSerial: string;
  childSerial: string;
}

interface ModelContext {
  registerTool(
    tool: {
      name: string;
      description: string;
      inputSchema: object;
      annotations: { readOnlyHint: boolean };
      execute: (
        input: SampleInput,
      ) => Promise<{ assembly_allowed: boolean; reason: string }>;
    },
    options: { signal: AbortSignal },
  ): unknown;
}

const VerificationDialogView = lazy(
  () => import('@/components/verification-dialog-view'),
);

export default function TraceabilityVerifier() {
  const [open, setOpen] = useState(false);
  const [parent, setParent] = useState('ARC-26-A001');
  const [child, setChild] = useState('ARC-26-B001');
  const [result, setResult] = useState<SampleResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const revision = useRef(0);

  function clearFeedback() {
    revision.current++;
    setResult(null);
    setError('');
    setBusy(false);
  }

  useEffect(() => {
    const modelContext = (
      document as Document & { modelContext?: ModelContext }
    ).modelContext;
    if (!modelContext?.registerTool) return;

    const lifecycle = new AbortController();
    Promise.resolve()
      .then(() => {
        if (lifecycle.signal.aborted) return;
        return modelContext.registerTool(
          {
            name: 'verify_sample_arc_connection',
            description:
              'Check two sample ARC serials and show the compatibility result. Does not reserve or assemble parts.',
            inputSchema: {
              type: 'object',
              properties: {
                parentSerial: { type: 'string' },
                childSerial: { type: 'string' },
              },
              required: ['parentSerial', 'childSerial'],
              additionalProperties: false,
            },
            annotations: { readOnlyHint: true },
            execute: async (input: SampleInput) => {
              clearFeedback();
              setOpen(true);
              const ticket = revision.current;
              try {
                if (
                  typeof input.parentSerial !== 'string' ||
                  typeof input.childSerial !== 'string'
                ) {
                  throw new Error('Both serial numbers must be strings.');
                }
                const response = await request(
                  '/traceability/validate',
                  'POST',
                  input,
                );
                if (ticket === revision.current) {
                  setParent(input.parentSerial.trim());
                  setChild(input.childSerial.trim());
                  setResult(response);
                }
                return {
                  assembly_allowed: response.assembly_allowed,
                  reason: response.reason,
                };
              } catch (caught: unknown) {
                if (ticket === revision.current) {
                  setError(
                    caught instanceof Error
                      ? caught.message
                      : 'Verification failed.',
                  );
                }
                throw caught;
              }
            },
          },
          { signal: lifecycle.signal },
        );
      })
      .catch(() => {});

    return () => lifecycle.abort();
  }, []);

  async function verify(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    clearFeedback();
    const ticket = revision.current;
    setBusy(true);
    try {
      const response = await request('/traceability/validate', 'POST', {
        parentSerial: parent,
        childSerial: child,
      });
      if (ticket === revision.current) setResult(response);
    } catch (caught: unknown) {
      if (ticket === revision.current) {
        setError(
          caught instanceof Error ? caught.message : 'Verification failed.',
        );
      }
    } finally {
      if (ticket === revision.current) setBusy(false);
    }
  }

  function updateParent(value: string) {
    setParent(value);
    clearFeedback();
  }

  function updateChild(value: string) {
    setChild(value);
    clearFeedback();
  }

  function chooseValidPair() {
    setParent('ARC-26-A001');
    setChild('ARC-26-B001');
    clearFeedback();
  }

  return (
    <>
      <button
        className="site-primary"
        type="button"
        onClick={() => {
          setOpen(true);
          clearFeedback();
        }}
      >
        Start the walkthrough <ArrowUpRight size={17} aria-hidden="true" />
      </button>
      {open && (
        <Suspense fallback={null}>
          <VerificationDialogView
            open={open}
            onOpenChange={setOpen}
            parent={parent}
            child={child}
            onParentChange={updateParent}
            onChildChange={updateChild}
            busy={busy}
            error={error}
            result={result}
            onSubmit={verify}
            onTryValid={chooseValidPair}
          />
        </Suspense>
      )}
    </>
  );
}
