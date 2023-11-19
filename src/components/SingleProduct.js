import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import { useDispatch } from 'react-redux'
import { addCartItem } from '../redux/productSlice'

function SingleProduct({image,name,price,availability,category,rating,id}) {

    const dispatch=useDispatch()
const handleAddCartProduct=()=>{
    dispatch(addCartItem({
        _id:id,
    name:name,
    price:price,
    category:category,
    image:image
    }))
}

  return<>
  
<div >
    {
        image ? ( <Card>
           <Link to={`menu/${id}`}><Card.Img variant='top'src={image} alt={name}/></Link> 
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle style={{paddingBottom:10}}>
                <span>Rs.{price.split(".")[0]}</span>
                <Rating rating={rating}/>
                <span>{category}</span>
                </Card.Subtitle>
                <Button variant='danger'>Remove from Cart</Button>
                <Button disabled={availability==0} onClick={handleAddCartProduct}>
                    {availability==0?"Out Of Stack" : "Add to cart"}
                    </Button>
            </Card.Body>
        </Card>):""
    }
   
</div>

  </>
}

export default SingleProduct
