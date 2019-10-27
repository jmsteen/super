import React from 'react';
import ReactCrop from 'react-image-crop';

class ProfileImageForm extends React.Component {
  constructor(props) {
    super(props);
    this.cropper = React.createRef();
    this.state = {
      src: null,
      crop: {
        unit: '%',
        width: 30,
        aspect: 1 / 1,
      }
    };
    this.onSelectFile = this.onSelectFile.bind(this);
    this.onImageLoaded = this.onImageLoaded.bind(this);
    this.onCropChange = this.onCropChange.bind(this);
    this.onCropComplete = this.onCropComplete.bind(this);
    this.makeClientCrop = this.makeClientCrop.bind(this);
  }

  delegateClick() {
    const input = document.getElementById("profile-file-input");
    input.click();
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      300,
      300
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }
s

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ croppedImageUrl }, () => {
        const div = document.getElementById('profile-file-input-container');
        div.style.backgroundImage = `url('${this.state.croppedImageUrl}')`;
        this.props.updateImage(this.state.croppedImageUrl);
      }); 
    }
  }

  // If you setState the crop in here you should return false.
  onImageLoaded(image) {
    this.imageRef = image;
    document.getElementsByClassName('ReactCrop__image').ondragstart = function () { return false; };
  };

  onCropComplete(crop) {
    this.makeClientCrop(crop);
  };

  onCropChange(crop, percentCrop) {
    this.setState({ crop });
  };

  onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.setState({ src: reader.result });
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  render() {
    const { crop, croppedImageUrl, src } = this.state;

    return (
      <div className="profile-image-form">
        <div id="profile-file-input-container">
          <i className="fas fa-camera-retro" onClick={ this.delegateClick } />
          <input onChange={this.onSelectFile} id="profile-file-input" type="file" accept="image/*" />
        </div>
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            imageStyle={{ border: '1px solid black' }}
            keepSelection
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
      </div>
    )
  }
}

export default ProfileImageForm;