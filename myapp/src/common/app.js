import React, { Component } from 'react'
import Layout from './components/Layout'
import VotePage from './containers/VotePage'
import SingleVotePage from './containers/SingleVotePage'
import VoteComposerPage from './containers/VoteComposerPage'
import LoginPage from './containers/LoginPage'
import NoMatch from './containers/NoMatchPage'
import {Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

//const mainComponent = <VoteController/>;

function isAuthenticated(login) {  
  if (!login) {
    return false
  }
  return true 
}



class App extends Component {
    
    render() {
        const login = this.props.login 
        return (
            <Layout>
                <Switch>
                    <Redirect exact from="/" to="/votes"/>
                    <Route exact path="/votes" component={VotePage}/>
                    <Route exact path="/votes/:id" component={SingleVotePage}/>
                    <Route path="/login/:redirect*" component={LoginPage}/>
                    <Route path="/compose" render={(props) => {
                        // Wenn ich auf dem Server bin, dann
                        if (props.staticContext) {
                            props.staticContext.state = {from: props.location} //brauch ich das überhaupt noch ?
                        }
                        return(      
                            isAuthenticated(login) ? ( 
                                <VoteComposerPage {...props}/> 
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
export default withRouter(connect((state)=>({login: state.login}),null)(App))
//export default App