import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic'
import ConfirmPage from '../../components/checkout/Confirm'
// const OrderConfirm = dynamic(() => import('../../components/checkout/Confirm'),
//   { ssr: false }
// )

function Confirm(props) {
  return (
    <>
      <Head>
        <title>betatdc | Order</title>
      </Head>
      <ConfirmPage props={props}/>
    </>
  )
}

export default Confirm;
