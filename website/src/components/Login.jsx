import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export const Login = () => {
    const redirect = useNavigate(); // useNavigate for redirect
    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
    }); // formValue hold form values

    const handleChange = (e) => {
        // Updates form values on input change
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };

    const validate = () => {
        // vallidation for valid form
        if (formValue.email === '' || formValue.email === null) {
            toast.error('Email field is required!');
            return false;
        } else if (formValue.password === '' || formValue.password === null) {
            toast.error('Password field is required!');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevents default form submission
        if (validate()) {
            // Validate form fields before submitting
            const { data } = await axios.get(`http://localhost:3000/users?email=${formValue.email}`);
            if (data.length > 0) {
                const user = data[0]; // Get user data
                if (user.password === formValue.password) {
                    // Check if password matches
                    localStorage.setItem('user_name', user.name); // Store user details in local storage
                    localStorage.setItem('user_id', user.id);
                    localStorage.setItem('user_image', user.image);
                    toast.success('Login successful'); // Show success message
                    redirect('/index'); // Navigate to the home page
                } else {
                    setFormValue({ ...formValue, password: "" }); // Clear password field
                    toast.error('Invalid password'); // Show error message
                }
            } else {
                setFormValue({ email: "", password: "" }); // Clear form fields
                toast.error('Email not found or invalid'); // Show error message
            }
        }
    };

    return (
        <div className="container-fluid pt-4 px-4">
            <div className="row g-4 d-flex justify-content-center">
                <div className="col-sm-12 col-xl-6">
                    <div className="bg-light rounded h-100 p-4">
                        <form onSubmit={handleSubmit}>
                            <div className="d-flex flex-column" style={{ gap: "21px" }}>
                                <center><h5 className="mb-4">Login Form</h5></center>
                                <div className="row mb-3">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                                    <div className="col-sm-10">
                                        <input
                                            type="email"
                                            value={formValue.email}
                                            onChange={handleChange}
                                            name="email"
                                            className="form-control"
                                            id="inputEmail3"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                                    <div className="col-sm-10">
                                        <input
                                            type="password"
                                            value={formValue.password}
                                            onChange={handleChange}
                                            name="password"
                                            className="form-control"
                                            id="inputPassword3"
                                        />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button type="submit" className="btn btn-danger">Log in</button>
                                    <div className="link">
                                        <Link to="/signup">If you don't have an account</Link> {/* Link to signup page */}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
