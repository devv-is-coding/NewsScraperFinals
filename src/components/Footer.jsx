import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-center md:text-left">
            © {new Date().getFullYear()} Devv's News Harvester. All rights
            reserved.
          </p>
          <div className="flex space-x-4 text-sm">
            <a href="#" className="hover:text-white transition">
              About
            </a>
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
