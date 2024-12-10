import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function MyOrder() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [orderData, setOrderData] = useState(null);
    const [message, setMessage] = useState('');

    const fetchMyOrder = async () => {
        if (!token) {
            navigate('/login');  // Redirect to login if no token
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/myOrderData", {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail'),
                }),
            });

            const result = await response.json();
            if (response.ok) {
                setOrderData(result.orderData);
            } else {
                setMessage(result.message || 'Failed to fetch orders');
            }
        } catch (error) {
            console.error("Error fetching order data:", error.message);
            setMessage('Error fetching orders, please try again.');
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    // Helper function to render order cards
    const renderOrderCard = (arrayData, orderDate, index) => (
        <div className='col-12 col-md-6 col-lg-3' key={index}>
            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px", color: 'black' }}>
                <div className="card-body">
                    <h5 className="card-title">{arrayData.name}</h5>
                    <span className='m-1'>Quantity: {arrayData.qty}</span>
                    <span className='m-1'>Size: {arrayData.size}</span>
                    <span className='m-1'>Date: {new Date(orderDate).toLocaleDateString()}</span>
                    <div className='d-inline ms-2 h-100 w-20 fs-5'>
                        ₹{arrayData.price}/-
                    </div>
                </div>
            </div>
        </div>
    );

    // Helper function to format the Order Date
    const formatOrderDate = (orderDate) => {
        // Handle cases where the Order_date is either a string or an ISO string
        if (typeof orderDate === 'string') {
            const parsedDate = new Date(orderDate);
            if (parsedDate.toString() !== 'Invalid Date') {
                return parsedDate.toLocaleDateString();
            }
            // If it's not a valid date string, use the fallback (original date format)
            return orderDate;
        } else if (orderDate instanceof Date) {
            return orderDate.toLocaleDateString();
        }
        return new Date(orderDate).toLocaleDateString();  // Default format if no valid date found
    };

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {message && <p>{message}</p>}
                    {orderData === null ? (
                        <div className="d-flex justify-content-center">
                            <Spinner animation="border" role="status" />
                        </div>
                    ) : (
                        orderData.order_data
                            .slice(0)
                            .reverse()
                            .map((orderGroup, index) => {
                                // Access the correct date format from orderGroup
                                const orderDate = orderGroup[0]?.Order_date || orderGroup.order_date;
                                const formattedDate = formatOrderDate(orderDate); // Format the date consistently

                                // If `order_date` exists in the group and has `items`, we render it
                                const items = orderGroup.items || Object.values(orderGroup).filter(item => typeof item !== 'object');

                                return (
                                    <div key={index}>
                                        {formattedDate && (
                                            <div className='m-auto mt-5'>
                                                <h4>Order Date: {formattedDate}</h4>
                                                <hr />
                                            </div>
                                        )}
                                        <div className='row'>
                                            {items.map((arrayData, idx) =>
                                                renderOrderCard(arrayData, formattedDate, idx)
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
