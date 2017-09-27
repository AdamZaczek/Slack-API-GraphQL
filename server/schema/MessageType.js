import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import fetch from 'node-fetch'

import User from './UserType'

export default new GraphQLObjectType({
  name: 'Message',
  description: 'Private message exchanged with a Slack channel member',
  fields: () => ({
    type: { type: GraphQLString },
    ts: { type: GraphQLString },
    text: { type: GraphQLString },
    user: {
      type: User,
      resolve: (root, args, { slackToken }) => {
        return fetch(`https://slack.com/api/users.info?token=${slackToken}&user=${root.user}&pretty=1`)
          .then(res => res.json())
          .then(res => res.user)
      }
    }
  })
})
