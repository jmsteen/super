import React from 'react';
import { Link } from 'react-router-dom';

const ArticlePanel = props => {
  const { image, title, _id, author } = props.article;
  const style = { backgroundImage: `url(${image || require('../../../assets/images/default_article.png')})` }

  return (
    <li className="search-article-panel">
      <Link to={`/articles/${_id}`}>
        <div style={style} className="search-article-panel-image"/>
        <div className="search-article-panel-text">
          <h4>{title}</h4>
          <span>by {author.displayName || `@${author.handle}`}</span>
        </div>
      </Link>
    </li>
  )
};

export default ArticlePanel;