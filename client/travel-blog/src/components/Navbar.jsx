// client/src/components/Navbar.jsx
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => setNavOpen(!navOpen);
  const closeNav = () => setNavOpen(false);

  return (
    <nav className="bg-blue-600 text-white fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Brand Logo/Name */}
        <Link to="/" className="text-2xl font-bold" onClick={closeNav}>
          TravelBlog
        </Link>

        {/* Hamburger Menu Icon */}
        <div className="md:hidden">
          {navOpen ? (
            <FaTimes size={24} onClick={toggleNav} className="cursor-pointer" />
          ) : (
            <FaBars size={24} onClick={toggleNav} className="cursor-pointer" />
          )}
        </div>

        {/* Navigation Links */}
        <ul
          className={`md:flex md:items-center md:static absolute bg-blue-600 w-full left-0 top-16 transition-all duration-500 ease-in ${
            navOpen ? "block" : "hidden"
          }`}
        >
          <li className="md:ml-6">
            <Link
              to="/"
              className="block py-2 px-4 hover:bg-blue-700"
              onClick={closeNav}
            >
              Home
            </Link>
          </li>
          <li className="md:ml-6">
            <Link
              to="/about"
              className="block py-2 px-4 hover:bg-blue-700"
              onClick={closeNav}
            >
              About
            </Link>
          </li>
          <li className="md:ml-6">
            <Link
              to="/contact"
              className="block py-2 px-4 hover:bg-blue-700"
              onClick={closeNav}
            >
              Contact
            </Link>
          </li>

          {/* Conditional Links Based on Authentication */}
          {auth.token ? (
            <>
              <li className="md:ml-6">
                <Link
                  to="/dashboard"
                  className="block py-2 px-4 hover:bg-blue-700"
                  onClick={closeNav}
                >
                  Dashboard
                </Link>
              </li>
              <li className="md:ml-6">
                <Link
                  to="/create-post"
                  className="block py-2 px-4 hover:bg-blue-700"
                  onClick={closeNav}
                >
                  Create Post
                </Link>
              </li>
              <li className="md:ml-6">
                <button
                  onClick={() => {
                    logout();
                    closeNav();
                  }}
                  className="block w-full text-left py-2 px-4 hover:bg-blue-700"
                >
                  Logout
                </button>
              </li>
              {/* User Profile Dropdown */}
              <li className="md:ml-6 relative">
                <button className="flex items-center py-2 px-4 hover:bg-blue-700">
                  <FaUserCircle size={24} />
                  <span className="ml-2">{auth.user?.username}</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="md:ml-6">
                <Link
                  to="/login"
                  className="block py-2 px-4 hover:bg-blue-700"
                  onClick={closeNav}
                >
                  Login
                </Link>
              </li>
              <li className="md:ml-6">
                <Link
                  to="/register"
                  className="block py-2 px-4 hover:bg-blue-700"
                  onClick={closeNav}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
