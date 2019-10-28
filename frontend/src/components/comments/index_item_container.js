import { connect } from 'react-redux';
import CommentIndexItem from './comment_index_item'
import { withRouter } from 'react-router-dom';
import { eraseComment } from '../../actions/comment_actions'

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.session.user
  
});


const mapDispatchToProps = (dispatch) => ({
  removeComment: id => dispatch(eraseComment(id))

})

    
  


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentIndexItem))