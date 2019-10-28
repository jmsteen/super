import React from 'react';
import './comments_index.scss';
import CommentLikeContainer from './comment_like';


class CommentIndexItem extends React.Component {
  constructor(props) {
    super(props)

    
  }

  

 

  render() {
    let deleteButton
    if (this.props.currentUser.id === this.props.comment.author) {
     deleteButton = <button onClick={() => { this.props.removeComment(this.props.comment.id) }}>Delete</button>
    }
    console.log(this.props.comment)
    return( 
     
      <div>

        <img className="comment-author" src={this.props.comment.author.image || require('../../assets/images/default_profile.svg')}/> 
        <p className="comment-body">{this.props.comment.body}</p>
        {deleteButton}
        <CommentLikeContainer comment={this.props.comment} />
      </div>
    )
  }
    
 
}
  



export default CommentIndexItem;