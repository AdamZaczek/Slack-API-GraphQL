/* eslint "arrow-body-style": off */

import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList
} from 'graphql'

import Im from './ImType'

import fetch from 'node-fetch'

const Query = new GraphQLObjectType({
  name: 'SlackAPI',
  description: 'Root of the Profile',
  fields: () => ({
    ims: {
      type: new GraphQLList(Im),
      description: 'Returns list of private messages',
      resolve: (root, args, { slackToken }) => {
        return fetch(`https://slack.com/api/im.list?token=${slackToken}&pretty=1`)
          .then(res => res.json())
          .then(res => res.ims)
      }
    }
  })
})

const Schema = new GraphQLSchema({
  query: Query
})

export default Schema