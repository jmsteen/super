import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { makeLike, increaseLike, eraseLike } from '../../actions/like_actions';

const mapStateToProps = (state, ownProps) => ({
  articleId: ownProps.match.params.id
});

const mapDispatchToProps = dispatch => ({
  makeLike: like => dispatch(makeLike(like)),
  increaseLike: id => dispatch(increaseLike(id)),
  eraseLike: id => dispatch(eraseLike(id))
});

class ArticleLike extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articleId: this.props.articleId };
    this.handleErase = this.handleErase.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleErase() {
    console.dir(this.state);
  }

  handleCreate() {
    this.props.makeLike(this.state);
  }

  handleIncrement() {

  }

  render() {
    return (
      <div className="article-display-like-container">
        <i className="far fa-heart" onClick={this.handleCreate} />
        {/* <i className="fas fa-heart" /> */}
        <button onClick={this.handleErase}>Undo Like</button>
      </div>
    )
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleLike));