import React, { Component } from 'react';
import Layout from './components/Layout'
import SingleVoteController from './components/SingleVoteController'
import { HashRouter, Route } from 'react-router-dom'

//const mainComponent = <VoteController/>;

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Route exact path="/" component={Layout} />
            </HashRouter>
        );
    }
}

export default App;