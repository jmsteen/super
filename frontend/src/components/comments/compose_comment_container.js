import CommentForm from './compose_comment_form';
import { connect } from 'react-redux';
import { composeComment } from '../../actions/comment_actions'
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ session: { user }, entities: { articles }}, ownProps) => (
  {
  name: user.handle,
  image: user.image,
  article: articles[ownProps.match.params.id]
})

const mapDispatchToProps = dispatch => {
  return {
    composeComment: (comment) => dispatch(composeComment(comment))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentForm))
