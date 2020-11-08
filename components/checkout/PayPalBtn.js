import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";

class PayPalBtn extends React.Component {
    render() {
      const { amount, onSuccess, currency } = this.props;
        return (
            <PayPalButton
              amount={amount}
              currency={currency}
              onSuccess={(details, data) => onSuccess(details, data)}
              options={{
                clientId: "AYY_8s_xC4lDl_a1Kyw3QeaTdqf3HMV5O5_613XMzWM_j7uOv8aQ6NpdFreOaafRLN4iAZwVGMm0gkst"
              }}
          />
        );
    }
}
export default PayPalBtn;