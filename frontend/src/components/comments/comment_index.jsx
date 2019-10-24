import React from 'react';
import CommentIndexItem from './comment_index_item';
import CommentForm from './compose_comment_container';

class CommentsIndex extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    const comments = this.props.comments.map(comment => {
      return(
        <CommentIndexItem key={comment.id} comment={comment}/>
      )
    })
    return(
      <div>
        <CommentForm/>
        <ul>
          {comments}
        </ul>
        
      </div>
      
    )
  }
}

export default CommentsIndex