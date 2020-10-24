import React, { Component } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { addToCart } from '../../store/actions/cartActions';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../../components/checkout/CheckoutForm';

const stripePromise = loadStripe("pk_live_XKjxjBMjc0PgJpHXkDF1mxaB", {apiVersion: "2020-10-24"});

class Collections extends Component {
  constructor(props) {
    super(props);
    this.page = React.createRef();
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  /**
   * Add to Cart
   */
  handleAddToCart() {
    const { product } = this.props
    const { selectedOptions } = this.state;
    this.props.dispatch(addToCart(product.id, 1, selectedOptions))
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
  * Render collections based on categories available in data
  */
  renderCollection() {
    const { categories } = this.props;
    const reg = /(<([^>]+)>)/ig;

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
                      <div className="col d-block font-color-black">
                        <Link href="/product/[permalink]" as={`/product/${product.permalink}`}>
                          <div
                            className="mb-3 cursor-pointer"
                            style={{
                              paddingBottom: '125%',
                              background: `url("${product.media.source}") center center/cover`
                            }}
                          >
                          </div>
                        </Link>
                        <p className="text-center font-size-subheader mb-2 font-weight-medium">
                          {product.name}
                        </p>
                        <p className="text-center mb-2 font-color-medium">
                          {product.description.replace(reg, '')}
                        </p>
                        <p className="text-center font-size-subheader font-weight-medium pb-2">
                          <p className="font-size-subheader font-weight-medium pb-2 borderbottom border-color-black">
                            {product.price.formatted_with_symbol}
                          </p>
                          <Elements stripe={stripePromise}>
                            <CheckoutForm 
                            label={product.name}
                            price={product.price.raw}
                          />
                          </Elements>
                        </p>
                      </div>
                  </div>
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

