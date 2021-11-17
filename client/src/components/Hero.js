import React from "react";

import logo from '../assets/logo4r.png';

const Hero = () => (
  <div className="text-center hero my-5">
    <div ><li> <img src={logo} alt="technology accesories" className="logoImg"/></li></div>
    {/* <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" /> */}
    {/* <h1 className="mb-4">4R Technology</h1> */}
  </div>
);

export default Hero;
