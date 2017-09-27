import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} from 'graphql'
import fetch from 'node-fetch'

import Message from './MessageType'
import User from './UserType'

export default new GraphQLObjectType({
  name: 'Im',
  description: 'This method returns a list of all private conversation channels that the user has',
  fields: () => ({
    id: { type: GraphQLString },
    conversation: {
      type: new GraphQLList(Message),
      resolve: (root, args, { slackToken }) => {
        return fetch(`https://slack.com/api/im.history?token=${slackToken}&channel=${root.id}&pretty=1`)
          .then(res => res.json())
          .then(res => res.messages)
      }
    },
    user: {
      type: User,
      resolve: (root, args, { slackToken }) => {
        return fetch(`https://slack.com/api/users.info?token=${slackToken}&user=${root.user}&pretty=1`)
          .then(res => res.json())
          .then(res => res.user)
      }
    },
    created: { type: GraphQLString },
    is_user_deleted: { type: GraphQLBoolean },
    is_im: { type: GraphQLBoolean }

  })
})
