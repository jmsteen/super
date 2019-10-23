import React from 'react';
import HomeTertiaryPanel from './panels/tertiary';
import AboutPanel from './about_panel';

const HomeFeed = props => {
  return (
    <div className="home-feed">
      <div className="home-feed-first-col" id="home-feed-first-col">
        <ul>
          <li><HomeTertiaryPanel /></li>
          <li><HomeTertiaryPanel /></li>
          <li><HomeTertiaryPanel /></li>
          <li><HomeTertiaryPanel /></li>
          <li><HomeTertiaryPanel /></li>
          <li><HomeTertiaryPanel /></li>
          <li><HomeTertiaryPanel /></li>
          <li><HomeTertiaryPanel /></li>
        </ul>
      </div>
      <div className="home-feed-second-col">
        <AboutPanel />
      </div>
    </div>
  )
};

export default HomeFeed;