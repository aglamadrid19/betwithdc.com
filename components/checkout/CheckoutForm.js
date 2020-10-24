import React, {useState, useEffect, Component} from 'react';
import {PaymentRequestButtonElement, useStripe} from '@stripe/react-stripe-js';
import { connect } from 'react-redux';

const CheckoutForm = () => {
    const stripe = useStripe();
    const [paymentRequest, setPaymentRequest] = useState(null);

    useEffect(() => {
        if (stripe) {
        const pr = stripe.paymentRequest({
            country: 'US',
            currency: 'usd',
            total: {
            label: 'Demo total',
            amount: 10,
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
        return <PaymentRequestButtonElement options={{paymentRequest}} />
    }

  // Use a traditional checkout form.
  /**
  * Render collections based on categories available in data
  */
    
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