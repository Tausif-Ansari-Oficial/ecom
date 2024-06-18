import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
    const navigate = useNavigate(); // Hook for navigation
    const [myData, setMyData] = useState({}); // State to hold user data
    const [formValue, setFormValue] = useState({
        id: "",
        name: "",
        email: "",
        mobile: "",
        image: "",
        gender: "",
        address: "",
        password: "",
        newPassword: "",
        newPassword2: ""
    }); // State to hold form values

    const [isEditing, setIsEditing] = useState(false); // State to toggle editing mode
    const [originalData, setOriginalData] = useState({}); // State to hold original user data for canceling edits

    useEffect(() => {
        if (!localStorage.getItem('user_id')) {
            navigate('/'); // Redirect to home if user is not logged in
        } else {
            fetchData(); // Fetch user data
        }
    }, []); // Effect runs on component mount

    const fetchData = async () => {
        // Function to fetch user data from the API
        const res = await axios.get(`http://localhost:3000/users/${localStorage.getItem('user_id')}`);
        setMyData(res.data); // Update state with fetched data
        setOriginalData(res.data); // Store original data
    };

    const editUser = () => {
        // Function to enable editing mode
        setFormValue({ ...myData, password: "", newPassword: "", newPassword2: "" });
        setIsEditing(true);
    };

    const handleChange = (e) => {
        // Function to handle input changes
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };

    const validate = () => {
        // Function to validate form inputs
        let isValid = true;
        const requiredFields = ['name', 'email', 'mobile', 'image', 'gender', 'address'];

        requiredFields.forEach(field => {
            if (!formValue[field]) {
                toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)} field is required!`);
                isValid = false;
            }
        });

        if (formValue.newPassword && formValue.newPassword !== formValue.newPassword2) {
            toast.error('New passwords do not match!');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        // Function to handle form submission
        e.preventDefault();
        if (validate()) {
            await axios.patch(`http://localhost:3000/users/${formValue.id}`, formValue); // Update user data in the API
            toast.success('Update successful');
            setIsEditing(false); // Disable editing mode
            fetchData(); // Refresh user data
        }
    };

    const cancelEditHandler = () => {
        // Function to cancel editing
        setFormValue({ ...originalData, password: "", newPassword: "", newPassword2: "" });
        setIsEditing(false);
    };

    return (
        <section className="contact_section layout_padding">
            <div className="container px-0">
                <div className="heading_container">
                    <h2>Profile</h2> {/* Page heading */}
                </div>
            </div>
            <div className="container container-bg mb-3">
                <div className="row p-5" style={{ height: "350px" }}>
                    <div className="map_container pr-5">
                        <div className="img-box">
                            <img src={myData.image || "images/guest.webp"} style={{ width: "170px" }} alt="Profile" /> {/* Profile image */}
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-5 px-0">
                        <div className="detail-box">
                            <h5>{myData.name}</h5> {/* User name */}
                            <p>{myData.email}</p> {/* User email */}
                            <p>Mobile: {myData.mobile}</p> {/* User mobile */}
                            <p>Gender: {myData.gender}</p> {/* User gender */}
                            <small>Address: {myData.address}</small> {/* User address */}
                            <button className='btn btn-primary mt-2' onClick={editUser}>
                                Edit <i className='fa fa-edit'></i> {/* Edit button */}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* this is a conditional rendering for edit form */}
            {isEditing && (
                <div className="container">
                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formValue.name}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formValue.email}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formValue.gender}
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <textarea
                                id="address"
                                name="address"
                                value={formValue.address}
                                onChange={handleChange}
                                className="form-control"
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Enter Image</label>
                            <input
                                type="url"
                                id="image"
                                name="image"
                                value={formValue.image}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPassword">Enter Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={formValue.newPassword}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPassword2">Retype Password</label>
                            <input
                                type="password"
                                id="newPassword2"
                                name="newPassword2"
                                value={formValue.newPassword2}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="d-flex justify-content-between w-55">
                            <button type="submit" className="btn btn-success mt-2">
                                Save {/* Save button */}
                            </button>
                            <button type="button" className="btn btn-secondary mt-2" onClick={cancelEditHandler}>
                                Cancel Edit {/* Cancel button */}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </section>
    );
};

export default Profile;
