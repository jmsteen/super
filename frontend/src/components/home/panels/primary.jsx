import React from 'react';
import { rawToPlain } from '../../../util/rich_text_util';
import { Link } from 'react-router-dom';

const HomePrimaryPanel = props => {
  const article = props.article;
  const text = rawToPlain(article.body);

  return (
    <div className="home-primary-panel">
      <Link to={`/articles/${article._id}`}>
        <img src={ article.image || require('../../../assets/images/default_article.png')} alt='primary'/>
      </Link>
      <div className="home-primary-panel-text">
        <Link className="home-primary-title" to={`/articles/${article._id}`}>
          <h2>{article.title}</h2>
        </Link>
        <Link className="home-primary-snippet" to={`/articles/${article._id}`}>  
          <p>{text.slice(0, 125).trim(' .?!,') + '...'}</p>
        </Link>
        <span className="home-primary-author">Author: <Link to={`/@${article.author.handle}`}>{ article.author.displayName || article.author.handle}</Link></span>
      </div>
    </div>
  )
}

export default HomePrimaryPanel