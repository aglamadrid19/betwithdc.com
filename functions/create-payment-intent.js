exports.handler = async (event) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  try {
    const { paymentDetails } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'usd',
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