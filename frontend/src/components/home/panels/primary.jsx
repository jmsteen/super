import React from 'react';

const HomePrimaryPanel = props => {
  return (
    <div className="home-primary-panel">
      <img src="https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"/>
      <div className="home-primary-panel-text">
        <h2>This is a random title, which is designed to take up some amount of space</h2>
        <p>This is a random segment, will replace in the future of course.</p>
        <span>Author McWriterson</span>
      </div>
    </div>
  )
}

export default HomePrimaryPanel