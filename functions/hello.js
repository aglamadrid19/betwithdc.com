require('dotenv').config()
exports.handler = async event => {
  console.log(process.env.STRIPE_SECRET)
  return {
    statusCode: 200,
    body: `Hello Alvaro Lamadrid`
  }
}