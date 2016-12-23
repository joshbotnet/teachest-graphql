
import { pubsub } from './subscriptions';
import { DbUsers, DbPosts } from './connectors';

const rootResolvers = {
  RootQuery: {
    post(root, { id }, context) {
      return DbPosts.findOne({ _id: id });
    },
    posts(root, args, context) {
      return DbPosts.find();
    },
    user(root, { id }, context) {
      return DbUsers.findOne({ _id: id });
    },
    users(root, args, context) {
      return DbUsers.find();
    },
  },
  GqlPost: {
    user({ user }) {
      return DbUsers.findOne({ _id: user });
    },
  },
  RootMutation: {
    createUser: (root, args) => {
      return DbUsers.create(args);
    },
    createPost: (root, args) => {
      return DbPosts.create(args);
    },
  },
};

export default rootResolvers;
