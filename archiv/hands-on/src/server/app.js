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
  // handler: {
  //   directory: {
  //     path: `${__dirname}/../../public`
  //   }
  // }
  handler: {
        proxy: {
          host: "localhost",
          port: 8080,
          passThrough: true
        }
      }
});

server.route({
  method:  'GET',
  path:    '/',
  handler: renderRoute
});

server.route({
  method:  'GET',
  path:    '/votes',
  handler: renderRoute
});

server.route({
  method:  'GET',
  path:    '/votes/{votesId}',
  handler: renderRoute
});

server.route({
  method:  'GET',
  path:    '/compose',
  handler: renderRoute
});

server.route({
  method:  'GET',
  path:    '/login/{redirect*}',
  handler: renderRoute
});

server.start(() => console.log(`Server running at: ${server.info.uri}`));
