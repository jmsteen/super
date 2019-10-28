import React from 'react';
import './comments_index.scss';
import CommentLikeContainer from './comment_like';

const CommentIndexItem =({comment}) => (
  <li className="comment-index-item">
    <div className="comment-author">{comment.author}</div>
    <p className="comment-body">{comment.body}</p>
    <CommentLikeContainer comment={comment} />
  </li>
)
  



export default CommentIndexItem;