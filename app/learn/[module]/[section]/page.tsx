'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { UnitStudyView } from '@/components/UnitStudyView';
import { DASHBOARD_MODULES } from '@/lib/constants';

export default function LearnPage() {
  const params = useParams();
  const router = useRouter();
  
  const moduleId = params.module as string;
  const sectionId = params.section as string;

  const module = DASHBOARD_MODULES.find(m => m.id === moduleId);
  const section = module?.content.find(s => s.id === sectionId);

  if (!module || !section) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Section Not Found</h1>
          <p className="text-gray-500 mb-4">The requested learning section could not be found.</p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-[#0091ea] text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <UnitStudyView
      unit={section}
      moduleTitle={module.title}
      moduleColor={module.color}
      onBack={() => router.push('/')}
    />
  );
}

