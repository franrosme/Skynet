import React from "react";

import logo from '../assets/Skynet.png';

const Hero = () => (
  <div className="text-center hero my-5">
    <div > <img src={logo} width="450" alt="Logo Skynet development team" className="logoImg" /></div>
    {/*<img className="mb-3 app-logo" src={logo} alt="React logo" width="120" /> */}
    {/* <h1 className="mb-4">4R Technology</h1> */}
  </div>
);

export default Hero;
