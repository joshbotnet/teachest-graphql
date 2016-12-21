import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createServer } from 'http';
import path from 'path';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { printSchema } from 'graphql/utilities/schemaPrinter';
import favicon from 'serve-favicon';
import mongo_express from 'mongo-express/lib/middleware';
import mongo_express_config from './mongo_express_config';
import { subscriptionManager } from './data/subscriptions';
import schema from './data/schema';

const GRAPHQL_PORT = 4000;
const WS_PORT = 4040;
const app = express().use('*', cors());

app.use(favicon(path.join(__dirname, '../static', 'favicon.png')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/graphql', graphqlExpress((req) => {
  return {
    schema,
    context: {

    },
  };
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.use('/schema', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(printSchema(schema));
});

app.use('/mongo_express', mongo_express(mongo_express_config));

app.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://mainbox.io:${GRAPHQL_PORT}/graphql`
));

// WebSocket server for subscriptions
const websocketServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

websocketServer.listen(WS_PORT, () => console.log( // eslint-disable-line no-console
  `Websocket Server is now running on http://mainbox.io:${WS_PORT}`
));

// eslint-disable-next-line
new SubscriptionServer(
  { subscriptionManager },
  websocketServer
);
