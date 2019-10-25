import React from 'react';
import ProfileArticlePanel from './panel';

class ProfileMainFeed extends React.Component {
  render() {

    const articleLis = this.props.articles.map(article => (
      <ProfileArticlePanel article={article} key={article._id} />
    ))

    return (
      <div className='profile-feed'>
        <h3>Recent</h3>
        <ul>
          {articleLis}
        </ul>
      </div>
    )
  }
};

export default ProfileMainFeed;