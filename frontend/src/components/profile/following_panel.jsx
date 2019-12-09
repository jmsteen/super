import React from 'react';
import { Link } from 'react-router-dom';

const FollowingPanel = props => {
  const { handle, displayName, image, _id } = props.author;
  const style = { backgroundImage: `url(${image || require('../../assets/images/default_profile.svg')})`};
  return (
    <li className="follow-list-item">
      <Link to={`/@${handle}`}>
        <div style={style}/>
        <span>{displayName || handle}</span>
      </Link>
    </li>
  )
};

export default FollowingPanel;