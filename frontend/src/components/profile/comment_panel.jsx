import React from 'react';
import { Link } from 'react-router-dom';

const ProfileCommentPanel = props => {
  const comment = props.comment;
  const date = new Date(comment.date);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  var year = date.getFullYear();

  return (
    <li className="profile-comment-panel">
      <div className="profile-panel-top">
        <Link to={`/@${comment.author.handle}`}><img src={comment.author.image} /></Link>
        <div className="profile-panel-info">
          <span><Link className="author-link" to={`/@${comment.author.handle}`}>{comment.author.handle}</Link></span>
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