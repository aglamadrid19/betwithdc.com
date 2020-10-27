const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { paymentDetails } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'usd',
      amount: 0100,
      ...paymentDetails,
      confirm: true
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
};