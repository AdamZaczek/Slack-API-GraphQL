/* eslint no-underscore-dangle: off*/
/* eslint "arrow-body-style": off */

import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

const Query = new GraphQLObjectType({
  name: 'ProfileSchema',
  description: 'Root of the Profile',
  fields: () => ({
    helloQuery: {
      type: GraphQLString,
      description: 'Our first query field!',
      resolve: () => {
        return 'Hello from GraphiQL';
      }
    }
  })
});

const Schema = new GraphQLSchema({
  query: Query
});

export default Schema;
