import React from 'react';
import HomeMain from './home_main';
import HomeFeed from './home_feed';
import ReactLoading from 'react-loading';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false, total: 0 };
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.props.fetchArticlePage(1)
      .then(res => this.setState({ loaded: true, total: res.total }))
  }

  componentWillUnmount() {
    this.props.clearArticles();
  }

  loadMore(page) {
    this.props.fetchArticlePage(page);
  }

  render() {
    if (!this.state.loaded) {
      return <ReactLoading
        type={"cubes"}
        color={"black"}
        height={350}
        width={200}
        className="loading"
      />
    };

    const topArticles = this.props.articles.slice(0, 4);
    const botArticles = this.props.articles.slice(4);
    const hasMore = this.props.articles.length < this.state.total;
    
    return (
      <div className="home-page">
          <HomeMain articles={topArticles}/>
          <HomeFeed articles={botArticles} hasMore={hasMore} loadMore={this.loadMore}/>
      </div>
    );
  }
}

export default HomePage;