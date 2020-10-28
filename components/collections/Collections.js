import React, { Component } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { addToCart } from '../../store/actions/cartActions';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProductCard from '../products/ProductCard'
import CheckoutForm from '../../components/checkout/CheckoutForm';
// import {commerce} from '../../lib/commerce'

class Collections extends Component {
  constructor(props) {
    super(props);
    // this.page = React.createRef();

    this.state = {
        categories: [],
        products: [],
        cart: {},
    }

    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidMount() {
    // this.fetchProducts();
    // this.fetchCart();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  // fetchCart() {
  //   commerce.cart.retrieve().then((cart) => {
  //     this.setState({ cart });
  //   }).catch((error) => {
  //     console.error('There was an error fetching the cart', error);
  //   });
  // }

  /**
   * Add to Cart
   */
  handleAddToCart() {
    const { product } = this.props;
    // this.props.dispatch(addToCart(product.id, 1, selectedOptions))
  }

  /**
  * Filter products by category
  */
  filterProductsByCat(catSlug) {
    const { categories, products } = this.props;

    const cat = categories.find(category => category.slug === catSlug);
    if (!cat) {
      return [];
    }
    return products.filter(product => product.categories.find(productCategory => productCategory.id === cat.id));
  }

  /**
 * Fetch products data from Chec and stores in the products data object.
 * https://commercejs.com/docs/sdk/products
 */
  // fetchProducts() {
  //   commerce.products.list().then((products) => {
  //     this.setState({ products: products.data });
  //   }).catch((error) => {
  //     console.log('There was an error fetching the products', error);
  //   });
  // }

  /**
  * Render collections based on categories available in data
  */
  renderCollection() {
    const { categories } = this.props;
    const { products } = this.props;
    const reg = /(<([^>]+)>)/ig;
    // console.log(products)

    return (
      <div className="collection">
        {categories.map(category => (
          <div key={category.id}>
               <p className="font-size-title font-weight-medium mb-4" id={category.slug} style={{marginRight: `-8px`,marginLeft: `-8px`}}>
                 {category.name}
               </p>
              <div className="row"
                style={{marginBottom: `3em`}}
              >
                {this.filterProductsByCat(category.slug).map(product => (
                  <div key={product.id} className="col-sm" style={{marginBottom: `1.5em`}}>
                    <ProductCard key={product.id} product={product}></ProductCard>
                  </div>
                  // <div key={product.id}  >
                  //     <div className="col d-block font-color-black">
                  //         <div
                  //           className="mb-3"
                  //           style={{
                  //             paddingBottom: '125%',
                  //             background: `url("${product.media.source}") center center/cover`
                  //           }}
                  //         >
                  //         </div>
                  //       <p className="text-center font-size-subheader mb-2 font-weight-medium">
                  //         {product.name}
                  //       </p>
                  //       <p className="text-center mb-2 font-color-medium">
                  //         {product.description.replace(reg, '')}
                  //       </p>
                  //       <p className="text-center font-size-subheader font-weight-medium pb-2">
                  //         <p className="text-center font-size-subheader font-weight-medium pb-2 borderbottom border-color-black">
                  //           {product.price.formatted_with_symbol}
                  //         </p>
                  //         <Elements stripe={stripePromise}>
                  //           <CheckoutForm 
                  //           label={product.name}
                  //           price={product.price.raw}
                  //         />
                  //         </Elements>
                  //         <button onClick={this.handleAddToCart}
                  //           className="h-56 bg-black font-color-white pl-3 pr-4 d-flex align-items-center flex-grow-1" type="button">
                  //           <span className="flex-grow-1 mr-3 text-center">
                  //             Add to cart
                  //           </span>
                  //         </button>
                  //       </p>
                  //     </div>
                  // </div>
                ))}
              </div>
            </div>
        ))}
      </div>
    )
  }

  render() {
    return (
      <div className="py-5 my-5">
        <div className="py-4">
          {/* <div
            ref={this.sidebar}
            className="position-fixed left-0 right-0"
            style={{ top: '7.5rem' }}
          >
            { this.renderSidebar() }
          </div> */}

          {/* Main Content */}
          <div ref={this.page} className="custom-container" style={{maxWidth: `1050px`}}>
            <div className="row">
              <div className="col-12">
                { this.renderCollection() }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(Collections);

