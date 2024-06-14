import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Order = () => {
    const [orders, setOrders] = useState([]); // state to stor orders
    const userId = localStorage.getItem('user_id'); // get userid from localstorage

    useEffect(() => {
        if (!userId) {
            toast.error('User not logged in'); // Show an error message if user is not login
            return;
        }
        fetchOrders(); // fetch orders if user is login
    }, [userId]); // dependency array to userId changes

    const fetchOrders = async () => {
        // function to fetch orders from API
        const { data } = await axios.get(`http://localhost:3000/orders?userId=${userId}`);
        setOrders(data); // update the orders state with the fetched data
    };

    const cancelOrder = async (orderId) => {
        // function for cancel order
        await axios.delete(`http://localhost:3000/orders/${orderId}`);
        setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId)); // Remove the cancelled order from the orders state
        toast.success('Order cancelled successfully'); // Show cancel message
    };

    return (
        <div className="contact_section layout_padding">
            <div className="container px-0">
                <div className="heading_container">
                    <h2 className="mb-4">Your Orders</h2>
                </div>
            </div>
            <div className="container container-bg mb-3">
                {orders.length > 0 ? (
                    // Render orders if any order exist
                    orders.map(order => (
                        order.items.map(item => (
                            <div key={item.productId} className="row p-5 order-card">
                                <div className="map_container pr-5">
                                    <div className="img-box">
                                        <img src={item.productImage || "images/p1.png"} className="order-image" alt={item.productName} />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-5 px-0">
                                    <div className="detail-box">
                                        <h5>{item.productName}</h5>
                                        <h6>${item.itemPrice}</h6>
                                        <p>Qty: {item.quantity}</p>
                                        <small>Address: {order.userAddress}</small>
                                        <h5 className="text-danger">
                                            <span className="text-dark">Total Amount:</span> ${item.totalPrice}
                                        </h5>
                                        <button className="btn btn-primary" onClick={() => cancelOrder(order.id)}>Cancel Order</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ))
                ) : (
                    // Render a message if any orders are does not exist
                    <div className="row p-5 order-card" style={{ height: "8rem" }}>
                        <p>Please View Our <Link to="/products">Products</Link> Page & Shop Now</p>
                    </div>
                )}
            </div>
        </div>
    );
};
