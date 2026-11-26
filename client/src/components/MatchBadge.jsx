import React from 'react';
import { CheckCircle2, AlertCircle, XCircle, Sparkles, ShieldCheck } from 'lucide-react';

export const MatchBadge = ({ status, score, size = 'md' }) => {
  let config = {
    bg: 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-xs',
    icon: CheckCircle2,
    label: 'Eligible Match',
  };

  if (status === 'Best Match') {
    config = {
      bg: 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-300 text-emerald-900 shadow-xs ring-1 ring-emerald-400/40',
      icon: Sparkles,
      label: 'Best Match',
    };
  } else if (status === 'Safe Choice') {
    config = {
      bg: 'bg-teal-50 border-teal-300 text-teal-800 shadow-xs',
      icon: ShieldCheck,
      label: 'Safe Choice',
    };
  } else if (status === 'Potential Match' || status === 'Target Match') {
    config = {
      bg: 'bg-amber-50 border-amber-300 text-amber-800 shadow-xs',
      icon: AlertCircle,
      label: 'Potential Match',
    };
  } else if (status === 'Not Eligible') {
    config = {
      bg: 'bg-rose-50 border-rose-300 text-rose-800',
      icon: XCircle,
      label: 'Not Eligible',
    };
  }

  const Icon = config.icon;
  const isSm = size === 'sm';

  return (
    <span className={`inline-flex items-center gap-1.5 font-bold rounded-full border ${config.bg} ${isSm ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs sm:text-sm'}`}>
      <Icon className={isSm ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
      <span>{config.label}</span>
      {score !== undefined && (
        <span className="opacity-90 font-semibold">({score}% fit)</span>
      )}
    </span>
  );
};
