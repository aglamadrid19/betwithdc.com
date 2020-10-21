import React, { Component } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { connect } from 'react-redux';
import { addToCart } from '../../store/actions/cartActions';

class Collections extends Component {
  constructor(props) {
    super(props);

    this.sidebar = React.createRef();
    this.page = React.createRef();

    this.handleScroll = this.handleScroll.bind(this);

    this.handleAddToCart = this.handleAddToCart.bind(this);

  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const animate = () => {
      if (!this.page.current) {
        return;
      }

      const distance =
        this.page.current.getBoundingClientRect().bottom -
        window.innerHeight;

      if (distance < 0) {
        this.sidebar.current.style.transform = `translateY(${distance}px)`;
      } else {
        this.sidebar.current.style.transform = 'translateY(0px)';
      }
    };

    window.requestAnimationFrame(animate);
  }

  handleAddToCart() {
    const { product } = this.props
    const { selectedOptions } = this.state;
    this.props.dispatch(addToCart(product.id, 1, selectedOptions))
    console.log("Miau")
  }

  // renderSidebar() {
  //   const { categories } = this.props;

  //   return (
  //     <>
  //     {categories.map(category => (
  //     <div key={category.id} style={{margin: `0rem 6rem 0rem 6rem`}}>
  //       <div className="row">
  //         <div className="col-2 d-none d-lg-block position-relative">
  //           <p className="font-size-title font-weight-medium mb-3">
  //             {category.name}
  //           </p>
  //           <Link href={`/collection#${category.slug}`}>
  //             <div className="mb-5">
  //               <div className="d-flex">
  //                 <p className="mb-2 position-relative cursor-pointer">
  //                   Products
  //                   <span
  //                     className="position-absolute font-size-tiny text-right"
  //                     style={{ right: '-12px', top: '-4px' }}
  //                   >
  //                     {category.count}
  //                   </span>
  //                 </p>
  //               </div>
  //             </div>
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //     ))}
  //   </>
  //   )
  // }

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
          // <div key={category.id}>
          //     {/* <p className="font-size-title font-weight-medium mb-4" id={category.slug}>
          //       {category.name}
          //     </p> */}
              <div className="row"
                style={{marginBottom: `3em`}}
              >
                { this.filterProductsByCat(category.slug).map(product => (
                  <div key={product.id} className="col">
                      <div className="col d-block font-color-black">
                        <div
                          className="mb-3"
                          style={{
                            paddingBottom: '125%',
                            background: `url("${product.media.source}") center center/cover`
                          }}
                        />
                        <p className="font-size-subheader mb-2 font-weight-medium">
                          {product.name}
                        </p>
                        <p className="mb-2 font-color-medium">
                          {product.description.replace(reg, '')}
                        </p>
                        <p className="font-size-subheader font-weight-medium pb-2">
                          <button onClick={this.handleAddToCart}
                            className="h-56 bg-black font-color-white pl-4 pr-4 d-flex align-items-center justify-content-center flex-grow-1" type="button" style={{width: `100%`}}>
                            <span>
                              {product.price.formatted_with_symbol}
                            </span>
                          </button>
                        </p>
                      </div>
                  </div>
                ))}
              </div>
        ))}
      </div>
    )
  }

  render() {
    return (
      <div className="py-5 my-5">
        <Head>
          <title>Collections</title>
        </Head>
        <div className="py-4">
          {/* Sidebar */}
          <div
            ref={this.sidebar}
            className="position-fixed left-0 right-0"
            style={{ top: '7.5rem' }}
          >
            {/* { this.renderSidebar() } */}
          </div>

          {/* Main Content */}
          <div ref={this.page} className="custom-container">
            <div className="row">
              <div className="col">
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

