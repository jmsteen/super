import React, { Component } from 'react'
import { CompositeDecorator, convertFromRaw, Editor, EditorState } from 'draft-js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchArticle } from '../../actions/article_actions';

const mapStateToProps = ({articles}, ownProps) => {
    return {
        
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
        <a href={url} nofollow noreferrer>
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
            author: ""
        }
    }

    componentDidMount() {
        this.props.fetchArticle(this.props.match.params.id)
            .then(res => this.setState({
                title: res.article.data.title,
                body: res.article.data.body,
                author: res.article.data.author
            }))
    }

    convertToRichText(rawContent) {
        const richContent = convertFromRaw(JSON.parse(rawContent));
        const editorState = EditorState.createWithContent(richContent, decorator);
        return editorState;
    }

    render() {
        return (
            <div className="article-display-container">
                <div className="article-display">
                    <h1 className="article-display-title">{this.state.title}</h1>
                    <h2>{this.state.author}</h2>
                    {this.state.body && (<div className="article-display-body">
                    <Editor 
                        editorState={this.convertToRichText(this.state.body)}
                        readOnly
                    /></div>)}
                </div>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleDisplay));
