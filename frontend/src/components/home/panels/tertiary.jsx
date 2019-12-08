import React from 'react';
import { rawToPlain } from '../../../util/rich_text_util';
import { Link } from 'react-router-dom';

const HomeTertiaryPanel = props => {
  const article = props.article;
  const text = rawToPlain(article.body);

  return (
    <div className="home-tertiary-panel">
      <div className="home-tertiary-panel-text">
        <h2><Link to={`/articles/${article._id}`}>{article.title}</Link></h2>
        <p><Link to={`/articles/${article._id}`}>{text.slice(0, 115).trim(' .?!,') + '...'}</Link></p>
        <span>Author: <Link to={`/@${article.author.handle}`}>{ article.author.displayName || article.author.handle }</Link></span>
      </div>
      <Link to={`/articles/${article._id}`}><img alt="" src={article.image || require('../../../assets/images/default_article.png')} /></Link>
    </div>
  )
}

export default HomeTertiaryPanel