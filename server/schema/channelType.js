import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean } from 'graphql'

import User, { fetchUser } from './UserType'

export default new GraphQLObjectType({
  name: 'Channel',
  description: 'This method returns a list of all channels that the user has access',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    name_normalized: { type: GraphQLString },
    is_channel: { type: GraphQLBoolean },
    created: { type: GraphQLString },
    creator: {
      type: User,
      resolve: (root, args, { slackToken }) => {
        return fetchUser(root.creator, slackToken)
      }
    },
    is_archived: { type: GraphQLBoolean },
    is_general: { type: GraphQLBoolean },
    is_shared: { type: GraphQLBoolean },
    is_org_shared: { type: GraphQLBoolean },
    is_member: { type: GraphQLBoolean },
    is_private: { type: GraphQLBoolean },
    is_mpim: { type: GraphQLBoolean },

    members: {
      type: new GraphQLList(User),
      resolve: (root, args, { slackToken }) => {
        return root.members.map(id => fetchUser(id, slackToken))
      }
    }
  })
})
