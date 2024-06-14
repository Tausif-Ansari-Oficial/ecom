import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ViewProduct = () => {
    useEffect(() => {
        fetch()
    }, [])

    const [data, setData] = useState([])

    const fetch = async () => {
        let res = await axios.get('http://localhost:3000/products')
        setData(res.data)
    }

    const deleteData = async (id) => {
        let res = await axios.delete(`http://localhost:3000/products/${id}`);
        fetch()
        toast.info("Deleted")
    }

    // Initialize state for form inputs
    var [formvalue, setFormvalue] = useState({
        name: "",
        price: "",
        image: "",
        description: "",
        id: ""
    });



    // Handle form value changes
    const changehandel = (e) => {
        setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
    }

    const validation = () => {
        var result = true;

        // check if name field is empty
        if (formvalue.name == "" || formvalue.name == null) {
            toast.error('Name Field is required !');
            return result = false;
        }
        // check if name price is empty
        else if (formvalue.price == "" || formvalue.price == null) {
            toast.error('Price Field is required !');
            return result = false;
        }
        // check if name image is empty
        else if (formvalue.image == "" || formvalue.image == null) {
            toast.error('image Field is required !');
            return result = false;
        }
        // check if name description is empty
        else if (formvalue.description == "" || formvalue.description == null) {
            toast.error('description Field is required !');
            return result = false;
        }
        return result;
    }

    // fetch employee data by id for editing
    const edithandler = async (id) => {
        const res = await axios.get(`http://localhost:3000/products/${id}`)
        setFormvalue(res.data)// fetched data setting into "data" (state)
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (validation()) {
            const res = await axios.patch(`http://localhost:3000/products/${formvalue.id}`, formvalue);
            if (res.status <= 200) {
                toast.success("Employee added successfully");
                setFormvalue({ ...formvalue, name: '', price: '', image: '', description: '' });
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
                            <th scope="col">Price</th>
                            <th scope="col">Actions</th>
                            <th scope="col">Image</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            data.map((val) => {
                                return (
                                    <tr>
                                        <th scope="row">{val.id}</th>
                                        <td>{val.name}</td>
                                        <td>{val.price}</td>
                                        <td>
                                            <div className="btn-group" role="group">
                                                <button type="button" className="btn btn-secondary" data-bs-toggle="modal" onClick={() => edithandler(val.id)} data-bs-target="#myModal"><i class="fa fa-edit" /></button>
                                                <button type="button" onClick={() => deleteData(val.id)} className="btn btn-danger" ><i class="fa fa-trash" /></button>
                                            </div>
                                        </td>
                                        <td><img src={val.image} className='rounded-circle me-lg-2' style={{ width: 40, height: 40 }} alt="" /></td>
                                        <td>{val.description}</td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <div class="container">

                    {/* modal strat */}

                    <div class="modal fade" id="myModal">
                        <div class="modal-dialog">
                            <div class="modal-content">

                                <div class="modal-header">
                                    <h4 class="modal-title">Modal Heading</h4>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>

                                <div class="modal-body">
                                    <form action="/action_page.php" onSubmit={submitHandler} >
                                        <div className="form-group">
                                            <label htmlFor="name">name:</label>
                                            <input type="text"
                                                value={formvalue.name}
                                                onChange={changehandel}
                                                name='name'
                                                className="form-control" id="name" placeholder="Enter name" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="price">Price:</label>
                                            <input type="number"
                                                value={formvalue.price}
                                                onChange={changehandel}
                                                name='price'
                                                className="form-control" id="price" placeholder="set price" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="image">image:</label>
                                            <input
                                                type="url"
                                                className="form-control w-50"
                                                id="inputImg"
                                                name="image"
                                                value={formvalue.image}
                                                onChange={changehandel}
                                                placeholder="Enter URL only..."
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary" >Submit</button>
                                    </form>

                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* modal strat */}
                </div>

            </div>
        </div>
    )
}

export default ViewProduct