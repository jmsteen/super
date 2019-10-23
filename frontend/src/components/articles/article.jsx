import React, { Component } from 'react';
import ArticleEditor from './article_editor';
import './article.scss';

export default class Article extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: ""
        }
    }

    update(field) {
        return e => {
            this.setState({
                [field]: e.target.value
            });
        };
    };

    render() {
        return (
            <div>
                <form className="title-text-editor">
                    <input 
                        type="text"
                        value={this.state.title}
                        onChange={this.update('title')}
                        placeholder="Title"
                    />
                </form>
                <div>
                    <ArticleEditor 
                        handlePost={this.props.composeArticle} 
                        placeholder="Share your thoughts..."
                        author={this.props.author}
                        title={this.state.title}
                    />
                </div>
            </div>
        )
    }
}
