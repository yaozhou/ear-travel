import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory, hashHistory, browserHistory } from 'react-router';

import Main from './components/Main' ;
import Container from './components/Container'
import AdminLogin from './components/Admin/Login'
import injectTapEventPlugin from 'react-tap-event-plugin';
import Audio from './components/Audio'

injectTapEventPlugin();

let element = document.getElementById('reactEntry');
ReactDOM.render(( 
        <Router history={hashHistory}>
            
            <Route path="/app" component={Container} >       
                <Route path="/login" component={AdminLogin} />
                <Route path="/" component={Main} />
                <Route path="/audio" component={Audio} />
            </Route>
                 
        </Router>
  ), element) ;