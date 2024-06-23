import React from "react";
import { Link } from 'react-router-dom'
import Analytics from "./Analytics";

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand text-white">CrispUrl</Link>
        <div className="d-flex">
        <Link to='/' style={{'marginRight' : '20px'}}>
        <button className="btn btn-outline-success text-white">
            Home
          </button>
        </Link>
          <Link to="/analytics" style={{'marginRight' : '20px'}}>
          <button className="btn btn-outline-success text-white">
            Analytics
          </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
