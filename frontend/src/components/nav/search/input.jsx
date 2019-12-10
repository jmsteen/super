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
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);

  function toggleOpen() {
    let inp = document.getElementById('navbar-search-input');
    inp.classList.toggle('closed');
    inp.focus();
    setFilter('');
  }

  function close(event) {
    let inp = document.getElementById('navbar-search-input');
    let x = event.target;
    let notransition = false;
    while (x.parentNode) {
      if (x.tagName == "A") notransition = true;
      x = x.parentNode;
    }
    if (notransition) inp.classList.add('notransition');
    inp.classList.add('closed');
    if (notransition) setTimeout(() => {
      inp.classList.remove('notransition')
    }, 50);
    setFilter('');
  }

  useEffect(() => {
    let div = document.getElementById('navbar-search');
    let icon = document.getElementById('search-icon');
    div.onclick = event => {
      let x = event.target;
      while (x.parentNode) {
        if (x.tagName == "A") return;
        x = x.parentNode;
      }
      event.stopPropagation();
    }
    icon.onclick= () => toggleOpen();
    document.body.addEventListener('click', close);
    return () => {
      document.body.removeEventListener('click', close);
    }
  }, []);

  return (
    <div className="navbar-search" id="navbar-search">
      <i className="fas fa-search" id="search-icon"/>
      <input 
        className="closed"
        id="navbar-search-input" 
        type="text"
        value={filter}
        onChange={e => { setFilter(e.target.value); debouncedSearch(e.target.value, setUsers, setArticles); }} 
      />
      { (filter.length > 0) && <SearchSection close={close} users={users} articles={articles} />}
    </div>
  )
};

export default SearchInput;