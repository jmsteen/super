import React from 'react';

class ArticleFeedItem extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
      </div>
    );
  }
}

export default ArticleFeedItem;