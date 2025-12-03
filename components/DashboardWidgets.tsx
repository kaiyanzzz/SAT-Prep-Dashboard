'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Brain, 
  AlertCircle,
  Lightbulb,
  Calendar,
  Sparkles
} from 'lucide-react';
import { UserStats, StudyPlan } from '@/lib/types';

export const StatCard: React.FC<{
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
  trend?: string;
}> = ({ icon: Icon, label, value, color, trend }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4 hover:shadow-md transition-shadow">
    <div className={`p-4 rounded-xl ${color} bg-opacity-10`}>
      <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
    </div>
    <div>
      <p className="text-slate-500 text-sm font-medium">{label}</p>
      <div className="flex items-baseline space-x-2">
        <h4 className="text-2xl font-bold text-slate-800">{value}</h4>
        {trend && <span className="text-xs text-emerald-600 font-medium">{trend}</span>}
      </div>
    </div>
  </div>
);

export const ScoreChart: React.FC<{ history: { date: string; score: number }[] }> = ({ history }) => {
  const maxScore = 1600;
  const minScore = 1000;
  
  const points = history.map((point, index) => {
    const x = (index / (history.length - 1)) * 100;
    const y = 100 - ((point.score - minScore) / (maxScore - minScore)) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-800 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-violet-600" />
          Score Projection
        </h3>
        <span className="px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-xs font-semibold">
          Current: {history[history.length - 1].score}
        </span>
      </div>
      
      <div className="relative h-[200px] w-full">
        <div className="absolute inset-0 flex flex-col justify-between text-xs text-slate-400">
          <span>1600</span>
          <span>1400</span>
          <span>1200</span>
          <span>1000</span>
        </div>
        
        <div className="absolute inset-0 ml-8 top-2 bottom-2">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="scoreGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <polygon points={`0,100 ${points} 100,100`} fill="url(#scoreGradient)" />
            <polyline points={points} fill="none" stroke="#8b5cf6" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            
            {history.map((point, index) => {
               const x = (index / (history.length - 1)) * 100;
               const y = 100 - ((point.score - minScore) / (maxScore - minScore)) * 100;
               return (
                 <circle key={index} cx={x} cy={y} r="1.5" className="fill-white stroke-violet-600 stroke-2 hover:r-2 transition-all" />
               );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};

export const PlanWidget: React.FC<{ plan: StudyPlan | null }> = ({ plan }) => {
  if (!plan) return (
     <div className="bg-white p-8 rounded-2xl border border-dashed border-gray-300 text-center text-gray-400">
       <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
       <p>No active plan selected.</p>
     </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-6 text-white flex justify-between items-center">
        <div>
           <h3 className="text-xl font-bold flex items-center">
             <Calendar className="w-5 h-5 mr-2 text-violet-200" />
             Your Personal {plan.weeks}-Week Plan
           </h3>
           <p className="text-violet-100 text-sm mt-1 opacity-90">Focus: {plan.focus}</p>
        </div>
        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
          <Sparkles className="w-5 h-5 text-yellow-300" />
        </div>
      </div>
      
      <div className="p-6">
        <div className="prose prose-sm prose-indigo max-w-none" dangerouslySetInnerHTML={{ __html: plan.html }} />
        
        <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
           <button className="text-sm font-semibold text-violet-600 hover:text-violet-700">
             Export to Calendar →
           </button>
        </div>
      </div>
    </div>
  );
};

export const AIRecommendations: React.FC<{ stats: UserStats }> = ({ stats }) => {
  const [tip, setTip] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getAITip = async () => {
    setLoading(true);
    setTimeout(() => {
        const mockTips = [
            "Given your struggle with Quadratic Equations, try graphing them in Desmos first to visualize the x-intercepts before solving algebraically.",
            "Your streak is consistent! To boost your score by 20 points, focus on identifying 'Transition Words' in Reading passages this week.",
            "Accuracy in Data Analysis is key. Remember: always check axis labels twice before calculating percentages from a chart."
        ];
        const selectedTip = stats.weakAreas.length > 0 
            ? `Since ${stats.weakAreas[0]} is a weak spot, spend 15 minutes today reviewing the core formulas.` 
            : mockTips[0];
            
        setTip(selectedTip);
        setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 p-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
      
      <div className="relative z-10">
        <h3 className="font-bold text-lg mb-4 flex items-center">
          <Brain className="w-5 h-5 mr-2 text-yellow-400" />
          Improvement Insights
        </h3>

        <div className="space-y-4">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <h4 className="text-sm text-indigo-200 font-medium mb-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              Focus Area
            </h4>
            <p className="font-semibold">{stats.weakAreas[0] || 'General Review'}</p>
            <p className="text-sm text-slate-300 mt-1">
              Your accuracy here is 15% lower than your average.
            </p>
          </div>

          <div className="pt-2">
            {!tip ? (
              <button 
                onClick={getAITip}
                disabled={loading}
                className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center"
              >
                {loading ? 'Analyzing Performance...' : (
                  <>
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Get Daily AI Coach Tip
                  </>
                )}
              </button>
            ) : (
              <div className="animate-fadeIn p-3 bg-indigo-500/30 border border-indigo-400/30 rounded-lg">
                <p className="text-sm italic">"{tip}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

