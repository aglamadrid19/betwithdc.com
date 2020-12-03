import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ShippingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receiveNewsletter: true,
      saveInfo: true
    };
  }

  render() {
    const {
      // shippingOptions,
      firstName,
      lastName,
      customerPhone,
      customerEmail,
    } = this.props;
    return (
      <>
        <div className="row">
          <div className="col-12 col-sm-6 mb-3">
            <label className="w-100">
              <p className="mb-1 font-size-caption font-color-light">
                First Name*
              </p>
              <input name="firstName" placeholder={firstName} className="rounded-0 w-100" />
            </label>
          </div>
          <div className="col-12 col-sm-6 mb-3">
            <label className="w-100">
              <p className="mb-1 font-size-caption font-color-light">
                Last Name*
              </p>
              <input name="lastName" placeholder={lastName} className="rounded-0 w-100" />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6 mb-3">
            <label className="w-100">
              <p className="mb-1 font-size-caption font-color-light">
                Telephone*
              </p>
              <input name="phone" placeholder={customerPhone} className="rounded-0 w-100" />
            </label>
          </div>
          <div className="col-12 col-sm-6 mb-3">
            <label className="w-100">
              <p className="mb-1 font-size-caption font-color-light">
                Email Address*
              </p>
              <input
                name="email"
                placeholder={customerEmail}
                className="rounded-0 w-100"
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mb-3">
            <label className="w-100">
            </label>
          </div>
        </div>
      </>
    );
  }
}

ShippingForm.propTypes = {
  // shippingOptions: PropTypes.array,
  // countries: PropTypes.object,
  subdivisions: PropTypes.object,
  deliveryCountry: PropTypes.string,
  deliveryRegion: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  phone: PropTypes.string,
  selectedShippingOptionId: PropTypes.string,
  selectedShippingOption: PropTypes.object,
  shippingTownCity: PropTypes.string,
  shippingStreet: PropTypes.string,
  shippingStreet2: PropTypes.string,
  shippingPostalZipCode: PropTypes.string,
  customerEmail: PropTypes.string,
  orderNotes: PropTypes.string,
}
