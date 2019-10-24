import React from 'react';
import { Link } from 'react-router-dom';

const HomeSecondaryPanel = props => {
  const article = props.article;

  return (
    <div className="home-secondary-panel">
      <Link to={`/articles/${article._id}`}><img src="https://hackernoon.com/hn-images/1*jFyawcsqoYctkTuZg6wQ1A.jpeg"/></Link>
      <div className="home-secondary-panel-text">
        <h2><Link to={`/articles/${article._id}`}>{article.title}</Link></h2>
        <span>Author: <Link to={`/@${article.author.handle}`}>{article.author.handle}</Link></span>
      </div>
    </div>
  )
}

export default HomeSecondaryPanel