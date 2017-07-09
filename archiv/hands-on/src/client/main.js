// Import React
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from '../common/app'
import { BrowserRouter } from 'react-router-dom'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </AppContainer>,
    document.getElementById('voteAppMountPoint')
  )
};

render(App)

if (module.hot) {
  module.hot.accept('../common/app', () => { render(App)})
}







