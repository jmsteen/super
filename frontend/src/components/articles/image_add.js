import React, { Component } from 'react';
import './image-styles.css';

export default class ImageAdd extends Component {
  
    state = {
        url: '',
        open: false,
    };

    componentDidMount() {
        document.addEventListener('click', this.closePopover);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.closePopover);
    }

    onPopoverClick = () => {
        this.preventNextClose = true;
    }

    openPopover = () => {
        if (!this.state.open) {
            this.preventNextClose = true;
            this.setState({
                open: true,
            });
        }
    };

    closePopover = () => {
        if (!this.preventNextClose && this.state.open) {
            this.setState({
                url: '',
                open: false,
            });
        }

        this.preventNextClose = false;
    };

    addImage = () => {
        const { editorState, onChange } = this.props;
        onChange(this.props.modifier(editorState, this.state.url));
    };

    changeUrl = (evt) => {
        this.setState({ url: evt.target.value });
    }

    render() {
        const popoverClassName = this.state.open ?
            'addImagePopover' :
            'addImageClosedPopover';
        const buttonClassName = this.state.open ?
            'addImagePressedButton' :
            'addImageButton';

        return (
            <div className={`addImage ${this.props.addClass ? this.props.addClass : ""}`}>
                <button
                    className={buttonClassName}
                    onMouseUp={this.openPopover}
                    type="button"
                ><svg className="plus" viewBox="0 0 32 32">
                    <path d="M16,31.89L16,31.89c-0.96,0-1.73-0.78-1.73-1.73V1.84c0-0.96,0.78-1.73,1.73-1.73h0c0.96,0,1.73,0.78,1.73,1.73v28.32
                        C17.73,31.12,16.96,31.89,16,31.89z"/>
                    <path d="M31.89,16L31.89,16c0,0.91-0.74,1.65-1.65,1.65H1.75c-0.91,0-1.65-0.74-1.65-1.65v0c0-0.91,0.74-1.65,1.65-1.65h28.49
                        C31.16,14.35,31.89,15.09,31.89,16z"/>
                </svg>
                </button>
                <div
                    className={popoverClassName}
                    onClick={this.onPopoverClick}
                >
                    <input
                        type="text"
                        placeholder="Paste the image url …"
                        className='addImageInput'
                        onChange={this.changeUrl}
                        value={this.state.url}
                    />
                    <button
                        className='addImageConfirmButton'
                        type="button"
                        onClick={this.addImage}
                    >
                        Add
                    </button>
                </div>
            </div>
        );
    }
}