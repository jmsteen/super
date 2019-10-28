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
        <p><Link to={`/articles/${article._id}`}>{text.slice(0, 125).trim(' .?!,') + '...'}</Link></p>
        <span>Author: <Link to={`/@${article.author.handle}`}>{article.author.handle}</Link></span>
      </div>
      <Link to={`/articles/${article._id}`}><img alt="" src="https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" /></Link>
    </div>
  )
}

export default HomeTertiaryPanel