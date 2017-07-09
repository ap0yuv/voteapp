import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Redirect, Route } from 'react-router-dom'

export default function Layout({children}) {
  ///onEnter={LoginController.requireAuth}
  return (
    <div>
      <Switch>
        <Redirect from='/' to='/votes'/>
        <Route path="votes" component={VoteController}/>
        <Route path="votes/:id" component={SingleVoteController} />
        <Route path="login(/:redirect)" component={LoginController}/>
        <Route path="compose" component={VoteComposerController} />        
        <Route path="*" component={NoMatch}/>
      </Switch> 
        <div className="Background">
          <div className="Header">
            <div className="Title">
              Vote as a Service
            </div>
          </div>

          <div className="Main">
            <div className="Container">
              {children}
            </div>
          </div>
        </div>
    </div>
  );
}
Layout.propTypes = {
  children: PropTypes.element.isRequired
};