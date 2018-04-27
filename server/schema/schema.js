import { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLString } from 'graphql'
import fetch from 'node-fetch'

import Im from './ImType'
import Channel from './channelType'

const Query = new GraphQLObjectType({
  name: 'SlackAPI',
  description: 'Root of the Profile',
  fields: () => ({
    allIms: {
      type: new GraphQLList(Im),
      description: 'Returns list of private messages',
      resolve: (root, args, { slackToken }) => {
        return fetch(`https://slack.com/api/im.list?token=${slackToken}&pretty=1`)
          .then(res => res.json())
          .then(res => res.ims)
      }
    },
    allChannels: {
      type: new GraphQLList(Channel),
      description: 'Returns list of channels',
      resolve: (root, args, { slackToken }) => {
        return fetch(`https://slack.com/api/channels.list?token=${slackToken}&pretty=1`)
          .then(res => res.json())
          .then(res => res.channels)
      }
    },
    channel: {
      type: Channel,
      args: {
        id: { type: GraphQLString }
      },
      description: 'Returns a single channel',
      resolve: (root, args, { slackToken }) => {
        console.log(`https://slack.com/api/channels.info?token=${slackToken}&channel=${args.id}&pretty=1`)
        return fetch(`https://slack.com/api/channels.info?token=${slackToken}&channel=${args.id}&pretty=1`)
          .then(res => res.json())
          .then(res => res.channel)
      }
    }
  })
})

const Schema = new GraphQLSchema({
  query: Query
})

export default Schema
