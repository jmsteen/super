import React from 'react';
import { Link } from 'react-router-dom';

const UserPanel = props => {
  const { handle, displayName, image, _id } = props.user;
  const style = { backgroundImage: `url(${image || require('../../../assets/images/default_profile.svg')})` }

  return (
    <li className="search-user-panel">
      <Link to={`/@${handle}`} >
        <div style={style}/>
        <span>{displayName || `@${handle}`}</span>
      </Link>
    </li>
  )
};

export default UserPanel;