exports.handler = function(event, context, callback) {
  // 
  console.log(event)

  const STRIPE_SECRET = process.env.STRIPE_SECRET
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({msg: STRIPE_SECRET})
  });
}