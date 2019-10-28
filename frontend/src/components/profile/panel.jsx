import React from 'react';
import { Link } from 'react-router-dom';

const ProfileArticlePanel = props => {
  const article = props.article;
  const date = new Date(article.date);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  var year = date.getFullYear();

  return (
    <li className="profile-article-panel">
      <div className="profile-panel-top">
        <Link to={`/@${article.author.handle}`}><img alt="author" src={article.author.image} /></Link>
        <div className="profile-panel-info">
          <span><Link className="author-link" to={`/@${article.author.handle}`}>{article.author.handle}</Link></span>
          <span>{month + "/" + day + "/" + year}</span>
        </div>
      </div>
      <Link to={`/articles/${article._id}`} className="profile-panel-link">
        <img src="https://d17fnq9dkz9hgj.cloudfront.net/breed-uploads/2018/09/dog-landing-hero-lg.jpg?bust=1536935129&width=1080" alt=""/>
        <h3>{article.title}</h3>
      </Link>

    </li>
  );
};

export default ProfileArticlePanel;