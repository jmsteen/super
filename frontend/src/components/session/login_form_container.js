import { connect } from "react-redux";
import { login, clearErrors } from "../../actions/session_actions";
import LoginForm from "./login_form";
import { closeModal } from '../../actions/modal_actions';

const mapStateToProps = state => {
  return {
    errors: Object.values(state.errors.session),
    loggedIn: state.session.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(login(user)),
    closeModal: () => dispatch(closeModal()),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
