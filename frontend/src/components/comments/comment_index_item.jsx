import React from 'react';
import './comments_index.scss';
import CommentLikeContainer from './comment_like';

const CommentIndexItem =({comment}) => (
  <li className="comment-index-item">
    <div>
    <li className="comment-author">{comment.author}</li>
    <p className="comment-body">{comment.body}</p>
    <CommentLikeContainer comment={comment} />
  </li>
)
  



export default CommentIndexItem;