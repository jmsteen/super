import React from 'react';
import CommentIndexItem from './index_item_container';
import CommentForm from './compose_comment_container';
import './comments_index.scss'
class CommentsIndex extends React.Component {
  // componentDidUpdate() {

  // }
  render() {
    const comments = this.props.comments.map(comment => {
      return(
        <li className="comment-index-item" key={comment._id}> <CommentIndexItem key={comment._id} comment={comment} /></li>
      )
    })
    return(
      <div className="index-container">
        { this.props.currentUser && <CommentForm/>}
        <ul>
          {comments}
        </ul>
        
      </div>
      
    )
  }
}

export default CommentsIndex