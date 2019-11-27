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
    this.throttledHandleScroll = throttle(this.handleScroll, 50);
    window.addEventListener("scroll", this.throttledHandleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.throttledHandleScroll);
  }

  handleScroll() {
    const aboutPanel = document.getElementById("about-panel");
    const firstCol = document.getElementById("home-feed-first-col");

    if (firstCol) {
    const homePos = firstCol.getBoundingClientRect();

      if (homePos.top <= 0) {
        aboutPanel.setAttribute("style", "position:fixed;");
      } else {
        aboutPanel.setAttribute("style", "position:static;");
      }
    }
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