
import React from 'react';
import { Diagnosis } from '../types';

interface ResultViewProps {
  diagnosis: Diagnosis;
  onRestart: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ diagnosis, onRestart }) => {
  const getIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('concept')) return 'fa-brain';
    if (t.includes('logic')) return 'fa-microchip';
    if (t.includes('resource')) return 'fa-toolbox';
    if (t.includes('clarity')) return 'fa-eye';
    return 'fa-flag';
  };

  const getColor = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('concept')) return 'text-purple-600 bg-purple-100';
    if (t.includes('logic')) return 'text-blue-600 bg-blue-100';
    if (t.includes('resource')) return 'text-emerald-600 bg-emerald-100';
    if (t.includes('clarity')) return 'text-amber-600 bg-amber-100';
    return 'text-slate-600 bg-slate-100';
  };

  return (
    <div className="max-w-2xl mx-auto fade-in pb-20">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        <div className={`p-8 text-center border-b border-slate-50 ${getColor(diagnosis.type).split(' ')[1]}`}>
          <div className={`inline-flex items-center justify-center p-4 rounded-2xl mb-4 bg-white shadow-sm ${getColor(diagnosis.type).split(' ')[0]}`}>
            <i className={`fa-solid ${getIcon(diagnosis.type)} text-3xl`}></i>
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Diagnosis Result</p>
          <h2 className={`text-3xl font-bold ${getColor(diagnosis.type).split(' ')[0]}`}>{diagnosis.type}</h2>
        </div>

        <div className="p-8 space-y-10">
          <section>
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">
              <i className="fa-solid fa-circle-question text-slate-400"></i>
              Why you are stuck
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg italic border-l-4 border-slate-100 pl-4">
              "{diagnosis.reason}"
            </p>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
              <i className="fa-solid fa-list-check text-slate-400"></i>
              What to do next
            </h3>
            <div className="space-y-4">
              {diagnosis.steps.map((step, i) => (
                <div key={i} className="flex gap-4 items-start p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </span>
                  <p className="text-slate-700 font-medium leading-tight pt-1">{step}</p>
                </div>
              ))}
            </div>
          </section>

          {diagnosis.tip && (
            <div className="bg-indigo-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10 flex gap-4 items-start">
                <i className="fa-solid fa-lightbulb text-amber-400 text-2xl mt-1"></i>
                <div>
                  <h4 className="font-bold text-indigo-200 text-xs uppercase tracking-widest mb-1">Quick Tip</h4>
                  <p className="text-indigo-50 leading-snug">{diagnosis.tip}</p>
                </div>
              </div>
              <i className="fa-solid fa-bolt absolute -bottom-4 -right-4 text-indigo-800 text-8xl opacity-30"></i>
            </div>
          )}
        </div>

        <div className="p-8 bg-slate-50 text-center">
          <button
            onClick={onRestart}
            className="px-8 py-3 bg-white text-slate-700 font-bold border border-slate-200 rounded-xl hover:bg-slate-100 transition-all shadow-sm flex items-center gap-2 mx-auto active:scale-95"
          >
            <i className="fa-solid fa-rotate-left"></i> Start New Diagnosis
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
