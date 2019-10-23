import React, { Component } from 'react'
import { CompositeDecorator, convertFromRaw, Editor, EditorState } from 'draft-js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({articles}, ownProps) => {
    return {
        article: articles[ownProps.match.params.id]
    };
};

const mapDispatchToProps = dispatch => {
    return {}
}

const Link = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
        <a href={url} style={styles.link}>
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
    }

    convertToRichText(rawContent) {
        const richContent = convertFromRaw(JSON.parse(rawContent));
        const editorState = EditorState.createWithContent(richContent, decorator);
        return editorState;
    }

    render() {
        return (
            <div>
                <Editor 
                    editorState={convertToRichText(this.props.rawContent)}
                    readOnly
                />
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleDisplay));
