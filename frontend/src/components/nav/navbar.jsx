import React from 'react';
import { Link } from 'react-router-dom'


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.loginModal = this.loginModal.bind(this);
    this.signupModal = this.signupModal.bind(this);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
  }

  loginModal(e) {
    e.preventDefault();
    this.props.openModal("login");
  }

  signupModal(e) {
    e.preventDefault();
    this.props.openModal("signup");
  }

  render() {
    const buttons = this.props.loggedIn ?
      <div className="navbar-buttons">
        <Link to={`/new_article`}>Create Story</Link>
        <Link to={`/@${this.props.currentUser.handle}`}>Profile</Link>
        <button onClick={this.logoutUser}>Sign Out</button>
      </div> :
      <div className="navbar-buttons">
        <button className="navbar-login-button" onClick={this.loginModal}>Sign in</button>
        <button className="navbar-signup-button" onClick={this.signupModal}>Get Started</button>
      </div>

      return (
        <div className="navbar-container">
          <Link to='/'><span className="navbar-logo">Super</span></Link>
          {buttons}           
        </div>
      );
  }
}

export default NavBar;
