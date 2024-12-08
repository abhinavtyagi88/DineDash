import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null);

    const fetchMyOrder = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail'),
                }),
            });

            const result = await response.json();
            setOrderData(result.orderData);
            console.log("Fetched Order Data:", result.orderData);
        } catch (error) {
            console.error("Error fetching order data:", error.message);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    // Helper function to render order cards
    const renderOrderCard = (arrayData, orderDate) => (
        <div className='col-12 col-md-6 col-lg-3' key={arrayData.id}>
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

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData ? (
                        orderData.order_data
                            .slice(0)
                            .reverse()
                            .map((orderGroup, index) => (
                                <div key={index}>
                                    {orderGroup[0]?.Order_date && (
                                        <div className='m-auto mt-5'>
                                            <h4>Order Date: {new Date(orderGroup[0].Order_date).toLocaleDateString()}</h4>
                                            <hr />
                                        </div>
                                    )}
                                    <div className='row'>
                                        {orderGroup.map(arrayData => renderOrderCard(arrayData, orderGroup[0]?.Order_date))}
                                    </div>
                                </div>
                            ))
                    ) : (
                        <p>Loading your orders...</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
