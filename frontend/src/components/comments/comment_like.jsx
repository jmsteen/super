import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { makeLike, increaseLike, eraseLike } from '../../actions/like_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.session.user
});

const mapDispatchToProps = dispatch => ({
  makeLike: like => dispatch(makeLike(like)),
  increaseLike: id => dispatch(increaseLike(id)),
  eraseLike: id => dispatch(eraseLike(id))
});

class CommentLike extends React.Component {
  constructor(props) {
    super(props);
    const currentLike = this.props.comment.likes.find(like => like.user === props.currentUser.id);

    this.state = {
      commentId: props.comment._id,
      currentLike
    };

    this.handleErase = this.handleErase.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);

  }

  handleErase() {
    if (!this.state.loadingLike) {
      this.setState({ loadingLike: true })
      if (this.state.currentLike) {
        this.props.eraseLike(this.state.currentLike._id)
          .then(() => {
            this.setState({
              currentLike: undefined,
              loadingLike: false
            })
          });
      }}
  }

  handleCreate() {
    if (!this.state.loadingLike) {
      this.setState({ loadingLike: true })
      this.props.makeLike(this.state)
        .then(res => {
          this.setState({
            currentLike: res.like,
            loadingLike: false
          })
        });
    }
  }

  handleIncrement() {
    if (!this.state.loadingLike) {
      this.setState({ loadingLike: true })
      if (this.state.currentLike.value < 50) {
        this.props.increaseLike(this.state.currentLike._id)
          .then(res => this.setState({
            loadingLike: false,
            currentLike: res.like
          }));
      }}
  }

  renderButton() {
    if (this.state.currentLike) {
      return <i className="fas fa-thumbs-up" onClick={this.handleIncrement} />
    } else {
      return <i className="far fa-thumbs-up" onClick={this.handleCreate} />
    }
  }

  render() {
    const valueArr = this.props.comment.likes.map(like => like.value);
    const likesValue = valueArr.length === 0 ? 0 : valueArr.reduce((a, b) => a + b, 0);

    return (
      <div className="comment-like-container">
        <div>
          {this.renderButton()}
          <span>{`${likesValue}`} Likes</span>
        </div>
        <button onClick={this.handleErase}>Undo Upvote</button>
      </div>
    )
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentLike));