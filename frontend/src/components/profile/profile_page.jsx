import React from 'react';
import ReactLoading from 'react-loading';
import { Route, NavLink } from 'react-router-dom';
import ProfileMainFeed from './main_feed';
import ProfileLikeFeed from './like_feed';
import { isEqual } from 'lodash';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { profileUser: undefined, loaded: false };
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchUserByHandle(this.props.match.params.handle)
      .then(res => this.setState({ profileUser: res.user, loaded: true }))
      .catch(() => this.setState({ loaded: true }))
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.handle !== prevProps.match.params.handle) {
      // if url changes
      this.setState({ loaded: false });
      window.scrollTo(0, 0);
      this.props.fetchUserByHandle(this.props.match.params.handle)
        .then(res => this.setState({ profileUser: res.user, loaded: true }))
        .catch(() => this.setState({ loaded: true }))
    } else if (this.props.profileUser && !isEqual(this.props.profileUser, prevProps.profileUser)) {
      // if the profileUser is updated somehow
      this.setState(
        { profileUser: this.props.profileUser }
      );
    }
  }

  openModal(e) {
    e.preventDefault();
    this.props.openModal('profileEdit');
  }

  renderButton() {
    if (!this.props.currentUser || !this.props.profileUser) { return null }
    if (this.props.currentUser.id === this.props.profileUser._id) {
      return <button onClick={this.openModal}>Edit Profile</button>
    } else {
      return <button>Follow (doesn't work yet)</button>
    }
  }
  
  render() {
    if (!this.state.loaded) {
      return <ReactLoading 
        type={"bars"} 
        color={"white"} 
        height={700} 
        width={400} />
    } else if (!this.state.profileUser) {
      return <h2 className="profile-error">Profile does not exist</h2>
    }

    const { displayName, handle, description, image} = this.state.profileUser;

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
            <img src={ image || require('../../assets/images/default_profile.svg')} />
          </div>
        </header>
        <main>
          <div className='profile-nav'>
            <NavLink className='profile-nav-tab' exact to={`/@${handle}`}>Profile</NavLink>
            <NavLink className='profile-nav-tab' to={`/@${handle}/likes`}>Likes</NavLink>
          </div>
          <Route 
            exact path='/@:handle'
            render={props => <ProfileMainFeed {...props} articles={this.state.profileUser.articles.sort((a, b) => new Date(b.date) - new Date(a.date))} />}
          />
          <Route 
            exact path='/@:handle/likes' 
            render={props => <ProfileLikeFeed {...props} likes={this.state.profileUser.likes.sort((a, b) => new Date(b.date) - new Date(a.date))} />}
          />
        </main>
      </section>
    )
  }
}

export default ProfilePage