import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import  { ImagetoBase64 } from '../utility/imageToBase64'
import { useState } from "react";
import { url } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

function NewProducts() {
  let token = sessionStorage.getItem("token");
  console.log(token)

  const [data,setData] = useState({
    name : "",
    category : "",
    image : "",
    price : "",
    description : "",
    availability:"",
    rating:"",
    
  })

  const handleOnChange = (e)=>{
    const {name,value} = e.target

    setData((preve)=>{
        return{
          ...preve,
          [name] : value
        }
    })

  }

  const uploadImage=async(e)=>{
const data=await ImagetoBase64(e.target.files[0])
console.log(data)

setData((preve)=>{
  return{
    ...preve,
    image : data
  }
})
  }

// const handleSubmit=async(e)=>{
// e.preventDefault()
// console.log(data)
// const {name,image,category,price,availability,rating,description} = data

//     if(name && image && category && price && availability && rating && description){
//       const fetchData = await fetch(`${url}/uploadProduct`,{
//         method : "POST",
//         headers : {
//           "content-type" : "application/json"
//         },
//         body : JSON.stringify(data)
//       })
  
//       const fetchRes =  await fetchData.json()
  
//       console.log(fetchRes)
//       toast.success("Product Added Successfully")

//     }
// // let res = await axios.post(`${url}/uploadProduct`, {
 
// //  data
  
// // });
// // console.log(res);
// }

const handleSubmit = async(e)=>{
  e.preventDefault()
  console.log(data)

  const {name,image,category,price,description,availability,rating} = data

  if(name && image && category && price && description && availability && rating){
    const fetchData = await fetch(`${url}/uploadProduct`,{
      method : "POST",
      headers : {
        authorization: `Bearer ${token}`,
        "content-type" : "application/json"
      },
      body : JSON.stringify(data)
    })

    const fetchRes =  await fetchData.json()

    console.log(fetchRes)
    toast.success("Product Added Successfully")

    setData(()=>{
      return{
        name : "",
        category : "",
        image : "",
        price : "",
        description : "",
        availability:"",
        rating:""
      }
    })
  }
  else{
    toast("Enter required Fields")
  }
  }

  return (
    <>
      <div className="product">
        <form onSubmit={handleSubmit}>
          <div>
            <label for="exampleFormControlInput1" class="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              class="form-control"
              id="exampleFormControlInput1"
              value={data.name}
              onChange={handleOnChange}
            />
          </div>
          <label for="exampleFormControlInput1" class="form-label">
            Category
          </label>
          <div class="input-group mb-3">
            <select class="form-select" id="inputGroupSelect01" name="category" onChange={handleOnChange} value={data.category}>
              <option selected>Select</option>
              <option value="fruits">Fruits</option>
              <option value="vegetables">vegetables</option>
              <option value="icecream">Ice Cream</option>
              <option value="dosa">Dosa</option>
              <option value="piza">Piza</option>
              <option value="rice">Rice</option>
              <option value="cake">cake</option>
              <option value="Sandwich">Sandwich</option>
              <option value="chicken">Chicken</option>
            </select>
          </div>

          <div>
            <label for="exampleFormControlInput1" class="form-label">
              Image
            
            <div className="image">
              {
                data.image ?  <img src={data.image} style={{width:"30px"}}/> :<IoCloudUploadOutline size={30} />
              }
              
             
              <input type={"file" }accept="image/*" id="image"onChange={uploadImage}  style={{ width:"440px"  }} />
              {/* <img src={data.image}/> */}
            </div>
            </label>
            
          </div>
          <div>
            <label for="exampleFormControlInput1" class="form-label">
              Price
            </label>
            <input
              type="number"
              class="form-control"
              name="price"
              id="exampleFormControlInput1"
              value={data.price}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label for="exampleFormControlInput1" class="form-label">
              Availability
            </label>
            <input
              type="text"
              class="form-control"
              name="availability"
              id="exampleFormControlInput1"
              value={data.availability}
              onChange={handleOnChange}
            />
          </div>
          <div>
          <label for="exampleFormControlInput1" class="form-label">
              Rating
            </label>
            <input
              type="number"
              class="form-control"
              name="rating"
              id="exampleFormControlInput1"
              value={data.rating}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label for="exampleFormControlInput1" class="form-label">
              Description
            </label>
            <div class="form-floating">
              <textarea
                class="form-control"
                placeholder="Leave a comment here"
                id="floatingTextarea"
                name="description"
                value={data.description}
                onChange={handleOnChange}
              ></textarea>
            </div>
          </div>

          <button className="button">Save</button>
        </form>
      </div>
    </>
  );
}

export default NewProducts;
