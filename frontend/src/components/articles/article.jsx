import React, { Component } from 'react';
import ArticleBodyEditor from './article_body_editor';
import ArticleTitleEditor from './article_title_editor';
import './article.scss';

export default class Article extends Component {

    render() {
        return (
            <div>
                <ArticleTitleEditor placeholder="Title"/>
                <ArticleBodyEditor placeholder="Share your thoughts..."/>
                <button className="publish-button">Publish</button>
            </div>
        )
    }
}
