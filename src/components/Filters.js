import React from 'react'
import { Button,Form } from 'react-bootstrap'
import { useState } from 'react'
import Rating from './Rating'

function Filters() {
    const[rate,setRate ]=useState(3)
  return <>
  <div className='filters'>
    <span className='title'>Filter products</span>
    <span>
    <Form.Check inline label="Ascending" name="group1" type="radio"id={"inline-1"}/>
    </span>
    <span>
        <Form.Check inline label="Ascending" name="group1" type="radio"id={"inline-1"}/>
        
    </span>
    <span>
        <Form.Check  inline label="Descending" name="group1" type="radio"id={"inline-2"} />
    </span>
    <span>
        <Form.Check inline label="Include Out Of Stock" name="group1" type="checkbox"id={"inline-3"}/>
    </span>
    <span>
        <Form.Check inline label="Fast Delivery Only" name="group1" type="checkbox"id={"inline-4"}/>
    </span>
    <span>
        <label style={{paddingRight:10}}>Rating</label>
        <Rating rating={rate} onClick={(i)=>setRate(i+1)} style={{cursor:"pointer"}}/>
    </span>
    <Button variant='light'>Clear Filters</Button>

  </div>
  </>
}

export default Filters
