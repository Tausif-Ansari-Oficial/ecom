import React, { useEffect } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Header = () => {
    const redirect = useNavigate();

    useEffect(() => {
        // redirect to home if 'admin_name' is not in localStorage
        if (!localStorage.getItem('admin_name')) {
            redirect('/');
        }
    }, []);

    const adminLogout = () => {//this function for logout
        // Remove admin data from localStorage and redirect to home with a success message
        localStorage.removeItem('admin_name');
        localStorage.removeItem('admin_position');
        localStorage.removeItem('admin_image');
        toast.success('Logout Success');
        redirect('/');
    };

    return (
        <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0 rounded">
            <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
                <h2 className="text-primary mb-0"><i className="fa fa-hashtag" /></h2>
            </a>
            <div className="navbar-nav align-items-center ms-auto">
                <div className="nav-item dropdown">
                    <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                        {/* admin profile image and name */}
                        <img className="rounded-circle me-lg-2" src={localStorage.getItem('admin_image')} alt="" style={{ width: 40, height: 40 }} />
                        <span className="d-none d-lg-inline-flex">{localStorage.getItem('admin_name')}</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                        {/* dropdown menu items */}
                        <Link to="/dashboard" className="dropdown-item">Dashboard</Link>
                        <Link to='/' className="dropdown-item" onClick={adminLogout}>Log Out</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};
