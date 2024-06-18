import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Signup = () => {
    // Initialize navigate hook
    const navigate = useNavigate();

    // State for form values
    const [formValue, setFormValue] = useState({
        id: "",
        name: "",
        email: "",
        password: "",
        address: "",
        gender: "",
        mobile: "",
        image: ""
    });

    // Handle form input changes
    const changeHandler = (e) => {
        setFormValue({ ...formValue, id: new Date().getTime().toString(), [e.target.name]: e.target.value });
    };

    // Validate form fields
    const validate = () => {
        let result = true;
        // name validation
        if (formValue.name === "" || formValue.name === null) {
            toast.error(`Name field is required!`);
            result = false;
        }
        // email validation
        else if (formValue.email === "" || formValue.email === null) {
            toast.error(`Email field is required!`);
            result = false;
        }
        // password validation
        else if (formValue.password === "" || formValue.password === null) {
            toast.error(`password field is required!`);
            result = false;
        }
        // address validation
        else if (formValue.address === "" || formValue.address === null) {
            toast.error(`address field is required!`);
            result = false;
        }
        // gender validation
        else if (formValue.gender === "" || formValue.gender === null) {
            toast.error(`gender field is required!`);
            result = false;
        }
        // mobile number validation
        else if (formValue.mobile === "" || formValue.mobile === null) {
            toast.error(`mobile field is required!`);
            result = false;
        }
        // image validation
        else if (formValue.image === "" || formValue.image === null) {
            toast.error(`image field is required!`);
            result = false;
        }

        return result;
    };

    // Handle form submission
    const submitHandler = async (e) => {
        e.preventDefault();
        if (validate()) {
            const res = await axios.post('http://localhost:3000/users', formValue);
            if (res.status >= 200) {
                localStorage.setItem('user_name', formValue.name);
                localStorage.setItem('user_id', formValue.id);
                setFormValue({
                    id: "",
                    name: "",
                    email: "",
                    password: "",
                    address: "",
                    gender: "",
                    mobile: "",
                    image: ""
                });
                toast.success('Account created successfully!');
                navigate('/index');
            }
        }
    };

    return (
        <div className="container-fluid pt-4 px-4">
            <div className="row g-4 d-flex justify-content-center">
                <div className="col-sm-12 col-xl-6">
                    <div className="bg-light rounded h-100 p-4">
                        <center><h5 className="mb-4">Signup Form</h5></center>
                        <form onSubmit={submitHandler}>
                            {/* Name */}
                            <div className="row mb-3">
                                <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formValue.name}
                                        onChange={changeHandler}
                                        className="form-control"
                                        id="name"
                                    />
                                </div>
                            </div>
                            {/* Email */}
                            <div className="row mb-3">
                                <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formValue.email}
                                        onChange={changeHandler}
                                        className="form-control"
                                        id="email"
                                    />
                                </div>
                            </div>
                            {/* Password */}
                            <div className="row mb-3">
                                <label htmlFor="password" className="col-sm-2 col-form-label">Set Password</label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        name="password"
                                        value={formValue.password}
                                        onChange={changeHandler}
                                        className="form-control"
                                        id="password"
                                    />
                                </div>
                            </div>
                            {/* Address */}
                            <div className="row mb-3">
                                <label htmlFor="address" className="col-sm-2 col-form-label">Address</label>
                                <div className="col-sm-10">
                                    <textarea
                                        name="address"
                                        value={formValue.address}
                                        onChange={changeHandler}
                                        className="form-control"
                                        id="address">
                                    </textarea>
                                </div>
                            </div>
                            {/* Mobile */}
                            <div className="row mb-3">
                                <label htmlFor="number" className="col-sm-2 col-form-label">Mobile No:</label>
                                <div className="col-sm-10">
                                    <input
                                        type="number"
                                        name="mobile"
                                        value={formValue.mobile}
                                        onChange={changeHandler}
                                        className="form-control"
                                        id="mobile"
                                    />
                                </div>
                            </div>
                            {/* Image */}
                            <div className="row mb-3">
                                <label htmlFor="number" className="col-sm-2 col-form-label">Image</label>
                                <div className="col-sm-10">
                                    <input
                                        type="url"
                                        name="image"
                                        value={formValue.image}
                                        onChange={changeHandler}
                                        className="form-control"
                                        id="image"
                                    />
                                </div>
                            </div>
                            {/* Gender */}
                            <fieldset className="row mb-3">
                                <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
                                <div className="col-sm-10">
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            checked={formValue.gender === 'male'}
                                            onChange={changeHandler}
                                            type="radio"
                                            name="gender"
                                            id="genderMale"
                                            value="male"
                                        />
                                        <label className="form-check-label" htmlFor="genderMale">
                                            Male
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            checked={formValue.gender === 'female'}
                                            onChange={changeHandler}
                                            type="radio"
                                            name="gender"
                                            id="genderFemale"
                                            value="female"
                                        />
                                        <label className="form-check-label" htmlFor="genderFemale">
                                            Female
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                            {/* Submit */}
                            <div className="d-flex justify-content-between">
                                <button type="submit" className="btn btn-danger">Sign up</button>
                                <div className="link">
                                    <Link to="/">If you have an account</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
