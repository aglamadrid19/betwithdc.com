import React, { Component } from "react";
import { Transition } from "react-transition-group";
import Link from "next/link";

const duration = 300;

const defaultStyle = {
  zIndex: "-1",
  transition: `height ${duration}ms ease-in-out`,
  height: 0
};

const transitionStyles = {
  entering: { height: "100vh" },
  entered: { height: "100vh" },
  exiting: { height: 0 },
  exited: { height: 0 }
};

const mobileMenuLinks = [
  {
    name: "Home",
    link: "#"
  },
  {
    name: "Shop",
    link: "#"
  },
  {
    name: "About",
    link: "#"
  },
  {
    name: "Account",
    link: "#"
  },
  {
    name: "Saved",
    link: "#"
  }
];

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMobileMenu: false
    };
  }

  toggleMobileMenu = () => {
    const { showMobileMenu } = this.state;

    this.setState({ showMobileMenu: !showMobileMenu });
  };

  render() {
    const { showMobileMenu } = this.state;

    return (
      <header className="position-fixed top-0 left-0 right-0 font-weight-semibold">
        <div className="d-flex header align-items-center justify-content-between position-relative borderbottom border-color-black bg-white">
          <div className="d-none d-sm-flex">
            <a href="#" className="mr-4 font-color-black">
              Shop
            </a>
            <a href="#" className="font-color-black">
              About
            </a>
          </div>
          <div className="logo-container">
            <img
              src={`/icon/${showMobileMenu ? "cross" : "menu"}.svg`}
              onClick={this.toggleMobileMenu}
              className="w-32 mr-1 d-block d-sm-none"
            />
            <Link href="/">
              <img src="/commerce.svg" className="logo cursor-pointer" />
            </Link>
          </div>
          <div className="d-flex">
            <div className="mr-3">
              <img src="/icon/user.svg" className="w-32 cursor-pointer" />
            </div>
            <div className="position-relative cursor-pointer">
              <img src="/icon/cart.svg" className="w-32" />
              <div className="cart-count position-absolute font-size-tiny font-weight-bold">
                0
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <Transition in={showMobileMenu} timeout={duration}>
          {state => (
            <div
              className="d-sm-none position-fixed top-0 left-0 right-0 overflow-hidden"
              style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}
            >
              <div className="position-absolute top-0 left-0 right-0 h-100vh mobile-menu-inner bg-brand700 d-flex flex-column justify-content-center">
                {mobileMenuLinks.map(item => (
                  <a
                    href={item.link}
                    className="d-block mb-4 font-size-heading font-color-black text-center"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </Transition>
      </header>
    );
  }
}