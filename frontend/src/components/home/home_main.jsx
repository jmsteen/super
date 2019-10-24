import React from 'react';
import PPanel from './panels/primary';
import SPanel from './panels/secondary';

const HomeMain = props => {
  return (
    <div className="home-main">
      <PPanel article={props.articles[0]} />
      <div className="home-secondary-panel-container">
        <SPanel article={props.articles[1]} />
        <SPanel article={props.articles[2]} />
        <SPanel article={props.articles[3]} />
      </div>
    </div>
  )
}

export default HomeMain;