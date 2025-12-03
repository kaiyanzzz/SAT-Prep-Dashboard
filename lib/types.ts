import { LucideIcon } from 'lucide-react';

export interface TopicItem {
  text: string;
  completed: boolean;
}

export interface ContentItem {
  id: string;
  subtitle: string;
  description: string;
  timeEstimate: string;
  progress: number; // 0 to 100
  status: 'locked' | 'start' | 'continue' | 'completed';
  topics: TopicItem[];
}

export type ModuleType = 'study' | 'resource';

export interface ModuleData {
  id: string;
  title: string;
  icon: LucideIcon;
  color: string; // Tailwind class for text color
  bgColor: string; // Tailwind class for bg color
  description: string;
  content: ContentItem[];
  type?: ModuleType;
}

export interface StudyPlan {
  html: string;
  focus: string;
  weeks: number;
}

export interface ModuleProgress {
  moduleId: string;
  percentComplete: number;
  questionsAnswered: number;
  accuracy: number;
}

export interface UserStats {
  name: string;
  totalProgress: number;
  currentStreak: number;
  questionsAnswered: number;
  estimatedScore: number;
  scoreHistory: { date: string; score: number }[];
  weakAreas: string[];
  moduleProgress: Record<string, ModuleProgress>;
}

export interface ActiveUnit {
  moduleColor: string;
  moduleTitle: string;
  unit: ContentItem;
}

export interface ResourceLink {
  title: string;
  type: 'pdf' | 'link' | 'video';
  url: string;
  size?: string;
}

export interface SectionData {
  id: string;
  subtitle: string;
  description: string;
  timeEstimate: string;
  progress: number;
  status: 'locked' | 'start' | 'continue' | 'completed';
  topics: TopicItem[];
}

