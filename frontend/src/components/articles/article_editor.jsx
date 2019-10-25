import React, { Component } from 'react'
import { CompositeDecorator, RichUtils, convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchArticle, reviseArticle } from '../../actions/article_actions';
import { mediaBlockRenderer } from './image_render';
import ArticleLikeContainer from './article_like';
import ReactLoading from 'react-loading';
import CommentIndex from '../comments/comment_index_container';
import './article.scss';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import ImageAdd from './image_add';
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    BlockquoteButton,
    CodeBlockButton
} from 'draft-js-buttons';
import createLinkPlugin from 'draft-js-anchor-plugin';
import 'draft-js/dist/Draft.css';
import createMarkdownPlugin from 'draft-js-markdown-plugin';
import './article.scss';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css'
import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin';

const linkPlugin = createLinkPlugin({ placeholder: 'Enter your link here...' });
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

const mapStateToProps = (state, ownProps) => {
    return {
        currentArticle: state.entities.articles[ownProps.match.params.id]
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchArticle: id => dispatch(fetchArticle(id)),
        handlePost: data => dispatch(reviseArticle(data))
    };
};

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

class ArticleEditor extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
            article: {
                title: "",
                body: null,
                author: "",
                id: this.props.match.params.id
            },
            editorState: EditorState.createEmpty(decorator),
            loaded: false
        }
        this.onChange = (editorState) => this.setState({ editorState });
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.focus = this.focus.bind(this);
    }

    componentDidMount() {
        this.focus();
        this.props.fetchArticle(this.props.match.params.id)
            .then(res => this.setState({
                article: {
                    title: res.data.title,
                    body: res.data.body,
                    author: res.data.author,
                    id: this.props.match.params.id
                },
                editorState: this.convertToRichText(res.data.body),
                loaded: true
            }))
            .catch(err => this.setState({ loaded: true }))
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.setState({ loaded: false });
            this.props.fetchArticle(this.props.match.params.id)
                .then(res => this.setState({
                    article: {
                        title: res.data.title,
                        body: res.data.body,
                        author: res.data.author,
                        id: this.props.match.params.id
                    },
                    loaded: true
                })).catch(err => this.setState({ loaded: true }));
            }
    }

    convertToRichText(rawContent) {
        const richContent = convertFromRaw(JSON.parse(rawContent));
        const editorState = EditorState.createWithContent(richContent, decorator);
        return editorState;
    }

    focus = () => {
        if (this.editor) {
            this.editor.focus();
        };
    };

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
        debugger
        this.props.handlePost({
            body: contentString,
            author: this.state.article.author,
            title: this.state.article.title,
            id: this.state.article.id
        }).then(res => {
            return this.props.history.push(`/articles/${res.data._id}`)
        });
    }

    render() {
        if (!this.state.loaded) {
            return <ReactLoading
                type={"bars"}
                color={"white"}
                height={700}
                width={400} />
        } else if (!this.props.currentArticle) {
            return <h2 className="profile-error">Article does not exist</h2>
        }

        return (
            <div className="display-article-outer">
                <div className="display-article-inner">
                    <div className="article-edit">
                        <h1 className="article-display-title">{this.state.article.title}</h1>
                        <h2>{this.state.article.author}</h2>
                        <div className="article-display-body">
                        <ImageAdd
                            editorState={this.state.editorState}
                            onChange={this.onChange}
                            modifier={imagePlugin.addImage}
                        />
                        <Editor 
                            editorState={this.state.editorState}
                            blockRendererFn={mediaBlockRenderer} 
                            // ref="editor"
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
                        </div>
                    <button onClick={this.handlePost} className="publish-button">Publish</button>  
                    </div>

                    <ArticleLikeContainer />
                    <CommentIndex />
                </div>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleEditor));
