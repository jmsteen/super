import React from "react";
import { withRouter } from "react-router-dom";
import ArticleFeedItem from "./article_feed_item";

class Articles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    this.props.fetchArticles();
  }

  componentWillReceiveProps(newState) {
    this.setState({ articles: newState.articles });
  }

  render() {
    if (this.state.articles.length === 0) {
      return <div>There are no Articles</div>;
    } else {
      return (
        <div>
          <h2>All Articles</h2>
          {this.state.articles.map(article => (
            <ArticleFeedItem key={article.id} text={article.title} />
          ))}
        </div>
      );
    }
  }
}

export default withRouter(Articles);
