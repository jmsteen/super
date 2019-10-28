import React from 'react';
import CommentIndexItem from './comment_index_item';
import CommentForm from './compose_comment_container';
import './comments_index.scss'
class CommentsIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const comments = this.props.comments.map(comment => {
      return(
        <CommentIndexItem key={comment._id} comment={comment}/>
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