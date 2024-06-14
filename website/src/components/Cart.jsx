import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const Cart = () => {
    // state to hold cart items and user address
    const [cartItems, setCartItems] = useState([]);
    const [userAddress, setUserAddress] = useState('');
    // get the user id form local storage
    const userId = localStorage.getItem('user_id');

    useEffect(() => {
        // if user is not loged in, show an error message
        if (!userId) {
            toast.error('user not logged in');
            return;
        }
        // fetch user details and cart items when component mounts
        fetchUserDetails(userId);
        fetchCartItems(userId);
    }, [userId]);//if uder id change then rerender 'userId'

    // function to fetch user details
    const fetchUserDetails = async (userId) => {
        // destructure the data property
        const { data } = await axios.get(`http://localhost:3000/users/${userId}`);
        // set the user address in the state
        setUserAddress(data.address);
    };

    //a function to fetch cart items
    const fetchCartItems = async (userId) => {
        // destructure and rename the data property to cartData
        const { data: cartData } = await axios.get(`http://localhost:3000/carts?userId=${userId}`);
        // if the cart is empty, show a notification and return
        if (cartData.length === 0) {
            toast.info('Your cart is empty');
            setCartItems([]);
            return;
        }
        // fetch product details for each cart item
        const productRequests = cartData.map(item =>
            axios.get(`http://localhost:3000/products/${item.productId}`)
        );
        const productResponses = await Promise.all(productRequests);
        // merge product details with cart items
        const cartItemsWithDetails = cartData.map((item, index) => ({
            ...item,
            product: productResponses[index].data
        }));
        setCartItems(cartItemsWithDetails);
    };

    // function to handle quantity change
    const handleQuantityChange = (productId, quantity) => {
        // update the quantity of the specified product in the cart
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.productId === productId ? { ...item, quantity: parseInt(quantity, 10) } : item
            )
        );
    };

    // Function to calculate the total price of items in the cart
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    // Function to handle the buy now action
    const handleBuyNow = async () => {
        // Create order items with necessary details
        const orderItems = cartItems.map(item => ({
            userId,
            productId: item.productId,
            quantity: item.quantity,
            itemPrice: item.product.price,
            userAddress,
            totalPrice: item.product.price * item.quantity,
            productImage: item.product.image,
            productName: item.product.name,
        }));

        // Save the order and clear the cart
        await axios.post('http://localhost:3000/orders', { userId, items: orderItems });
        await Promise.all(cartItems.map(item => axios.delete(`http://localhost:3000/carts/${item.id}`)));

        // Show a success message and clear the cart items in state
        toast.success('Purchase successful');
        setCartItems([]);
    };

    return (
        <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
                <div className="col-sm-12 col-xl-12">
                    <div className="bg-light rounded h-100 p-4">
                        <h4 className="mb-4">Cart</h4>
                        {cartItems.length > 0 ? (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Product Name</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item, index) => (
                                        <tr key={item.productId}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.product.name}</td>
                                            <td>
                                                <input
                                                    className="form-control"
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuantityChange(item.productId, e.target.value)}
                                                    style={{ width: "70px" }}
                                                />
                                            </td>
                                            <td>${item.product.price}</td>
                                            <td>${item.product.price * item.quantity}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="3"></td>
                                        <td><h4>Total</h4></td>
                                        <td>
                                            <h4>${calculateTotal()}</h4>
                                            <button className="btn btn-warning" onClick={handleBuyNow}>Buy Now</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        ) : (
                            <p>Your cart is empty</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
