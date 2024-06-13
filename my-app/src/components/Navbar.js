import React from 'react';
import { Link} from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Mom's Kitchen</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active text-white" aria-current="page" to="/">Home</Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto  mb-lg-0">
            <li className="nav-item ml-2 p-1">
              <Link className="nav-link active rounded-3 px-2 bg-success text-white" aria-current="page" to="/logIn">Log In</Link>
            </li>
            <li className="nav-item p-1">
              <Link className="nav-link rounded-3 bg-success text-white " to="/sign">Sign Up</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
