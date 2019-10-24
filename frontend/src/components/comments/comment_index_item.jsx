import React from 'react';

const CommentIndexItem =({comment}) => (
  <ul className="comment-index">
    <li className="comment-author">{comment.author}</li>
    <p className="comment-body">{comment.body}</p>
  </ul>
)
  



export default CommentIndexItem;