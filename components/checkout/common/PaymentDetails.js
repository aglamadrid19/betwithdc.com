import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radiobox from '../../common/atoms/Radiobox';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import {CardElement} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_live_515pPezEikLqFqYPgsIUyv7IJvB9FolbpzIQgxmhPpWZr0PcFOsYMidIWRz2f7sPZZfr0MylkwyrAmHBTD4OkMisn00VB6X1vUH');

export default class PaymentDetails extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      gateways,
      onChangeGateway,
      selectedGateway,
      cardNumber,
      expMonth,
      expYear,
      cvc,
      billingPostalZipcode,
    } = this.props;
    
    return (
      <>
        <p className="font-size-subheader font-weight-semibold mb-3">
          Payment Detail
        </p>
        <div className="border border-color-gray400 mb-5">
          {(gateways) ?
            (<div className="borderbottom border-color-gray500">
              <label
                className={'p-3 d-flex align-items-center cursor-pointer'}
              >
                <Radiobox
                  checked='true'
                  className="mr-3"
                />
                <p className="font-weight-medium">Credit/debit card</p>
              </label>

              <div className="pl-5 pr-3 pb-3 ml-2">
                <div class="form-group">
                  <label for="card-element">Card Number</label>
                  <div id="card-element" class="form-control" style={{height: `2.4em`, paddingTop: `0.7em`}}>
                  
                  </div>
                </div>
                {/* <Elements stripe={stripePromise}>
                <CardElement 
                  options={{
                    iconStyle: 'solid',
                }}
                  className="rounded-0 w-100"
                >

                </CardElement>
                </Elements> */}
                  {/* <div className="col-sm-8">
                    <label className="w-100 mb-3 mt-2 mb-sm-0">
                      <p className="mb-1 font-size-caption font-color-light">
                        Card Number
                      </p>
                      <input
                        name="cardNumber"
                        pattern="[0-9.]+"
                        placeholder={cardNumber}
                        maxLength="16"
                        className="rounded-0 w-100"
                      />
                    </label>
                  </div>
                  <div className="col-sm-3">
                    <label className="w-100 mb-3 mt-2 mb-sm-0">
                      <p className="mb-1 font-size-caption font-color-light">
                        CVC (CVV)
                      </p>
                      <input
                        name="cvc"
                        placeholder={cvc}
                        maxLength="3"
                        type="number"
                        className="rounded-0 w-100"
                      />
                    </label>
                  </div>
                  <div className="col-sm-3">
                    <label className="w-100 mb-3 mt-2 mb-sm-0">
                      <p className="mb-1 font-size-caption font-color-light">
                        Exp. Month
                      </p>
                      <input
                        name="expMonth"
                        type="number"
                        className="rounded-0 w-100"
                        placeholder="MM"
                      />
                    </label>
                  </div>
                  <div className="col-sm-3">
                    <label className="w-100 mb-3 mt-2 mb-sm-0">
                      <p className="mb-1 font-size-caption font-color-light">
                        Exp. Year
                      </p>
                      <input
                        type="number"
                        name="expYear"
                        className="rounded-0 w-100"
                        placeholder="YY"
                      />
                    </label>
                  </div> */}
              </div>
            </div>)
            : ''
          }
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
