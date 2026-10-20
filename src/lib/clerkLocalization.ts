import { enUS } from '@clerk/localizations';
import type { LocalizationResource } from '@clerk/types';

/** Clerk UI copy — Meeting Pro titles inside the embedded card. */
export const meetingProClerkLocalization: LocalizationResource = {
  ...enUS,
  signIn: {
    ...(enUS.signIn ?? {}),
    start: {
      ...(enUS.signIn?.start ?? {}),
      title: 'Welcome back',
      subtitle: 'Sign in to Meeting Pro — Lumiq Industries',
    },
  },
  signUp: {
    ...(enUS.signUp ?? {}),
    start: {
      ...(enUS.signUp?.start ?? {}),
      title: 'Create your account',
      subtitle: 'Get started with Meeting Pro — Lumiq Industries',
    },
  },
};
