import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import HomePage from '../pages/HomPage';
import RedirectPage from '../pages/RedirectPages';
import StatsPage from '../pages/StatsPage';
import NotFoundPage from '../pages/NotFoundPage';
function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/:code" component={RedirectPage}/>
                <Route exact path="/:code" component={StatsPage}/>
                <Route exact apth="/*" component={NotFoundPage}/>
            </Switch>
        </BrowserRouter>
    )
}
export default Routes;