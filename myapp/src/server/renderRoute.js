import React from 'react';
import { renderToString } from 'react-dom/server'
import { StaticRouter} from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'

import App from '../common/app';



function renderFullPage(html,initialData) { 
 const htmlpage = `<!DOCTYPE html>
<html>
  <head lang="en">
    <meta charset="UTF-8">
      <title>Votes as a Service</title>
      <link rel="stylesheet" href="/tetra.css">

  </head>
  <script>
  window.__INITIAL_STATE__ = ${JSON.stringify(initialData)};
  </script>
  <body>
    <div id="voteAppMountPoint">${html}</div>
  </body>

  <script type="text/javascript"
          src="/dist/vote-app.js">
  </script>
</html>`
return htmlpage
}

export default function(request, reply, store) {
  //const context = {initialData: initialData}
  const context = {}
  const html = renderToString(
    <AppContainer>
      <Provider store={store} >
        <StaticRouter
          location={request.url}
          context={context}
        >
          <App/>
        </StaticRouter>
      </Provider>
    </AppContainer>
  )

  if (context.url) {
    const { from } = context.state || { from: { pathname: '/' } }
    const to = from.pathname !== '/' ? context.url + from.pathname : context.url 
    reply.redirect(to)
  } else if (context.status) {
    reply('The page was not found').code(404);
  } else {
    reply(renderFullPage(html,store.getState()))
  }
}



