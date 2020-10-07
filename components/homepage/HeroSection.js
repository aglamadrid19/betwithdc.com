import React, { Component } from 'react';
import Swiper, { EffectFade, Autoplay } from 'react-id-swiper';
import Link from 'next/link';

const params = {
  modules: [EffectFade, Autoplay],
  slidesPerView: 1,
  watchOverflow: false,
  autoplay: {
    delay: 5000
  },
  loop: true,
  allowTouchMove: false,
  speed: 1000,
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  }
};
const images = [
  'https://secureservercdn.net/198.71.233.96/h18.748.myftpupload.com/wp-content/uploads/2020/05/DSC08086.jpg',
  'https://secureservercdn.net/198.71.233.96/h18.748.myftpupload.com/wp-content/uploads/2020/05/DSC08005.jpg',
];

export default class HeroSection extends Component {
  render() {
    return (
      <div className="hero-section position-relative">
        <Swiper {...params}>
          {images.map((image, index) => (
            <div key={image}>
              <div
                className="hero-slide d-flex align-items-center justify-content-center flex-column font-color-white py-5"
                style={{
                  backgroundImage: `url("${image}")`
                }}
              >
                {/* <p className="font-size-display5 font-family-secondary mb-4 text-center hero-header">
                  The care you've always needed
                </p>
                <p className="text-transform-uppercase font-size-title mb-5 hero-subheader">
                  A range of products for you
                </p> */}
                <Link href="/collection">
                  <a className="d-flex align-items-center h-56 px-5 font-color-white hero-btn">
                    Best Sellers
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </Swiper>
      </div>
    );
  }
}
