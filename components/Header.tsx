
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 text-center">
      <div className="inline-flex items-center justify-center p-3 mb-4 bg-indigo-100 rounded-2xl">
        <i className="fa-solid fa-compass-drafting text-indigo-600 text-3xl"></i>
      </div>
      <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Stuck Detector</h1>
      <p className="mt-2 text-slate-500 font-medium">Identify the block, clear the path.</p>
    </header>
  );
};

export default Header;
