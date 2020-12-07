import React, { Component } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from '../checkout/CheckoutForm';
import {commerce} from '../../lib/commerce'
import { addToCart } from '../../store/actions/cartActions';
import {
  generateCheckoutTokenFromCart as dispatchGenerateCheckout,
  setShippingOptionInCheckout as dispatchSetShippingOptionsInCheckout,
  setDiscountCodeInCheckout as dispatchSetDiscountCodeInCheckout,
  captureOrder as dispatchCaptureOrder,
} from '../../store/actions/checkoutActions';
import PropTypes from 'prop-types';

const stripePromise = loadStripe('pk_test_BSgKzgluNhwx78Yk9kva8VXz');

class ProductCard extends Component {
  constructor(props) {
    super(props.props)

    this.state = {
      selectedOptions: [],
    }
  }

  // componentDidMount() {
  //   this.generateToken();
  // }

  handleAddToCart() {
    const { product } = this.props
    console.log(this.props)
    this.props.props.dispatch(addToCart(product.id, 1))
  }

  generateToken() {
    const { cart, dispatchGenerateCheckout } = this.props.props;
    const { deliveryCountry: country, deliveryRegion: region } = this.state;

    return dispatchGenerateCheckout(cart.id).then((checkout) => {
    })
  }

  captureOrder() {
    // set up line_items object and inner variant object for order object below
    const line_items = this.props.checkout.live.line_items.reduce((obj, lineItem) => {
      const variants = lineItem.variants.reduce((obj, variant) => {
        obj[variant.variant_id] = variant.option_id;
        return obj;
      }, {});
      obj[lineItem.id] = { ...lineItem};
      return obj;
    }, {});

    // construct order object
    const newOrder = {
      line_items,
      customer: {
        firstname: this.state.firstName,
        lastname: this.state.lastName,
        email: this.state['customer[email]']
      },
      extrafields: {
        extr_jaZWNoy09w80JA: this.state['customer[phone]'],
      },
      fulfillment: {
        shipping_method: this.state['fulfillment[shipping_method]']
      },
      payment: {
        gateway: 'stripe',
      },
    }

    this.props.dispatchCaptureOrder(this.props.checkout.id, newOrder)
      .then(() => {
        this.props.router.push('/checkout/confirm');
      })
      .catch(({ data: { error = {} }}) => {
        this.setState({ loading: false });
        let errorToAlert = '';
        if (error.type === 'validation') {
          console.log('error while capturing order', error.message)

          error.message.forEach(({param, error}, i) => {
            this.setState({
              errors: {
                ...this.state.errors,
                [param]: error
              }
            })
          })

          errorToAlert = error.message.reduce((string, error) => {
            return `${string} ${error.error}`
          }, '');
        }

        if (error.type === 'gateway_error' || error.type === 'not_valid' || error.type === 'bad_request') {
          this.setState({
            errors: {
              ...this.state.errors,
              [(error.type === 'not_valid' ? 'fulfillment[shipping_method]' : error.type)]: error.message
            },
          })
          errorToAlert = error.message
        }
        if (errorToAlert) {
          alert(errorToAlert);
        }
      });
  }

  render() {
    const {product} = this.props;
    const { name, description, variants, formatted_with_symbol: price } = product;
    const reg = /(<([^>]+)>)/ig;

    return(
      <div className="card mb-5 d-block font-color-black">
        <div className="mb-3"
            style={{
              paddingBottom: '125%',
              background: `url("${product.media.source}") center center/cover`
            }}>

          </div>
        <p className="text-center font-size-subheader mb-2 font-weight-medium">
          {product.name}
        </p>
        <p className="text-center mb-2 font-color-medium">{product.description.replace(reg, '')}</p>
        <p className="text-center font-size-subheader font-weight-medium pb-2">
           {product.price.formatted_with_symbol}
        </p>
        <div>
          <Elements stripe={stripePromise}>
             <CheckoutForm props={this.props}/>
           </Elements>
        </div>

      <div className="d-flex justify-content-around">
        <div className="text-center btn-group btn-group-lg" role="group" style={{width: `100%`}} aria-label="Basic example">
          <Link href="/checkout/indexCard">
            <button type="button" className="border h-56 btn btn-dark font-color-white" onClick={this.handleAddToCart}>
              <span className="">
                <i className="fa fa-credit-card fa-lg fa-fw" aria-hidden="true"></i>
              </span>
            </button>
          </Link>
          <Link href="/checkout/indexPaypal">
            <button type="button" className="border h-56 btn btn-dark font-color-white" onClick={this.handleAddToCart}>
              <span className="">
                <i className="fa fa-paypal fa-lg fa-fw" aria-hidden="true"></i>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
    );
  }
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
})(ProductCard));