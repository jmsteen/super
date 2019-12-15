import React, { Component } from 'react';
import { EditorState, RichUtils, convertToRaw, CompositeDecorator } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import ImageAdd from './image_add';
import { withRouter } from 'react-router-dom';
import { composeArticle } from '../../actions/article_actions';
import { receiveImage, clearImage } from '../../actions/image_actions';
import { uploadImage } from '../../util/image_api_util';
import { openModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeBlockButton
} from 'draft-js-buttons';
import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin';
import createLinkPlugin from 'draft-js-anchor-plugin';
import 'draft-js/dist/Draft.css';
import createMarkdownPlugin from 'draft-js-markdown-plugin';
import './article.scss';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';

const linkPlugin = createLinkPlugin({placeholder: 'Enter your link here...'});
const { LinkButton } = linkPlugin;
const imagePlugin = createImagePlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [
    inlineToolbarPlugin,
    linkPlugin,
    createMarkdownPlugin(),
    imagePlugin
];

const mapStateToProps = state => ({
    image: state.image.pub
});

const mapDispatchtoProps = dispatch => ({
    receiveImage: image => dispatch(receiveImage(image)),
    clearImage: () => dispatch(clearImage()),
    openModal: modal => dispatch(openModal(modal)),
    handlePost: data => dispatch(composeArticle(data))
});

const Link = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
        <a className='link' href={url} nofollow="true" noreferrer="true">
            {props.children}
        </a>
    );
};

function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
}

const decorator = new CompositeDecorator([{
    strategy: findLinkEntities,
    component: Link
}]);

class ArticleCreator extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            editorState: EditorState.createEmpty(decorator)
        };
        this.onChange = (editorState) => this.setState({ editorState });
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.renderPlaceholder = this.renderPlaceholder.bind(this);
        this.focus = this.focus.bind(this);
        this.onSelectFile = this.onSelectFile.bind(this);
    }

    focus = () => {
        this.editor.focus();
    };

    componentDidMount () {
        this.focus();
    }

    componentWillUnmount() {
        this.props.clearImage();
    }

    handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    handlePost() {
        const content = this.state.editorState.getCurrentContent();
        const contentString = JSON.stringify(convertToRaw(content));
        uploadImage(this.props.image).then(res => {
            const entry = {
                body: contentString,
                author: this.props.author,
                title: this.props.title,
            };
            if (res && res.data) { entry.image = res.data.imageUrl };
            this.props.handlePost(entry)
                .then(res => this.props.history.push(`/articles/${res.data._id}`));
        });
    }

    delegateClick() {
        document.getElementById('image-publish-input').click();
    }

    myBlockStyleFn(contentBlock) {
        const type = contentBlock.getType();
        if (type === 'blockquote') {
            return 'superBlockquote';
        } else if (type === 'code-block') {
            return 'superCodeblock';
        }
    }

    onSelectFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                this.props.receiveImage(reader.result);
                this.props.openModal('articleImage');
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    renderPlaceholder(placeholder, editorState) {
        const currentContent = editorState.getCurrentContent();
        const hideContent = currentContent.hasText() || currentContent.getBlockMap()
            .first().getType() !== "unstyled";
        return hideContent ? "" : <div className="placeholder">{placeholder}</div>;
    }

    render() {
        return (
            <div className="article-compose-container">
                <ImageAdd
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    modifier={imagePlugin.addImage}
                />
                <div className="body-text-editor" onClick={this.focus}>
                    <Editor
                        editorState={this.state.editorState}
                        blockStyleFn={this.myBlockStyleFn}
                        placeholder={this.renderPlaceholder(this.props.placeholder, this.state.editorState)}
                        onChange={this.onChange}
                        handleKeyCommand={this.handleKeyCommand}
                        plugins={plugins}
                        ref={(element) => { this.editor = element; }}
                    />
                    <InlineToolbar>{
                        (externalProps) => (
                            <div>
                                <BoldButton {...externalProps} />
                                <ItalicButton {...externalProps} />
                                <UnderlineButton {...externalProps} />
                                <Separator {...externalProps} />
                                <LinkButton {...externalProps} />
                                <CodeBlockButton {...externalProps} />
                            </div>
                        )
                    }</InlineToolbar>
                    <button onClick={this.delegateClick} className="image-publish-button">Cover Image</button>
                    <button onClick={this.handlePost} className="publish-button">Publish</button>
                    <input type="file" onChange={this.onSelectFile} id="image-publish-input" accept="image/*"/>  
                </div>
            </div>
        )
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchtoProps
)(ArticleCreator));