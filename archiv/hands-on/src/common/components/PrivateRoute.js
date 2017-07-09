import React from 'react'
import PropTypes from 'prop-types'
import LoginController from './LoginController'
import {Route, Redirect } from 'react-router-dom'

export default function PrivateRoute({ component: Component, location, ...rest }) {
  console.log("a" + LoginController.isAuthenticated())
  return (
    <Route {...rest} render={props => 
        (      
            LoginController.isAuthenticated() ? (
             <Component {...props}/>
            ) : (
                <Redirect to={{
                    pathname: '/login/' + location
                }}/>
            )
        )}/>
  )
}

// PrivateRoute.propTypes = {
//   allVotes:       PropTypes.array.isRequired,
//   currentVoteId:  PropTypes.string
// }