import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Redirect, Route, Link } from 'react-router-dom'
// import VoteController from './VoteController'

export default function Layout({children}) {
 
  return (
    <div>
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
