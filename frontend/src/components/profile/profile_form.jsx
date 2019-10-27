import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { editUser } from '../../actions/user_actions';
import { updateCurrentUser } from '../../actions/session_actions';
import ProfileImageForm from './profile_image_form';
import { uploadImage } from '../../util/image_api_util';

const mapStateToProps = (state, ownProps) => {
  const profileUser = Object.values(state.entities.users).find(user => user.handle === ownProps.match.params.handle);
  const errors = state.errors.users;
  return {
    profileUser,
    errors
  }
};

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  editUser: user => dispatch(editUser(user)),
  updateCurrentUser: fields => dispatch(updateCurrentUser(fields))
});


class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.profileUser;
    this.cancel = this.cancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resizeTextarea = this.resizeTextarea.bind(this);
    this.updateImage = this.updateImage.bind(this);
  }

  cancel(e) {
    e.stopPropagation();
    this.props.closeModal();
  }

  resizeTextarea(e) {
    const textarea = e.target;
    textarea.style.height = "";
    textarea.style.height = textarea.scrollHeight + "px"
  }

  handleSubmit(e) {
    e.preventDefault();
    uploadImage(this.state.imageFile).then(res => {
      const data = Object.assign({}, this.state);
      if (res) { data.image = res.data.imageUrl }
      console.dir(data);
      this.props.editUser(data)
        .then(res => {
          if (res.user) {
            if (res.user.handle !== this.props.match.params.handle) {
              this.props.updateCurrentUser({ handle: res.user.handle });
              this.props.history.push(`/@${res.user.handle}`);
              window.location.reload();
            }
            this.props.closeModal();
          };
        })
        .catch(errors => console.log(errors));
    })
  }

  renderErrors() {
    const errorLis = Object.values(this.props.errors).map((err, i) => {
      return <li key={i}>{err}</li>;
    });
    return errorLis.length > 0 ? (
      <ul className="profile-form-errors">{errorLis}</ul>
    ) : null;
  }

  update(field) {
    return (e => {
      this.setState({ [field]: e.target.value });
    });
  }

  updateImage(url) {
    this.setState({ image: url }, () => {
      fetch(url)
        .then(r => r.blob())
        .then(blobFile => new File([blobFile], `${this.props.profileUser.handle}`, { type: "image/png" }))
        .then(f => this.setState({ imageFile: f }));
    })
  }

  updateHandle() {
    return e => {
      this.setState({ handle: e.target.value.slice(1) })
    }
  }

  render() {
    return (
      <div className="profile-form-container">
        <form onSubmit={this.handleSubmit} className='profile-form'>
          <input 
            type="text"
            autoComplete='off'
            onChange={ this.update('displayName') }
            value={ this.state.displayName || '' }
            placeholder='Enter your name'
          />
          <input 
            type="text"
            autoComplete='off'
            onChange={this.updateHandle() }
            value={'@' + this.state.handle}
            placeholder='Enter your handle'
          />
          <textarea 
            onInput={this.resizeTextarea}
            onChange={this.update('description')}
            value={this.state.description || ''}
            id="profile-description-input" 
            maxLength='160' 
            placeholder='Enter your description here'
          />
          <input
            onChange={this.update('image')}
            autoComplete='off'
            value={this.state.image || ''}
            id="profile-image-input"
            type="text"
            placeholder='Enter your profile image url'
          />
          <div className="profile-button-container">
            <button id="profile-save">Save</button>
            <button onClick={this.cancel} id="profile-cancel">Cancel</button>
          </div>
          {this.renderErrors()}
        </form>
        <ProfileImageForm updateImage={ this.updateImage } />
      </div>
    )
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm));