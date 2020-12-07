import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export default function CheckoutForm(properties) {
    const {props} = properties.props
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);

    // Form state data
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const stripe = useStripe();
    const elements = useElements();

    const cardStyle = {
        style: {
        base: {
            color: "#32325d",
            fontFamily: 'Arial, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
            color: "#32325d"
            }
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
        }
        }
    };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleChangeFirstName = async (event) => {
    setFirstName(event.target.value)
  }

  const handleChangeLastName = async (event) => {
    setLastName(event.target.value)
  }

  const handleChangeEmail = async (event) => {
    setEmail(event.target.value)
  }

  const handleChangePhone = async (event) => {
    setPhone(event.target.value)
  }

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);
    
    const {paymentMethod} = await stripe.createPaymentMethod({type: 'card', card: elements.getElement(CardElement)});
    
    if (paymentMethod.error) {
      // There was some issue with the information that the customer entered into the payment details form.
      alert(paymentMethod.error.message);
      setProcessing(false);
      return;
    }
    
    const order = {
      customer: {
        email: email,
        firstname: firstName,
        lastname: lastName
      },
      payment: {
        gateway: 'stripe',
        stripe: {
          payment_method_id: paymentMethod.id
        }
      },
      extrafields: {
        extr_jaZWNoy09w80JA: phone
      }
    }
    
      props.dispatchCaptureOrder(props.checkout.id, order)
        .then(() => {
          props.router.push('/checkout/confirm');
        })
      setProcessing(false);
      setSucceeded(true)
};
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
        <div className="mb-5">
        <div className="row">
          <div className="col-12 col-sm-6 mb-3">
            <label className="w-100">
              <p className="mb-1 font-size-caption font-color-light">
                First Name*
              </p>
              <input value={firstName} onChange={handleChangeFirstName} name="firstName" placeholder="John" className="rounded-0 w-100" />
            </label>
          </div>
          <div className="col-12 col-sm-6 mb-3">
            <label className="w-100">
              <p className="mb-1 font-size-caption font-color-light">
                Last Name*
              </p>
              <input value={lastName} onChange={handleChangeLastName} name="lastName" placeholder="Smith" className="rounded-0 w-100" />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6 mb-3">
            <label className="w-100">
              <p className="mb-1 font-size-caption font-color-light">
                Telephone*
              </p>
              <input value={phone} onChange={handleChangePhone} name="phone" placeholder="123 456 7890" className="rounded-0 w-100" />
            </label>
          </div>
          <div className="col-12 col-sm-6 mb-3">
            <label className="w-100">
              <p className="mb-1 font-size-caption font-color-light">
                Email Address*
              </p>
              <input
                onChange={handleChangeEmail}
                value={email}
                name="email"
                placeholder="example@example.ex"
                className="rounded-0 w-100"
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mb-3">
            <label className="w-100">
            </label>
          </div>
        </div>
        </div>
        <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
        <button
            disabled={processing || disabled || succeeded}
            id="submit"
        >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a
          href={`https://dashboard.stripe.com/test/payments`}
        >
          {" "}
          Stripe dashboard.
        </a> Refresh the page to pay again.
      </p>
    </form>
  );
}