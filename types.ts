
export enum AppState {
  IDLE = 'IDLE',
  ASKING_QUESTIONS = 'ASKING_QUESTIONS',
  WAITING_FOR_ANSWERS = 'WAITING_FOR_ANSWERS',
  ANALYZING = 'ANALYZING',
  SHOWING_RESULT = 'SHOWING_RESULT'
}

export interface Diagnosis {
  type: 'Concept Gap' | 'Logic Gap' | 'Resource Gap' | 'Clarity/Motivation Gap' | string;
  reason: string;
  steps: string[];
  tip?: string;
}

export interface DiagnosticQuestion {
  id: number;
  question: string;
  answer: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
