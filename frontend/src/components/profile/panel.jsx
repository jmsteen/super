import React from 'react';
import { Link } from 'react-router-dom';

const ProfileArticlePanel = props => {
  return (
    <li className="profile-article-panel">
      <div className="profile-panel-top">
        <img src="https://d17fnq9dkz9hgj.cloudfront.net/breed-uploads/2018/09/dog-landing-hero-lg.jpg?bust=1536935129&width=1080" />
        <div className="profile-panel-info">
          <span>Name Here</span>
          <span>Date</span>
        </div>
      </div>
      <Link to='/' className="profile-panel-link">
        <img src="https://d17fnq9dkz9hgj.cloudfront.net/breed-uploads/2018/09/dog-landing-hero-lg.jpg?bust=1536935129&width=1080" />
        <h3>This is supposed to be a relatively long title here.</h3>
      </Link>

    </li>
  );
};

export default ProfileArticlePanel;