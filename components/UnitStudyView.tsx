'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  Calculator, 
  PenTool, 
  Lightbulb, 
  Check,
  X as XIcon,
} from 'lucide-react';
import { ContentItem } from '@/lib/types';

interface UnitStudyViewProps {
  unit: ContentItem;
  moduleTitle: string;
  moduleColor: string;
  onBack: () => void;
}

export const UnitStudyView: React.FC<UnitStudyViewProps> = ({ 
  unit, 
  moduleTitle, 
  moduleColor, 
  onBack 
}) => {
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [mode, setMode] = useState<'learn' | 'practice'>('learn');
  const [activeTool, setActiveTool] = useState<'calculator' | 'notes' | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  const baseColor = moduleColor.split('-')[1] || 'blue';
  
  const bgSoft = `bg-${baseColor}-50`;
  const textPrimary = `text-${baseColor}-700`;
  const borderPrimary = `border-${baseColor}-200`;
  const btnPrimary = `bg-${baseColor}-600 hover:bg-${baseColor}-700`;

  const currentTopic = unit.topics[activeTopicIndex] || { text: 'Introduction' };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 1. TOP NAVIGATION (Immersive Header) */}
      <header className="h-16 border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 bg-white sticky top-0 z-30">
        <div className="flex items-center">
          <button 
            onClick={onBack}
            className="p-2 mr-3 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col">
            <span className={`text-xs font-bold uppercase tracking-wider ${textPrimary} opacity-80`}>
              {moduleTitle}
            </span>
            <span className="text-sm font-semibold text-gray-900 leading-tight">
              {unit.subtitle}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="hidden md:flex flex-col items-end mr-4">
             <span className="text-xs text-gray-400 font-medium">Topic Progress</span>
             <div className="w-32 h-1.5 bg-gray-100 rounded-full mt-1">
                <div 
                  className={`h-full rounded-full ${btnPrimary.split(' ')[0]}`} 
                  style={{ width: `${((activeTopicIndex + 1) / unit.topics.length) * 100}%` }}
                ></div>
             </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE */}
      <div className="flex-grow flex overflow-hidden">
        
        {/* LEFT SIDEBAR: Syllabus */}
        <aside className="w-72 border-r border-gray-200 bg-gray-50 flex-col hidden md:flex">
          <div className="p-5 border-b border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              Lesson Plan
            </h3>
            <div className="space-y-1">
              {unit.topics.map((topic, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTopicIndex(idx)}
                  className={`w-full flex items-center p-3 rounded-lg text-sm font-medium transition-all ${
                    idx === activeTopicIndex 
                      ? 'bg-white shadow-sm text-gray-900 border border-gray-200' 
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                  }`}
                >
                  {topic.completed ? (
                    <CheckCircle2 className={`w-4 h-4 mr-3 ${textPrimary}`} />
                  ) : idx === activeTopicIndex ? (
                    <div className={`w-4 h-4 mr-3 rounded-full border-2 ${borderPrimary} border-t-${baseColor}-600 animate-spin`} />
                  ) : (
                    <Circle className="w-4 h-4 mr-3 text-gray-300" />
                  )}
                  <span className="truncate">{topic.text}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-auto p-5 border-t border-gray-200 bg-white">
            <div className="bg-indigo-50 rounded-xl p-4">
               <h4 className="text-indigo-800 font-bold text-sm mb-1">Daily Goal</h4>
               <p className="text-indigo-600 text-xs mb-3">Complete 2 more topics to hit your streak!</p>
               <div className="w-full bg-indigo-200 h-1 rounded-full">
                  <div className="bg-indigo-500 h-1 rounded-full w-2/3"></div>
               </div>
            </div>
          </div>
        </aside>

        {/* CENTER: Learning Content */}
        <main className="flex-1 overflow-y-auto bg-white p-6 lg:p-10 scroll-smooth">
          <div className="max-w-3xl mx-auto">
            
            {/* Mode Toggle */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit mb-8">
               <button 
                 onClick={() => setMode('learn')}
                 className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${
                   mode === 'learn' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
                 }`}
               >
                 Learn Concept
               </button>
               <button 
                 onClick={() => setMode('practice')}
                 className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${
                   mode === 'practice' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
                 }`}
               >
                 Practice Questions
               </button>
            </div>

            <div className="animate-fadeIn">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">{currentTopic.text}</h1>

              {mode === 'learn' ? (
                <div className="prose prose-slate max-w-none">
                  <p className="lead text-xl text-gray-600">
                    Understanding the core relationship between two variables is essential for solving algebra problems on the SAT.
                  </p>
                  
                  <div className="my-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl">
                    <h3 className="text-blue-900 font-bold text-lg mb-2">Key Formula: Slope-Intercept Form</h3>
                    <code className="text-xl font-mono bg-white px-3 py-1 rounded text-blue-700">y = mx + b</code>
                    <p className="mt-3 text-blue-800 text-sm">
                      Where <strong className="font-bold">m</strong> is the slope (rate of change) and <strong className="font-bold">b</strong> is the y-intercept (starting value).
                    </p>
                  </div>

                  <h3 className="font-bold text-gray-900 text-xl mt-8 mb-4">Example Walkthrough</h3>
                  <div className="border border-gray-200 rounded-2xl overflow-hidden">
                     <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <span className="font-bold text-gray-700">Example 1</span>
                        <span className="text-xs font-mono text-gray-400">ID: ALG-001</span>
                     </div>
                     <div className="p-6">
                        <p className="mb-6 font-medium text-gray-800">
                          A taxi ride costs $3.00 for the first mile and $1.50 for each additional mile. Which equation represents the total cost <em>C</em> for a ride of <em>x</em> miles?
                        </p>
                        
                        <div className="space-y-4">
                           <div className="flex items-start">
                              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</div>
                              <p className="text-gray-600 text-sm"><span className="font-bold text-gray-800">Identify the rate (m):</span> The cost increases by $1.50 per mile. So, m = 1.5.</p>
                           </div>
                           <div className="flex items-start">
                              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</div>
                              <p className="text-gray-600 text-sm"><span className="font-bold text-gray-800">Identify the starting value (b):</span> Wait! The first mile is special. It's actually $3.00 flat.</p>
                           </div>
                           <div className="flex items-start">
                              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</div>
                              <p className="text-gray-600 text-sm"><span className="font-bold text-gray-800">Adjust equation:</span> Cost = 3 + 1.5(x - 1).</p>
                           </div>
                        </div>

                        <div className="mt-6 p-4 bg-gray-900 text-gray-100 rounded-xl font-mono text-sm">
                           Result: C = 1.5x + 1.5
                        </div>
                     </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:p-8">
                    <span className="text-xs font-bold text-gray-400 uppercase mb-4 block">Question 1 of 5</span>
                    <p className="text-lg font-medium text-gray-900 mb-8 leading-relaxed">
                      If <code className="bg-gray-100 px-1 rounded">3x + 4y = 20</code> and <code className="bg-gray-100 px-1 rounded">x + 2y = 10</code>, what is the value of <code className="bg-gray-100 px-1 rounded">x</code>?
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {[0, 5, 10, -2].map((val, i) => (
                         <button
                           key={i}
                           onClick={() => setQuizAnswer(val)}
                           className={`p-4 rounded-xl border-2 text-left font-medium transition-all ${
                             quizAnswer === val 
                               ? `border-${baseColor}-500 bg-${baseColor}-50 text-${baseColor}-700` 
                               : 'border-gray-100 hover:border-gray-300 text-gray-600'
                           }`}
                         >
                           <span className="mr-3 font-bold text-gray-400">{String.fromCharCode(65+i)}.</span> 
                           {val}
                         </button>
                       ))}
                    </div>

                    {quizAnswer !== null && (
                      <div className="mt-8 animate-fadeIn">
                         <div className={`p-4 rounded-xl flex items-start ${quizAnswer === 0 ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
                            {quizAnswer === 0 ? <Check className="w-5 h-5 mr-3 mt-0.5" /> : <XIcon className="w-5 h-5 mr-3 mt-0.5" />}
                            <div>
                               <p className="font-bold mb-1">{quizAnswer === 0 ? 'Correct!' : 'Incorrect'}</p>
                               <p className="text-sm opacity-90">
                                 Multiplying the second equation by 2 gives 2x + 4y = 20. Subtracting this from the first equation (3x + 4y = 20) results in x = 0.
                               </p>
                            </div>
                         </div>
                         <div className="mt-6 flex justify-end">
                            <button className={`px-6 py-3 ${btnPrimary} text-white font-bold rounded-lg shadow-lg shadow-blue-200 flex items-center`}>
                              Next Question <ChevronRight className="ml-2 w-4 h-4" />
                            </button>
                         </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
            </div>
            
            <div className="h-20"></div>
          </div>
        </main>

        {/* RIGHT SIDEBAR: Tools */}
        <aside className="w-16 lg:w-20 border-l border-gray-200 bg-white flex flex-col items-center py-6 z-20">
           <div className="space-y-6">
              <button 
                onClick={() => setActiveTool(activeTool === 'calculator' ? null : 'calculator')}
                className={`p-3 rounded-xl transition-all ${activeTool === 'calculator' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}
                title="Calculator"
              >
                 <Calculator className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setActiveTool(activeTool === 'notes' ? null : 'notes')}
                className={`p-3 rounded-xl transition-all ${activeTool === 'notes' ? 'bg-yellow-100 text-yellow-600' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}
                title="Notes"
              >
                 <PenTool className="w-6 h-6" />
              </button>
              <button 
                className="p-3 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-all"
                title="Hints"
              >
                 <Lightbulb className="w-6 h-6" />
              </button>
           </div>
        </aside>

        {/* TOOL PANELS */}
        {activeTool === 'calculator' && (
           <div className="absolute right-20 top-20 w-80 bg-slate-900 text-white rounded-2xl shadow-2xl p-6 z-40 animate-fadeIn">
              <div className="flex justify-between items-center mb-4">
                 <span className="font-bold font-mono">Desmos (Mock)</span>
                 <button onClick={() => setActiveTool(null)}><XIcon className="w-4 h-4 text-gray-500 hover:text-white" /></button>
              </div>
              <div className="h-40 bg-slate-800 rounded-lg mb-4 flex items-center justify-center text-slate-600 font-mono">
                 [ Graphing Canvas ]
              </div>
              <div className="grid grid-cols-4 gap-2 font-mono text-sm">
                 {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map(k => (
                    <button key={k} className="p-3 bg-slate-800 rounded hover:bg-slate-700">{k}</button>
                 ))}
              </div>
           </div>
        )}

        {activeTool === 'notes' && (
           <div className="absolute right-20 top-20 w-72 bg-yellow-50 text-gray-800 rounded-2xl shadow-xl border border-yellow-200 p-4 z-40 animate-fadeIn h-[400px] flex flex-col">
              <div className="flex justify-between items-center mb-2 border-b border-yellow-200 pb-2">
                 <span className="font-bold text-yellow-800 text-sm">Quick Notes</span>
                 <button onClick={() => setActiveTool(null)}><XIcon className="w-4 h-4 text-yellow-600 hover:text-yellow-900" /></button>
              </div>
              <textarea 
                className="flex-grow bg-transparent resize-none focus:outline-none text-sm leading-relaxed"
                placeholder="Type your thoughts here..."
                defaultValue="Remember to check negative signs when distributing!"
              ></textarea>
           </div>
        )}

      </div>
    </div>
  );
};

