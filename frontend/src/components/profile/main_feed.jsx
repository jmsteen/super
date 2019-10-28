import React from 'react';
import ProfileArticlePanel from './panel';

class ProfileMainFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: this.props.articles };
  }

  render() {

    const articleLis = this.state.articles.map(article => (
      <ProfileArticlePanel article={article} key={article._id} selfArticle={true} />
    ))

    return (
      <div className='profile-feed'>
        <h3>Recent</h3>
        <ul>
          {articleLis}
        </ul>
      </div>
    )
  }
};

export default ProfileMainFeed;