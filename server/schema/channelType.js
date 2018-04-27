import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean } from 'graphql'
import fetch from 'node-fetch'

import User from './UserType'

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
        return fetch(`https://slack.com/api/users.info?token=${slackToken}&user=${root.creator}&pretty=1`)
          .then(res => res.json())
          .then(res => res.user)
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
      type: new GraphQLList(User)
      // resolve: (root, args, { slackToken }) => {
      //  return fetch(`https://slack.com/api/users.info?token=${slackToken}&user=${root.user}&pretty=1`)
      //    .then(res => res.json())
      //    .then(res => res.user)
      // }
    }
  })
})
