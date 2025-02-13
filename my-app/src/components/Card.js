
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'
export default function Card(props) {
  const myButton = {
    background: "#91f7b0",
    color: "red",
    // padding: "10px 20px",
    fontSize: "16px", // Uncomment if needed
    border: "none",
    fontWeight: "bold",
    borderRadius: "5px", // Adjust for more/less curve
    cursor: "pointer"
  };
  
  const foodCardStyle  ={
    color :"red"
  }
  let data = useCart();

  let navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const priceRef = useRef();
 
  let option = props.options;
  let priceOptions = Object.keys(option);
  let foodItem = props.foodItem;
  
  const dispatch = useDispatchCart();
  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  }
  const handleQty = (e) => {
    setQty(e.target.value);
  }
  const handleOptions = (e) => {
    setSize(e.target.value);
  }
  const handleAddToCart = async () => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food != []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })
    console.log(data);
    


  }

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

 

  let finalPrice = qty * parseInt(option[size]);   //This is where Price is changing
 
  return (
    <div>

      <div className="card mt-3 w-56 max-h-[360px] border-4 border-black" style={{ width: "14rem", maxHeight: "360px" ,borderColor:"black",borderRadius:"10px" }}>
        <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
        <div className="card-body" style={foodCardStyle}>
          <h5 className="card-title">{props.foodName}</h5>
          <div className=' w-100 p-0' style={{myButton }}>
            <select className="m-1 h-100 w-20 text-dark rounded" style={myButton } onClick={handleClick} onChange={handleQty}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>)
              })}
            </select>
            <select className="m-1 h-100 w-20 text-dark rounded" style={myButton } ref={priceRef} onClick={handleClick} onChange={handleOptions}>
              {priceOptions.map((i) => {
                return <option key={i} value={i}>{i}</option>
              })}
            </select>
            <div className=' d-inline m-1 h-100 fs-5' style={{color:"tomato" }} >
              ₹{finalPrice}/-
            </div>
          </div>
          <hr></hr>
          <button className={`justify-center ms-2 `} style={myButton} onClick={handleAddToCart}>Add to Cart</button>
          {/* <button className={`btn btn-danger justify-center ms-2 ${btnEnable ? "" : "disabled"}`} onClick={handleRemoveCart}>Remove</button> */}
        </div>
      </div>
    </div>
  )
}
//