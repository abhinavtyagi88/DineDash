import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import './HomePage.css'; // Custom CSS for the homepage
import "../components/Carousel.css"; // Import Carousel CSS for custom styles

function HomePage() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItem] = useState([]);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    try {
      let token = localStorage.getItem('token');
      let response = await fetch("https://dinedash-64ou.onrender.com/api/foodData", {
        method: "GET",
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json'
        }
      });

      response = await response.json();
      setFoodItem(response[0] || []);
      setFoodCat(response[1] || []);
    } catch (error) {
      console.log("Error fetching food data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle search query input
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      
      {/* Carousel Section */}
      <div className="position-relative" style={{ width: "100vw" }}>
        <div
          id="carouselExampleIndicators"
          className="carousel slide position-relative"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://marketplace.canva.com/EAE-SiS5W84/1/0/1600w/canva-7Ci8Uk2hggo.jpg"
                className="d-block w-100 responsive-img"
                alt="Slide 1"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://marketplace.canva.com/EAE7Gl2m6KA/1/0/1600w/canva-HJCZfYXaq5g.jpg"
                className="d-block w-100 responsive-img"
                alt="Slide 2"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://marketplace.canva.com/EAFzYQMwynE/1/0/800w/canva-ZdEFpyg9ots.jpg"
                className="d-block w-100 responsive-img"
                alt="Slide 3"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
          <br></br>
          <br></br>

        {/* Search Bar */}
        <div className="search-box container position-absolute top-50 start-50 translate-middle">
          <form className="d-flex position-relative">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={handleSearchChange}  // Update search state as user types
              onBlur={() => setSearch('')}
            />
          </form>
        </div>
      </div>
      
      {/* Food Categories Section */}
      <div className="container mt-4">
        {foodCat.map((data) => (
          <div key={data._id} className="row mb-4">
            <h4 className="fs-2 m-2">{data.category}</h4>
            {/* <div className='container w-25'>
              <hr
                id="hr"
                style={{
                  height: "4px",
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(97,241,60,1) 32%, rgba(3,109,6,1) 100%)",
                  border: "none",
                }}
              />
            </div> */}
            {foodItems
              .filter(items =>
                items.category === data.category &&
                items.name.toLowerCase().includes(search.toLowerCase())  // Filter based on search
              )
              .map(filterItems => (
                <div
                  key={filterItems._id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-4"
                >
                  <Card 
                    className="p-3"
                    foodItem={filterItems}
                    options={filterItems.options[0]}
                    ImgSrc={filterItems.img}
                    foodName={filterItems.name}
                  />
                </div>
              ))
            }
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <footer className="footer mt-5 py-4 bg-dark text-white">
        <div className="footer-container m-5">
          <div className="row">
            <div className="col-12 col-md-3 mb-4">
              <h5>Opening Hours</h5>
              <ul className="list-unstyled">
                <li>Monday: 9:00 - 22:00</li>
                <li>Tuesday: 9:00 - 22:00</li>
                <li>Wednesday: 9:00 - 22:00</li>
                <li>Thursday: 9:00 - 22:00</li>
                <li>Friday: 9:00 - 00:00</li>
                <li>Saturday: 9:00 - 00:00</li>
                <li>Sunday: 9:00 - 18:00</li>
              </ul>
            </div>
            <div className="col-12 col-md-3 mb-4">
              <h5>Locations</h5>
              <ul className="list-unstyled">
                <li>944 Glenholme Court, Tiffin, OH</li>
                <li>921 Schoolhouse Court, New Bern, NC</li>
              </ul>
            </div>
            <div className="col-12 col-md-3 mb-4">
              <h5>Menu</h5>
              <ul className="list-unstyled">
                <li><Link to="#" className="text-white text-decoration-none">Home</Link></li>
                <li><Link to="#" className="text-white text-decoration-none">Reservation</Link></li>
                <li><Link to="#" className="text-white text-decoration-none">Our Pizza</Link></li>
                <li><Link to="#" className="text-white text-decoration-none">Your Order</Link></li>
                <li><Link to="#" className="text-white text-decoration-none">Checkout</Link></li>
              </ul>
            </div>
            <div className="col-12 col-md-3 mb-4">
              <h5>Contact</h5>
              <ul className="list-unstyled">
                <li>Phone: 054 / 9923</li>
                <li>Email: <a href="mailto:orders@dinedashh.com" className="text-white text-decoration-none">orders@dinedashh.com</a></li>
                <li>Follow us:</li>
                <div className="d-flex gap-2 mt-2">
                  <a href="#" className="text-white"><i className="bi bi-facebook"></i></a>
                  <a href="#" className="text-white"><i className="bi bi-twitter"></i></a>
                  <a href="#" className="text-white"><i className="bi bi-instagram"></i></a>
                </div>
              </ul>
            </div>
          </div>
          <div className="text-center mt-4">
            <p>&copy; 2025 DineDash. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default HomePage;
