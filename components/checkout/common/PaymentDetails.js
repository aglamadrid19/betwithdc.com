import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radiobox from '../../common/atoms/Radiobox';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm'
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import {
  generateCheckoutTokenFromCart as dispatchGenerateCheckout,
  setShippingOptionInCheckout as dispatchSetShippingOptionsInCheckout,
  setDiscountCodeInCheckout as dispatchSetDiscountCodeInCheckout,
  captureOrder as dispatchCaptureOrder,
} from '../../../store/actions/checkoutActions';

const stripePromise = loadStripe('pk_test_BSgKzgluNhwx78Yk9kva8VXz');

export default class PaymentDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.generateToken();
  }

  generateToken() {
    console.log(this.props)
    const { cart, dispatchGenerateCheckout } = this.props.props;

    // const { deliveryCountry: country, deliveryRegion: region } = this.state;

    return dispatchGenerateCheckout(cart.id).then((checkout) => {
    })
  }

  render() {

    return (
      <>
        <p className="font-size-subheader font-weight-semibold mb-3">
          Payment Detail
        </p>
        <div>
          <label className={'p-3 d-flex align-items-center cursor-pointer'}>
            <Radiobox
              checked='true'
              className="mr-3"
            />
            <p className="font-weight-medium">Credit/debit card</p>
          </label>

          <div className="">
              <Elements stripe={stripePromise}>
                <CheckoutForm props={this.props}/>
              </Elements> 
          </div>
        </div>
      </>
    );
  }
}