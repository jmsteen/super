import React, { Component } from 'react'
import { CompositeDecorator, convertFromRaw, Editor, EditorState, AtomicBlockUtils } from 'draft-js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchArticle } from '../../actions/article_actions';
import { mediaBlockRenderer } from './image_render';
import ArticleLikeContainer from './article_like';
import ReactLoading from 'react-loading';

const mapStateToProps = (state, ownProps) => {
    return {
        currentArticle: state.entities.articles[ownProps.match.params.id]
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchArticle: id => dispatch(fetchArticle(id))
    };
};

const Link = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
        <a href={url} nofollow="true" noreferrer="true">
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

class ArticleDisplay extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            title: "",
            body: null,
            author: "",
            loaded: false
        }
    }

    componentDidMount() {
        this.props.fetchArticle(this.props.match.params.id)
            .then(res => this.setState({
                title: res.data.title,
                body: res.data.body,
                author: res.data.author,
                loaded: true
            })).catch(err => this.setState({ loaded: true }));
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.setState({ loaded: false });
            this.props.fetchArticle(this.props.match.params.id)
                .then(res => this.setState({
                    title: res.data.title,
                    body: res.data.body,
                    author: res.data.author,
                    loaded: true
                })).catch(err => this.setState({ loaded: true }));
            }
    }

    convertToRichText(rawContent) {
        const richContent = convertFromRaw(JSON.parse(rawContent));
        const editorState = EditorState.createWithContent(richContent, decorator);
        return editorState;
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
            <div className="article-display-container">
                <div className="article-display">
                    <h1 className="article-display-title">{this.state.title}</h1>
                    <h2>{this.state.author}</h2>
                    {this.state.body && (<div className="article-display-body">
                    <Editor 
                        editorState={this.convertToRichText(this.state.body)}
                        readOnly
                        blockRendererFn={mediaBlockRenderer} 
                        ref="editor"
                    /></div>)}
                </div>
                <ArticleLikeContainer />
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleDisplay));
