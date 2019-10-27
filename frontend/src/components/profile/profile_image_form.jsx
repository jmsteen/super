import React from 'react';
import ReactCrop from 'react-image-crop';
import { FileInput } from 'react-md';

class ProfileImageForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="profile-image-form">
        <div className="profile-file-input-container">
          <FileInput id="image-input-1" accept="image/*" name="images" label="" icon={<i className="fas fa-camera-retro" />} />
        </div>
      </div>
    )
  }
}

export default ProfileImageForm;