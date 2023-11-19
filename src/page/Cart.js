import React from 'react'
import { useSelector } from 'react-redux'
import CartProduct from '../components/CartProduct'

function Cart() {
    const productCartItem=useSelector((state)=>state.product.cartItem)
    console.log(productCartItem)

    const totalPrice=productCartItem.reduce((acc,curr)=>acc+parseInt(curr.total),0)
    const totalqty=productCartItem.reduce((acc,curr)=>acc+parseInt(curr.qty),0)
  return <>
<div>
    <h2 style={{textAlign:"center"}}>Your Cart Items</h2>
    {productCartItem[0] ?
    (<div>
        {/* display cart ?Item */}
        <div>
            {
               productCartItem.map(e=>{
                return <CartProduct
                key={e._id}
                id={e._id}
                name={e.name}
                image={e.image}
                category={e.category}
                price={e.price}
                qty={e.qty}
                total={e.total}
                />
               }) 
            }
        </div>
        {/* total cart item */}
        <div style={{textAlign:"center"}}>
          <h2>Summary</h2>
          <div>Total Qty:{totalqty}</div>
          <div>Total Price:{totalPrice}</div>
        </div>
    </div>):"cart is empty"
}
</div>
  </>
}

export default Cart
