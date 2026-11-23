// Lightweight in-app bus so hang-up (and delayed Meta webhooks) can refresh
// call lists without a pull-to-refresh. Screens subscribe; Softphone publishes.

type Listener = () => void;

const listeners = new Set<Listener>();

export function subscribeWorkspaceRefresh(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Ask every mounted call/transcript list to reload. */
export function notifyWorkspaceRefresh(): void {
  for (const listener of listeners) listener();
}

/** Hang-up then Meta transcription can land a few seconds later. */
export function notifyWorkspaceRefreshSoon(): void {
  notifyWorkspaceRefresh();
  setTimeout(notifyWorkspaceRefresh, 1_500);
  setTimeout(notifyWorkspaceRefresh, 6_000);
}
