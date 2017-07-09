import Hapi from 'hapi';
import Inert from 'inert';

import renderRoute from './renderRoute';

const server = new Hapi.Server();
server.connection({
  port: 3001
});
server.register(Inert, () => {
});

server.route({
  method:  'GET',
  path:    '/{param*}',
  handler: {
    directory: {
      path: `${__dirname}/../../public`
    }
  }
});


server.route({
  method:  'GET',
  path:    '/votes',
  handler: renderRoute
});

server.start(() => console.log(`Server running at: ${server.info.uri}`));
