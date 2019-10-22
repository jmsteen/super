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
        <button onClick={this.logoutUser}>Sign Out</button>
      </div> :
      <div className="navbar-buttons">
        <button onClick={this.loginModal}>Login</button>
        <button onClick={this.signupModal}>Signup</button>
      </div>

      return (
        <div>
          {buttons}           
        </div>
      );
  }
}

export default NavBar;
