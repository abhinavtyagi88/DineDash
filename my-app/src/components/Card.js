
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'
export default function Card(props) {
  const myButton = {
    background: "linear-gradient(90deg, rgba(68,167,53,1) 0%, rgba(134,247,118,1) 78%, rgba(33,160,14,1) 100%",
    color:'white'
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

      <div className="card mt-3" style={{ width: "14rem", maxHeight: "360px" }}>
        <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
        <div className="card-body" style={foodCardStyle}>
          <h5 className="card-title">{props.foodName}</h5>
          <div className=' w-100 p-0' style={{myButton }}>
            <select className="m-2 h-100 w-20 text-dark rounded" style={myButton } onClick={handleClick} onChange={handleQty}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>)
              })}
            </select>
            <select className="m-2 h-100 w-20 text-dark rounded" style={myButton } ref={priceRef} onClick={handleClick} onChange={handleOptions}>
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