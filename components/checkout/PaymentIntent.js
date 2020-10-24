import {loadStripe} from '@stripe/stripe-js';
import { connect } from 'react-redux';

async function PaymentIntent(props) {
    const stripe = loadStripe('sk_live_YGhmoll9ttZTAepARdXwiQ44');
    const paymentIntent = await stripe.paymentIntents.create({
        amount: props.price,
        currency: 'usd',
        // Verify your integration in this guide by including this parameter
        metadata: {integration_check: 'accept_a_payment'},
    });
}

export default connect(state => state)(PaymentIntent);
