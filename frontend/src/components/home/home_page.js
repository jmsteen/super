import React from 'react';
import HomeMain from './home_main';
import HomeFeed from './home_feed';


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

  componentDidMount() {
    this.throttledHandleScroll = throttle(this.handleScroll, 50);
    window.addEventListener("scroll", this.throttledHandleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.throttledHandleScroll);
  }

  handleScroll() {
    const aboutPanel = document.getElementById("about-panel");
    const firstCol = document.getElementById("home-feed-first-col");
    const homePos = firstCol.getBoundingClientRect();

    if (homePos.top <= 0) {
      aboutPanel.setAttribute("style", "position:fixed;");
    } else {
      aboutPanel.setAttribute("style", "position:static;");
    }
  }

  render() {
    return (
      <div className="home-page">
          <HomeMain />
          <HomeFeed />
      </div>
    );
  }
}

export default HomePage;