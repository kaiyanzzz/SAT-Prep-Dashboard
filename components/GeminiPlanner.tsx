'use client';

import React, { useState } from 'react';
import { Sparkles, Calendar, Target, ArrowRight, TrendingUp } from 'lucide-react';
import { StudyPlan } from '@/lib/types';

interface GeminiPlannerProps {
  onComplete: (plan: StudyPlan) => void;
}

const MOCK_PLANS: Record<string, string> = {
  'Balanced Approach': `
    <div class="mb-6">
      <h4 class="font-bold text-indigo-700 mb-3 text-lg">Phase 1: Foundations (Weeks 1-2)</h4>
      <ul class="list-disc pl-5 space-y-2 text-gray-600 text-sm">
        <li><strong class="text-slate-900 font-bold">Diagnostic Baseline:</strong> Complete full-length Practice Test 1 on Bluebook to set your starting score.</li>
        <li><strong class="text-slate-900 font-bold">Core Concepts:</strong> Dedicate 60% of time to Heart of Algebra and Standard English Conventions.</li>
        <li><strong class="text-slate-900 font-bold">Daily Habit:</strong> 15 minutes of vocabulary practice using the 'Essential Words' module.</li>
      </ul>
    </div>
    <div class="mb-6">
      <h4 class="font-bold text-indigo-700 mb-3 text-lg">Phase 2: Application (Weeks 3-6)</h4>
      <ul class="list-disc pl-5 space-y-2 text-gray-600 text-sm">
        <li><strong class="text-slate-900 font-bold">Timed Drills:</strong> Transition to timed mini-sections for Reading & Writing.</li>
        <li><strong class="text-slate-900 font-bold">Data Analysis:</strong> Focus on 'Problem Solving & Data' module; master Desmos regressions.</li>
        <li><strong class="text-slate-900 font-bold">Review Cycle:</strong> Every Friday, review the Error Log from the week's practice questions.</li>
      </ul>
    </div>
    <div>
      <h4 class="font-bold text-indigo-700 mb-3 text-lg">Phase 3: Mastery (Weeks 7-8)</h4>
      <ul class="list-disc pl-5 space-y-2 text-gray-600 text-sm">
        <li><strong class="text-slate-900 font-bold">Full Simulation:</strong> Take Practice Tests 3 & 4 under strict exam conditions (8:00 AM start).</li>
        <li><strong class="text-slate-900 font-bold">Triage:</strong> Stop learning new concepts; focus solely on refining accuracy in your strongest areas.</li>
      </ul>
    </div>
  `,
  'Math Intensive': `
    <div class="mb-6">
      <h4 class="font-bold text-indigo-700 mb-3 text-lg">Weeks 1-3: The Algebra Engine</h4>
      <ul class="list-disc pl-5 space-y-2 text-gray-600 text-sm">
        <li><strong class="text-slate-900 font-bold">Concept Deep Dive:</strong> Master Linear Equations and Systems. These make up ~35% of the math section.</li>
        <li><strong class="text-slate-900 font-bold">Desmos Mastery:</strong> Complete the 'Calculator Hacks' module. Learn to solve systems without algebra.</li>
        <li><strong class="text-slate-900 font-bold">Drill:</strong> 30 math problems per day, focusing on "Heart of Algebra".</li>
      </ul>
    </div>
    <div class="mb-6">
      <h4 class="font-bold text-indigo-700 mb-3 text-lg">Weeks 4-6: Advanced & Geometry</h4>
      <ul class="list-disc pl-5 space-y-2 text-gray-600 text-sm">
        <li><strong class="text-slate-900 font-bold">Non-Linear Functions:</strong> Study quadratics, vertex form, and exponential growth/decay.</li>
        <li><strong class="text-slate-900 font-bold">Geometry Sprint:</strong> Memorize volume formulas and special right triangles (30-60-90).</li>
      </ul>
    </div>
    <div>
      <h4 class="font-bold text-indigo-700 mb-3 text-lg">Weeks 7-8: Speed & Accuracy</h4>
      <ul class="list-disc pl-5 space-y-2 text-gray-600 text-sm">
        <li><strong class="text-slate-900 font-bold">Hard Module Practice:</strong> Exclusively practice "Hard" difficulty questions to prepare for Module 2 adaptation.</li>
        <li><strong class="text-slate-900 font-bold">Timed Sets:</strong> Complete 22-question sets in under 35 minutes.</li>
      </ul>
    </div>
  `,
  'Reading & Writing Intensive': `
    <div class="mb-6">
      <h4 class="font-bold text-indigo-700 mb-3 text-lg">Weeks 1-2: Grammar Rules</h4>
      <ul class="list-disc pl-5 space-y-2 text-gray-600 text-sm">
        <li><strong class="text-slate-900 font-bold">The "Big 4" Rules:</strong> Master punctuation (commas, semicolons, colons, dashes). This is the quickest way to gain points.</li>
        <li><strong class="text-slate-900 font-bold">Sentence Structure:</strong> Learn to identify independent vs. dependent clauses instantly.</li>
      </ul>
    </div>
    <div class="mb-6">
      <h4 class="font-bold text-indigo-700 mb-3 text-lg">Weeks 3-5: Rhetoric & Craft</h4>
      <ul class="list-disc pl-5 space-y-2 text-gray-600 text-sm">
        <li><strong class="text-slate-900 font-bold">Function Questions:</strong> Practice identifying the purpose of a sentence (e.g., "illustrate a claim").</li>
        <li><strong class="text-slate-900 font-bold">Vocabulary:</strong> Focus on "Words in Context". Don't memorize definitions; analyze surrounding clues.</li>
      </ul>
    </div>
    <div>
      <h4 class="font-bold text-indigo-700 mb-3 text-lg">Weeks 6-8: Logical Reasoning</h4>
      <ul class="list-disc pl-5 space-y-2 text-gray-600 text-sm">
        <li><strong class="text-slate-900 font-bold">Inference Tasks:</strong> Practice "Command of Evidence" questions. Always find the strict proof in the text.</li>
        <li><strong class="text-slate-900 font-bold">Pacing Strategy:</strong> Practice skipping difficult "Literature" passages and doing "Grammar" questions first.</li>
      </ul>
    </div>
  `,
  'Speed & Strategy': `
    <div class="mb-6">
      <h4 class="font-bold text-indigo-700 mb-3 text-lg">Phase 1: Elimination & Triage</h4>
      <ul class="list-disc pl-5 space-y-2 text-gray-600 text-sm">
        <li><strong class="text-slate-900 font-bold">POE (Process of Elimination):</strong> Never look for the right answer first. Eliminate 2 obviously wrong answers immediately.</li>
        <li><strong class="text-slate-900 font-bold">Skipping Drill:</strong> Practice identifying "Time Sink" questions and skipping them within 10 seconds.</li>
      </ul>
    </div>
    <div class="mb-6">
      <h4 class="font-bold text-indigo-700 mb-3 text-lg">Phase 2: Shortcut Mastery</h4>
      <ul class="list-disc pl-5 space-y-2 text-gray-600 text-sm">
        <li><strong class="text-slate-900 font-bold">Desmos Only:</strong> Solve entire math sections using ONLY the graphing calculator to build speed.</li>
        <li><strong class="text-slate-900 font-bold">Answer Choices First:</strong> For reading, read the answers before the passage to know what to look for.</li>
      </ul>
    </div>
  `
};

export const GeminiPlanner: React.FC<GeminiPlannerProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'input' | 'loading' | 'result'>('input');
  const [weeks, setWeeks] = useState<number>(8);
  const [focus, setFocus] = useState<string>('Balanced Approach');
  const [generatedHtml, setGeneratedHtml] = useState<string>('');

  const handleGenerate = async () => {
    setStep('loading');

    // Call API route instead of client-side generation
    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ weeks, focus }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate plan');
      }

      const data = await response.json();
      setGeneratedHtml(data.html || MOCK_PLANS[focus] || MOCK_PLANS['Balanced Approach']);
      setStep('result');
    } catch (error) {
      // Fallback to mock plan on error
      console.error('Error generating plan:', error);
      const planHtml = MOCK_PLANS[focus] || MOCK_PLANS['Balanced Approach'];
      setGeneratedHtml(planHtml);
      setStep('result');
    }
  };

  const handleStart = () => {
    onComplete({
      html: generatedHtml,
      focus,
      weeks
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 flex flex-col items-center justify-center p-4">
      
      {/* Brand Header */}
      <div className="absolute top-8 left-8 flex items-center">
        <TrendingUp className="h-8 w-8 text-[#0091ea]" strokeWidth={2.5} />
        <span className="ml-2 text-xl font-semibold text-gray-800 tracking-tight">SAT Prep</span>
      </div>

      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Copy */}
        <div className="space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Personalization
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Ace the SAT on <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
              your schedule.
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-lg mx-auto lg:mx-0">
            Tell us your timeline and goals. We&apos;ll build a custom dynamic study plan that adapts to your progress.
          </p>
        </div>

        {/* Right Side: Interactive Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-indigo-100 overflow-hidden border border-white/50 relative">
          
          {/* Progress Bar for Steps */}
          <div className="h-1.5 bg-gray-100 w-full">
            <div 
              className="h-full bg-violet-600 transition-all duration-500 ease-out"
              style={{ width: step === 'input' ? '33%' : step === 'loading' ? '66%' : '100%' }}
            />
          </div>

          <div className="p-8 min-h-[450px] flex flex-col justify-center">
            
            {step === 'input' && (
              <div className="space-y-8 animate-fadeIn">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Let&apos;s set your target.</h3>
                  
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Calendar className="inline h-4 w-4 mr-2 text-violet-600" /> 
                    How many weeks until test day?
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[4, 8, 12].map((w) => (
                      <button
                        key={w}
                        onClick={() => setWeeks(w)}
                        className={`py-4 rounded-xl border-2 font-bold text-lg transition-all ${
                          weeks === w 
                            ? 'border-violet-600 bg-violet-50 text-violet-700' 
                            : 'border-gray-100 hover:border-violet-200 text-gray-400'
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>

                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Target className="inline h-4 w-4 mr-2 text-violet-600" />
                    What is your primary focus?
                  </label>
                  <select 
                    className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-violet-500 focus:ring-0 outline-none text-gray-700 font-medium transition-colors cursor-pointer"
                    value={focus}
                    onChange={(e) => setFocus(e.target.value)}
                  >
                    <option>Balanced Approach</option>
                    <option>Math Intensive</option>
                    <option>Reading & Writing Intensive</option>
                    <option>Speed & Strategy</option>
                  </select>
                </div>

                <button
                  onClick={handleGenerate}
                  className="w-full py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-violet-200 transition-all flex items-center justify-center space-x-2 group"
                >
                  <span>Generate Plan</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}

            {step === 'loading' && (
              <div className="text-center animate-fadeIn">
                <div className="relative w-20 h-20 mx-auto mb-6">
                   <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                   <div className="absolute inset-0 border-4 border-violet-600 rounded-full border-t-transparent animate-spin"></div>
                   <Sparkles className="absolute inset-0 m-auto h-8 w-8 text-violet-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Analyzing Curriculum...</h3>
                <p className="text-gray-500">Structuring your {weeks}-week {focus.toLowerCase()} path.</p>
              </div>
            )}

            {step === 'result' && (
              <div className="animate-fadeIn h-full flex flex-col">
                <div className="text-center mb-6">
                   <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                      <Sparkles className="h-6 w-6" />
                   </div>
                   <h3 className="text-2xl font-bold text-gray-900">Plan Ready!</h3>
                </div>
                
                <div className="flex-grow bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100 overflow-y-auto custom-scrollbar max-h-[250px]">
                   <div className="prose prose-sm" dangerouslySetInnerHTML={{ __html: generatedHtml }} />
                </div>

                <button
                  onClick={handleStart}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-emerald-200 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Start My Journey</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

