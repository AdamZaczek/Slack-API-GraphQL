/* eslint-disable global-require */
import _ from 'lodash';

const config = {
  env: process.env.NODE_ENV || 'development',
  graphql: {
    port: 8000
  },
  slackToken: process.env.slackToken || 'xoxp-204446259969-206986230181-207720349479-9b509bb2f23813db90749d77a3975a25'
};

export default _.extend(config, require(`./${config.env}`).default);
