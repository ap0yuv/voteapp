import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter} from 'react-router-dom'

import App from '../common/App';

function renderFullPage(html,initialData) {
  return `
<html>
  <head lang="en">
    <meta charset="UTF-8">
      <title>Votes as a Service</title>
      <link rel="stylesheet" href="/tetra.css">
<script>
  window.__INITIAL_STATE__ = ${JSON.stringify(initialData)};
</script>
  </head>
<body>
  <div id="voteAppMountPoint">${html}</div>
</body>
<script>window.__INITIAL_STATE__ =  ${JSON.stringify(initialData)}</script>
<script type="text/javascript" src="/dist/vote-app.js">
</script>
</html>`;
}

export default function(request, reply) {
  const context = {}
  const html = renderToString(
    <StaticRouter
      location={request.url}
      context={context}
    >
      <App/>
    </StaticRouter>)

  if (context.url) {
    const { from } = context.state || { from: { pathname: '/' } }
    const to = from.pathname !== '/' ? context.url + from.pathname : context.url 
    reply.redirect(to)
  } else if (context.status) {
    reply('The page was not found').code(404);
  } else {
    reply(renderFullPage(html,{}))
  }
}



