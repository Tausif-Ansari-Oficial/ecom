import React from 'react';
import { Link } from 'react-router-dom';

export const Header = ({ Comp }) => {
    return (
        <div className="hero_area">
            <header className="header_section">
                <nav className="navbar navbar-expand-lg custom_nav-container">
                    <Link className="navbar-brand" to="/index">
                        <span>Giftos</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse innerpage_navbar" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/index">Home <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/products">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">Cart</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/order">Orders</Link>
                            </li>
                        </ul>
                        <div className="nav-item dropdown">
                            <div className="user_option">
                                <Link to="#" className="nav-link dropdown-toggle" id="userDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                    <span>user</span>
                                </Link>
                                <ul className="dropdown-menu dropdown-menu-end bg-light border-1 rounded-4 m-0" aria-labelledby="userDropdown">
                                    <li><Link to="/profile" className="dropdown-item">Profile</Link></li>
                                    <li><Link to="/" className="dropdown-item">Logout</Link></li>
                                </ul>
                                <Link className="nav-link" to="/cart">
                                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                </Link>
                                <Link className="nav-link" to="/order">
                                    <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <Comp />
        </div>
    );
}
