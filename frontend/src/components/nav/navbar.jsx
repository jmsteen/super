import React from 'react';
import { Link } from 'react-router-dom'
import SearchInput from './search/input';


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
        <SearchInput />
        <Link to={`/new_article`}><i className="fas fa-book" />New Story</Link>
        <Link to={`/@${this.props.currentUser.handle}`}><i className="fas fa-user" />Profile</Link>
        <button className="navbar-signout-button" onClick={this.logoutUser}><i className="fas fa-sign-out-alt" />Sign Out</button>
      </div> :
      <div className="navbar-buttons">
        <SearchInput />
        <button className="navbar-login-button" onClick={this.loginModal}><i className="fas fa-sign-in-alt" />Login</button>
        <button className="navbar-signup-button" onClick={this.signupModal}><i className="fas fa-user-plus" />New User</button>
      </div>

      return (
        <div className="navbar-container">
          <Link to='/'><img className="navbar-logo" alt="logo" src={require('../../assets/images/super-logo-02.png')}></img></Link>
          {buttons}           
        </div>
      );
  }
}

export default NavBar;
