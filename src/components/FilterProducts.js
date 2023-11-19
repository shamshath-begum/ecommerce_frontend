import React from 'react'
import { CiForkAndKnife } from "react-icons/ci";

function FilterProducts({category,onClick}) {
  return <>
  <div className='filterProducts' onClick={onClick}>
  <CiForkAndKnife />
  </div>
  <p className='category'>{category}</p>
  </>
}

export default FilterProducts
