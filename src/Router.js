import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Home from './home';
import App from './App';


const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/Home/:userName" component={Home}/>
        </Switch>
    </HashRouter>
);

export default BasicRoute;