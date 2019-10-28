import { connect } from 'react-redux';
import CommentsIndex from './comment_index';
import { withRouter } from 'react-router-dom';
//import { fetchArticle } from '../../actions/article_actions';

const mapStateToProps = (state) => {
  
  let comments = Object.values(state.entities.comments).reverse();
  return({
    comments: comments,
    currentUser: state.session.user
  })
}







export default withRouter(connect(mapStateToProps)(CommentsIndex));