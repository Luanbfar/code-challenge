import React from 'react';

interface SummaryCardProps {
  value: number;
  label: string;
  color: 'blue' | 'green' | 'orange' | 'purple';
}

const SummaryCard: React.FC<SummaryCardProps> = ({ value, label, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 text-blue-800',
    green: 'bg-green-50 text-green-600 text-green-800',
    orange: 'bg-orange-50 text-orange-600 text-orange-800',
    purple: 'bg-purple-50 text-purple-600 text-purple-800',
  };

  const [bgClass, valueClass, labelClass] = colorClasses[color].split(' ');

  return (
    <div className={`${bgClass} rounded-lg p-4`}>
      <div className={`text-2xl font-bold ${valueClass}`}>{value}</div>
      <div className={`text-sm ${labelClass}`}>{label}</div>
    </div>
  );
};

export default SummaryCard;
