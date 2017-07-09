// Import React
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from '../common/app'
import {BrowserRouter} from 'react-router-dom'
import store from '../common/store/store'
import { Provider } from 'react-redux'
import { ConnectedRouter} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

const render = Component => {  
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('voteAppMountPoint')
  )
};

render(App)

if (module.hot) {
  module.hot.accept('../common/app', () => { render(App)})
}







