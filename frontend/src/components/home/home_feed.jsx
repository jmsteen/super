import React from 'react';
import HomeTertiaryPanel from './panels/tertiary';
import AboutPanel from './about_panel';
import InfiniteScroll from 'react-infinite-scroller';
import ReactLoading from 'react-loading';

const HomeFeed = props => {
  const { hasMore, loadMore, articles} = props;
  const feedLis = articles.map(article => {
    return <li key={article._id}><HomeTertiaryPanel article={article} /></li> 
  });

  const loading = (
    <ReactLoading
      type={"spin"}
      color={"black"}
      height={50}
      width={50}
      className="article-loading"
      key={'00'}
    />);

  return (
    <div className="home-feed">
      <div className="home-feed-first-col" id="home-feed-first-col">
        <InfiniteScroll
          element='ul'
          initialLoad={false}
          pageStart={1}
          loadMore={loadMore}
          hasMore={hasMore}
          loader={loading}
        >
          {feedLis}
        </InfiniteScroll>
      </div>
      <div className="home-feed-second-col">
        <AboutPanel />
      </div>
    </div>
  )
};

export default HomeFeed;