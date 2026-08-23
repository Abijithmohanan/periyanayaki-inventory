import React from 'react';
import minimalLogo from '../../assets/minimal-logo.png';

const PageHeader = ({ title, subtitle, actions, showLogo = true }) => {
  return (
    <div className="page-header">
      <div className="page-header-title-row">
        {showLogo && <img src={minimalLogo} alt="Periyanayaki Kitchen Engineering" className="page-header-logo" />}
        <div>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="page-header-actions">{actions}</div>}
    </div>
  );
};

export default PageHeader;
