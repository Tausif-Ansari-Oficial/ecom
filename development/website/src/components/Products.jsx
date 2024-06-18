import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [addedToCart, setAddedToCart] = useState([]); // addedToCart stor list of product id which is added to the cart
    const userId = localStorage.getItem('user_id'); // Get the user ID from local storage

    useEffect(() => {
        if (!userId) {
            toast.error('Please Go To Login'); // Show error message if the user is not login
            return;
        }
        fetchProducts();
        fetchCart();
    }, [userId]); // Dependency array to call the effect when userId changes

    const fetchProducts = async () => {
        // Function to fetch the list of products from the API
        const { data } = await axios.get('http://localhost:3000/products');
        setProducts(data); // Update the products state with the fetched data
    };

    const fetchCart = async () => {
        // destructure the user's cart items from the API
        const { data } = await axios.get(`http://localhost:3000/carts?userId=${userId}`);
        const cartItems = data.map(item => item.productId); // Extract the product IDs from the cart items
        setAddedToCart(cartItems); // Update the addedToCart state with the product IDs
    };

    const addToCart = async (product) => {
        // Function to add a product to the cart
        if (addedToCart.includes(product.id)) {
            return; // If the product is already in the cart, do nothing
        }
        const cartItem = {
            userId,
            productId: product.id,
            quantity: 1 // Assuming a quantity of 1 for simplicity
        };

        await axios.post('http://localhost:3000/carts', cartItem); // Add the product to the cart in the API
        setAddedToCart([...addedToCart, product.id]); // Update the addedToCart state with the new product ID
        toast.success(`${product.name} added to cart!`); // show add to cart message
    };

    return (
        <section className="contact_section layout_padding">
            <div className="container px-0">
                <div className="heading_container">
                    <h2>Products</h2> {/* Page heading */}
                </div>
            </div>
            <div className="container container-bg mb-3">
                {products.map((product) => (
                    // Render every products
                    <div key={product.id} className="row p-5" style={{ height: "350px" }}>
                        <div className="map_container pr-5">
                            <div className="img-box">
                                <img src={product.image || "images/p1.png"} style={{ width: "170px" }} alt={product.name} /> {/* Product image */}
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-5 px-0">
                            <div className="detail-box">
                                <h5>{product.name}</h5> {/* Product name */}
                                <p>{product.description}</p> {/* Product description */}
                                <h5 className="text-danger">${product.price}</h5> {/* Product price */}
                                <button
                                    className="btn btn-primary"
                                    onClick={() => addToCart(product)}
                                    disabled={addedToCart.includes(product.id)} // Disable the button if the product is already in the cart
                                >
                                    {addedToCart.includes(product.id) ? 'Added to Cart' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Products;
