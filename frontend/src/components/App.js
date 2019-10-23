import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import style from '../App.scss';
import ArticleDisplay from './articles/article_display';
import HomePage from './home/home_page';
import Modal from './modal/modal';
import ArticlesContainer from './articles/articles_container';
// import ProfileContainer from './profile/profile_container';
import ArticleComposeContainer from './articles/article_compose_container';

const App = () => (
  <div>
    <NavBarContainer />
    <Modal />
    <Switch>
      <AuthRoute exact path="/" component={HomePage} />
      <ProtectedRoute exact path="/articles" component={ArticlesContainer} />
      {/* <ProtectedRoute exact path="/profile" component={ProfileContainer} /> */}
      <ProtectedRoute exact path="/new_article" component={ArticleComposeContainer} />
      <ProtectedRoute exact path="/articles/:id" component={ArticleDisplay} />
    </Switch>
  </div>
);

export default App;