
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'
export default function Card(props) {
  const myButton = {
    backgroundImage: 'linear-gradient(to right top, #093028, #237A57)',
    color:'white'
  };
  let data = useCart();

  let navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const priceRef = useRef();
  // const [btnEnable, setBtnEnable] = useState(false);
  // let totval = 0
  // let price = Object.values(options).map((value) => {
  //   return parseInt(value, 10);
  // });
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
    

    // setBtnEnable(true)

  }

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  // useEffect(()=>{
  // checkBtn();
  //   },[data])

  let finalPrice = qty * parseInt(option[size]);   //This is where Price is changing
  // totval += finalPrice;
  // console.log(totval)
  return (
    <div>

      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
        <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          {/* <p className="card-text">This is some random text. This is description.</p> */}
          <div className=' w-100 p-0' style={{ height: "38px" }}>
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
            <div className=' d-inline ms-2 h-100 fs-5' style={{color:"tomato", }} >
              ₹{finalPrice}/-
            </div>
          </div>
          <hr></hr>
          <button className={`btn justify-center ms-2 `} style={myButton} onClick={handleAddToCart}>Add to Cart</button>
          {/* <button className={`btn btn-danger justify-center ms-2 ${btnEnable ? "" : "disabled"}`} onClick={handleRemoveCart}>Remove</button> */}
        </div>
      </div>
    </div>
  )
}
//