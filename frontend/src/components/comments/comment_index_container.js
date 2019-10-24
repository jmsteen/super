import { connect } from 'react-redux';
import CommentsIndex from './comment_index';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
  let articleId = ownProps.match.params.id
  let comments = Object.values(state.entities.comments).reverse();
  return({
    comments: comments
  })
}



export default withRouter(connect(mapStateToProps)(CommentsIndex));