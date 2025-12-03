'use client';

import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, Circle, Lock, PlayCircle, Clock, ArrowRight, Check } from 'lucide-react';
import { ModuleData, ContentItem } from '@/lib/types';

interface ModuleModalProps {
  module: ModuleData | null;
  onClose: () => void;
  onStartUnit: (unit: ContentItem) => void;
}

export const ModuleModal: React.FC<ModuleModalProps> = ({ module, onClose, onStartUnit }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (module) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [module]);

  if (!module) return null;

  const Icon = module.icon;

  // Calculate overall module progress
  const totalItems = module.content.reduce((acc, curr) => acc + curr.topics.length, 0);
  const completedItems = module.content.reduce((acc, curr) => acc + curr.topics.filter(t => t.completed).length, 0);
  const overallProgress = Math.round((completedItems / totalItems) * 100) || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
      <div 
        className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      
      <div 
        className={`relative bg-white sm:rounded-2xl shadow-2xl w-full max-w-5xl h-full sm:h-[90vh] flex flex-col transform transition-all duration-300 ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}
      >
        {/* Sticky Header: "Sub-Dashboard" Feel */}
        <div className="flex-none p-6 sm:px-10 border-b border-gray-100 bg-white sm:rounded-t-2xl z-10">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-5">
              <div className={`p-4 rounded-2xl ${module.bgColor} ${module.color} shadow-sm`}>
                <Icon className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{module.title}</h2>
                <p className="text-gray-500 mt-1 flex items-center">
                  <span className="font-medium text-gray-700">{module.content.length} Units</span>
                  <span className="mx-2">•</span>
                  <span>{module.description}</span>
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Module-Level Stats */}
          <div className="flex items-center space-x-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
             <div className="flex-1">
                <div className="flex justify-between text-sm font-bold text-gray-600 mb-2">
                   <span>Overall Mastery</span>
                   <span className="text-[#0091ea]">{overallProgress}%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                   <div className="h-full bg-[#0091ea] rounded-full" style={{ width: `${overallProgress}%` }}></div>
                </div>
             </div>
             <div className="hidden sm:block h-8 w-px bg-gray-200"></div>
             <div className="flex space-x-6 text-sm">
                <div className="flex flex-col">
                   <span className="text-gray-400 font-medium text-xs uppercase">Completed</span>
                   <span className="font-bold text-gray-800">{completedItems} Topics</span>
                </div>
                <div className="flex flex-col">
                   <span className="text-gray-400 font-medium text-xs uppercase">Remaining</span>
                   <span className="font-bold text-gray-800">{totalItems - completedItems} Topics</span>
                </div>
             </div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-grow overflow-y-auto custom-scrollbar bg-gray-50/50 p-6 sm:px-10">
          <div className="space-y-6 max-w-4xl mx-auto">
            
            {/* Render Each Sub-Section as a Dashboard Card */}
            {module.content.map((unit) => (
              <div 
                key={unit.id} 
                className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
                  unit.status === 'locked' ? 'border-gray-100 opacity-70' : 'border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200'
                }`}
              >
                {/* Unit Header */}
                <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-50 gap-4">
                   <div className="flex items-start space-x-4">
                      {/* Status Icon */}
                      <div className="mt-1">
                        {unit.status === 'completed' && <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-full"><Check className="h-5 w-5" strokeWidth={3} /></div>}
                        {unit.status === 'continue' && <div className="p-1.5 bg-blue-100 text-blue-600 rounded-full"><PlayCircle className="h-5 w-5" /></div>}
                        {unit.status === 'start' && <div className="p-1.5 bg-gray-100 text-gray-500 rounded-full"><Circle className="h-5 w-5" /></div>}
                        {unit.status === 'locked' && <div className="p-1.5 bg-gray-100 text-gray-400 rounded-full"><Lock className="h-5 w-5" /></div>}
                      </div>

                      <div>
                         <div className="flex items-center gap-3">
                            <h3 className="text-lg font-bold text-gray-900">{unit.subtitle}</h3>
                            {unit.status === 'continue' && <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-bold uppercase rounded">In Progress</span>}
                            {unit.status === 'completed' && <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-bold uppercase rounded">Done</span>}
                         </div>
                         <p className="text-sm text-gray-500 mt-1">{unit.description}</p>
                         <div className="flex items-center text-xs text-gray-400 mt-2 space-x-3">
                            <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {unit.timeEstimate}</span>
                            <span>•</span>
                            <span>{unit.progress}% Complete</span>
                         </div>
                      </div>
                   </div>

                   {/* Action Button */}
                   <div className="flex-shrink-0">
                      {unit.status === 'locked' ? (
                        <button disabled className="px-5 py-2.5 bg-gray-100 text-gray-400 font-medium rounded-lg cursor-not-allowed text-sm">
                          Locked
                        </button>
                      ) : unit.status === 'completed' ? (
                        <button 
                          onClick={() => onStartUnit(unit)}
                          className="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50 text-sm transition-colors"
                        >
                          Review
                        </button>
                      ) : (
                        <button 
                          onClick={() => onStartUnit(unit)}
                          className="px-5 py-2.5 bg-[#0091ea] text-white font-bold rounded-lg hover:bg-blue-600 shadow-sm shadow-blue-200 transition-all text-sm flex items-center"
                        >
                          {unit.status === 'start' ? 'Start Unit' : 'Continue'}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                      )}
                   </div>
                </div>

                {/* Unit Topics (Accordion-style content) */}
                {unit.status !== 'locked' && (
                  <div className="p-6 bg-gray-50/30">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {unit.topics.map((topic, i) => (
                           <div key={i} className="flex items-center space-x-3 text-sm text-gray-700 p-2 rounded-lg hover:bg-white transition-colors">
                              {topic.completed ? (
                                 <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                              ) : (
                                 <div className="h-5 w-5 rounded-full border-2 border-gray-300 flex-shrink-0"></div>
                              )}
                              <span className={topic.completed ? 'text-gray-400 line-through decoration-gray-300' : ''}>
                                {topic.text}
                              </span>
                           </div>
                        ))}
                     </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Bottom Spacer */}
            <div className="h-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

