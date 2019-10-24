import { connect } from 'react-redux';
import CommentsIndex from './comment_index';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
  let articleId = ownProps.match.params.id
  console.log(state);
  return({
    comments: state.entities.articles[articleId].comments
  })
}



export default withRouter(connect(mapStateToProps)(CommentsIndex));