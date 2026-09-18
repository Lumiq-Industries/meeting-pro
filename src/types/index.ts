// 'failed': Meta's transcript could not be downloaded or verified. Shown to the
// customer with a retry, never hidden — a call that silently vanishes is worse
// than a visible error.
export type TranscriptStatus = 'completed' | 'processing' | 'live' | 'failed';
export type TranscriptSource = 'whatsapp_voice' | 'whatsapp_call' | 'meeting' | 'upload';

export interface Speaker {
  id: string;
  name: string;
  color: string;
}

export interface ActionItem {
  id: string;
  text: string;
  assignee?: string;
  completed: boolean;
}

export interface TranscriptSegment {
  id: string;
  speakerId: string;
  text: string;
  timestamp: string;
}

export interface Transcript {
  id: string;
  title: string;
  source: TranscriptSource;
  status: TranscriptStatus;
  date: string;
  duration: string;
  participants: string[];
  tags: string[];
  summary?: string;
  actionItems?: ActionItem[];
  segments?: TranscriptSegment[];
  keywordMatches?: number;
}

export interface DashboardStats {
  totalSessions: number;
  hoursTranscribed: number;
  actionItemsGenerated: number;
  whatsappConnected: boolean;
  plan: 'voice_call' | 'meeting_pro' | 'enterprise';
}

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  TranscriptDetail: { transcriptId: string };
  WhatsAppConnect: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Live: undefined;
  Archive: undefined;
  Settings: undefined;
};
