import React from 'react'

function Carousel() {
  return (
    <>
    <div className='position-absolute'style={{width :"100vw"}}>
    <div id="carouselExampleIndicators" className="carousel slide position-relative" data-bs-ride="carousel" >
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="https://marketplace.canva.com/EAE-SiS5W84/1/0/1600w/canva-7Ci8Uk2hggo.jpg" className="d-block w-100 " style={{"height":"80vh"}} alt="..."/>
      
    </div>
    <div className="carousel-item">
      <img src="https://marketplace.canva.com/EAE7Gl2m6KA/1/0/1600w/canva-HJCZfYXaq5g.jpg" className="d-block w-100 " style={{"height":"80vh"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://marketplace.canva.com/EAFzYQMwynE/1/0/800w/canva-ZdEFpyg9ots.jpg" className="d-block w-100" style={{"height":"80vh"}} alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>


    </div>
    
<div className='search-box container'>

    <div style={{"height":"60vh"}}></div>
    <form className="container d-flex mt-5 position-relative" >
        

        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
    </form>

</div>
      
    </>
  )
}

export default Carousel
