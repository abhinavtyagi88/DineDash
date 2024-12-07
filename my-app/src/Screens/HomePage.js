import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import Card from '../components/Card';
import './HomePage.css'
import './HomePage.css'; 


function HomePage() {
  // Correct state declaration using useState
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItem] = useState([]);
  const [search, setSearch] = useState('')

  // Data fetching function
  const loadData = async () => {
    try {

      let token  = localStorage.getItem('token');
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "GET",
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      // Await the response and convert it to JSON
      response = await response.json();

      console.log(response);

      setFoodItem(response[0] || []); 
      setFoodCat(response[1] || []);

    


    } catch (error) {
      console.log("Error fetching food data:", error);
    }
  };


 

  // Using useEffect to call loadData when the component mounts
  useEffect(() => {
   loadData();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <>
      <Navbar />
      <Carousel />
      <br></br>


      
       <div className='container'> 
         {
           foodCat.map((data) => {
             return (
               <div key={data._id} className='row mb-3  '>
                 <h4 className='fs-2 m-2 '>
                   {data.category}
                 </h4>
                 <hr id="hr" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left, rgb(9, 98, 8, 1), rgb(0, 0, 0))" }} />
                 
                 {
                   foodItems
                     .filter(items => 
                       items.category === data.category && 
                       items.name.toLowerCase().includes(search.toLowerCase())
                     )
                     .map(filterItems => (
                       <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                         <Card className="p-2"  foodItem={filterItems} options={filterItems.options[0]} />
                       </div>
                     ))
           }
               </div>
             )
           })
         }
        
       </div>

       <footer class="footer" >
    <div class="container">
      <div class="row">
        {/* <!-- Opening Hours --> */}
        <div class="col-md-3">
          <h5>Opening Hours</h5>
          <ul class="list-unstyled">
            <li>Monday: 9:00 - 22:00</li>
            <li>Tuesday: 9:00 - 22:00</li>
            <li>Wednesday: 9:00 - 22:00</li>
            <li>Thursday: 9:00 - 22:00</li>
            <li>Friday: 9:00 - 00:00</li>
            <li>Saturday: 9:00 - 00:00</li>
            <li>Sunday: 9:00 - 18:00</li>
          </ul>
        </div>

        {/* <!-- Locations --> */}
        <div class="col-md-3">
          <h5>Locations</h5>
          <ul class="list-unstyled">
            <li>Location 1: 944 Glenholme Court, Tiffin, OH 44883</li>
            <li>Location 2: 921 Schoolhouse Court, New Bern, NC 28560</li>
          </ul>
        </div>

        {/* <!-- Menu --> */}
        <div class="col-md-3">
          <h5>Menu</h5>
          <ul class="list-unstyled">
            <li><a href="#">Home</a></li>
            <li><a href="#">Reservation</a></li>
            <li><a href="#">Our Pizza</a></li>
            <li><a href="#">Your Order</a></li>
            <li><a href="#">Checkout</a></li>
          </ul>
        </div>

        {/* <!-- Contact --> */}
        <div class="col-md-3">
          <h5>Contact</h5>
          <ul class="list-unstyled">
            <li>Phone: 054 / 9923</li>
            <li>Email: <a href="mailto:orders@pizzamuestra.com">orders@pizzamuestra.com</a></li>
            <li>Follow us:</li>
            <div class="social-icons">
              <a href="#"><i class="bi bi-facebook"></i></a>
              <a href="#"><i class="bi bi-twitter"></i></a>
              <a href="#"><i class="bi bi-instagram"></i></a>
            </div>
          </ul>
        </div>
      </div>

      {/* <!-- Footer Copyright --> */}
      <div class="text-center mt-4">
        <p>&copy; 2018 Food. Built using WordPress and Mesmerize Theme.</p>
      </div>
    </div>
  </footer>
    </>
  );
}


export default HomePage;
