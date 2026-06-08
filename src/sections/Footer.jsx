import React from 'react';

const Footer = () => (
  <footer className="footer bg-gray-900 text-white py-8">
    <div className="container mx-auto px-4 text-center">
      <p className="text-sm">© {new Date().getFullYear()} DevNextDoor. All rights reserved.</p>
      <div className="mt-2 flex flex-wrap justify-center gap-4 text-sm">
        <a href="/about" className="hover:text-gray-300">About</a>
        <a href="/contact" className="hover:text-gray-300">Contact</a>
        <a href="/privacy" className="hover:text-gray-300">Privacy Policy</a>
      </div>
    </div>
  </footer>
);

export default Footer;
