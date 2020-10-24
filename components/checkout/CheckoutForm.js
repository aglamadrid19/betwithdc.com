import React, {useState, useEffect} from 'react';
import {PaymentRequestButtonElement, useStripe} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { connect } from 'react-redux';

async function PaymentIntent(price) {
    const stripe = loadStripe('sk_live_YGhmoll9ttZTAepARdXwiQ44');
    const paymentIntent = await stripe.paymentIntents.create({
        amount: price,
        currency: 'usd',
        // Verify your integration in this guide by including this parameter
        metadata: {integration_check: 'accept_a_payment'},
    });
}

const CheckoutForm = (props) => {
    const stripe = useStripe();
    const [paymentRequest, setPaymentRequest] = useState(null);
    // console.log(props.price)

    useEffect(() => {
        if (stripe) {
        const pr = stripe.paymentRequest({
            country: 'US',
            currency: 'usd',
            total: {
            label: props.label,
            amount: props.price * 100
            },
            requestPayerName: true,
            requestPayerEmail: true,
        });
        pr.canMakePayment().then(result => {
            if (result) {
            setPaymentRequest(pr);
            }
        });
        }
    }, [stripe]);
    if (paymentRequest) {
        PaymentIntent()
        return <PaymentRequestButtonElement options={{paymentRequest}} />
    }
    return (
        <button
            className="h-56 bg-black font-color-white pl-4 pr-4 d-flex align-items-center justify-content-center flex-grow-1" 
            type="button" 
            style={{width: `100%`}}
        >
            Buy Now
        </button>  
    )
}

export default connect(state => state)(CheckoutForm);