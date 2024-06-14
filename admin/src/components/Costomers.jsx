import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Customers = () => {
    useEffect(() => {
        fetchData();
    }, []);

    const [data, setData] = useState([]);

    const fetchData = async () => {// fetch data from Api and sore in to the state
        const res = await axios.get('http://localhost:3000/users');
        setData(res.data);
    };

    return (
        <div className="col-sm-12 col-xl-12">
            <div className="bg-light rounded h-100 p-4">
                <h6 className="mb-4">Customers</h6>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Surname</th>
                            <th scope="col">Email</th>
                            <th scope="col">Password</th>
                            <th scope="col">Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((val) => (// dsplay every costomer in to the table
                            <tr key={val.id}>
                                <th scope="row">{val.id}</th>
                                <td>{val.name}</td>
                                <td>{val.address}</td>
                                <td>{val.email}</td>
                                <td>{val.password}</td>
                                <td><img src={val.image} alt="image" style={{ width: 40, height: 40 }} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Customers;
