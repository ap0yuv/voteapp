// https://medium.com/@malyw/how-to-update-babel-5-x-6-x-d828c230ec53#.yqxukuzdk
require('babel-register')({
  "presets": [["env", {"modules": false }],["es2015"], "stage-0", "react"],
  "plugins": ["react-hot-loader/babel"]
});

const VoteApp = require('./app').default;
const useMongoDb = process.env.USE_MONGODB;

const Database = useMongoDb ? require('./db/MongoDbVoteDatabase').default : require('./db/InMemoryVoteDatabase').default;

Database.create((err, database) => {
  if (err) {
    throw new Error(`Could not create db: ${err}`);
  }
  console.log('Starting VoteApp...');
  VoteApp.start(3000, database);
});
