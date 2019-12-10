import React, { useState, useEffect } from 'react';
import axios from 'axios';
import debounce from 'debounce';
import SearchSection from './section';

const getSimpleResults = filter => {
  return axios.get(`/api/search/simple/${filter}`)
};

function search(filt, setUsers, setArticles) {
  if (!filt) return;
  getSimpleResults(filt)
    .then(({ data }) => { setUsers(data.users); setArticles(data.articles) })
    .catch(err => console.log(err));
}

const debouncedSearch = debounce(search, 350);

const SearchInput = props => {
  const [filter, setFilter] = useState('');
  const [focus, setFocus] = useState(false);
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  let input;

  function toggleOpen() {
    input.classList.toggle('closed');
    input.focus();
    setFocus(!focus);
    setFilter('');
  }

  function close() {
    setTimeout(() => {
      let input = document.getElementById('navbar-search-input');
      input.classList.add('closed');
      setFocus(!focus); 
      setFilter('');
    }, 100);
  }

  return (
    <div className="navbar-search">
      <i className="fas fa-search" onClick={() => toggleOpen()}/>
      <input 
        className="closed"
        id="navbar-search-input" 
        type="text"
        value={filter}
        onBlur={() => setTimeout(close(), 100)}
        onChange={e => { setFilter(e.target.value); debouncedSearch(e.target.value, setUsers, setArticles); }} 
        ref={node => input = node}/>
      { (focus && filter.length > 0) && <SearchSection users={users} articles={articles} />}
    </div>
  )
};

export default SearchInput;