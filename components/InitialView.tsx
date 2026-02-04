
import React, { useState } from 'react';

interface InitialViewProps {
  onSubmit: (problem: string) => void;
  isLoading: boolean;
}

const InitialView: React.FC<InitialViewProps> = ({ onSubmit, isLoading }) => {
  const [problem, setProblem] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (problem.trim().length > 10) {
      onSubmit(problem);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-100 fade-in">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-2">What are you working on?</h2>
        <p className="text-slate-500 text-sm">Explain what you're trying to do and where you're feeling stuck. Be as specific as you can.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="e.g., I'm trying to implement a sorting algorithm in Python but my code keeps crashing with an index error and I don't know why..."
          className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-700 outline-none resize-none"
          disabled={isLoading}
        />
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">
            {problem.length < 10 ? "At least 10 characters needed" : ""}
          </span>
          <button
            type="submit"
            disabled={isLoading || problem.trim().length < 10}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 ${
              isLoading || problem.trim().length < 10 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200'
            }`}
          >
            {isLoading ? (
              <><i className="fa-solid fa-spinner animate-spin"></i> Analyzing...</>
            ) : (
              <><i className="fa-solid fa-magnifying-glass"></i> Detect My Block</>
            )}
          </button>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-50 flex gap-4 overflow-x-auto pb-2">
        {['Coding Bug', 'Study Burnout', 'Complex Logic', 'New Concept'].map((tag) => (
          <span key={tag} className="whitespace-nowrap px-3 py-1 bg-slate-100 text-slate-500 text-xs font-semibold rounded-full border border-slate-200 uppercase tracking-wider">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default InitialView;
