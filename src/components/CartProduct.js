import React from "react";
import { AiTwotoneDelete } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem,increaseQty,decreaseQty } from "../redux/productSlice";

function CartProduct({ id, name, image, category, qty, price, total }) {
  const dispatch=useDispatch()
  return (
    <>
      <div className="menu_image">
        <div>
          <img
            src={image}
            style={{ width: 250, padding: 3, marginTop: 20, marginLeft: 20 }}
          />
        </div>
        <div style={{ textAlign: "center", marginLeft: 100 }}>
          <p style={{ fontSize: 40, marginTop: 20 }}>{name}</p>
          <p style={{ fontSize: 20 }}>{category}</p>
          <p>Rs.{price}</p>
          <div style={{display:"flex", gap:50}}>
          <div>
            <button style={{ backgroundColor: "orange" }} onClick={()=>dispatch(increaseQty(id))}>+</button>
            &nbsp;&nbsp;&nbsp;
            <span>{qty}</span>
            <button style={{ backgroundColor: "orange", marginLeft: 20 }} onClick={()=>dispatch(decreaseQty(id))}>
              -
            </button>
          </div>
          <div>
            <span>Total :</span>
            <span>Rs.{total}</span>
          </div>
          <div onClick={()=>dispatch(deleteCartItem(id))}><AiTwotoneDelete /></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartProduct;
