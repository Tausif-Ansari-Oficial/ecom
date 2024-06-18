import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ViewEmploye = () => {
    useEffect(() => {
        fetch()
    }, [])

    const [data, setData] = useState([])

    // Fetch employee data from the server
    const fetch = async () => {
        let res = await axios.get('http://localhost:3000/employee')
        setData(res.data)
    }

    // Delete employee data by id
    const deleteData = async (id) => {
        await axios.delete(`http://localhost:3000/employee/${id}`);
        fetch()
        toast.info("Deleted")
    }

    // Initialize state for form inputs
    const [formvalue, setFormvalue] = useState({
        name: "",
        email: "",
        gender: "",
        image: "",
        id: ""
    });

    // Handle form value changes
    const changehandel = (e) => {
        setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
    }

    const validation = () => {
        var result = true;

        // Validate form fields
        if (formvalue.name === "" || formvalue.name === null) {
            toast.error('Name field is required !');
            return result = false;
        } else if (formvalue.email === "" || formvalue.email === null) {
            toast.error('Email field is required !');
            return result = false;
        } else if (formvalue.gender === "" || formvalue.gender === null) {
            toast.error('Gender field is required !');
            return result = false;
        } else if (formvalue.image === "" || formvalue.image === null) {
            toast.error('Image field is required !');
            return result = false;
        }
        return result;
    }

    // fetch employee data by id for editing
    const edithandler = async (id) => {
        const res = await axios.get(`http://localhost:3000/employee/${id}`)
        setFormvalue(res.data)// fetched data setting into "data" (state)
    }

    const submitHandler = async (e) => {
        e.preventDefault();// prevent default form submission behavior
        if (validation()) {
            // update employee data
            const res = await axios.patch(`http://localhost:3000/employee/${formvalue.id}`, formvalue);
            if (res.status <= 200) {
                toast.success("Employee updated successfully");
                // Reset formvalues
                setFormvalue({ ...formvalue, name: '', email: '', gender: '', image: '' });
                fetch()
            }
        }
    }

    return (
        <div className="col-sm-12 col-xl-12">
            <div className="bg-light rounded h-100 p-4">
                <h6 className="mb-4">Employee Table</h6>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Actions</th>
                            <th scope="col">Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((val) => {
                                return (
                                    <tr key={val.id}>
                                        <th scope="row">{val.id}</th>
                                        <td>{val.name}</td>
                                        <td>{val.email}</td>
                                        <td>{val.gender}</td>
                                        <td>
                                            <div className="btn-group" role="group">
                                                {/* edit button */}
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
                                            {/* display employee image */}
                                            <img src={val.image} className='rounded-circle me-lg-2' style={{ width: 40, height: 40 }} alt="" />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <div className="container">
                    {/* modal for edit employee */}
                    <div className="modal fade" id="myModal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Edit Employee</h4>
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
                                            {/* Email input */}
                                            <label htmlFor="email">Email:</label>
                                            <input
                                                type="email"
                                                value={formvalue.email}
                                                onChange={changehandel}
                                                name='email'
                                                className="form-control"
                                                id="email"
                                                placeholder="Enter email"
                                            />
                                        </div>
                                        <div className="form-group">
                                            {/* Gender select */}
                                            <label htmlFor="gender">Gender:</label>
                                            <select
                                                value={formvalue.gender}
                                                onChange={changehandel}
                                                name="gender"
                                                className="form-control"
                                                id="gender"
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            {/* Image URL input */}
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

export default ViewEmploye
