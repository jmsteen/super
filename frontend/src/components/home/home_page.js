import React from 'react';
import HomeMain from './home_main';
import HomeFeed from './home_feed';
import ReactLoading from 'react-loading';


const throttle = (func, limit) => {
  let inThrottle
  return function () {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  componentDidMount() {
    this.props.fetchArticles().then(() => this.setState({ loaded: true }));
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
    
    return (
      <div className="home-page">
          <HomeMain articles={topArticles}/>
          <HomeFeed articles={botArticles}/>
      </div>
    );
  }
}

export default HomePage;