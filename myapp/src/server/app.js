import Hapi from 'hapi';
import Inert from 'inert';
import H2O2 from 'h2o2';

import renderRoute from './renderRoute';
import configureStore from '../common/store/configureStore';
import {loadVotes, loadVote } from '../common/actions';

function start(port, voteDatabase) {
const server = new Hapi.Server();
server.connection({
  port: port
});
server.register(Inert, () => {
});
server.register(H2O2, () => {
});

// Start of REST - SERVER
 server.route({
    method:  'GET', //
    path:    '/api/votes', //
    handler: (request, reply) => {
      voteDatabase.getAllVotes((err, votes) => {
        const response = reply(votes);
        response.type('application/json');
      });
    }
  });

  server.route({
    method:  'GET', //
    path:    '/api/votes/{voteId}', //
    handler: (request, reply) => {
      const voteId = request.params.voteId;
      voteDatabase.getVoteById(voteId, (err, vote) => {
        if (vote) {
          const response = reply(vote);
          response.type('application/json');
        } else {
          const response = reply(`Invalid Vote id '${voteId}'`);
          response.code(404);
        }
      })
    }
  });
  //
  server.route({
    method:  'POST', //
    path:    '/api/votes', //
    handler: (request, reply) => {
      const payload = request.payload;
      const newVote = {
        title:       payload.title,
        description: payload.description,
        choices:     payload.choices.map((c) => ({count: 0, ...c}))
      };

      voteDatabase.store(newVote, (err, storedVote) => {
        const response = reply(storedVote);
        response.type('application/json');
      });
    }
  });
  //
  server.route({
    method:  'PUT', //
    path:    '/api/votes/{voteId}/choices/{choiceId}/vote', //
    handler: (request, reply) => {
      const voteId = request.params.voteId;
      const choiceId = request.params.choiceId;
      voteDatabase.getVoteById(voteId, (err, vote) => {
        if (!vote) {
          const response = reply(`Invalid Vote id '${voteId}'`);
          response.code(404);
          return;
        }

        const choice = vote.choices.find((c) => c.id === choiceId);
        if (!choice) {
          // invalid choice
          const response = reply(`Invalid Choice id '${choiceId}'`);
          response.code(404);
          return;
        }

        // increment count
        choice.count = choice.count + 1;

        // save vote
        voteDatabase.store(vote, (err, storedVote) => {
          const response = reply(storedVote);
          response.type('application/json');
        });
      });
    }
  });
  // END OF REST SERVER

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
  handler: (request, reply) => {
    const store = configureStore()
    renderRoute(request, reply, store)
    //store.subscribe(() => renderRoute(request, reply, store))
    //store.dispatch(loadVote(voteId))
  }
});

server.route({
  method:  'GET',
  path:    '/votes',
   handler: (request, reply) => {
    const store = configureStore()
    store.subscribe(() => renderRoute(request, reply, store))
    store.dispatch(loadVotes())    
   }
})

server.route({
  method:  'GET',
  path:    '/votes/{votesId}',
  handler: (request, reply) => {
    const voteId = request.params.votesId
    const store = configureStore()
    store.subscribe(() => renderRoute(request, reply, store))
    store.dispatch(loadVote(voteId))
  }
});

server.route({
  method:  'GET',
  path:    '/compose',
  handler: (request, reply) => {
    const store = configureStore()
    renderRoute(request, reply, store)
    //store.subscribe(() => renderRoute(request, reply, store))
    //store.dispatch(loadVote(voteId))
  }
});

// server.route({
//   method:  'GET',
//   path:    '/login/{redirect*}',
//   handler: renderRoute
// });

  server.start((err) => {
    if (err) {
      return console.error(`Server start failed ${err}`);
    }

    console.log(`Server running at: ${server.info.uri}`)
  });
}

export default {
  start
}