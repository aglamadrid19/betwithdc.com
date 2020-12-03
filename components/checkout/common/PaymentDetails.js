import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radiobox from '../../common/atoms/Radiobox';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm'

const stripePromise = loadStripe('pk_test_BSgKzgluNhwx78Yk9kva8VXz');
const stripePromiseSecret = 'sk_test_KNNM9Y9v4sYDIN9sxR5pSzRf'

export default class PaymentDetails extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <>
        <p className="font-size-subheader font-weight-semibold mb-3">
          Payment Detail
        </p>

          
        <div>
          <label
            className={'p-3 d-flex align-items-center cursor-pointer'}
          >
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

PaymentDetails.propTypes = {
  gateways: PropTypes.object,
  onChangeGateway: PropTypes.func,
  selectedGateway: PropTypes.string,
}
