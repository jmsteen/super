import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentDidUpdate() {
    if (this.props.loggedIn) {
      this.props.closeModal();
    }
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(user);
  }

  handleDemo(e) {
    e.stopPropagation();
    e.preventDefault();

    let user = {
      email: "demo@demouser.com",
      password: "demouser"
    };

    this.props.login(user).then(() => this.props.closeModal());
  }

  renderErrors() {
    return (
      <ul className="session-errors-list">
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="session-form-container">
        <form className="session-form" onSubmit={this.handleSubmit}>
          <div className="login-form-inputs">
            <input type="text"
              value={this.state.email}
              onChange={this.update('email')}
              placeholder="Email"
            />
            <br />
            <input type="password"
              value={this.state.password}
              onChange={this.update('password')}
              placeholder="Password"
            />
            <br />
            <div className="session-button-container">
              <button className="session-button">Login</button>
              <button className="session-button" onClick={this.handleDemo}>Demo Login</button>
            </div>
            {this.renderErrors()}
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(LoginForm);