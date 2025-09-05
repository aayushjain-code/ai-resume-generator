import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-400 mb-2">
            © 2024 Resume Generator AI. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Built with Next.js and Google Gemini AI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

