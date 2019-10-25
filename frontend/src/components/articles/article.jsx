import React, { Component } from 'react';
import ArticleCreator from './article_creator';
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
            <div className="compose-article-outer">
                <div className="compose-article-inner">
                    <form className="title-text-editor">
                        <input 
                            type="text"
                            value={this.state.title}
                            onChange={this.update('title')}
                            placeholder="Title"
                        />
                    </form>
                    <div>
                        <ArticleCreator 
                            handlePost={this.props.composeArticle} 
                            placeholder="Share your thoughts..."
                            author={this.props.author}
                            title={this.state.title}
                        />
                    </div>

                </div>
            </div>
        )
    }
}
