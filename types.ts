export type Language = 'en' | 'ar' | 'fa';

export enum AppMode {
  HUG_PAST_SELF = 'HUG_PAST_SELF',
  COUPLE_KISS = 'COUPLE_KISS',
  STANDING_TOGETHER = 'STANDING_TOGETHER',
  ZOO_BACKGROUND = 'ZOO_BACKGROUND',
  SMOOTH_FACE = 'SMOOTH_FACE',
  CUSTOM_TEXT = 'CUSTOM_TEXT',
}

export interface Translation {
  title: string;
  uploadTitle: string;
  image1Label: string;
  image2Label: string;
  generateBtn: string;
  downloadBtn: string;
  loading: string;
  selectMode: string;
  modes: {
    [key in AppMode]: string;
  };
  footer: string;
  customPromptPlaceholder: string;
}

export interface AppState {
  image1: string | null; // Base64
  image2: string | null; // Base64
  generatedImage: string | null;
  isLoading: boolean;
  mode: AppMode;
  customPrompt: string;
  language: Language;
  error: string | null;
}