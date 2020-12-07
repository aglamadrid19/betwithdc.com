import React, { Component } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { addToCart } from '../../store/actions/cartActions';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProductCard from './ProductCard'
import CheckoutForm from '../../components/checkout/CheckoutForm';
import {commerce} from '../../lib/commerce'

class Collections extends Component {
  constructor(props) {
    super(props);

    this.state = {
        categories: [],
        products: [],
        cart: {},
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidMount() {
    this.fetchProducts();
  }

  /**
  * Filter products by category
  */
  filterProductsByCat(catSlug) {
    const { categories, products } = this.props;

    const cat = categories.find(catUFC => catUFC.slug === catSlug);
    if (!cat) {
      return [];
    }
    return products.filter(product => product.categories.find(productCategory => productCategory.id === cat.id));
  }

  /**
 * Fetch products data from Chec and stores in the products data object.
 * https://commercejs.com/docs/sdk/products
 */
  fetchProducts() {
    commerce.products.list().then((products) => {
      this.setState({ products: products.data });
    }).catch((error) => {
      console.log('There was an error fetching the products', error);
    });
  }

  /**
  * Render collections based on categories available in data
  */
  renderCollection() {
    const { categories } = this.props;
    const { products } = this.props;
    const reg = /(<([^>]+)>)/ig;
    // LEAGUE ACTIVE
    const catUFC = categories.filter(result => {
      return result.name === 'UFC'
    })

    return (
      <div className="collection">  
        <div key={catUFC.id}>
            <p className="font-size-title font-weight-medium mb-4" id={catUFC[0].slug} style={{marginRight: `-8px`,marginLeft: `-8px`}}>
              {catUFC.name}
            </p>
          <div className="row" style={{marginBottom: `3em`}}>
            {this.filterProductsByCat(catUFC[0].slug).map(product => (
              <div key={product.id} className="col-sm" style={{marginBottom: `1.5em`}}>
                <ProductCard key={product.id} props={this.props} product={product}></ProductCard>
              </div>))}
          </div>
        </div>
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

