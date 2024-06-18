import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddProduct = () => {
    // Initialize state for form inputs
    const [formVal, setFormVal] = useState({
        id: '',
        name: '',
        price: '',
        description: '',
        image: ''
    });

    // input changes and update the form state
    const changeHandler = (e) => {
        setFormVal({ ...formVal, id: new Date().getTime().toString(), [e.target.name]: e.target.value });
    }

    const validation = () => {// a validation function 
        if (!formVal.name) {
            toast.error('Name field is required!');
            return false;
        } else if (!formVal.price) {
            toast.error('Price field is required!');
            return false;
        } else if (!formVal.description) {
            toast.error('Description field is required!');
            return false;
        } else if (!formVal.image) {
            toast.error('Image field is required!');
            return false;
        }
        return true;
    }

    const submitHandler = async (e) => {
        e.preventDefault();// prevent default form submission behavior
        if (validation()) {// check validation
            const res = await axios.post('http://localhost:3000/products', formVal);
            if (res.status >= 200 && res.status < 300) {
                toast.success('Product added successfully');
                // reset fields
                setFormVal({ id: '', name: '', price: '', description: '', image: '' });
            }
        }
    }

    return (
        <div className="col-sm-12 col-xl-12">
            <div className="bg-light rounded h-100 p-4">
                <h6 className="mb-4">Add Product</h6>
                <form onSubmit={submitHandler}>
                    <div className="row mb-3">
                        <label htmlFor="inputName" className="col-sm-2 col-form-label">Product Name</label>
                        <div className="col-sm-10">
                            {/* product name input */}
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
                        <label htmlFor="inputPrice" className="col-sm-2 col-form-label">Product Price</label>
                        <div className="col-sm-10">
                            {/* product price input */}
                            <input
                                type="number"
                                className="form-control w-50"
                                id="inputPrice"
                                name="price"
                                value={formVal.price}
                                onChange={changeHandler}
                                placeholder="Enter Price..."
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputDescription" className="col-sm-2 col-form-label">Product Description</label>
                        <div className="col-sm-10">
                            {/* product description input */}
                            <textarea
                                name="description"
                                id="description"
                                className="form-control w-50"
                                onChange={changeHandler}
                                value={formVal.description}
                                placeholder="Enter Description..."
                            >
                            </textarea>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputImg" className="col-sm-2 col-form-label">Product Image</label>
                        <div className="col-sm-10">
                            {/* product image input */}
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
                    <button type="submit" className="btn btn-primary">Add Product</button>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;
