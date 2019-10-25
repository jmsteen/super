import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import style from '../App.scss';

import ArticleDisplay from './articles/article_display';
import ProfileContainer from './profile/profile_page_container';
import HomePageContainer from './home/home_page_container';
import Modal from './modal/modal';
import ArticlesContainer from './articles/articles_container';
import ArticleEditor from './articles/article_editor';
import ArticleComposeContainer from './articles/article_compose_container';


const App = () => (
  <div>
    <NavBarContainer />
    <Modal />
    <Switch>
      <Route exact path="/" component={HomePageContainer} />
      <Route path="/@:handle" component={ProfileContainer} />
      <ProtectedRoute exact path="/articles" component={ArticlesContainer} />
      <ProtectedRoute exact path="/new_article" component={ArticleComposeContainer} />
      <ProtectedRoute exact path="/articles/:id" component={ArticleDisplay} />
      <ProtectedRoute exact path="/articles/:id/edit" component={ArticleEditor} />
    </Switch>
  </div>
);

export default App;