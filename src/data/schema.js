import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
import rootResolvers from './resolvers';

const rootSchema = [`
type GqlUser {
  id: String
  firstName: String
  lastName: String
}

type GqlPost {
  id: String
  title: String
  content: String
  user: GqlUser
}

type RootQuery {
  post(id: String!): GqlPost
  posts: [GqlPost]
  user(id: String!): GqlUser
  users: [GqlUser]
}

type RootMutation {
  createUser(
    firstName: String
    lastName: String
  ): GqlUser

  createPost(
    title: String
    content: String
    user: String
  ): GqlPost
}

schema {
  query: RootQuery
  mutation: RootMutation
}

`];

const schema = [...rootSchema];
const resolvers = merge(rootResolvers);

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

export default executableSchema;
