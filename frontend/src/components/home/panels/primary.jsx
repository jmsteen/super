import React from 'react';
import { rawToPlain } from '../../../util/rich_text_util';
import { Link } from 'react-router-dom';

const HomePrimaryPanel = props => {
  const article = props.article;
  const text = rawToPlain(article.body);

  return (
    <div className="home-primary-panel">
      <Link to={`/articles/${article._id}`}>
        <img src="https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"/>
      </Link>
      <div className="home-primary-panel-text">
        <Link className="home-primary-title" to={`/articles/${article._id}`}>
          <h2>{article.title}</h2>
        </Link>
        <Link className="home-primary-snippet" to={`/articles/${article._id}`}>  
          <p>{text.slice(0, 150).trim()}</p>
        </Link>
        <span className="home-primary-author"><Link to={`/@${article.author.handle}`}>Author: {article.author.handle}</Link></span>
      </div>
    </div>
  )
}

export default HomePrimaryPanel