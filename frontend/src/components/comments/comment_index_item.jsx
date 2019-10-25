import React from 'react';

const CommentIndexItem =({comment}) => (
  <div className="comment-index">
    <li className="comment-author">{comment.author}</li>
    <p className="comment-body">{comment.body}</p>
  </div>
)
  



export default CommentIndexItem;