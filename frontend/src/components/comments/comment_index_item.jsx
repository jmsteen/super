import React from 'react';
import './comments_index.scss';
import CommentLikeContainer from './comment_like';


class CommentIndexItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let deleteButton

    if (this.props.currentUser && this.props.currentUser.id === this.props.comment.author.id) {
     deleteButton = <button onClick={() => { this.props.removeComment(this.props.comment.id) }}>Delete Comment</button>

    }
    return( 
     
      <div className="comment-container">
        <img className="comment-author" src={this.props.comment.author.image || require('../../assets/images/default_profile.svg')} alt="profile-pic"/> 
        <p className="comment-body">{this.props.comment.body}</p>
        <div className="comment-links">
        {deleteButton}
        <CommentLikeContainer comment={this.props.comment} />
        </div>
      </div>
    )
  }
    
 
}
  



export default CommentIndexItem;