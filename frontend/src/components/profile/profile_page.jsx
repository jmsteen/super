import React from 'react';
import ReactLoading from 'react-loading';
import { Route, NavLink } from 'react-router-dom';
import ProfileMainFeed from './main_feed';
import ProfileLikeFeed from './like_feed';
import ProfileCommentFeed from './comment_feed';
import { isEqual } from 'lodash';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      profileUser: undefined, 
      loaded: false,
      loadingFollow: false
    };
    this.openModal = this.openModal.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
  }

  componentDidMount() {
    this.props.fetchUserByHandle(this.props.match.params.handle)
      .then(res => this.setState({ 
        profileUser: res.user, 
        loaded: true,
        selfPage: res.user._id === this.props.currentUser.id,
        currentFollow: res.user.follows.find(follow => follow.user === this.props.currentUser.id) || null
       }))
      .catch(() => this.setState({ loaded: true }))
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.handle !== prevProps.match.params.handle) {
      // if url changes
      this.setState({ loaded: false });
      window.scrollTo(0, 0);
      this.props.fetchUserByHandle(this.props.match.params.handle)
        .then(res => this.setState({ 
          profileUser: res.user, 
          loaded: true,
          selfPage: res.user._id === this.props.currentUser.id,
          currentFollow: res.user.follows.find(follow => follow.user === this.props.currentUser.id) || null
        }))
        .catch(() => this.setState({ loaded: true }))
      } else if (this.props.currentUser && prevProps.currentUser === undefined) {
        this.setState({  
          loaded: true,
          selfPage: this.state.profileUser._id === this.props.currentUser.id,
          currentFollow: this.state.profileUser.follows.find(follow => follow.user === this.props.currentUser.id) || null
        })
      } else if (prevProps.currentUser && this.props.currentUser === undefined) {
          this.setState({ loaded: false });
          this.setState({
              loaded: true,
              selfPage: false,
              currentFollow: null
            });
      } else if (this.props.profileUser && !isEqual(this.props.profileUser, prevProps.profileUser)) {
        // if the profileUser is updated somehow
        this.setState(
          { profileUser: this.props.profileUser, loaded: false },
        );
      }
    }
  handleFollow() {
    if (this.state.loadingFollow) {
      return;
    } else {
      this.setState({ loadingFollow: true });
    }
    this.props.makeFollow({
      user: this.props.currentUser.id,
      authorId: this.props.profileUser._id
    })
      .then(res => {
        this.setState({
          currentFollow: res.data,
          loadingFollow: false
        })
      });
  }

  handleUnfollow() {
    if (this.state.loadingFollow) {
      return;
    } else {
      this.setState({ loadingFollow: true });
    }
    if (this.state.currentFollow) {
      this.props.unFollow(this.state.currentFollow._id)
        .then(() => {
          this.setState({
            currentFollow: null,
            loadingFollow: false
          })
        });
    } else {
      return;
    }
  }

  openModal(e) {
    e.preventDefault();
    this.props.openModal('profileEdit');
  }

  renderButton() {
    if (!this.props.currentUser || !this.props.profileUser) { return null }
    if (this.props.currentUser.id === this.props.profileUser._id) {
      return <button id="profile-edit-button" onClick={this.openModal}><i className="fas fa-user-edit" /></button>
    } else {
      if (this.state.currentFollow) {
        return <button onClick={this.handleUnfollow}>Unfollow</button>
      } else {
        return <button onClick={this.handleFollow}>Follow</button>
      }
    }
  }
  
  render() {
    if (!this.state.loaded) {
      return <ReactLoading 
        type={"cubes"} 
        color={"black"} 
        height={350} 
        width={200} 
        className="loading"
        />
    } else if (!this.state.profileUser) {
      return <h2 className="profile-error">Profile does not exist</h2>
    }

    const { displayName, handle, description, image, comments, likes, articles } = this.state.profileUser;

    return (
      <section className="profile-page">
        <header>
          <div className="profile-header-info">
            <div className="profile-name-container">
              <h1>{displayName || handle}</h1>
              {this.renderButton()}
            </div>
            <p className="profile-header-description">{description}</p>
          </div>
          <div className="profile-image-container">
            <img alt="profile" src={ image || require('../../assets/images/default_profile.svg')} />
          </div>
        </header>
        <main>
          <div className='profile-nav'>
            <NavLink className='profile-nav-tab' exact to={`/@${handle}`}>Profile</NavLink>
            <NavLink className='profile-nav-tab' to={`/@${handle}/likes`}>Likes</NavLink>
            <NavLink className='profile-nav-tab' to={`/@${handle}/comments`}>Comments</NavLink>
          </div>
          <Route 
            exact path='/@:handle'
            render={props => <ProfileMainFeed {...props} profileUser={this.props.profileUser} selfPage={this.state.selfPage} articles={ articles ? articles.sort((a, b) => new Date(b.date) - new Date(a.date)) : []} />}
          />
          <Route 
            exact path='/@:handle/likes' 
            render={props => <ProfileLikeFeed {...props} selfPage={this.state.selfPage} likes={ likes ? likes.sort((a, b) => new Date(b.date) - new Date(a.date)) : [] } />}
          />
          <Route
            exact path='/@:handle/comments'
            render={props => <ProfileCommentFeed {...props} profileUser={this.props.profileUser} selfPage={this.state.selfPage} comments={ comments ? comments.sort((a, b) => new Date(b.date) - new Date(a.date)) : [] } />}
          />
        </main>
      </section>
    )
  }
}

export default ProfilePage