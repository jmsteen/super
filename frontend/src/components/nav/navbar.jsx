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
      window.location.reload();
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
        <Link to={`/new_article`}><i className="fas fa-book" /></Link>
        <Link to={`/@${this.props.currentUser.handle}`}><i className="fas fa-user" /></Link>
        <button className="navbar-signout-button" onClick={this.logoutUser}><i className="fas fa-sign-out-alt" /></button>
      </div> :
      <div className="navbar-buttons">
        <button className="navbar-login-button" onClick={this.loginModal}><i className="fas fa-sign-in-alt" /></button>
        <button className="navbar-signup-button" onClick={this.signupModal}><i className="fas fa-user-plus" /></button>
      </div>

      return (
        <div className="navbar-container">
          {/* <Link to='/'><span className="navbar-logo">Super</span></Link> */}
          <Link to='/'><img className="navbar-logo" alt="logo" src={require('../../assets/images/super-logo-01.png')}></img></Link>
          {buttons}           
        </div>
      );
  }
}

export default NavBar;
