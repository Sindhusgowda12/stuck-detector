
import React, { useState } from 'react';
import { DiagnosticQuestion } from '../types';

interface QuestionViewProps {
  questions: string[];
  onSubmit: (answers: DiagnosticQuestion[]) => void;
  isLoading: boolean;
}

const QuestionView: React.FC<QuestionViewProps> = ({ questions, onSubmit, isLoading }) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleInputChange = (id: number, val: string) => {
    setAnswers(prev => ({ ...prev, [id]: val }));
  };

  const isComplete = questions.every((_, i) => answers[i]?.trim().length > 0);

  const handleSubmit = () => {
    if (isComplete) {
      const result: DiagnosticQuestion[] = questions.map((q, i) => ({
        id: i,
        question: q,
        answer: answers[i]
      }));
      onSubmit(result);
    }
  };

  return (
    <div className="max-w-2xl mx-auto fade-in">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-amber-100 rounded-lg">
            <i className="fa-solid fa-clipboard-question text-amber-600"></i>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Diagnostic Check</h2>
            <p className="text-slate-500 text-sm">Answer these to help find the root cause.</p>
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((q, i) => (
            <div key={i} className="space-y-2 group">
              <label className="block text-sm font-semibold text-slate-600 group-focus-within:text-indigo-600 transition-colors">
                {q}
              </label>
              <input
                type="text"
                autoFocus={i === 0}
                value={answers[i] || ''}
                onChange={(e) => handleInputChange(i, e.target.value)}
                placeholder="Type your answer here..."
                disabled={isLoading}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-700"
              />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!isComplete || isLoading}
            className={`flex items-center gap-2 px-10 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 ${
              !isComplete || isLoading
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200'
            }`}
          >
            {isLoading ? (
              <><i className="fa-solid fa-spinner animate-spin"></i> Analyzing Results...</>
            ) : (
              <><i className="fa-solid fa-stethoscope"></i> Get Diagnosis</>
            )}
          </button>
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-center gap-2 text-slate-400 text-xs">
        <i className="fa-solid fa-shield-halved"></i>
        <span>Answers are used only for this diagnostic session</span>
      </div>
    </div>
  );
};

export default QuestionView;
