import React, {useState, useEffect} from 'react';
import {Elements, PaymentRequestButtonElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { element } from 'prop-types';
import { addToCart } from '../../store/actions/cartActions';
import {
  generateCheckoutTokenFromCart as dispatchGenerateCheckout,
  setShippingOptionInCheckout as dispatchSetShippingOptionsInCheckout,
  setDiscountCodeInCheckout as dispatchSetDiscountCodeInCheckout,
  captureOrder as dispatchCaptureOrder,
} from '../../store/actions/checkoutActions';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';

// const handlePaymentMethodReceived = async (event) => {
//   // Send the payment details to our function.
//   const paymentDetails = {
//       payment_method: event.paymentMethod.id,
//       amount: this.props.price * 100
//   }

//   const response = await fetch('/.netlify/functions/create-payment-intent',
//   {   
//       method: 'post',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({ paymentDetails }),
//       }).then((res) => {
//         return res.json();
//       });
//       if (response.error) {
//         // Report to the browser that the payment failed.
//         console.log(response.error);
//         event.complete('fail');
//       } else {
//         // Report to the browser that the confirmation was successful, prompting
//         // it to close the browser payment method collection interface.
//         event.complete('success');
//         // Let Stripe.js handle the rest of the payment flow, including 3D Secure if needed.
//         const { error, paymentIntent } = await stripe.confirmCardPayment(
//           response.paymentIntent.client_secret
//         );
//         if (error) {
//           console.log(error);
//           return;
//         }
//         if (paymentIntent.status === 'succeeded') {
//           history.push('/confirm');
//         } else {
//           console.warn(
//             `Unexpected status: ${paymentIntent.status} for ${paymentIntent}`
//           );
//         }
//       }
// };


function CheckoutForm(properties) {
  const {props} = {
    ...properties
  }

  const [cart, setCart] = useState({})
  const [checkout, setCheckout] = useState({})
  const [paymentRequest, setPaymentRequest] = useState(null);
  const stripe = useStripe();

  const handleAddToCart = async () => {
    const { product } = props
    props.props.dispatch(addToCart(product.id, 1)).then((cartId) => {
      generateStripePm()
      return setCart(cartId.payload)
    })
  }

  const generateToken = async (cartId) => {
    const { cart, dispatchGenerateCheckout } = props.props;
    // const { deliveryCountry: country, deliveryRegion: region } = this.state;
    return dispatchGenerateCheckout(cartId.id).then((checkout) => {
      console.log(checkout)
    })
  }

  const generateStripePm = async () => {
      console.log(props)
      useEffect(() => {
        if (stripe) {
        const pr = stripe.paymentRequest({
            country: 'US',
            currency: 'usd',
            total: {
            label: 'Shoes',
            amount: props.cart.subtotal.raw
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
  }

  handleAddToCart().then(() => {
    console.log(props)
  })

  // const {product} = properties.product

  // handleAddToCart() = {
  //   const { product } = props.product
  //   props.dispatch(addToCart(product.id, 1))
  // }
  
  const handlePaymentMethodReceived = async (event) => {
    
    return
    const fullname = event.paymentMethod.billing_details.name
    const firstname = fullname.split(" ")[0];
    const lastname = fullname.split(" ")[1]

    const order = {
      customer: {
        firstname: firstname,
        lastname: lastname,
        email: event.paymentMethod.billing_details.email
      },
      payment: {
        gateway: 'stripe',
        stripe: {
          payment_method_id: event.paymentMethod.id
        }
      },
      extrafields: {
        extr_jaZWNoy09w80JA: event.paymentMethod.billing_details.phone
      },
      checkout: checkout
    }
    props.dispatchCaptureOrder(checkout.id, order)
      .then(() => {
        props.router.push('/checkout/confirm');
      })
    return



    // props.dispatchCaptureOrder(props.checkout.id, order)
    //   .then(() => {
    //     props.router.push('/checkout/confirm');
    //   })
      // // Send the payment details to our function.
      // const paymentDetails = {
      //   payment_method: event.paymentMethod.id,
      //   shipping: {
      //     name: event.shippingAddress.recipient,
      //     phone: event.shippingAddress.phone,
      //     address: {
      //       line1: event.shippingAddress.addressLine[0],
      //       city: event.shippingAddress.city,
      //       postal_code: event.shippingAddress.postalCode,
      //       state: event.shippingAddress.region,
      //       country: event.shippingAddress.country,
      //     },
      //   },
      // };
    }
    // const {paymentMethod} = await stripe.createPaymentMethod({
    //   type: 'card', 
    //   card: elements.getElement(PaymentRequestButtonElement)
    // });
    
    // if (paymentMethod.error) {
    //   alert(paymentMethod.error.message)
    //   return
    // }

    // const fullname = paymentMethod.billing_details.name
    // const firstname = fullname.split(" ")[0];
    // const lastname = fullname.split(" ")[1]

    // const order = {
    //   customer: {
    //     email: paymentMethod.billing_details.email,
    //     firstname: firstname,
    //     lastname: lastname
    //   },
    //   payment: {
    //     gateway: 'stripe',
    //     stripe: {
    //       payment_method_id: paymentMethod.id
    //     }
    //   },
    //   extrafields: {
    //     extr_jaZWNoy09w80JA: paymentMethod.billing_details.phone
    //   }
    // }

    // props.dispatchCaptureOrder(props.checkout.id, order)
    //   .then(() => {
    //     props.router.push('/checkout/confirm')
    //   })
    
    

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

CheckoutForm.propTypes = {
  orderReceipt: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.oneOf([null]),
  ]),
  checkout: PropTypes.object,
  cart: PropTypes.object,
  dispatchGenerateCheckout: PropTypes.func,
  dispatchSetDiscountCodeInCheckout: PropTypes.func,
}

export default withRouter(
  connect(({ checkout: { checkoutTokenObject }, cart, orderReceipt }) => ({
    checkout: checkoutTokenObject,
    cart,
    orderReceipt,
  }), {
  dispatchGenerateCheckout,
  dispatchSetShippingOptionsInCheckout,
  dispatchSetDiscountCodeInCheckout,
  dispatchCaptureOrder,
})(CheckoutForm));