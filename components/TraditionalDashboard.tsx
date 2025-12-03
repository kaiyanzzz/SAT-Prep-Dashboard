'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronDown, CheckCircle2, Circle, Lock, Clock } from 'lucide-react';
import { ModuleData, UserStats, ContentItem } from '@/lib/types';

interface TraditionalDashboardProps {
  modules: ModuleData[];
  userStats: UserStats;
  onModuleSelect: (module: ModuleData) => void;
  selectedSection?: ContentItem;
}

export const TraditionalDashboard: React.FC<TraditionalDashboardProps> = ({
  modules,
  userStats,
  onModuleSelect,
}) => {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const selectedModule = modules.find(m => m.id === selectedModuleId);
  const selectedSection = selectedModule?.content.find(s => s.id === selectedSectionId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-300px)]">
      {/* Left Sidebar: Modules & Sections */}
      <div className="lg:col-span-1 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <h2 className="font-bold text-gray-900 text-lg">Study Modules</h2>
          <p className="text-xs text-gray-500 mt-1">Select a module to view content</p>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {modules.map((module) => {
            const Icon = module.icon;
            const isExpanded = expandedModules.has(module.id);
            const isSelected = selectedModuleId === module.id;
            
            // Calculate progress
            const totalTopics = module.content.reduce((acc, section) => acc + section.topics.length, 0);
            const completedTopics = module.content.reduce((acc, section) => 
              acc + section.topics.filter(t => t.completed).length, 0
            );
            const percent = totalTopics === 0 ? 0 : Math.round((completedTopics / totalTopics) * 100);

            return (
              <div key={module.id} className="border-b border-gray-100">
                {/* Module Header */}
                <button
                  onClick={() => {
                    toggleModule(module.id);
                    setSelectedModuleId(module.id);
                    if (module.content.length > 0) {
                      setSelectedSectionId(module.content[0].id);
                    }
                  }}
                  className={`w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                    isSelected ? 'bg-blue-50 border-l-4 border-[#0091ea]' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className={`p-2 rounded-lg ${module.bgColor} ${module.color} flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">{module.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#0091ea] rounded-full" 
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 font-medium">{percent}%</span>
                      </div>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                  )}
                </button>

                {/* Sections List */}
                {isExpanded && (
                  <div className="bg-gray-50 border-t border-gray-100">
                    {module.content.map((section) => {
                      const isSectionSelected = selectedSectionId === section.id;
                      const sectionProgress = Math.round(
                        (section.topics.filter(t => t.completed).length / section.topics.length) * 100
                      ) || 0;

                      return (
                        <button
                          key={section.id}
                          onClick={() => {
                            setSelectedSectionId(section.id);
                            setSelectedModuleId(module.id);
                          }}
                          className={`w-full p-3 pl-12 flex items-center justify-between hover:bg-white transition-colors border-b border-gray-100 ${
                            isSectionSelected ? 'bg-white border-l-4 border-[#0091ea]' : ''
                          }`}
                        >
                          <div className="flex-1 min-w-0 text-left">
                            <div className="flex items-center space-x-2 mb-1">
                              {section.status === 'completed' && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                              )}
                              {section.status === 'locked' && (
                                <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              )}
                              {(section.status === 'start' || section.status === 'continue') && (
                                <Circle className="w-4 h-4 text-gray-300 flex-shrink-0" />
                              )}
                              <span className="font-medium text-gray-800 text-sm truncate">
                                {section.subtitle}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>{section.timeEstimate}</span>
                              <span>•</span>
                              <span>{sectionProgress}%</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Content Area: Selected Section Details */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        {selectedSection ? (
          <>
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    {selectedModule && (
                      <div className={`p-2 rounded-lg ${selectedModule.bgColor} ${selectedModule.color}`}>
                        {React.createElement(selectedModule.icon, { className: "w-5 h-5" })}
                      </div>
                    )}
                    <h2 className="text-2xl font-bold text-gray-900">{selectedSection.subtitle}</h2>
                  </div>
                  <p className="text-gray-600 mt-2">{selectedSection.description}</p>
                  <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{selectedSection.timeEstimate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>Progress:</span>
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#0091ea] rounded-full" 
                          style={{ width: `${selectedSection.progress}%` }}
                        ></div>
                      </div>
                      <span className="font-semibold">{selectedSection.progress}%</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (selectedModule) {
                      onModuleSelect(selectedModule);
                    }
                  }}
                  className="px-4 py-2 bg-[#0091ea] text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Open Full View
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
              <div className="max-w-3xl">
                <h3 className="font-bold text-gray-900 text-lg mb-4">Topics in this Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedSection.topics.map((topic, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border transition-colors ${
                        topic.completed
                          ? 'bg-emerald-50 border-emerald-200'
                          : 'bg-white border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {topic.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-300 flex-shrink-0" />
                        )}
                        <span className={`text-sm font-medium ${
                          topic.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                        }`}>
                          {topic.text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <p className="text-lg font-medium mb-2">No section selected</p>
              <p className="text-sm">Choose a module and section from the sidebar to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

