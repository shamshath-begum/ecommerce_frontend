import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addCartItem } from '../redux/productSlice'

function Menu() {
    let dispatch=useDispatch()
    let {filterby}=useParams()
    let productData=useSelector((state)=>state.product.productList)
    console.log(productData)
    let productDisplay=productData.filter(e=>e._id===filterby)
    console.log(productDisplay[0].image)

    const handleAddCartProduct=()=>{
        dispatch(addCartItem(productDisplay[0]))
    }

  return <>
  
  <div>
    <div className='menu_image'>
        <div className=''>
            <img src={productDisplay[0].image} style={{width:250 ,padding:3,marginTop:20,marginLeft:20}}/>
        </div>
        <div style={{textAlign:"center"}}>
<p style={{fontSize:40,marginTop:20}}>{productDisplay[0].name}</p>
<p style={{fontSize:20}}>{productDisplay[0].category}</p>
<p>Rs.{productDisplay[0].price}</p>
<div>
<button style={{backgroundColor:"orange"}}>Buy</button>&nbsp;&nbsp;&nbsp;
<button style={{backgroundColor:"orange"}} onClick={handleAddCartProduct}>Add Cart</button>
<p style={{marginTop:20}}>{productDisplay[0].description}</p>
</div>
        </div>
    </div>
  </div>
  </>
}

export default Menu
