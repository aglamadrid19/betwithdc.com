require('dotenv').config()
exports.handler = async event => {
  
  return {
    statusCode: 200,
    body: `${console.log(process.env.STRIPE_SECRET)}`
    
  }
}