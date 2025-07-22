import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X, Search, ChevronDown } from "lucide-react";

const suggestions = [
  "Bitcoin",
  "Ethereum",
  "TradingView",
  "Algo Bot",
  "Market News",
  "Strategy Builder",
  "Backtesting",
  "Technical Analysis",
  "Crypto Signals",
  "Portfolio Tracker",
];

const Navbar = ({ onLoginClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const navRef = useRef(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const threshold = 30;
    if (latest > threshold !== scrolled) {
      setScrolled(latest > threshold);
    }
  });

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === "") {
      setFilteredSuggestions([]);
    } else {
      const results = suggestions.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(results.slice(0, 5));
    }
  };

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed z-50 w-full transition-all duration-300 ease-out ${
        scrolled
          ? "top-0 bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100"
          : "top-4 lg:top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-xl bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200"
      } px-4 sm:px-6 py-3`}
      style={{
        width: scrolled ? "100%" : "95%",
        maxWidth: scrolled ? "none" : "80rem",
        left: scrolled ? "0" : "50%",
        transform: scrolled ? "none" : "translateX(-50%)",
      }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center text-gray-900">
        <div className="flex items-center">
          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            TradeBot
          </div>
          <div className="hidden md:flex gap-4 lg:gap-6 text-sm font-medium ml-6 lg:ml-10">
            <a
              href="#features"
              className="hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              Features <ChevronDown size={16} />
            </a>
            <a
              href="#pricing"
              className="hover:text-blue-600 transition-colors"
            >
              Pricing
            </a>
            <a href="#docs" className="hover:text-blue-600 transition-colors">
              Docs
            </a>
            <a
              href="#contact"
              className="hover:text-blue-600 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        <motion.div
          className={`absolute left-1/2 -translate-x-1/2 ${
            scrolled ? "w-60 lg:w-72" : "w-64 lg:w-80"
          }`}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            mass: 0.5,
          }}
          layout
        >
          <div className="relative">
            <input
              type="text"
              className={`w-full pl-10 pr-4 py-2 rounded-full border transition-all duration-200 ${
                searchFocused
                  ? "border-blue-400 shadow-md shadow-blue-100"
                  : "border-gray-300 hover:border-gray-400"
              } focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm`}
              placeholder="Search trading tools..."
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <AnimatePresence>
            {filteredSuggestions.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg text-sm overflow-hidden"
              >
                {filteredSuggestions.map((item, idx) => (
                  <motion.li
                    key={idx}
                    whileHover={{ backgroundColor: "#f8fafc" }}
                    className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer transition-colors flex items-center gap-2"
                    onClick={() => {
                      setSearchTerm(item);
                      setFilteredSuggestions([]);
                    }}
                  >
                    <Search size={14} className="text-gray-400" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          <button
            onClick={onLoginClick}
            className="text-sm font-medium hover:text-blue-600 transition-colors"
          >
            Log in
          </button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-sm font-medium hover:shadow-md transition-all"
          >
            Sign up
          </motion.button>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden"
          >
            <div className="pt-4 pb-2 flex flex-col gap-3 text-sm text-gray-800">
              <div className="relative mb-2">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <AnimatePresence>
                  {filteredSuggestions.length > 0 && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md text-sm overflow-hidden"
                    >
                      {filteredSuggestions.map((item, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                          onClick={() => {
                            setSearchTerm(item);
                            setFilteredSuggestions([]);
                          }}
                        >
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
              <a
                href="#features"
                className="px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Features
              </a>
              <a
                href="#pricing"
                className="px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#docs"
                className="px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Docs
              </a>
              <a
                href="#contact"
                className="px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </a>
              <div className="flex gap-3 mt-2 pt-2 border-t border-gray-200">
                <button
                  onClick={() => {
                    onLoginClick();
                    setMobileOpen(false);
                  }}
                  className="flex-1 py-2 text-sm font-medium hover:text-blue-600 transition-colors"
                >
                  Log in
                </button>
                <button className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm font-medium">
                  Sign up
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
