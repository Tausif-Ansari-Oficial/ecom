import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Order() {
    const [data, setData] = useState([]); // State to store fetched orders with user data

    useEffect(() => {
        fetchData(); // Fetch data when component mounts
    }, []);

    // Function to fetch orders and associated user data
    const fetchData = async () => {

        const res = await axios.get('http://localhost:3000/orders');
        // Fetch user data for each order 
        const ordersData = await Promise.all(res.data.map(async (order) => {

            // Fetch user data using userId from every order
            const userData = await axios.get(`http://localhost:3000/users/${order.userId}`);
            order.userData = userData.data; // Add user data to each order object
            return order; // Return modified order object
        }));
    };

    return (
        <div className="col-sm-12 col-xl-12">
            <div className="bg-light rounded h-100 p-4">
                <h6 className="mb-4">Order Table</h6>
                {/* Table to display orders */}
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Order</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((order, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{order.userData.name}</td> {/* Display customer name from user data */}
                                <td>{order.items.map((item, i) => (
                                    <div key={i}>
                                        <p>{item.productName}</p> {/* Display each product name in the order */}
                                    </div>
                                ))}</td>
                                <td>{order.items.reduce((totalQty, item) => totalQty + item.quantity, 0)}</td> {/* Calculate total quantity of items */}
                                <td>{order.items.reduce((totalAmount, item) => totalAmount + item.totalPrice, 0)} $</td> {/* Calculate total amount */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Order;
