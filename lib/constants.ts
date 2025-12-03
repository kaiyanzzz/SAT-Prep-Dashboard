import { 
  BookOpen, 
  PenTool, 
  Calculator, 
  Library, 
  Coffee, 
  FileCheck 
} from 'lucide-react';
import { ModuleData } from './types';

export const DASHBOARD_MODULES: ModuleData[] = [
  {
    id: 'official-resources',
    title: 'Official Practice Resources',
    icon: Library,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    description: 'Access official materials from College Board and Bluebook.',
    content: [
      {
        id: 'bluebook-setup',
        subtitle: 'The Bluebook App Setup',
        description: 'Install and configure the official testing software required for test day.',
        timeEstimate: '15 mins',
        progress: 100,
        status: 'completed',
        topics: [
          { text: 'Download and install Bluebook', completed: true },
          { text: 'Create College Board account', completed: true },
          { text: 'Run system compatibility check', completed: true }
        ]
      },
      {
        id: 'practice-tests',
        subtitle: 'Full-Length Practice Tests',
        description: 'Take official adaptive tests to simulate the real exam environment.',
        timeEstimate: '2.5 hours each',
        progress: 25,
        status: 'continue',
        topics: [
          { text: 'Practice Test 1', completed: true },
          { text: 'Practice Test 2', completed: false },
          { text: 'Practice Test 3', completed: false },
          { text: 'Practice Test 4', completed: false }
        ]
      },
      {
        id: 'khan-academy',
        subtitle: 'Khan Academy Drills',
        description: 'Targeted practice on specific skills synchronized with your College Board account.',
        timeEstimate: 'Ongoing',
        progress: 0,
        status: 'start',
        topics: [
          { text: 'Link College Board account', completed: false },
          { text: 'Complete diagnostic quizzes', completed: false },
          { text: 'Set weekly practice schedule', completed: false }
        ]
      }
    ]
  },
  {
    id: 'study-materials',
    title: 'Study Materials',
    icon: BookOpen,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    description: 'Core textbooks, cheat sheets, and timeline guides.',
    content: [
      {
        id: 'timeline',
        subtitle: 'Study Timeline & Planning',
        description: 'Structure your preparation based on your test date.',
        timeEstimate: '30 mins',
        progress: 100,
        status: 'completed',
        topics: [
          { text: 'Determine target test date', completed: true },
          { text: 'Set weekly study hours', completed: true },
          { text: 'Baseline PSAT/Diagnostic score', completed: true }
        ]
      },
      {
        id: 'vocab-list',
        subtitle: 'Essential Vocabulary',
        description: 'Tier 2 academic words that appear frequently in Reading modules.',
        timeEstimate: '10 mins / day',
        progress: 45,
        status: 'continue',
        topics: [
          { text: 'High-frequency academic verbs', completed: true },
          { text: 'Transition words & phrases', completed: true },
          { text: 'Tone and mood adjectives', completed: false }
        ]
      },
      {
        id: 'math-formulas',
        subtitle: 'Math Reference Sheet',
        description: 'Memorize these formulas to save time, even though some are provided.',
        timeEstimate: '1 hour',
        progress: 10,
        status: 'start',
        topics: [
          { text: 'Area and Volume formulas', completed: true },
          { text: 'Special Right Triangles', completed: false },
          { text: 'Circle Equation (h, k)', completed: false }
        ]
      }
    ]
  },
  {
    id: 'reading-writing',
    title: 'Reading & Writing',
    icon: PenTool,
    color: 'text-rose-500',
    bgColor: 'bg-rose-50',
    description: 'Master comprehension, grammar, and logical reasoning.',
    content: [
      {
        id: 'info-ideas',
        subtitle: 'Information and Ideas',
        description: 'Focus on reading comprehension, main ideas, and details.',
        timeEstimate: '3 hours',
        progress: 80,
        status: 'continue',
        topics: [
          { text: 'Command of Evidence (Textual)', completed: true },
          { text: 'Command of Evidence (Quantitative)', completed: true },
          { text: 'Central Ideas and Details', completed: true },
          { text: 'Inferences', completed: false }
        ]
      },
      {
        id: 'craft-structure',
        subtitle: 'Craft and Structure',
        description: 'Analyze how the author constructs arguments and uses words.',
        timeEstimate: '2.5 hours',
        progress: 30,
        status: 'continue',
        topics: [
          { text: 'Words in Context', completed: true },
          { text: 'Text Structure and Purpose', completed: false },
          { text: 'Cross-Text Connections', completed: false }
        ]
      },
      {
        id: 'standard-english',
        subtitle: 'Standard English Conventions',
        description: 'Grammar rules: punctuation, usage, and sentence structure.',
        timeEstimate: '4 hours',
        progress: 0,
        status: 'start',
        topics: [
          { text: 'Boundaries (Sentences vs Fragments)', completed: false },
          { text: 'Form, Structure, and Sense', completed: false },
          { text: 'Punctuation Rules', completed: false }
        ]
      }
    ]
  },
  {
    id: 'math',
    title: 'Math',
    icon: Calculator,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    description: 'Algebra, Advanced Math, Problem Solving, and Geometry.',
    content: [
      {
        id: 'algebra',
        subtitle: 'Heart of Algebra',
        description: 'Linear equations, systems, and inequalities.',
        timeEstimate: '3 hours',
        progress: 90,
        status: 'completed',
        topics: [
          { text: 'Linear equations in one variable', completed: true },
          { text: 'Linear functions (y=mx+b)', completed: true },
          { text: 'Systems of two linear equations', completed: true },
          { text: 'Linear inequalities', completed: true }
        ]
      },
      {
        id: 'advanced-math',
        subtitle: 'Advanced Math',
        description: 'Non-linear equations, quadratics, and functions.',
        timeEstimate: '5 hours',
        progress: 15,
        status: 'continue',
        topics: [
          { text: 'Equivalent expressions', completed: true },
          { text: 'Nonlinear equations (Quadratics)', completed: false },
          { text: 'Exponential functions', completed: false },
          { text: 'Polynomial factors and graphs', completed: false }
        ]
      },
      {
        id: 'problem-solving',
        subtitle: 'Problem Solving & Data',
        description: 'Ratios, rates, percentages, and probability.',
        timeEstimate: '2.5 hours',
        progress: 0,
        status: 'start',
        topics: [
          { text: 'Ratios, rates, proportions', completed: false },
          { text: 'Percentages', completed: false },
          { text: 'Probability and statistics', completed: false },
          { text: 'Scatterplots', completed: false }
        ]
      },
      {
        id: 'geometry',
        subtitle: 'Geometry and Trigonometry',
        description: 'Area, volume, angles, triangles, and trig circles.',
        timeEstimate: '3 hours',
        progress: 0,
        status: 'locked',
        topics: [
          { text: 'Area and Volume', completed: false },
          { text: 'Lines, angles, and triangles', completed: false },
          { text: 'Right triangles and trigonometry', completed: false },
          { text: 'Circles', completed: false }
        ]
      }
    ]
  },
  {
    id: 'study-tools',
    title: 'Study Tools',
    icon: FileCheck,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
    description: 'Test day strategies, mental models, and error logs.',
    content: [
      {
        id: 'strategies',
        subtitle: 'Test Taking Strategies',
        description: 'Techniques to maximize your score when stuck.',
        timeEstimate: '1 hour',
        progress: 50,
        status: 'continue',
        topics: [
          { text: 'Process of Elimination (POE)', completed: true },
          { text: 'Pacing and skipping', completed: true },
          { text: 'Annotation tools', completed: false }
        ]
      },
      {
        id: 'calc-tricks',
        subtitle: 'Desmos Calculator Hacks',
        description: 'How to use the built-in graphing calculator to solve algebra instantly.',
        timeEstimate: '1.5 hours',
        progress: 0,
        status: 'start',
        topics: [
          { text: 'Graphing systems of equations', completed: false },
          { text: 'Finding intercepts and vertices', completed: false },
          { text: 'Regression for tables', completed: false }
        ]
      },
      {
        id: 'error-log',
        subtitle: 'The Error Log',
        description: 'A system for tracking and learning from your mistakes.',
        timeEstimate: 'Ongoing',
        progress: 20,
        status: 'continue',
        topics: [
          { text: 'Setup spreadsheet', completed: true },
          { text: 'Weekly review habit', completed: false }
        ]
      }
    ]
  },
  {
    id: 'optional',
    title: 'Optional but Helpful',
    icon: Coffee,
    color: 'text-sky-500',
    bgColor: 'bg-sky-50',
    description: 'Wellness, mindset, and logistical preparation.',
    content: [
      {
        id: 'wellness',
        subtitle: 'Wellness & Mindset',
        description: 'Optimizing your brain and body for performance.',
        timeEstimate: 'N/A',
        progress: 0,
        status: 'start',
        topics: [
          { text: 'Sleep hygiene for memory', completed: false },
          { text: 'Test anxiety management', completed: false },
          { text: 'Nutrition for focus', completed: false }
        ]
      },
      {
        id: 'logistics',
        subtitle: 'Test Day Logistics',
        description: 'What to bring and what to expect on the day.',
        timeEstimate: '15 mins',
        progress: 0,
        status: 'locked',
        topics: [
          { text: 'Admissions ticket checklist', completed: false },
          { text: 'Device charging & requirements', completed: false },
          { text: 'Prohibited items list', completed: false }
        ]
      }
    ]
  }
];

