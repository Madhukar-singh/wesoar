import {
  Youtube,
  Linkedin,
  Twitter,
  Phone,
  Mail,
  MapPin,
  Globe,
  Send,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#3f87a6] to-[#153259] text-white py-12 text-sm">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Links */}
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <div>
              <p className="font-semibold">الأكاديمية المالية</p>
              <p className="text-xs">THE FINANCIAL ACADEMY</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:text-gray-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Courses
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Certificates
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Community
                </a>
              </li>
            </ul>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:text-gray-300">
                  Jadarat
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Packages
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Login
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  FAST Login
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Open Data
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Stay Connected & Newsletter */}
        <div>
          <h3 className="font-semibold mb-3">Stay Connected</h3>
          <div className="flex space-x-3 mb-5">
            <a href="#" className="hover:text-gray-300">
              <Youtube size={18} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <Linkedin size={18} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <Twitter size={18} />
            </a>
            <a href="#" className="hover:text-gray-300 font-bold text-base">
              X
            </a>
          </div>

          <h3 className="font-semibold mb-2">Join our newsletter</h3>
          <div className="flex items-center bg-white rounded-full overflow-hidden w-full">
            <input
              type="email"
              placeholder="Enter Email Address"
              className="flex-grow px-4 py-2 text-black outline-none text-sm"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 px-3">
              <Send size={18} />
            </button>
          </div>
        </div>

        {/* Reach Out */}
        <div>
          <h3 className="font-semibold mb-4">Reach out</h3>
          <ul className="space-y-3">
            <li className="flex items-center">
              <Phone size={16} className="mr-2" /> +974 5222 2215
            </li>
            <li className="flex items-center">
              <Mail size={16} className="mr-2" /> emailaddress@email.com
            </li>
            <li className="flex items-center">
              <MapPin size={16} className="mr-2" /> King Abdullah Financial
              Center
            </li>
            <li className="flex items-center">
              <Globe size={16} className="mr-2" />
              <a href="#" className="hover:text-gray-300">
                Our location
              </a>
            </li>
          </ul>
        </div>

        {/* Customize Programs Card */}
        <div className="bg-white text-black p-6 rounded-xl">
          <h4 className="font-bold text-blue-900 mb-2 text-base leading-snug">
            LOOKING TO
            <br />
            <span className="text-blue-700">CUSTOMIZE YOUR PROGRAMS?</span>
          </h4>
          <p className="text-sm text-gray-700 mb-4 leading-snug">
            Description Description <br />
            Description Description <br />
            Description Description
          </p>
          <button className="w-full bg-[#5091CD] hover:bg-[#349fce] text-white py-2 rounded-full text-sm font-semibold flex items-center justify-center space-x-2">
            <span>Start today!</span> <Send size={16} />
          </button>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 pt-6 text-center text-xs text-gray-300 space-y-2">
        <div className="space-x-4">
          <a href="#" className="hover:text-white">
            Privacy Policy
          </a>
          <span>&#8226;</span>
          <a href="#" className="hover:text-white">
            Terms and Conditions
          </a>
          <span>&#8226;</span>
          <a href="#" className="hover:text-white">
            Cookies Policy
          </a>
        </div>
        <p>&copy; 2024 The Financial Academy. All rights reserved.</p>
      </div>
    </footer>
  );
}
