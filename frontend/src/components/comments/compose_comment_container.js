import CommentForm from './compose_comment_form';
import { connect } from 'react-redux';
import { composeComment } from '../../actions/comment_actions'
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ session: { user }, entities: { articles }}, ownProps) => (
  {
    author: user.image || require('../../assets/images/default_profile.svg'),
  article: articles[ownProps.match.params.id]
})

const mapDispatchToProps = dispatch => {
  return {
    composeComment: (comment) => dispatch(composeComment(comment))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentForm))
