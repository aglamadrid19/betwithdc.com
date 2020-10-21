import React from 'react';
import Link from 'next/link';
import ReactPlayer from 'react-player'

<ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />

export default class HeroSection extends React.Component {
  constructor(props) {
    super(props);

    this.exploreContainer = React.createRef();
    this.image = React.createRef();

    this.handleScroll = this.handleScroll.bind(this);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    window.requestAnimationFrame(this.animate);
  }

  animate() {
    if (!this.exploreContainer.current) {
      return;
    }
    const dimensions = this.exploreContainer.current.getBoundingClientRect();
    const x = window.matchMedia('(min-width: 768px)');

    // if (x.matches) {
    //   if (dimensions.top - window.innerHeight < 0 && dimensions.bottom > 0) {
    //     const scrolledRatio =
    //       (window.innerHeight - dimensions.top) / window.innerHeight - 1;

    //     this.image.current.style.transform = `translateY(${-scrolledRatio *
    //       100}px)`;
    //   }
    // }
  }

  render() {
    return (
      
      <div className="bg-brand300 pb-3 pt-3">
          {/* Image Absolute */}
          {/* Content */}
          <div ref={this.exploreContainer} className="container">
            <div className="row align-items-center flex-column-reverse flex-md-row">
              <div className="col-md-6 pt-5">
                <p
                  className="font-size-display3 font-weight-light mb-4"
                  style={{ maxWidth: '20rem' }}
                >
                  Check our best sellers
                </p>
                <div className="d-flex">
                  <Link href="/collection">
                    <a className="d-flex py-3 align-items-center font-color-black borderbottom border-color-black">
                      <p className="mr-3">Explore products</p>
                      <img src="/icon/arrow-long-right.svg" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="col-md-6">
                <img src="/images/betwithdc - hero image 1.jpg" className="img-fluid rounded" width="600px" style={{objectFit: "cover", height: `55vh`}}></img>
              </div>
            </div>
            </div>
        </div>
    );
  }
}
