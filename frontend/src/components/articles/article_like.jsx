import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { makeLike, increaseLike, eraseLike } from '../../actions/like_actions';

const mapStateToProps = (state, ownProps) => ({
  articleId: ownProps.match.params.id,
  currentArticle: state.entities.articles[ownProps.match.params.id],
  currentUser: state.session.user
});

const mapDispatchToProps = dispatch => ({
  makeLike: like => dispatch(makeLike(like)),
  increaseLike: id => dispatch(increaseLike(id)),
  eraseLike: id => dispatch(eraseLike(id))
});

class ArticleLike extends React.Component {
  constructor(props) {
    super(props);
    const { currentArticle, currentUser } = this.props;
    const currentLike = currentArticle.likes.find(like => like.user === currentUser.id);
    
    this.state = { 
      articleId: this.props.articleId,
      currentLike
    };
    
    this.handleErase = this.handleErase.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleErase() {
    if (this.state.currentLike) {
      this.props.eraseLike(this.state.currentLike._id)
        .then(() => {
          this.setState({ 
            currentLike: this.props.currentArticle.likes.find(like => like.user === this.props.currentUser.id)
          })});
    } else {
      return;
    }
  }

  handleCreate() {
    this.props.makeLike(this.state)
      .then(() => {
        this.setState({
          currentLike: this.props.currentArticle.likes.find(like => like.user === this.props.currentUser.id)
        })
      });
  }

  handleIncrement() {
    this.props.increaseLike(this.state.currentLike._id);
  }

  renderButton() {
    if (this.state.currentLike) {
      return <i className="fas fa-heart" onClick={this.handleIncrement}/>
    } else {
      return <i className="far fa-heart" onClick={this.handleCreate} />
    }
  }

  render() {
    return (
      <div className="article-display-like-container">
        {this.renderButton()}
        <button onClick={this.handleErase}>Undo Like</button>
      </div>
    )
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleLike));