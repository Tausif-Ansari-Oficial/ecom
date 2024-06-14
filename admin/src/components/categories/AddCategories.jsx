import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddCategories = () => {
    // Initialize state for form inputs
    const [formVal, setFormVal] = useState({
        id: '',
        name: '',
        image: ''
    });

    const changeHandler = (e) => {
        // update form values with new id and current input values
        setFormVal({ ...formVal, id: new Date().getTime().toString(), [e.target.name]: e.target.value });
    }

    const validation = () => {
        var result = true;

        // check if name field is empty
        if (formVal.name === "" || formVal.name === null) {
            toast.error('Category name Field is required !');
            return result = false;
        }
        // check if image field is empty
        else if (formVal.image === "" || formVal.image === null) {
            toast.error('Category image Field is required !');
            return result = false;
        }
        return result;
    }

    const submitHandler = async (e) => {
        e.preventDefault();// prevent default form submission behavior
        if (validation()) {
            // make POST request to add new category
            const res = await axios.post('http://localhost:3000/categories', formVal);
            if (res.status >= 200) {
                toast.success("Category added successfully");
                // reset form values
                setFormVal({ name: '', image: '' });
            }
        }
    }

    return (
        <div className="col-sm-12 col-xl-12">
            <div className="bg-light rounded h-100 p-4">
                <h6 className="mb-4">Category Form</h6>
                <form onSubmit={submitHandler}>
                    <div className="row mb-3">
                        {/* Category Name Input */}
                        <label htmlFor="inputName" className="col-sm-2 col-form-label">Category Name</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control w-50"
                                id="inputName"
                                name="name"
                                value={formVal.name}
                                onChange={changeHandler}
                                placeholder="Enter Name..." />
                        </div>
                    </div>
                    <div className="row mb-3">
                        {/* category URL Input */}
                        <label htmlFor="inputImage" className="col-sm-2 col-form-label">Category URL</label>
                        <div className="col-sm-10">
                            <input
                                type="url"
                                className="form-control w-50"
                                id="inputImage"
                                name="image"
                                value={formVal.image}
                                onChange={changeHandler}
                                placeholder="Enter URL Only..." />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Add category</button>
                </form>
            </div>
        </div>
    )
}

export default AddCategories;
