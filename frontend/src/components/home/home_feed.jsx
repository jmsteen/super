import React from 'react';
import HomeTertiaryPanel from './panels/tertiary';
import AboutPanel from './about_panel';

const HomeFeed = props => {
  const feedLis = props.articles.map(article => {
    return <li key={article._id}><HomeTertiaryPanel article={article} /></li> 
  });

  return (
    <div className="home-feed">
      <div className="home-feed-first-col" id="home-feed-first-col">
        <ul>
          {feedLis}
        </ul>
      </div>
      <div className="home-feed-second-col">
        <AboutPanel />
      </div>
    </div>
  )
};

export default HomeFeed;