import React from 'react';
import { Link } from 'react-router-dom';

const ProfileCommentPanel = props => {
  const comment = props.comment;
  const date = new Date(comment.date);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  var year = date.getFullYear();

  if (!comment.article) {
    return null;
  }

  const { profileUser } = props;

  const showName = profileUser ? (profileUser.displayName || profileUser.handle) : (comment.author.displayName || comment.author.handle);
  const handle = profileUser ? profileUser.handle : comment.author.handle;
  const image = profileUser ? profileUser.image : comment.author.image;

  return (
    <li className="profile-comment-panel">
      <div className="profile-panel-top">
        <Link to={`/@${handle}`}><img alt="profile" src={image || require('../../assets/images/default_profile.svg')} /></Link>
        <div className="profile-panel-info">
          <span><Link className="author-link" to={`/@${handle}`}>{showName}</Link></span>
          <span>{month + "/" + day + "/" + year}</span>
        </div>
      </div>
      <Link to={`/articles/${comment.article._id}`} className="comment-panel-article">
        <div className="comment-panel-article-info">
          <h3>{comment.article.title}</h3>
          <span>{ comment.article.author.displayName || comment.article.author.handle }</span>
        </div>
        <div className="comment-panel-article-additional">
          <i className="fas fa-thumbs-up" /> { comment.article.likes ? comment.article.likes.length : 0  }
          <i className="fas fa-comments" /> { comment.article.comments ? comment.article.comments.length : 0 }
        </div>
      </Link>
      <p className="profile-comment-panel-body">
        {comment.body}
      </p>
    </li>
  );
};

export default ProfileCommentPanel;