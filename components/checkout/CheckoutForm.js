import React, {useState, useEffect} from 'react';
import {PaymentRequestButtonElement, useStripe} from '@stripe/react-stripe-js';
import { connect } from 'react-redux';

const handlePaymentMethodReceived = async (event) => {
  // Send the payment details to our function.
  const paymentDetails = {
      payment_method: event.paymentMethod.id,
      amount: event.paymentMethod
  }

  console.log(event)

  const response = await fetch('/.netlify/functions/create-payment-intent',
  {   
      method: 'post',
      headers: {'Content-Type': 'application/json'},
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
        return (
            <PaymentRequestButtonElement className="mr-5 ml-5 mb-3" options={{paymentRequest}} />
        )
    }
    return (
    <div className="d-flex justify-content-around mb-3">
      <p>Apple Pay not supported</p>
    </div>
    )
}

export default connect(state => state)(CheckoutForm);