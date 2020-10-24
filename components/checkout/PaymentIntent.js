import {loadStripe} from '@stripe/stripe-js';
import { connect } from 'react-redux';
require('dotenv').config()

async function PaymentIntent(props) {
    const stripe = loadStripe(process.env.CHEC_PUBLIC_KEY);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: props.price,
        currency: 'usd',
        // Verify your integration in this guide by including this parameter
        metadata: {integration_check: 'accept_a_payment'},
    });
    alert(paymentIntent)
}

export default connect(state => state)(PaymentIntent);
