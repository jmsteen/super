import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
  const profileUser = Object.values(state.entities.users).find(user => user.handle === ownProps.match.params.handle);
  
  return {
    profileUser
  }
};

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal())
});

