import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


export default function Sidebar() {
    const redirect = useNavigate();

    const adminLogout = () => {
        localStorage.removeItem('admin_id')
        localStorage.removeItem('admin_name')
        toast.success('Logout Success');
        redirect('/')
    }
    return (
        <div className="sidebar pe-4 pb-3">
            <nav className="navbar bg-light navbar-light">
                <a href="index.html" className="navbar-brand mx-4 mb-3">
                    <h3 className="text-primary"><i className="fa fa-hashtag me-2" />tausif</h3>
                </a>
                <div className="d-flex align-items-center ms-4 mb-4">
                    <div className="position-relative">
                        <img className="rounded-circle" src="img/user.jpg" alt style={{ width: 40, height: 40 }} />
                        <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1">
                        </div>
                    </div>
                    <div className="ms-3">
                        <h6 className="mb-0">Jhon Doe</h6>
                        <span>Admin</span>
                    </div>
                </div>
                <div className="navbar-nav w-100">
                    <Link to="/dashboard" className="nav-item nav-link "><i className="fa fa-tachometer-alt me-2" />Dashboard</Link>
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-shopping-basket" />Categoryes</a>
                        <div className="dropdown-menu bg-transparent border-0">
                            <Link to="/add-category" className="dropdown-item">Add Category</Link>
                            <Link to="/view-category" className="dropdown-item">View  Category</Link>
                        </div>
                    </div>
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-id-card" />Employes</a>
                        <div className="dropdown-menu bg-transparent border-0">
                            <Link to="/add-employe" className="dropdown-item">Add Employe</Link>
                            <Link to="/view-employe" className="dropdown-item">View  Employes</Link>
                        </div>
                    </div>
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-bullhorn" />Product</a>
                        <div className="dropdown-menu bg-transparent border-0">
                            <Link to="/add-product" className="dropdown-item">Add Product</Link>
                            <Link to="/view-product" className="dropdown-item">View  Product</Link>
                        </div>
                    </div>
                    <Link to="/costomer" className="nav-item nav-link "><i class="fas fa-users"></i>Costomers</Link>
                    <Link to="/order" className="nav-item nav-link "><i class="fas fa-shopping-cart"></i>Orders</Link>
                    <Link onClick={adminLogout} to='/' className="nav-item nav-link "><i class="fas fa-address-card"></i>Logout</Link>

                </div>
            </nav>
        </div>


    )
}
