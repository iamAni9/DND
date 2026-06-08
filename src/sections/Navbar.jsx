import React from 'react';
import RoughAnnotation from '@/components/RoughAnnotation';
import '@/styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <img src="/favicon.svg" alt="DevNextDoor Logo" className="navbar__logo" />
        <span className="navbar__title">DevNextDoor</span>
      </div>
      <ul className="navbar__links">
        <li>
          <RoughAnnotation type="box" color="#aa3bff" padding={8} strokeWidth={2.5}>
            <a href="#home" className="navbar__link">Home</a>
          </RoughAnnotation>
        </li>
        <li>
          <RoughAnnotation type="box" color="#ff5a79" padding={8} strokeWidth={2.5}>
            <a href="#about" className="navbar__link">About</a>
          </RoughAnnotation>
        </li>
        <li>
          <RoughAnnotation type="box" color="#00c2a8" padding={8} strokeWidth={2.5}>
            <a href="#contact" className="navbar__link">Contact Us</a>
          </RoughAnnotation>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
