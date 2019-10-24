import { connect } from 'react-redux';
import ProfilePage from './profile_page';
import { fetchUserByHandle } from '../../actions/user_actions';

const mapStateToProps = (state, ownProps) => {
  const profileUser = Object.values(state.entities.users).find(user => user.handle === ownProps.match.params.handle);
  return {
    currentUser: state.session.user,
    profileUser
  }
};

const mapDispatchToProps = dispatch => ({
  fetchUserByHandle: handle => dispatch(fetchUserByHandle(handle))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);