import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangleIcon, PhoneIcon, MailIcon, InfoIcon } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangleIcon className="h-6 w-6 text-yellow-400" />
              <h2 className="text-lg font-bold">Flood Alert Ghana</h2>
            </div>
            <p className="text-sm text-blue-200">
              An inclusive real-time flood alert platform for vulnerable
              communities in Ghana. Developed by Innocent Nangah at African
              Leadership University.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 border-b border-blue-700 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-blue-300 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/community-reporting" className="hover:text-blue-300 transition-colors">
                  Community Reporting
                </Link>
              </li>
              <li>
                <Link to="/emergency-response" className="hover:text-blue-300 transition-colors">
                  Emergency Response
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 border-b border-blue-700 pb-2">
              Emergency Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <PhoneIcon className="h-4 w-4 text-yellow-400" />
                <span>Emergency Hotline: 112</span>
              </li>
              <li className="flex items-center space-x-2">
                <MailIcon className="h-4 w-4 text-yellow-400" />
                <span>support@floodalertghana.org</span>
              </li>
              <li className="flex items-center space-x-2">
                <InfoIcon className="h-4 w-4 text-yellow-400" />
                <span>For immediate assistance, send SMS to 1422</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-blue-800 text-center text-sm text-blue-300">
          <p>
            © {new Date().getFullYear()} Flood Alert Ghana. All rights
            reserved.
          </p>
          <p className="mt-1">
            A project by Innocent Nangah, African Leadership University
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;