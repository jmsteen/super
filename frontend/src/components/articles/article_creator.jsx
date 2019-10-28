import React, { Component } from 'react';
import { EditorState, RichUtils, convertToRaw, CompositeDecorator } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import ImageAdd from './image_add';
import { withRouter } from 'react-router-dom';
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    BlockquoteButton,
    CodeBlockButton
} from 'draft-js-buttons';
import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin';
import createLinkPlugin from 'draft-js-anchor-plugin';
import 'draft-js/dist/Draft.css';
import createMarkdownPlugin from 'draft-js-markdown-plugin';
import './article.scss';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css'

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
]

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
    }

    focus = () => {
        this.editor.focus();
    };

    componentDidMount () {
        this.focus();
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
        
        this.props.handlePost({
            body: contentString,
            author: this.props.author,
            title: this.props.title
        }).then(res => this.props.history.push(`/articles/${res.data._id}`));
    }

    renderPlaceholder(placeholder, editorState) {
        const currentContent = editorState.getCurrentContent();
        const hideContent = currentContent.hasText() || currentContent.getBlockMap()
            .first().getType() !== "unstyled";
        return hideContent ? '' : placeholder;
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
                                <LinkButton {...externalProps} />
                                <Separator {...externalProps} />
                                <CodeButton {...externalProps} />
                                <BlockquoteButton {...externalProps} />
                                <CodeBlockButton {...externalProps} />
                            </div>
                        )
                    }</InlineToolbar>
                    
                <button onClick={this.handlePost} className="publish-button">Publish</button>  
                </div>
            </div>
        )
    }
}

export default withRouter(ArticleCreator);