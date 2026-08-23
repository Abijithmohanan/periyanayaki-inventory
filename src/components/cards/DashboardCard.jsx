import React from 'react';

const DashboardCard = ({ title, value, icon: Icon, color = '#2563EB' }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-info">
        <span className="stat-card-title">{title}</span>
        <span className="stat-card-value">{value}</span>
      </div>
      {Icon && (
        <div className="stat-card-icon" style={{ backgroundColor: color }}>
          <Icon size={22} />
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
