import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import ccFormat from '../../utils/ccFormat';
import {commerce} from '../../lib/commerce';
import Root from '../../components/common/Root';
import ShippingForm from '../../components/checkout/common/ShippingForm';
import PaymentDetails from '../../components/checkout/common/PaymentDetails';
import BillingDetails from '../../components/checkout/common/BillingDetails';
import {
  generateCheckoutTokenFromCart as dispatchGenerateCheckout,
//   getShippingOptionsForCheckout as dispatchGetShippingOptions,
  setShippingOptionInCheckout as dispatchSetShippingOptionsInCheckout,
  setDiscountCodeInCheckout as dispatchSetDiscountCodeInCheckout,
  captureOrder as dispatchCaptureOrder,
} from '../../store/actions/checkoutActions';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import Loader from '../../components/checkout/Loader';
import PayPalBtn from '../../components/checkout/PayPalBtn'

class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

      // string property names to conveniently identify inputs related to commerce.js validation errors
      // e.g error { param: "shipping[name]"}
      firstName: 'John',
      lastName: 'Doe',
      'customer[email]': 'john@doe.com',
      'customer[phone]': '7867195404',
      'shipping[name]': 'John Doe',
      'shipping[street]': '318 Homer Street',
      street2: '',
      'shipping[town_city]': 'Vancouver',
      'shipping[postal_zip_code]': 'V6B 2V2',
      orderNotes: '',
      countries: {},
      subdivisions: {},

      errors: {
        'fulfillment[shipping_method]': null,
        gateway_error: null,
        'customer[email]': null,
        'shipping[name]': null,
        'shipping[street]': null,
        'shipping[town_city]': null,
        'shipping[postal_zip_code]': null
      },

      selectedGateway: 'paypal',
      extr_jaZWNoy09w80JA: '',
      loading: false,
      
    }

    this.captureOrder = this.captureOrder.bind(this);
    this.generateToken = this.generateToken.bind(this);
    // this.getAllCountries = this.getAllCountries.bind(this);
    // this.getRegions = this.getRegions.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.handleDiscountChange = this.handleDiscountChange.bind(this);
    this.handleGatewayChange = this.handleGatewayChange.bind(this);
    this.redirectOutOfCheckout = this.redirectOutOfCheckout.bind(this);
  }

  componentDidMount() {
    // if cart is empty then redirect out of checkout;
    if (this.props.cart && this.props.cart.total_items === 0) {
      this.redirectOutOfCheckout()
    }
    // on initial mount generate checkout token object from the cart,
    // and then subsequently below in componentDidUpdate if the props.cart.total_items has changed
    this.generateToken();
    // this.getRegions(this.state.deliveryCountry)
  }

  handleGatewayChange(selectedGateway) {
    this.setState({
      selectedGateway,
    });
  }
  /**
   * Generate a checkout token. This is called when the checkout first loads.
   */
  generateToken() {
    const { cart, dispatchGenerateCheckout } = this.props;
    // const { deliveryCountry: country, deliveryRegion: region } = this.state;
    // console.log(this.props)
    return dispatchGenerateCheckout(cart.id).then((checkout) => {
    })
    //   .then((checkout) => {
    //     // continue and dispatch getShippingOptionsForCheckout to get shipping options based on checkout.id
    //     // this.getAllCountries(checkout);
    //     // console.log(checkout)
    //     return dispatchGetShippingOptions(checkout.id)
    //   })
    //   .catch(error => {
    //     console.log('error caught in checkout/index.js in generateToken', error);
    //   })
  }

  redirectOutOfCheckout() {
    this.props.router.push('/');
  }

//   handleGatewayChange(selectedGateway) {
//     this.setState({
//       selectedGateway,
//     });
//   }

  handleDiscountChange(e) {
    e.preventDefault();
    if (!this.state.discountCode.trim() || !this.props.checkout) {
      return;
    }

    this.props.dispatchSetDiscountCodeInCheckout(this.props.checkout.id, this.state.discountCode)
      .then(resp => {
        if (resp.valid) {
          return this.setState({
            discountCode: '',
          });
        }
        return Promise.reject(resp);
      })
      .catch(error => {
        alert('Sorry, the discount code could not be applied');
      });
  }

  handleChangeForm(e) {
    // when input cardNumber changes format using ccFormat helper
    if (e.target.name === 'cardNumber') {
      e.target.value = ccFormat(e.target.value)
    }
    // update form's input by name in state
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  /**
   * Capture the order
   *
   * @param {Event} e
   */
  captureOrder(details, data) {
    e.preventDefault();
    this.setState({
      errors: {
        'fulfillment[shipping_method]': null,
        gateway_error: null,
        'shipping[name]': null,
        'shipping[street]': null,
      },
      loading: true,
    });
  }

  render() {
    const {checkout} = this.props;
    // const payPalPrice = checkout.live.subtotal.raw
    // const selectedShippingOption = shippingOptions.find(({id}) => id === this.state['fulfillment[shipping_method]']);

    if (this.state.loading) {
      return <Loader />;
    }

    return (
      <Root>
        <Head>
          <title>Checkout | betatdc.com</title>
        </Head>
        <div className="custom-container py-5 my-4 my-sm-5">

          {/* Row */}
          <div className="row mt-4">
            <div className="col-12 col-md-10 col-lg-6 offset-md-1 offset-lg-0">
              {
                checkout
                && (
                <form onChange={this.handleChangeForm}>
                  {/* ShippingDetails */}
                  <p className="font-size-subheader font-weight-semibold mb-4">
                    Customer Details
                  </p>
                  <div className="mb-5">
                    <ShippingForm
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      customerEmail={this.state['customer[email]']}
                      customerPhone={this.state['customer[phone]']}
                    />
                  </div>
                  </form>
                )
              }
            </div>

            <div className="col-12 col-lg-5 col-md-10 offset-md-1">
              <div className="bg-brand200 p-5 checkout-summary">
                <div className="borderbottom font-size-subheader border-color-gray400 pb-2 font-weight-medium">
                  Your order
                </div>
                <div className="pt-3 borderbottom border-color-gray400">
                  {(checkout.live ? checkout.live.line_items : []).map((item, index, items) => {
                    return (
                      <div
                        key={item.id}
                        className="d-flex mb-2"
                      >
                        { (item && item.media)
                          && (<img className="checkout__line-item-image mr-2" src={item.media.source} alt={item.product_name}/>)
                        }
                        <div className="d-flex flex-grow-1">
                          <div className="flex-grow-1">
                            <p className="font-weight-medium">
                              {item.product_name}
                            </p>
                            <p className="font-color-light">Quantity: {item.quantity}</p>
                            <div className="d-flex justify-content-between mb-2">
                              {item.variants.map((variant) =>
                                <p key={variant.variant_id} className="font-color-light font-weight-small">
                                  {variant.variant_name}: {variant.option_name}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="text-right font-weight-semibold">
                            ${item.line_total.formatted_with_code}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
 
                <div className="py-3 borderbottom border-color-black">
                  {[
                    {
                      name: 'Subtotal',
                      amount: checkout.live ? checkout.live.subtotal.formatted_with_symbol : '',
                    },
                    {
                      name: 'Tax',
                      amount: checkout.live ? checkout.live.tax.amount.formatted_with_symbol : '',
                    },
                    // {
                    //   name: 'Shipping',
                    //   amount: selectedShippingOption ? `${selectedShippingOption.description} - ${selectedShippingOption.price.formatted_with_symbol}` : 'No shipping method selected',
                    // },
                    {
                      name: 'Discount',
                      amount: (checkout.live && checkout.live.discount && checkout.live.discount.code) ? `Saved ${checkout.live.discount.amount_saved.formatted_with_symbol}` : 'No discount code applied',
                    }
                  ].map((item, i) => (
                    <div key={i} className="d-flex justify-content-between align-items-center mb-2">
                      <p>{item.name}</p>
                      <p className="text-right font-weight-medium">
                        {item.amount}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2 pt-3">
                  <p className="font-size-title font-weight-semibold">
                    Total amount
                  </p>
                  <p className="text-right font-weight-semibold font-size-title">
                    $ { checkout.live ? checkout.live.total.formatted_with_code : '' }
                  </p>
                </div>
                <PayPalBtn
                  amount = {5}
                  currency = {'USD'}
                  onSuccess={ (details, data) => {
                  }}
                >
                </PayPalBtn>
                
              </div>
            </div>
          </div>
        </div>
      </Root>
    );
  }
}

CheckoutPage.propTypes = {
  orderReceipt: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.oneOf([null]),
  ]),
  checkout: PropTypes.object,
  cart: PropTypes.object,
//   shippingOptions: PropTypes.array,
  dispatchGenerateCheckout: PropTypes.func,
//   dispatchGetShippingOptions: PropTypes.func,
  dispatchSetDiscountCodeInCheckout: PropTypes.func,
}

export default withRouter(
  connect(({ checkout: { checkoutTokenObject }, cart, orderReceipt }) => ({
    checkout: checkoutTokenObject,
    // shippingOptions,
    cart,
    orderReceipt,
  }), {
  dispatchGenerateCheckout,
//   dispatchGetShippingOptions,
  dispatchSetShippingOptionsInCheckout,
  dispatchSetDiscountCodeInCheckout,
  dispatchCaptureOrder,
})(CheckoutPage));