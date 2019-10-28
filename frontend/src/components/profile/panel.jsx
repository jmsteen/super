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
        <Link to={`/@${article.author.handle}`}><img alt="author" src={article.author.image || require('../../assets/images/default_profile.svg')} /></Link>
        <div className="profile-panel-info">
          <span><Link className="author-link" to={`/@${article.author.handle}`}>{article.author.handle}</Link></span>
          <span>{month + "/" + day + "/" + year}</span>
        </div>
      </div>
      <Link to={`/articles/${article._id}`} className="profile-panel-link">
        <img src={article.image || require('../../assets/images/default_article.png')} alt=""/>
        <h3>{article.title}</h3>
      </Link>
      <div className="profile-panel-bottom">
        { props.selfArticle && <Link to={`/articles/${article._id}/edit`}>Edit Article</Link>}
      </div>
    </li>
  );
};

export default ProfileArticlePanel;