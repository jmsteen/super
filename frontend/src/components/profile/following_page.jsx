import React from 'react';
import { Link } from 'react-router-dom';
import FollowingPanel from './following_panel';

const FollowingPage = props => {
  const followedAuthors = props.isFollowing.map(follow => follow.author);
  const authorChunks = function chunkArr(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i++) {
      const last = chunks[chunks.length - 1];
      if (!last || last.length === size) {
        chunks.push([array[i]]);
      } else {
        last.push(array[i]);
      }
    }
    return chunks;
  }(followedAuthors, 5);

  const rows = authorChunks.map((chunk, i) => {
    const panels = chunk.map(author => <FollowingPanel key={author._id} author={author}/>);
    while (panels.length < 5) panels.push(<li key={panels.length} className="follow-list-item"/>);
    return <li className="follow-row" key={i}><ul>{panels}</ul></li> 
  })
  
  return (
    <div className="profile-following">
      <ul className="follow-row-list">
        {rows}
      </ul>
    </div>
  )
};

export default FollowingPage;