import React from 'react';
import { connect } from 'react-redux';
import { receiveImage, clearImage } from '../../actions/image_actions';
import { closeModal } from'../../actions/modal_actions';
import ReactCrop from 'react-image-crop';


const mapStateToProps = state => ({
  image: state.image.pub
});

const mapDispatchToProps = dispatch => ({
  receiveImage: image => dispatch(receiveImage(image)),
  clearImage: () => dispatch(clearImage()),
  closeModal: () => dispatch(closeModal())
});

class ArticleImageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      src: props.image,
      crop: {
        unit: '%',
        width: 30,
        aspect: 2 / 1,
      }
    };
    props.clearImage();
    this.onCropChange = this.onCropChange.bind(this);
    this.onCropComplete = this.onCropComplete.bind(this);
    this.makeClientCrop = this.makeClientCrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onImageLoaded = this.onImageLoaded.bind(this);
  }

  handleSubmit() {
    this.props.receiveImage(this.state.croppedImageUrl);
    this.props.closeModal();
  }

  onCropComplete(crop) {
    this.makeClientCrop(crop);
  };

  onCropChange(crop, percentCrop) {
    this.setState({ crop });
  };

  onImageLoaded(image) {
    this.imageRef = image;
    document.getElementsByClassName('ReactCrop__image')[0].ondragstart = function () { return false; };
  };

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = 600;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    console.dir(image);

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      600,
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

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ croppedImageUrl });
    }
  }

  render() {
    const { crop, src } = this.state;

    return (
      <div className="article-image-form">
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            imageStyle={{ maxHeight: '500px'}}
            keepSelection
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
        <button onClick={this.handleSubmit}>Submit Image</button>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleImageForm);