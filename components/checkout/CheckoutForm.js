import React, {useState, useEffect} from 'react';
import {PaymentRequestButtonElement, useStripe} from '@stripe/react-stripe-js';
import { connect } from 'react-redux';

const handlePaymentMethodReceived = async (event) => {
  // Send the payment details to our function.
  const paymentDetails = {
      payment_method: event.paymentMethod.id,
      amount: event.amount
  }

  const response = await fetch('/.netlify/functions/create-payment-intent',
  {   
      method: 'post',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentDetails }),
      }).then((res) => {
        return res.json();
      });
      if (response.error) {
        // Report to the browser that the payment failed.
        console.log(response.error);
        event.complete('fail');
      } else {
        // Report to the browser that the confirmation was successful, prompting
        // it to close the browser payment method collection interface.
        event.complete('success');
        // Let Stripe.js handle the rest of the payment flow, including 3D Secure if needed.
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          response.paymentIntent.client_secret
        );
        if (error) {
          console.log(error);
          return;
        }
        if (paymentIntent.status === 'succeeded') {
          history.push('/success');
        } else {
          console.warn(
            `Unexpected status: ${paymentIntent.status} for ${paymentIntent}`
          );
        }
      }
};
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
            requestPayerPhone: true
        });
        pr.canMakePayment().then(result => {
            if (result) {
                pr.on('paymentmethod', handlePaymentMethodReceived);
                setPaymentRequest(pr);
            }
        });
      }
    }, [stripe]);
    if (paymentRequest) {
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