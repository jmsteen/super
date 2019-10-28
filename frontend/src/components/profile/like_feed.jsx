import React from 'react';
import ProfileArticlePanel from './panel';
import ProfileCommentPanel from './comment_panel';


class ProfileLikeFeed extends React.Component {

  render() {
    const likeLis = this.props.likes.map(like => {
      if (like.article && like.article._id) {
        return <ProfileArticlePanel selfPage={this.props.selfPage} article={like.article} key={like.article._id} />;
      } else if (like.comment && like.comment._id) {
        return <ProfileCommentPanel comment={like.comment} key={like.comment._id} />;
      }
    });

    return (
      <div className='profile-feed'>
        <h3>Likes</h3>
        <ul>
          {likeLis}
        </ul>
      </div>
    )
  }
};

export default ProfileLikeFeed;