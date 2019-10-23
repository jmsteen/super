import React from 'react';
import PPanel from './panels/primary';
import SPanel from './panels/secondary';

const HomeMain = props => {
  return (
    <div className="home-main">
      <PPanel />
      <div className="home-secondary-panel-container">
        <SPanel />
        <SPanel />
        <SPanel />
      </div>
    </div>
  )
}

export default HomeMain;