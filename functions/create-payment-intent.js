exports.handler = async (event) => {
  const stripe = require('stripe')('sk_test_KNNM9Y9v4sYDIN9sxR5pSzRf');

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