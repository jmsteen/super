import React from 'react';

const CommentIndexItem =({comment}) => (
  <ul>
    <li>{comment.author}</li>
    <p>{comment.body}</p>
  </ul>
)
  



export default CommentIndexItem;