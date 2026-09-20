// The signed-in user's business and its WhatsApp number, from the database.
//
// Both queries are scoped by RLS to the businesses the user belongs to, so no
// filter is needed here — and adding one would only hide a policy bug.
//
// Before this existed, the app told every user they were connected, with a
// made-up masked number. Connection status is a fact about the account; it must
// come from the account.
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { DATA_SOURCE } from './transcriptSource';

export interface WhatsAppNumber {
  displayPhoneNumber: string;
  wabaId: string;
}

export interface BusinessProfile {
  businessName: string | null;
  /** null when no active WhatsApp number is registered for this business. */
  number: WhatsAppNumber | null;
  connected: boolean;
  loading: boolean;
  error: string | null;
}

/** "27115550142" -> "+27 11 555 0142" — grouping only, no digits hidden. */
export function formatPhoneNumber(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length < 7) return raw;
  const cc = digits.slice(0, 2);
  const rest = digits.slice(2);
  const groups = [rest.slice(0, 2), rest.slice(2, 5), rest.slice(5)].filter(Boolean);
  return `+${cc} ${groups.join(' ')}`;
}

export function useBusinessProfile(): BusinessProfile {
  const [businessName, setBusinessName] = useState<string | null>(
    DATA_SOURCE === 'mock' ? 'Demo Business' : null
  );
  const [number, setNumber] = useState<WhatsAppNumber | null>(
    DATA_SOURCE === 'mock' ? { displayPhoneNumber: '27115550142', wabaId: 'demo' } : null
  );
  const [loading, setLoading] = useState(DATA_SOURCE === 'supabase');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (DATA_SOURCE === 'mock') return;
    let cancelled = false;

    (async () => {
      try {
        const [business, whatsapp] = await Promise.all([
          supabase.from('businesses').select('name').limit(1).maybeSingle(),
          supabase
            .from('whatsapp_numbers')
            .select('display_phone_number, waba_id')
            .eq('is_active', true)
            .limit(1)
            .maybeSingle(),
        ]);
        if (cancelled) return;
        if (business.error) throw new Error(business.error.message);
        if (whatsapp.error) throw new Error(whatsapp.error.message);

        setBusinessName(business.data?.name ?? null);
        setNumber(
          whatsapp.data
            ? {
                displayPhoneNumber: whatsapp.data.display_phone_number,
                wabaId: whatsapp.data.waba_id,
              }
            : null
        );
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setBusinessName(null);
        setNumber(null);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { businessName, number, connected: number !== null, loading, error };
}
