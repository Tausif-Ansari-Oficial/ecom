import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {
    const redirect = useNavigate(); // Initialize redirect hook for programmatic navigation

    // Check if the user is already logged in and redirect to the dashboard
    useEffect(() => {
        if (localStorage.getItem('admin_name')) { // Check if admin_name is stored in local storage
            redirect('/dashboard') // Redirect to dashboard route
        }
    }, []); // Re-run the effect whenever redirect changes

    const [formvalue, setFormvalue] = useState({ // Initialize state for form inputs
        email: "",
        password: "",
    });

    // input changes and update the form state
    const changehandel = (e) => {
        setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
        console.log(formvalue);
    }

    // Validate the form inputs
    const validation = () => {
        var result = true;

        if (formvalue.email === "" || formvalue.email === null) {
            toast.error('Email Field is required !');
            return result = false; // Set result to false if validation fails
        }
        if (formvalue.password === "" || formvalue.password === null) {
            toast.error('Password Field is required !');
            return result = false;
        }
        return result;
    }

    // handle form submission and login
    const submithandel = async (e) => {
        e.preventDefault(); // prevent default form submission behavior

        if (validation()) {
            const res = await axios.get(`http://localhost:3000/admin?email=${formvalue.email}`); // fetch admin data from server based on email
            if (res.data.length > 0) { // Check if admin data exists
                if (res.data[0].password === formvalue.password) { // check if password matches
                    // Setting data in local storage
                    localStorage.setItem('admin_position', res.data[0].position);
                    localStorage.setItem('admin_name', res.data[0].name);
                    localStorage.setItem('admin_image', res.data[0].image);

                    toast.success('Login Success');
                    redirect('/dashboard'); // redirect to dashboard route
                } else {
                    setFormvalue({ ...formvalue, password: "" }); // reset password field
                    toast.error('Invalid Password');
                }
            } else {
                setFormvalue({ ...formvalue, email: "", password: "" }); // reset email and password fields
                toast.error('Itract to database and find out');
            }
        }
    }

    return (
        <div className="container-xxl position-relative bg-white d-flex p-0">
            <div className="container-fluid">
                <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                    <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                        <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <a href="/" className>
                                    <h3 className="text-primary"><i className="fa fa-hashtag me-2" />DASHMIN</h3>
                                </a>
                                <h3>Login In</h3>
                            </div>
                            <form onSubmit={submithandel}> {/* Handle form submission */}
                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={formvalue.email}
                                        onChange={changehandel}
                                        name="email"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                    />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating mb-4">
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={formvalue.password}
                                        onChange={changehandel}
                                        name="password"
                                        id="floatingPassword"
                                        placeholder="Password"
                                    />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <button type="submit" className="btn btn-primary py-3 w-100 mb-4">Sign In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
