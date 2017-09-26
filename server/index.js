import express from 'express'
import graphQLHTTP from 'express-graphql'
import chalk from 'chalk'
import bodyParser from 'body-parser'
import config from './config/environment'
import schema from './schema/schema'

if (config.env === 'development') {
  const graphql = express()
  graphql.use('/', graphQLHTTP({
    graphiql: true,
    pretty: true,
    schema,
    context: {
      slackToken: config.slackToken
    }
  }))
  graphql.listen(config.graphql.port, () => console.log(chalk.green(`GraphQL is listening on port ${config.graphql.port}`)))
  graphql.use(bodyParser.json({ type: '*/*' }))
} else if (config.env === 'production') {
  const graphQLServer = express()
  graphQLServer.use('/graphql', graphQLHTTP({ schema }))
  graphQLServer.use(bodyParser.json({ type: '*/*' }))
  graphQLServer.listen(config.port, () => console.log(chalk.green(`GraphQL is listening on port ${config.port}`)))
}
