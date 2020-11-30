import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radiobox from '../../common/atoms/Radiobox';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm'

const stripePromise = loadStripe('pk_live_515pPezEikLqFqYPgsIUyv7IJvB9FolbpzIQgxmhPpWZr0PcFOsYMidIWRz2f7sPZZfr0MylkwyrAmHBTD4OkMisn00VB6X1vUH');

// class CheckoutForm extends React.Component {
//   handleSubmit = async (event) => {
//     event.preventDefault();
//     const {stripe, elements} = this.props;
//     const {error, paymentMethod} = await stripe.createPaymentMethod({
//       type: 'card',
//       card: elements.getElement(CardElement),
//     });
//   };

//   render() {
//     const {stripe} = this.props;
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <CardElement />
//         <button type="submit" disabled={!stripe}>
//           Pay
//         </button>
//       </form>
//     );
//   }
// }

// const InjectedCheckoutForm = () => (
//   <ElementsConsumer>
//     {({stripe, elements}) => (
//       <CheckoutForm stripe={stripe} elements={elements} />
//     )}
//   </ElementsConsumer>
// );

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
                  <Elements stripe={stripePromise}>
                    <CheckoutForm />
                  </Elements>
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
