import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import { Home } from './Pages/Home/Home';
import { Barbers } from './Pages/Barbers/Barbers';
import { Services } from './Pages/Services/Services';
import './App.scss'

const App = () => {
    return (
        <Router>
            <div className="container">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/Barbers" component={Barbers} />
                    <Route path="/Services" component={Services} />
                </Switch>
            </div>
        </Router>
    );
};

export { App } //Notes: No export default, is deprecated