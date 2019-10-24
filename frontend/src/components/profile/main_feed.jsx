import React from 'react';
import ProfileArticlePanel from './panel';

class ProfileMainFeed extends React.Component {
  render() {
    return (
      <div className='profile-feed'>
        <h3>Recent</h3>
        <ul>
          <ProfileArticlePanel />
          <ProfileArticlePanel />
          <ProfileArticlePanel />
        </ul>
      </div>
    )
  }
};

export default ProfileMainFeed;