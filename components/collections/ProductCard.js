import React, { Component } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from '../checkout/CheckoutForm';
import {commerce} from '../../lib/commerce'
import { addToCart } from '../../store/actions/cartActions';

const stripePromise = loadStripe("pk_live_515pPezEikLqFqYPgsIUyv7IJvB9FolbpzIQgxmhPpWZr0PcFOsYMidIWRz2f7sPZZfr0MylkwyrAmHBTD4OkMisn00VB6X1vUH");

class ProductCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedOptions: [],
    }

    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  handleAddToCart() {
    const { product } = this.props
    this.props.dispatch(addToCart(product.id, 1))
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
             <CheckoutForm label={product.name} price={product.price.raw}/>
           </Elements>
        </div>

      <div className="d-flex justify-content-around">
        <div className="text-center btn-group btn-group-lg" role="group" style={{width: `100%`}} aria-label="Basic example">
          <Link href="/checkout/indexCard">
            <button type="button" className="h-56 btn btn-dark font-color-white" onClick={this.handleAddToCart}>
              <span className="">
                <i className="fa fa-credit-card fa-lg fa-fw" aria-hidden="true"></i>
              </span>
            </button>
          </Link>
          <Link href="/checkout/indexPaypal">
            <button type="button" className="h-56 btn btn-dark font-color-white" onClick={this.handleAddToCart}>
              <span className="">
                <i className="fa fa-paypal fa-lg fa-fw" aria-hidden="true"></i>
              </span>
            </button>
          </Link>
          <Link href="/checkout">
            <button type="button" className="h-56 btn btn-dark font-color-white" onClick={this.handleAddToCart}>
              <span className="">
                <i className="fa fa-btc fa-lg fa-fw" aria-hidden="true"></i>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
    );
  }
}

export default connect(state => state)(ProductCard);

// export default function ProductCard({props, product}) {
//   const reg = /(<([^>]+)>)/ig;
//   // console.log(props.cart)
//   const { cart } = props;

//   function handleAddToCart() {
//     const { product } = this.props
//     const { selectedOptions } = this.state;
//     this.props.dispatch(addToCart(product.id, 1, selectedOptions))
//   }

//   return (
//       <div className="card mb-5 d-block font-color-black">
//         <div
//           className="mb-3"
//           style={{
//             paddingBottom: '125%',
//             background: `url("${product.media.source}") center center/cover`
//           }}
//         />
        // <p className="text-center font-size-subheader mb-2 font-weight-medium">
        //   {product.name}
        // </p>
//         <p className="text-center mb-2 font-color-medium">{product.description.replace(reg, '')}</p>
//         <p className="text-center font-size-subheader font-weight-medium pb-2">
//           {product.price.formatted_with_symbol}
//         </p>
//         <div>
//           <Elements stripe={stripePromise}>
//             <CheckoutForm label={product.name} price={product.price.raw}/>
//           </Elements>
//         </div>

//         <div className="d-flex justify-content-around">
//           <div className="text-center btn-group btn-group-lg" role="group" style={{width: `100%`}} aria-label="Basic example">
//             <Link href="checkout">
//               <button type="button" className="h-56 btn btn-dark font-color-white" onClick={FastCAdd}>
//                 <span className="">
//                   <i className="fa fa-credit-card fa-2x fa-fw" aria-hidden="true"></i>
//                 </span>
//               </button>
//             </Link>
//             <Link href="/checkout">
//               <button type="button" className="h-56 btn btn-dark font-color-white">
//                 <span className="">
//                   <i className="fa fa-paypal fa-2x fa-fw" aria-hidden="true"></i>
//                 </span>
//               </button>
//             </Link>
//             <Link href="/checkout">
//               <button type="button" className="h-56 btn btn-dark font-color-white">
//                 <span className="">
//                   <i className="fa fa-btc fa-2x fa-fw" aria-hidden="true"></i>
//                 </span>
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//   );
// }
