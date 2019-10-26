import React from 'react';
import CommentLikeContainer from './comment_like';

const CommentIndexItem =({comment}) => (
  <div className="comment-index">
    <li className="comment-author">{comment.author}</li>
    <p className="comment-body">{comment.body}</p>
    <CommentLikeContainer comment={comment} />
  </div>
)
  



export default CommentIndexItem;