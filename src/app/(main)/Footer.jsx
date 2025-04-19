'use client'
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faTiktok, faYoutube } from "@fortawesome/free-brands-svg-icons";


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Footer Grid - Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Platform Section */}
          <div>
            <h3 className="text-lg font-semibold text-blue-400">Platform</h3>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="hover:underline">Pricing</a></li>
              <li><a href="#" className="hover:underline">Resume Optimization</a></li>
              <li><a href="#" className="hover:underline">Resume Builder</a></li>
              <li><a href="#" className="hover:underline">LinkedIn Optimization</a></li>
              <li><a href="#" className="hover:underline">Job Tracker</a></li>
              <li><a href="#" className="hover:underline">Cover Letter Optimization</a></li>
            </ul>
          </div>

          {/* ATS Resume & Cover Letter Section */}
          <div>
            <h3 className="text-lg font-semibold text-blue-400">ATS Resume</h3>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="hover:underline">What Is An ATS?</a></li>
              <li><a href="#" className="hover:underline">Optimize Your Resume</a></li>
              <li><a href="#" className="hover:underline">Resume Formats</a></li>
              <li><a href="#" className="hover:underline">Resume Templates</a></li>
            </ul>

            <h3 className="text-lg font-semibold text-blue-400 mt-4">Cover Letter</h3>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="hover:underline">How to Write a Cover Letter</a></li>
              <li><a href="#" className="hover:underline">Cover Letter Templates</a></li>
            </ul>
          </div>

          {/* LinkedIn & Company Section */}
          <div>
            <h3 className="text-lg font-semibold text-blue-400">LinkedIn</h3>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="hover:underline">Profile Writing Guide</a></li>
              <li><a href="#" className="hover:underline">Headline Examples</a></li>
            </ul>

            <h3 className="text-lg font-semibold text-blue-400 mt-4">Company</h3>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Partnerships</a></li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-lg font-semibold text-blue-400">Support</h3>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="hover:underline">Customer Support</a></li>
              <li><a href="#" className="hover:underline">Privacy</a></li>
              <li><a href="#" className="hover:underline">Terms</a></li>
              <li><a href="#" className="hover:underline">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mt-8 text-xl">
          <a href="#" className="hover:text-blue-400"><FontAwesomeIcon icon={faFacebook} /></a>
          <a href="#" className="hover:text-blue-400"><FontAwesomeIcon icon={faInstagram} /></a>
          <a href="#" className="hover:text-blue-400"><FontAwesomeIcon icon={faYoutube} /></a>
          <a href="#" className="hover:text-blue-400"><FontAwesomeIcon icon={faLinkedin} /></a>
          <a href="#" className="hover:text-blue-400"><FontAwesomeIcon icon={faTiktok} /></a>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6 text-gray-500">
          © 2025 PredictHire
        </div>
      </div>
    </footer>
  );
};

export default Footer;
