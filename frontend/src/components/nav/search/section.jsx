import React from 'react';
import UserPanel from './user_panel';
import ArticlePanel from './article_panel';

const SearchSection = props => {
  const { articles, users } = props;
  const userPanels = users.map(user => <UserPanel key={user._id} user={user} />);
  const articlePanels = articles.map(article => <ArticlePanel key={article._id} article={article}/>)
  return (
    <div className="search-section">
      { users.length > 0 && 
        <>
          <h3>People</h3>
          <ul className="search-people-list">
            {userPanels}
          </ul>
        </>
      }
      { articles.length > 0 &&
        <>
          <h3>Articles</h3>
          <ul className="search-article-list">
            {articlePanels}
          </ul>
        </>
      }
      {
        users.length === 0 && articles.length === 0 &&
        <h2>No results found!</h2>
      }
    </div>
  )
};

export default SearchSection;