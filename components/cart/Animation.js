import React from 'react';

import Lottie from 'react-lottie';
import animationData from '../../lotties/add-to-cart.json';

export default function Animation( props ) {
  const buttonStyle = {
    color: 'white'
  };

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  
  return (
    <div className={buttonStyle}>
      <Lottie
        options={defaultOptions}
        height={32}
        width={32}
        isStopped={!props.isStopped}
      />
    </div>
  );
}
