import React from 'react';
import { CheckCircle2, AlertCircle, XCircle, Info } from 'lucide-react';

export const MatchBadge = ({ status, score, size = 'md' }) => {
  let config = {
    bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    iconBg: 'text-emerald-600',
    icon: CheckCircle2,
    label: 'Eligible Match',
  };

  if (status === 'Potential Match') {
    config = {
      bg: 'bg-amber-50 border-amber-200 text-amber-800',
      iconBg: 'text-amber-600',
      icon: AlertCircle,
      label: 'Potential Match',
    };
  } else if (status === 'Not Eligible') {
    config = {
      bg: 'bg-rose-50 border-rose-200 text-rose-800',
      iconBg: 'text-rose-600',
      icon: XCircle,
      label: 'Not Eligible',
    };
  }

  const Icon = config.icon;
  const isSm = size === 'sm';

  return (
    <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${config.bg} ${isSm ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs sm:text-sm'}`}>
      <Icon className={isSm ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
      <span>{config.label}</span>
      {score !== undefined && (
        <span className="opacity-80 font-normal">({score}% fit)</span>
      )}
    </span>
  );
};
