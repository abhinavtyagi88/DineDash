import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import Card from '../components/Card';



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

       <div>
        hello
       </div>
      
       <div className='container'> 
         {
           foodCat.map((data) => {
             return (
               <div key={data._id} className='row mb-3  '>
                 <h4 className='fs-3 m-4 '>
                   {data.category}
                 </h4>
                 <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left, rgb(0, 255, 137), rgb(0, 0, 0))" }} />
                 
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
      <footer>This is Footer</footer>
    </>
  );
}


export default HomePage;
