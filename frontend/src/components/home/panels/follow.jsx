import React from 'react';
import { Link } from 'react-router-dom';

const HomeFollowPanel = props => {
  const { author, article } = props;
  return (
    <li className="home-follow-panel">
      <Link className="home-follow-title" to={`/articles/${article._id}`}>{article.title}</Link>
      <Link className="home-follow-author" to={`/@${author.handle}`}>{ author.displayName || author.handle }</Link>
    </li>
  )
};

export default HomeFollowPanel;