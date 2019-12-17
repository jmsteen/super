import React from 'react';
import { connect } from 'react-redux';
import { retrieveUserFollows } from '../../actions/follow_actions';
import FollowPanel from './panels/follow';

const mapStateToProps = state => ({
  currentUser: state.session.user,
  articles: Object.values(state.entities.follows).map(follow => follow.author.articles).flat().sort((a, b) => new Date(b.date) - new Date(a.date)),
  authors: Object.values(state.entities.follows).map(follow => follow.author)
});

const mapDispatchToProps = dispatch => ({
  retrieveUserFollows: id => dispatch(retrieveUserFollows(id))
});

class HomeFollowFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.currentUser && this.props.currentUser) {
      this.props.retrieveUserFollows(this.props.currentUser.id)
    }
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.props.retrieveUserFollows(this.props.currentUser.id)
      this.setState({ loaded: true });
    } else {
      this.setState({ loaded: true });
    }
  }

  render() {
    if (!this.state.loaded) {
      return <div className="home-follow-feed"></div>
    }

    // While this fetches all articles from followed authors, perhaps API pagination
    // could be used in the future (for scalability, etc).

    const panels = this.props.articles.slice(0, 4).map(article => {
      return <FollowPanel key={article._id} article={article} author={this.props.authors.find(author => author._id === article.author)} />
    })

    return this.props.currentUser ? (
      <div className="home-follow-feed">
        { this.props.articles.length > 0 && <h2>From your follows...</h2> }
        <ul>
          { this.props.articles.length > 0 && (panels) }
        </ul>
      </div>
    ) : (
        <div className="home-follow-feed">
          <div className="welcome-message">
            <h3>Welcome to Super!</h3>
            <div className="welcome-text">
              You can 
              <ul>
                <li>Write stories for other developers</li>
                <li>Follow your favorite writers</li>
                <li>Join a community of rising stars</li>
                <li>Finally be cool</li>
              </ul>
              Create an account or log in to check us out!
            </div>

          </div>
        </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeFollowFeed);