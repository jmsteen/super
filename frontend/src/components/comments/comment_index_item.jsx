import React from 'react';
import './comments_index.scss';

const CommentIndexItem =({comment}) => (
  <li className="comment-index-item">
    <div>
    <li className="comment-author">{comment.author}</li>
    <p className="comment-body">{comment.body}</p>
    </div>
  </li>
)
  



export default CommentIndexItem;