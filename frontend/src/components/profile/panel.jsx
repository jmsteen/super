import React from 'react';
import { Link } from 'react-router-dom';

const ProfileArticlePanel = props => {
  const article = props.article;
  const date = new Date(article.date);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  var year = date.getFullYear();

  const { profileUser } = props;
  const showName = profileUser ? (profileUser.displayName || profileUser.handle) : (article.author.displayName || article.author.handle);
  const handle = profileUser ? profileUser.handle : article.author.handle;
  const image = profileUser ? profileUser.image : article.author.image;


  return (
    <li className="profile-article-panel">
      <div className="profile-panel-top">
        <Link to={`/@${handle}`}><img alt="author" src={ image || require('../../assets/images/default_profile.svg')} /></Link>
        <div className="profile-panel-info">
          <span><Link className="author-link" to={`/@${handle}`}>{showName}</Link></span>
          <span>{month + "/" + day + "/" + year}</span>
        </div>
      </div>
      <Link to={`/articles/${article._id}`} className="profile-panel-link">
        <img src={article.image || require('../../assets/images/default_article.png')} alt=""/>
        <h3>{article.title}</h3>
      </Link>
      <div className="profile-panel-bottom">
        { props.selfPage && <Link to={`/articles/${article._id}/edit`}>Edit Article</Link>}
      </div>
    </li>
  );
};

export default ProfileArticlePanel;