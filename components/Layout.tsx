'use client';

import React from 'react';
import { TrendingUp, Bell, Search, User } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      {/* Dashboard Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo area */}
            <div className="flex items-center">
              <div className="flex items-center cursor-pointer mr-8">
                <TrendingUp className="h-7 w-7 text-[#0091ea]" strokeWidth={2.5} />
                <span className="ml-2 text-lg font-bold text-gray-800 tracking-tight">SAT Prep</span>
              </div>
              
              {/* Dashboard Nav - Simple */}
              <nav className="hidden md:flex space-x-1">
                <a href="#" className="bg-blue-50 text-[#0091ea] px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                  Dashboard
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Exams
                </a>
              </nav>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                 <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                 <input 
                   type="text" 
                   placeholder="Search topics..." 
                   className="pl-9 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#0091ea] focus:border-[#0091ea] focus:ring-1 focus:ring-[#0091ea] w-64 transition-all"
                 />
              </div>
              <button className="text-gray-400 hover:text-gray-600 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm cursor-pointer hover:bg-indigo-200 transition-colors">
                AL
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <div className="mb-4 md:mb-0">
             &copy; {new Date().getFullYear()} SAT Prep Inc.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-600">Help Center</a>
            <a href="#" className="hover:text-gray-600">Privacy</a>
            <a href="#" className="hover:text-gray-600">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

