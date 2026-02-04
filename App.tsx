
import React, { useState, useCallback } from 'react';
import { AppState, DiagnosticQuestion, Diagnosis } from './types';
import Header from './components/Header';
import InitialView from './components/InitialView';
import QuestionView from './components/QuestionView';
import ResultView from './components/ResultView';
import { getDiagnosticQuestions, analyzeAnswers } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [problem, setProblem] = useState<string>('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleProblemSubmit = async (p: string) => {
    setIsLoading(true);
    setError(null);
    setProblem(p);
    try {
      const qs = await getDiagnosticQuestions(p);
      setQuestions(qs);
      setState(AppState.WAITING_FOR_ANSWERS);
    } catch (err) {
      setError("Something went wrong while connecting to the assistant. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswersSubmit = async (answers: DiagnosticQuestion[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeAnswers(problem, answers);
      setDiagnosis(result);
      setState(AppState.SHOWING_RESULT);
    } catch (err) {
      setError("Failed to generate diagnosis. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setState(AppState.IDLE);
    setProblem('');
    setQuestions([]);
    setDiagnosis(null);
    setError(null);
  };

  return (
    <div className="min-h-screen pb-12 px-4 md:px-6">
      <Header />
      
      <main className="container mx-auto">
        {error && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-pulse">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span className="text-sm font-medium">{error}</span>
            <button onClick={() => setError(null)} className="ml-auto opacity-50 hover:opacity-100">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        )}

        {state === AppState.IDLE && (
          <InitialView onSubmit={handleProblemSubmit} isLoading={isLoading} />
        )}

        {state === AppState.WAITING_FOR_ANSWERS && (
          <QuestionView 
            questions={questions} 
            onSubmit={handleAnswersSubmit} 
            isLoading={isLoading} 
          />
        )}

        {state === AppState.SHOWING_RESULT && diagnosis && (
          <ResultView diagnosis={diagnosis} onRestart={reset} />
        )}

        {/* Loading overlay for transitions if needed */}
        {isLoading && state === AppState.IDLE && (
          <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-3xl shadow-2xl flex flex-col items-center gap-4 border border-slate-100">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <i className="fa-solid fa-wand-magic-sparkles absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-400"></i>
              </div>
              <p className="text-slate-600 font-bold">Scanning for blocks...</p>
            </div>
          </div>
        )}
      </main>

      {/* Progress Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 pointer-events-none">
        <div className="max-w-md mx-auto flex items-center justify-between pointer-events-auto bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg border border-slate-200/50">
          <div className="flex gap-2">
            <div className={`w-2 h-2 rounded-full transition-all duration-500 ${state === AppState.IDLE ? 'bg-indigo-600 w-6' : 'bg-slate-200'}`}></div>
            <div className={`w-2 h-2 rounded-full transition-all duration-500 ${state === AppState.WAITING_FOR_ANSWERS ? 'bg-indigo-600 w-6' : 'bg-slate-200'}`}></div>
            <div className={`w-2 h-2 rounded-full transition-all duration-500 ${state === AppState.SHOWING_RESULT ? 'bg-indigo-600 w-6' : 'bg-slate-200'}`}></div>
          </div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
            {state === AppState.IDLE ? 'Step 1: Define' : state === AppState.WAITING_FOR_ANSWERS ? 'Step 2: Diagnose' : 'Step 3: Resolve'}
          </span>
        </div>
      </footer>
    </div>
  );
};

export default App;
