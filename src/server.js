import './env';
import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import passport from 'passport';

import schema from './schema';
import { sendSecretMail } from './utils/helpers';
import { authenticateJWT } from './passport';
import { isAuthenticated } from './middlewares';

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});

//middleware
server.express.use(logger('dev'));
server.express.use(authenticateJWT);

server.start({ port: PORT }, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
