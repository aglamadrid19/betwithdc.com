import React, { Component } from 'react';
import Head from 'next/head';
import {commerce} from '../../lib/commerce';
import { connect } from 'react-redux';
import Root from '../../components/common/Root';

class Checkout extends Component {
    constructor(props) {
            super(props);
            this.state = {
            checkoutToken: {},
            // Customer details
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'janedoe@email.com',
            // Shipping details
            shippingName: 'Jane Doe',
            shippingStreet: '123 Fake St',
            shippingCity: 'San Francisco',
            shippingStateProvince: 'CA',
            shippingPostalZipCode: '94107',
            shippingCountry: 'US',
            // Payment details
            cardNum: '4242 4242 4242 4242',
            expMonth: '11',
            expYear: '2023',
            ccv: '123',
            billingPostalZipcode: '94107',
            // Shipping and fulfillment data
            shippingCountries: {},
            shippingSubdivisions: {},
            shippingOptions: [],
            shippingOption: '',
        }
    };

    componentDidMount() {
        this.generateCheckoutToken();
    }
    
    // Generate checkout token
    generateCheckoutToken() {
        const { cart } = this.props;
        if (cart.line_items.length) {
            commerce.checkout.generateToken(cart.id, { type: 'cart' })
            .then((token) => {
                this.setState({ checkoutToken: token });
            }).catch((error) => {
                console.log('There was an error in generating a token', error);
            });
        }
    }

    renderCheckoutForm() {
        return (
        <div className="container">
            <form className="form-group">
                <h4 className="text-center mt-4">Customer information</h4>
        
                <label className="checkout__label" htmlFor="firstName">First name</label>
                <input className="form-control" type="text" value={this.state.firstName} name="firstName" placeholder="Enter your first name" required />
        
                <label className="checkout__label" htmlFor="lastName">Last name</label>
                <input className="form-control" type="text" value={this.state.lastName}name="lastName" placeholder="Enter your last name" required />
        
                <label className="checkout__label" htmlFor="email">Email</label>
                <input className="form-control" type="text" value={this.state.email} name="email" placeholder="Enter your email" required />
        
                <h4 className="text-center mt-4">Shipping details</h4>
        
                <label className="checkout__label" htmlFor="shippingName">Full name</label>
                <input className="form-control" type="text" value={this.state.shippingName} name="shippingName" placeholder="Enter your shipping full name" required />
        
                <label className="checkout__label" htmlFor="shippingStreet">Street address</label>
                <input className="form-control" type="text" value={this.state.shippingStreet} name="shippingStreet" placeholder="Enter your street address" required />
        
                <label className="checkout__label" htmlFor="shippingCity">City</label>
                <input className="form-control" type="text" value={this.state.shippingCity} name="shippingCity" placeholder="Enter your city" required />
        
                <label className="checkout__label" htmlFor="shippingPostalZipCode">Postal/Zip code</label>
                <input className="form-control" type="text" value={this.state.shippingPostalZipCode} name="shippingPostalZipCode" placeholder="Enter your postal/zip code" required />
        
                <h4 className="text-center mt-4">Payment information</h4>
        
                <label className="checkout__label" htmlFor="cardNum">Credit card number</label>
                <input className="form-control" type="text" name="cardNum" value={this.state.cardNum} placeholder="Enter your card number" />
        
                <label className="checkout__label" htmlFor="expMonth">Expiry month</label>
                <input className="form-control" type="text" name="expMonth" value={this.state.expMonth} placeholder="Card expiry month" />
        
                <label className="checkout__label" htmlFor="expYear">Expiry year</label>
                <input className="form-control" type="text" name="expYear" value={this.state.expYear} placeholder="Card expiry year" />
        
                <label className="checkout__label" htmlFor="ccv">CCV</label>
                <input className="form-control" type="text" name="ccv" value={this.state.ccv} placeholder="CCV (3 digits)" />
                <div className="w-100 text-center">
                    <button type="submit" className="btn btn-primary mt-4">Confirm order</button>
                </div>
            </form>
        </div>
        );
      };
    
    render() {
        return (
            <Root>
                <Head>
                    <title>Checkout | betatdc.com</title>
                </Head>
                {this.renderCheckoutForm()}
            </Root>
            
        )  
    };
};

export default connect(state => state)(Checkout);