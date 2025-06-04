"use client";

import { logout } from "@/redux/features/authSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="logo text-xl font-bold text-gray-800">
              BiblioNova
            </Link>
          </div>

          {/* Bouton hamburger pour mobile */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Menu desktop */}
          <div className="hidden sm:flex items-center space-x-8">
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
            {user && (
              <Link
                to="/borrowed-books"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === "/borrowed-books"
                    ? "border-indigo-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Mes Emprunts
              </Link>
            )}
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
            {user ? (
              <>
                <span>Bonjour, {user.firstName}</span>
                <Button onClick={handleLogout} variant="outline">
                  Déconnexion
                </Button>
              </>
            ) : (
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
            )}
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/"
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`}
              >
                Home
              </Link>
              {user && (
                <Link
                  to="/borrowed-books"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === "/borrowed-books"
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  Mes Emprunts
                </Link>
              )}
              <Link
                to="/contact"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/contact"
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`}
              >
                Contact us
              </Link>
              {user ? (
                <div className="px-3 py-2">
                  <span className="block text-gray-500">
                    Bonjour, {user.firstName}
                  </span>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="mt-2 w-full"
                  >
                    Déconnexion
                  </Button>
                </div>
              ) : (
                <div className="px-3 py-2 space-y-2">
                  <Link
                    to="/login"
                    className={`block w-full text-center px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === "/login"
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    }`}
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full text-center px-3 py-2 rounded-md text-base font-medium bg-indigo-600 text-white hover:bg-indigo-500"
                  >
                    Inscription
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
