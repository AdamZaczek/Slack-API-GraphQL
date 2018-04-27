import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLBoolean } from 'graphql'
import fetch from 'node-fetch'

export const fetchUser = (id, slackToken) => {
  return fetch(`https://slack.com/api/users.info?token=${slackToken}&user=${id}&pretty=1`)
    .then(res => res.json())
    .then(res => res.user)
}

export default new GraphQLObjectType({
  name: 'User',
  description: 'Represents user we talk with',
  fields: () => ({
    id: { type: GraphQLString },
    team_id: { type: GraphQLString },
    name: { type: GraphQLString },
    real_name: { type: GraphQLString },
    tz: { type: GraphQLString },
    tz_label: { type: GraphQLString },
    tz_offset: { type: GraphQLFloat },
    avatar_hash: {
      type: GraphQLString,
      resolve: root => root.profile.avatar_hash
    },
    status_text: {
      type: GraphQLString,
      resolve: root => root.profile.status_text
    },
    status_emoji: {
      type: GraphQLString,
      resolve: root => root.profile.status_emoji
    },
    display_name: {
      type: GraphQLString,
      resolve: root => root.profile.display_name
    },
    title: {
      type: GraphQLString,
      resolve: root => root.profile.title
    },
    real_name_normalized: {
      type: GraphQLString,
      resolve: root => root.profile.real_name_normalized
    },
    display_name_normalized: {
      type: GraphQLString,
      resolve: root => root.profile.display_name_normalized
    },
    email: {
      type: GraphQLString,
      resolve: root => root.profile.email
    },
    image_24: {
      type: GraphQLString,
      resolve: root => root.profile.image_24
    },
    image_32: {
      type: GraphQLString,
      resolve: root => root.profile.image_32
    },
    image_48: {
      type: GraphQLString,
      resolve: root => root.profile.image_48
    },
    image_72: {
      type: GraphQLString,
      resolve: root => root.profile.image_72
    },
    image_192: {
      type: GraphQLString,
      resolve: root => root.profile.image_192
    },
    image_512: {
      type: GraphQLString,
      resolve: root => root.profile.image_512
    },
    team: {
      type: GraphQLString,
      resolve: root => root.profile.team
    },
    is_admin: { type: GraphQLBoolean },
    is_owner: { type: GraphQLBoolean },
    is_primary_owner: { type: GraphQLBoolean },
    is_restricted: { type: GraphQLBoolean },
    is_ultra_restricted: { type: GraphQLBoolean },
    is_bot: { type: GraphQLBoolean },
    deleted: { type: GraphQLBoolean },
    updated: { type: GraphQLFloat },
    is_app_user: { type: GraphQLBoolean },
    has_2fa: { type: GraphQLBoolean }
  })
})
