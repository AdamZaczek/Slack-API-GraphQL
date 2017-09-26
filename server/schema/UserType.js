import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

export default new GraphQLObjectType({
  name: 'User',
  description: 'Represents user we talk with',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    deleted: { type: GraphQLString },
    real_name: {
      type: GraphQLString,
      resolve: root => root.profile.real_name
    },
    image_192: {
      type: GraphQLString,
      resolve: root => root.profile.image_192
    },
    email: {
      type: GraphQLString,
      resolve: root => root.profile.email
    }
  })
})
