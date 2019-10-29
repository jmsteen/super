import React, { Component } from 'react'
import { CompositeDecorator, convertFromRaw, Editor, EditorState } from 'draft-js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchArticle, eraseArticle } from '../../actions/article_actions';
import { mediaBlockRenderer } from './image_render';
import ArticleLikeContainer from './article_like';
import AuthorFollow from '../profile/author_follow';
import ReactLoading from 'react-loading';
import CommentIndex from '../comments/comment_index_container';
import './article.scss';
import { Link } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
    return {
        currentArticle: state.entities.articles[ownProps.match.params.id],
        currentUser: state.session.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchArticle: id => dispatch(fetchArticle(id)),
        eraseArticle: id => dispatch(eraseArticle(id))
    };
};

const _Link = (props) => {
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
    component: _Link
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
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.fetchArticle(this.props.match.params.id)
            .then(res => this.setState({
                title: res.data.title,
                body: res.data.body,
                author: res.data.author,
                date: res.data.date,
                loaded: true,
                id: res.data.id
            })).catch(err => this.setState({ loaded: true }));
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.setState({ loaded: false });
            this.props.fetchArticle(this.props.match.params.id)
                .then(res => {
                    this.setState({
                        title: res.data.title,
                        body: res.data.body,
                        author: res.data.author,
                        date: res.data.date,
                        loaded: true,
                        id: res.data._id
                    });
                    window.scrollTo(0, 0);
                }).catch(err => this.setState({ loaded: true }));
            }
    }

    convertToRichText(rawContent) {
        const richContent = convertFromRaw(JSON.parse(rawContent));
        const editorState = EditorState.createWithContent(richContent, decorator);
        return editorState;
    }

    handleDelete(e) {
        e.preventDefault();
        if (window.confirm('Are you sure you wish to delete this article?')) {
            this.props.eraseArticle(this.state.id).then(() => {
                this.props.history.push('/');
            })
        }
    }

    render() {
        if (!this.state.loaded) {
            return <ReactLoading
                type={"cubes"}
                color={"black"}
                height={700}
                width={400}
                className="loading"
            />
        } else if (!this.props.currentArticle) {
            return <h2 className="profile-error">Article does not exist</h2>
        }

        const date = new Date(this.state.date);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        var year = date.getFullYear();

        return (
            <div className="display-article-outer">
                <div className="display-article-inner">
                    <div className="article-display">
                        <div className="article-title-container">
                            <h1 className="article-display-title">{this.state.title}</h1>
                            <div className="article-display-button-container">
                                { (this.props.currentUser && this.props.currentUser.id === this.state.author._id) && 
                                    <Link 
                                        className="article-edit-link"
                                        to={`/articles/${this.state.id}/edit`}
                                    >Edit</Link> }
                                {(this.props.currentUser && this.props.currentUser.id === this.state.author._id) &&
                                    <button
                                        className="article-edit-link"
                                        onClick={this.handleDelete}
                                    >Delete</button>}
                            </div>
                        </div>
                        <div className="article-display-meta">
                            <Link className="article-display-meta-image-link" to={`/@${this.state.author.handle}`}><img alt="author" src={ this.state.author.image || require('../../assets/images/default_profile.svg') }/></Link>
                            
                            <div className="article-display-meta-top">
                                <h2><Link to={`/@${this.state.author.handle}`}>{this.state.author.displayName || this.state.author.handle}</Link></h2>
                                { (this.props.currentUser && this.props.currentUser.id !== this.state.author._id) && <AuthorFollow />}
                            </div>
                            
                            <div className="article-display-meta-bottom">
                                <span>{month + "/" + day + "/" + year}</span>
                            </div>
                        </div>
                        {this.state.body && (<div className="article-display-body">
                        <Editor 
                            editorState={this.convertToRichText(this.state.body)}
                            readOnly
                            blockRendererFn={mediaBlockRenderer} 
                            ref="editor"
                        /></div>)}
                    </div>
                

                    <ArticleLikeContainer />
                    <CommentIndex/>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleDisplay));