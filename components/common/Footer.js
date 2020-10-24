import React from 'react';
import Link from 'next/link';

const Footer = () => (

  <footer className="pt-5">
    <div className="pt-md-5">
      <div className="bg-brand300">
        <div className="custom-container d-flex flex-column flex-md-row align-items-center justify-content-between">
          <div className="pt-5 pb-0 pt-md-4 pb-md-4 d-flex align-items-center flex-wrap justify-content-center">
            <Link href="/">
              <a 
                style={{color: `white`}} 
                href="" 
                className="font-color-brand font-size-caption text-uppercase text-center">
                betatdc.com
              </a>
            </Link>
          </div>
          <div className="font-color-brand font-size-caption py-4 text-right">
            <Link href="/">
              <a 
                style={{color: `white`}} 
                href="" 
                className="font-color-brand font-size-caption text-uppercase text-center">
                &copy; 2020 BETATDC.COM
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
