require('dotenv').config()
const withSass = require('@zeit/next-sass')

module.exports = withSass({
  /* config options here */
  webpack: config => {
    config.node = {
      fs: 'empty'
    }
    return config
  },
  env: {
    'CHEC_PUBLIC_KEY': process.env.CHEC_PUBLIC_KEY,
    'STRIPE_SECRET': process.env.STRIPE_SECRET
  },
  target: 'serverless'
})