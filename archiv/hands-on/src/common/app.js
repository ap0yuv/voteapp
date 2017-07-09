import React, { Component } from 'react'
import Layout from './components/Layout'
import VoteController from './components/VoteController'
import SingleVoteController from './components/SingleVoteController'
import VoteComposerController from './components/VoteComposerController'
import LoginController from './components/LoginController'
import NoMatch from './components/NoMatch'
import {Route, Switch, Redirect } from 'react-router-dom'

//const mainComponent = <VoteController/>;

class App extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Redirect exact from="/" to="/votes"/>
                    <Route exact path="/votes" component={VoteController}/>
                    <Route exact path="/votes/:id" component={SingleVoteController}/>
                    <Route path="/login/:redirect*" component={LoginController}/>
                    <Route path="/compose" render={(props) => {
                        if (props.staticContext) {
                            props.staticContext.state = {from: props.location}
                        }
                        return(      
                            LoginController.isAuthenticated() ? ( 
                                <VoteComposerController {...props}/> 
                            ) : ( 
                                <Redirect to={{ pathname: "/login" , state: {from: props.location}}}/>
                            )
                        )
                    }}/>
                    <Route path="*" component={NoMatch}/>
                </Switch>
            </Layout>
        );
    }
}
export default App