'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { ModuleModal } from '@/components/ModuleModal';
import { GeminiPlanner } from '@/components/GeminiPlanner';
import { UnitStudyView } from '@/components/UnitStudyView';
import { TraditionalDashboard } from '@/components/TraditionalDashboard';
import { StatCard, ScoreChart, AIRecommendations, PlanWidget } from '@/components/DashboardWidgets';
import { DASHBOARD_MODULES } from '@/lib/constants';
import { ModuleData, UserStats, StudyPlan, ContentItem, ActiveUnit, ModuleProgress } from '@/lib/types';
import { 
  Sparkles, 
  LayoutDashboard, 
  PieChart, 
  Trophy,
  Flame,
  CheckCircle2,
  Lock,
  Calendar,
  Target,
  ArrowRight
} from 'lucide-react';

// INITIAL MOCK DATA
const INITIAL_USER: UserStats = {
  name: "Alex",
  totalProgress: 42,
  currentStreak: 12,
  questionsAnswered: 843,
  estimatedScore: 1350,
  weakAreas: ["Quadratic Equations", "Inference Questions"],
  scoreHistory: [
    { date: 'Week 1', score: 1100 },
    { date: 'Week 2', score: 1180 },
    { date: 'Week 3', score: 1250 },
    { date: 'Week 4', score: 1350 },
  ],
  moduleProgress: {
    'official-resources': { moduleId: 'official-resources', percentComplete: 100, questionsAnswered: 0, accuracy: 0 },
    'study-materials': { moduleId: 'study-materials', percentComplete: 80, questionsAnswered: 0, accuracy: 0 },
    'reading-writing': { moduleId: 'reading-writing', percentComplete: 45, questionsAnswered: 320, accuracy: 78 },
    'math': { moduleId: 'math', percentComplete: 30, questionsAnswered: 450, accuracy: 65 },
    'study-tools': { moduleId: 'study-tools', percentComplete: 10, questionsAnswered: 73, accuracy: 90 },
    'optional': { moduleId: 'optional', percentComplete: 0, questionsAnswered: 0, accuracy: 0 },
  }
};

export default function Home() {
  // STATE
  const [view, setView] = useState<'onboarding' | 'dashboard' | 'study'>('onboarding');
  const [userStats, setUserStats] = useState<UserStats>(INITIAL_USER);
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [selectedModule, setSelectedModule] = useState<ModuleData | null>(null);
  const [activeTab, setActiveTab] = useState<'modules' | 'summary' | 'plan'>('modules');
  const [activeUnit, setActiveUnit] = useState<ActiveUnit | null>(null);
  const [dashboardView, setDashboardView] = useState<'grid' | 'traditional'>('grid');

  // HANDLERS
  const handlePlanComplete = (plan: StudyPlan) => {
    setStudyPlan(plan);
    const updatedStats = { ...userStats };
    if (plan.focus.includes("Math")) {
      updatedStats.weakAreas = ["Advanced Algebra", "Geometry"];
      updatedStats.moduleProgress['math'].percentComplete = 15; 
      updatedStats.moduleProgress['math'].accuracy = 60;
    } else if (plan.focus.includes("Reading")) {
      updatedStats.weakAreas = ["Evidence Pairs", "Vocabulary"];
      updatedStats.moduleProgress['reading-writing'].percentComplete = 20;
    }
    setUserStats(updatedStats);
    setView('dashboard');
    setActiveTab('plan'); 
  };

  const handleStartUnit = (unit: ContentItem) => {
    if (selectedModule) {
      setActiveUnit({
        moduleColor: selectedModule.color,
        moduleTitle: selectedModule.title,
        unit: unit
      });
      setSelectedModule(null);
      setView('study');
    }
  };

  if (view === 'onboarding') {
    return <GeminiPlanner onComplete={handlePlanComplete} />;
  }

  if (view === 'study' && activeUnit) {
    return (
      <UnitStudyView 
        unit={activeUnit.unit}
        moduleTitle={activeUnit.moduleTitle}
        moduleColor={activeUnit.moduleColor}
        onBack={() => setView('dashboard')}
      />
    );
  }

  return (
    <Layout>
      {/* Dashboard Progress Header */}
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
               <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
               <p className="text-gray-500 mt-1 flex items-center">
                 <Target className="w-4 h-4 mr-1" />
                 Target Score: 1500+
               </p>
            </div>
            
            <div className="mt-4 md:mt-0 w-full md:w-1/3">
              <div className="flex justify-between text-sm font-semibold text-gray-600 mb-2">
                <span>Course Progress</span>
                <span className="text-[#0091ea]">{userStats.totalProgress}%</span>
              </div>
              <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#0091ea] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${userStats.totalProgress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex space-x-8 border-b border-gray-100">
              <button 
                onClick={() => setActiveTab('modules')}
                className={`pb-3 text-sm font-medium border-b-2 transition-all ${
                  activeTab === 'modules' 
                    ? 'border-[#0091ea] text-gray-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Study Modules
              </button>
              <button 
                onClick={() => setActiveTab('plan')}
                className={`pb-3 text-sm font-medium border-b-2 transition-all ${
                  activeTab === 'plan' 
                    ? 'border-[#0091ea] text-gray-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                My AI Plan
              </button>
              <button 
                onClick={() => setActiveTab('summary')}
                className={`pb-3 text-sm font-medium border-b-2 transition-all ${
                  activeTab === 'summary' 
                    ? 'border-[#0091ea] text-gray-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Progress & Analytics
              </button>
            </div>

            {activeTab === 'modules' && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setDashboardView('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    dashboardView === 'grid' 
                      ? 'bg-blue-50 text-[#0091ea]' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  title="Grid View"
                >
                  <LayoutDashboard className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setDashboardView('traditional')}
                  className={`p-2 rounded-lg transition-colors ${
                    dashboardView === 'traditional' 
                      ? 'bg-blue-50 text-[#0091ea]' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  title="Traditional View"
                >
                  <PieChart className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[600px]">
        
        {/* TAB 1: MODULES GRID (Design aligned with screenshot) */}
        {activeTab === 'modules' && dashboardView === 'grid' && (
          <div className="animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DASHBOARD_MODULES.map((module) => {
                const Icon = module.icon;
                
                const totalTopics = module.content.reduce((acc, section) => acc + section.topics.length, 0);
                const completedTopics = module.content.reduce((acc, section) => 
                  acc + section.topics.filter(t => t.completed).length, 0
                );
                const percent = totalTopics === 0 ? 0 : Math.round((completedTopics / totalTopics) * 100);
                const showProgress = ['reading-writing', 'math'].includes(module.id);

                return (
                  <div 
                    key={module.id}
                    onClick={() => setSelectedModule(module)}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300 cursor-pointer flex flex-col h-full group"
                  >
                    <div className={`w-12 h-12 rounded-lg ${module.bgColor} ${module.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" strokeWidth={2.5} />
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#0091ea] transition-colors">
                        {module.title}
                      </h3>

                      {showProgress && (
                        <div className="mb-4">
                          <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
                             <span>Progress</span>
                             <span className="text-[#0091ea]">{percent}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5">
                             <div 
                                className="bg-[#0091ea] h-1.5 rounded-full transition-all duration-700" 
                                style={{ width: `${percent}%` }}
                             ></div>
                          </div>
                        </div>
                      )}

                      <p className="text-gray-500 text-sm leading-relaxed">
                        {module.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-gray-50 flex justify-between items-center">
                       <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                         {module.content.length} Sections
                       </span>
                       <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#0091ea] group-hover:text-white transition-colors">
                          <ArrowRight className="w-3 h-3" />
                       </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Traditional Dashboard View */}
        {activeTab === 'modules' && dashboardView === 'traditional' && (
          <div className="animate-fadeIn">
            <TraditionalDashboard 
              modules={DASHBOARD_MODULES}
              userStats={userStats}
              onModuleSelect={setSelectedModule}
            />
          </div>
        )}

        {/* TAB 2: AI PLAN */}
        {activeTab === 'plan' && (
          <div className="animate-fadeIn grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PlanWidget plan={studyPlan} />
            </div>
            <div className="space-y-6">
               <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                   <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-800">Your Goal</h3>
                      <button 
                        onClick={() => setView('onboarding')}
                        className="text-xs text-[#0091ea] font-bold hover:underline"
                      >
                        Edit
                      </button>
                   </div>
                   <div className="space-y-4">
                       <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mr-3">
                             <Target className="w-5 h-5" />
                          </div>
                          <div>
                             <p className="text-xs text-gray-400 uppercase font-bold">Focus</p>
                             <p className="font-semibold text-gray-800">{studyPlan?.focus || "General"}</p>
                          </div>
                       </div>
                       <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mr-3">
                             <Calendar className="w-5 h-5" />
                          </div>
                          <div>
                             <p className="text-xs text-gray-400 uppercase font-bold">Duration</p>
                             <p className="font-semibold text-gray-800">{studyPlan?.weeks || 8} Weeks</p>
                          </div>
                       </div>
                   </div>
               </div>
               <AIRecommendations stats={userStats} />
            </div>
          </div>
        )}

        {/* TAB 3: SUMMARY & STATS */}
        {activeTab === 'summary' && (
          <div className="animate-fadeIn space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard 
                icon={Trophy} 
                label="Estimated Score" 
                value={userStats.estimatedScore} 
                color="bg-amber-500 text-amber-500" 
                trend="+150 pts"
              />
              <StatCard 
                icon={Flame} 
                label="Day Streak" 
                value={userStats.currentStreak} 
                color="bg-orange-500 text-orange-500" 
              />
              <StatCard 
                icon={CheckCircle2} 
                label="Questions Done" 
                value={userStats.questionsAnswered} 
                color="bg-emerald-500 text-emerald-500" 
              />
              <StatCard 
                icon={Target} 
                label="Accuracy" 
                value="72%" 
                color="bg-blue-500 text-blue-500" 
                trend="+4%"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <ScoreChart history={userStats.scoreHistory} />
                
                <div>
                  <h3 className="font-bold text-gray-800 text-lg mb-4">Recommended Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-[#0091ea] transition-colors cursor-pointer group">
                        <span className="inline-block px-2 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-md mb-3">Needs Attention</span>
                        <h4 className="font-bold text-gray-900 group-hover:text-[#0091ea] transition-colors">{userStats.weakAreas[0] || 'General Math'}</h4>
                        <p className="text-sm text-gray-500 mt-2">Your accuracy is below 60% in this topic. Review core concepts.</p>
                     </div>
                     <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-[#0091ea] transition-colors cursor-pointer group">
                        <span className="inline-block px-2 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-md mb-3">Up Next</span>
                        <h4 className="font-bold text-gray-900 group-hover:text-[#0091ea] transition-colors">Practice Test #{Math.floor(Math.random() * 4) + 2}</h4>
                        <p className="text-sm text-gray-500 mt-2">Scheduled for this weekend to benchmark your progress.</p>
                     </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                 <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-4">Subject Mastery</h3>
                    <div className="space-y-4">
                      {Object.values(userStats.moduleProgress).filter((m: ModuleProgress) => m.questionsAnswered > 0).map((m: ModuleProgress) => {
                        const moduleInfo = DASHBOARD_MODULES.find(d => d.id === m.moduleId);
                        return (
                          <div key={m.moduleId}>
                             <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600 font-medium">{moduleInfo?.title}</span>
                                <span className={m.accuracy >= 80 ? 'text-emerald-600' : m.accuracy >= 60 ? 'text-amber-600' : 'text-red-500'}>
                                  {m.accuracy}%
                                </span>
                             </div>
                             <div className="h-1.5 bg-gray-100 rounded-full">
                               <div 
                                 className={`h-full rounded-full ${m.accuracy >= 80 ? 'bg-emerald-500' : m.accuracy >= 60 ? 'bg-amber-500' : 'bg-red-400'}`} 
                                 style={{ width: `${m.accuracy}%` }}
                               ></div>
                             </div>
                          </div>
                        )
                      })}
                    </div>
                 </div>
              </div>
            </div>
          </div>
        )}

      </div>

      <ModuleModal 
        module={selectedModule} 
        onClose={() => setSelectedModule(null)} 
        onStartUnit={handleStartUnit}
      />
      
    </Layout>
  );
}

