import React from 'react';
import ProfileCommentPanel from './comment_panel';


class ProfileCommentFeed extends React.Component {

  render() {
    const commentLis = this.props.comments.map(comment => {
        return <ProfileCommentPanel 
          comment={comment}
          profileUser={this.props.profileUser}
          key={comment._id} />;
    });

    return (
      <div className='profile-feed'>
        <h3>Comments</h3>
        <ul>
          {commentLis}
        </ul>
      </div>
    )
  }
};

export default ProfileCommentFeed;