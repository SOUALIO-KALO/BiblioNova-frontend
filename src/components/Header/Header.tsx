"use client";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="logo text-xl font-bold text-gray-800">
              BiblioNova
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                location.pathname === "/"
                  ? "border-indigo-500 text-gray-900"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              Home
            </Link>
            <Link
              to="/borrowed-books"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                location.pathname === "/borrowed-books"
                  ? "border-indigo-500 text-gray-900"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              My Books
            </Link>
            <Link
              to="/contact"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                location.pathname === "/contact"
                  ? "border-indigo-500 text-gray-900"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              Contact us
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === "/login"
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`}
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500"
              >
                Inscription
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
