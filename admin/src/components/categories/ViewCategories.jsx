import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ViewCategories = () => {
    useEffect(() => {
        // Fetch category data when component mounts
        fetch()
    }, [])

    const [data, setData] = useState([])

    const fetch = async () => {
        // fetch category data from the server
        let res = await axios.get('http://localhost:3000/categories')
        setData(res.data)
    }

    const deleteData = async (id) => {
        // delete category data by id
        await axios.delete(`http://localhost:3000/categories/${id}`);
        fetch()
        toast.info("Deleted")
    }

    // Initialize state for form inputs
    const [formvalue, setFormvalue] = useState({
        name: "",
        image: "",
        id: ""
    });

    const changehandel = (e) => {
        // Update form values as the user types
        setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
    }

    const validation = () => {
        var result = true;

        // validate form fullfill
        if (formvalue.name === "" || formvalue.name === null) {
            toast.error('Name field is required !');
            return result = false;
        } else if (formvalue.image === "" || formvalue.image === null) {
            toast.error('Image field is required !');
            return result = false;
        }
        return result;
    }

    const edithandler = async (id) => {
        // Fetch category data by id for editing
        const res = await axios.get(`http://localhost:3000/categories/${id}`)
        setFormvalue(res.data)
    }

    const submitHandler = async (e) => {
        e.preventDefault();// Prevent default form submission behavior
        if (validation()) {
            // update category data
            const res = await axios.patch(`http://localhost:3000/categories/${formvalue.id}`, formvalue);
            if (res.status <= 200) {
                toast.success("Category updated successfully");
                // reset formvalues
                setFormvalue({ ...formvalue, name: '', image: '', id: '' });
                fetch()
            }
        }
    }

    return (
        <div className="col-sm-12 col-xl-12">
            <div className="bg-light rounded h-100 p-4">
                <h6 className="mb-4">Categories Table</h6>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Actions</th>
                            <th scope="col">Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((val) => {
                                return (
                                    <tr key={val.id}>
                                        {/* category ID */}
                                        <th scope="row">{val.id}</th>
                                        {/* category Name */}
                                        <td>{val.name}</td>
                                        <td>
                                            <div className="btn-group" role="group">
                                                {/* Edit button */}
                                                <button type="button" className="btn btn-secondary" data-bs-toggle="modal" onClick={() => edithandler(val.id)} data-bs-target="#myModal">
                                                    <i className="fa fa-edit" />
                                                </button>
                                                {/* Delete button */}
                                                <button type="button" onClick={() => deleteData(val.id)} className="btn btn-danger">
                                                    <i className="fa fa-trash" />
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Display category image */}
                                            <img src={val.image} className='rounded-circle me-lg-2' style={{ width: 40, height: 40 }} alt="" />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <div className="container">
                    {/* modal for editing category */}
                    <div className="modal fade" id="myModal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Edit Category</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>

                                <div className="modal-body">
                                    <form onSubmit={submitHandler}>
                                        <div className="form-group">
                                            {/* name input */}
                                            <label htmlFor="name">Name:</label>
                                            <input
                                                type="text"
                                                value={formvalue.name}
                                                onChange={changehandel}
                                                name='name'
                                                className="form-control"
                                                id="name"
                                                placeholder="Enter name"
                                            />
                                        </div>
                                        <div className="form-group">
                                            {/* image URL input */}
                                            <label htmlFor="image">Image:</label>
                                            <input
                                                type="url"
                                                className="form-control"
                                                id="inputImg"
                                                name="image"
                                                value={formvalue.image}
                                                onChange={changehandel}
                                                placeholder="Enter URL only..."
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewCategories
