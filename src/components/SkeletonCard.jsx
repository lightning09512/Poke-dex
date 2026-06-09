import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="rounded-2xl p-4 glass animate-pulse h-48 relative overflow-hidden bg-slate-200 dark:bg-slate-800">
      <div className="w-16 h-6 bg-white/40 dark:bg-slate-700/50 rounded-full mb-4"></div>
      <div className="w-12 h-5 bg-white/40 dark:bg-slate-700/50 rounded-full mb-2"></div>
      <div className="w-12 h-5 bg-white/40 dark:bg-slate-700/50 rounded-full"></div>
      <div className="absolute bottom-2 right-2 w-28 h-28 bg-white/20 dark:bg-slate-700/30 rounded-full"></div>
    </div>
  );
};

export default SkeletonCard;
