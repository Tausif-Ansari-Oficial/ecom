import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddEmployee = () => {
    // Initialize state for form inputs
    const [formVal, setFormVal] = useState({
        id: '',
        name: '',
        email: '',
        gender: '',
        mobile: '',
        image: ''
    });

    const changeHandler = (e) => {
        // update form values with new id and current input values
        setFormVal({ ...formVal, id: new Date().getTime().toString(), [e.target.name]: e.target.value });
    }

    const validation = () => {
        var result = true;

        // validate form fields
        if (formVal.name === "" || formVal.name === null) {
            toast.error('Name field is required !');
            return result = false;
        } else if (formVal.email === "" || formVal.email === null) {
            toast.error('Email field is required !');
            return result = false;
        } else if (formVal.gender === "" || formVal.gender === null) {
            toast.error('Gender field is required !');
            return result = false;
        } else if (formVal.mobile === "" || formVal.mobile === null) {
            toast.error('Mobile field is required !');
            return result = false;
        } else if (formVal.image === "" || formVal.image === null) {
            toast.error('Image field is required !');
            return result = false;
        }
        return result;
    }

    const submitHandler = async (e) => {
        e.preventDefault();// prevent default form submission behavior
        if (validation()) {
            // add employee data to the server
            const res = await axios.post('http://localhost:3000/employee', formVal);
            if (res.status >= 200) {
                toast.success("Employee added successfully");
                // Reset form values
                setFormVal({ name: '', email: '', gender: '', mobile: '', image: '' });
            }
        }
    }

    return (
        <div className="col-sm-12 col-xl-12">
            <div className="bg-light rounded h-100 p-4">
                <h6 className="mb-4">Add Employee</h6>
                <form onSubmit={submitHandler}>
                    <div className="row mb-3">
                        {/* employee Name input */}
                        <label htmlFor="inputName" className="col-sm-2 col-form-label">Employee Name</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control w-50"
                                id="inputName"
                                name="name"
                                value={formVal.name}
                                onChange={changeHandler}
                                placeholder="Enter Name..."
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        {/* employee Email input */}
                        <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Employee Email</label>
                        <div className="col-sm-10">
                            <input
                                type="email"
                                className="form-control w-50"
                                id="inputEmail"
                                name="email"
                                value={formVal.email}
                                onChange={changeHandler}
                                placeholder="Enter Email..."
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        {/* employee Gender select */}
                        <label htmlFor="inputGender" className="col-sm-2 col-form-label">Employee Gender</label>
                        <div className="col-sm-10">
                            <select
                                className="form-control w-50"
                                id="inputGender"
                                name="gender"
                                value={formVal.gender}
                                onChange={changeHandler}
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        {/* employee Mobile input */}
                        <label htmlFor="inputMobile" className="col-sm-2 col-form-label">Employee Mobile No.</label>
                        <div className="col-sm-10">
                            <input
                                type="number"
                                className="form-control w-50"
                                id="inputMobile"
                                name="mobile"
                                value={formVal.mobile}
                                onChange={changeHandler}
                                placeholder="Enter Mobile No..."
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        {/* employee Image URL input */}
                        <label htmlFor="inputImg" className="col-sm-2 col-form-label">Employee Image</label>
                        <div className="col-sm-10">
                            <input
                                type="url"
                                className="form-control w-50"
                                id="inputImg"
                                name="image"
                                value={formVal.image}
                                onChange={changeHandler}
                                placeholder="Enter URL only..."
                            />
                        </div>
                    </div>
                    {/* submit button */}
                    <button type="submit" className="btn btn-primary">Add Employee</button>
                </form>
            </div>
        </div>
    );
}

export default AddEmployee;
