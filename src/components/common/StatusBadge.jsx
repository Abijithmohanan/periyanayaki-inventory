import React from 'react';

const toneMap = {
  success: 'badge-success',
  warning: 'badge-warning',
  danger: 'badge-danger',
  info: 'badge-info',
  neutral: 'badge-neutral',
};

const StatusBadge = ({ label, tone = 'neutral' }) => {
  return <span className={`badge ${toneMap[tone] || toneMap.neutral}`}>{label}</span>;
};

export default StatusBadge;
