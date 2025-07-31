// components/Header.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import {
  Bars3Icon,
  HomeIcon,
  UserCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 bg-gray-200 ${
        isScrolled ? "bg-gray-300 shadow-md py-2" : "bg-gray-200 py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-800 flex items-center justify-between"
            >
              <GlobeAltIcon className="h-8 w-8 mr-2 text-blue-600" />
              Tagana
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-800 hover:text-blue-600 transition flex items-center gap-1.5 justify-center"
            >
              <HomeIcon className="w-6" />
              Home
            </Link>

            <Link
              href="/"
              className="text-gray-800 hover:text-blue-600 transition flex items-center gap-1.5 justify-center"
            >
              <Bars3Icon className="w-6" />
              About
            </Link>
            <div className="hidden md:block items-center gap-2 lg:flex">
              <Link
                href="/signin"
                className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:text-blue-600 transition  hover:bg-gray-100 flex items-center gap-1.5 justify-center"
              >
                <UserCircleIcon className="w-6" />
                Signin
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:text-blue-600 transition hover:bg-gray-100 flex items-center gap-1.5 justify-center"
              >
                <UserPlusIcon className="w-6" />
                Signup
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-gray-800 hover:text-blue-600 transition flex items-center gap-1.5 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <HomeIcon className="w-6" />
                Home
              </Link>
              <Link
                href="/"
                className="text-gray-800 hover:text-blue-600 transition flex items-center gap-1.5 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Bars3Icon className="w-6" />
                About
              </Link>
              <div className="items-center mt-6 flex gap-2">
                <Link
                  href="/signin"
                  className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:text-blue-600 transition hover:bg-gray-100 flex items-center gap-1.5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UserCircleIcon className="w-6" />
                  Signin
                </Link>
                <Link
                  href="/signin"
                  className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:text-blue-600 transition hover:bg-gray-100 flex items-center gap-1.5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UserPlusIcon className="w-6" />
                  Signup
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
