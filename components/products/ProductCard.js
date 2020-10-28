import React from 'react';
import Link from 'next/link';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from '../../components/checkout/CheckoutForm';
import {commerce} from '../../lib/commerce'

const stripePromise = loadStripe("pk_live_515pPezEikLqFqYPgsIUyv7IJvB9FolbpzIQgxmhPpWZr0PcFOsYMidIWRz2f7sPZZfr0MylkwyrAmHBTD4OkMisn00VB6X1vUH");

export default function ProductCard({product}) {
  const reg = /(<([^>]+)>)/ig;
  commerce.cart.refresh().then(cart => console.log(cart));

  return (
      <div className="mb-5 d-block font-color-black">
        <div
          className="mb-3"
          style={{
            paddingBottom: '125%',
            background: `url("${product.media.source}") center center/cover`
          }}
        />
        <p className="text-center font-size-subheader mb-2 font-weight-medium">
          {product.name}
        </p>
        <p className="text-center mb-2 font-color-medium">{product.description.replace(reg, '')}</p>
        <p className="text-center font-size-subheader font-weight-medium pb-2">
          {product.price.formatted_with_symbol}
        </p>
        <p>
          <Elements stripe={stripePromise}>
            <CheckoutForm label={product.name} price={product.price.raw}/>
          </Elements>
        </p>

        <div className="d-flex justify-content-around">
          <div className="text-center btn-group btn-group-lg" role="group" style={{width: `100%`}} aria-label="Basic example">
            <button type="button" className="h-56 btn btn-dark font-color-white">
              <span className="">
                <i className="fa fa-credit-card fa-2x fa-fw" aria-hidden="true"></i>
              </span>
            </button>
            <button type="button" className="h-56 btn btn-dark font-color-white">
              <span className="">
                <i className="fa fa-paypal fa-2x fa-fw" aria-hidden="true"></i>
              </span>
            </button>
            <button type="button" className="h-56 btn btn-dark font-color-white">
              <span className="">
                <i className="fa fa-btc fa-2x fa-fw" aria-hidden="true"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
  );
}
