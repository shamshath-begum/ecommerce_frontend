import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleProduct from "../components/SingleProduct";
import Filters from "../components/Filters";
import FilterProducts from "../components/FilterProducts";
import { Button, Card } from "react-bootstrap";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import { addCartItem } from "../redux/productSlice";

function Home() {
    let dispatch=useDispatch()
  const productData = useSelector((state) => state.product.productList);
  console.log(productData);

  

  let categoryList = [...new Set(productData.map((e1) => e1.category))];
  console.log(categoryList);

  //display filter data
  const [filterBy, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);
  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    const filter = productData.filter(
      (e) => e.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };

  
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Your products</h1>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        {categoryList[0] &&
          categoryList.map((e) => {
            return (
              <FilterProducts
                category={e}
                onClick={() => handleFilterProduct(e)}
              />
            );
          })}
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 45,
          gap: "10px",
        }}
      >
        {dataFilter.map((e) => {
          return (
            
            <div className="products" >
                
              {<SingleProduct
              key={e._id+"vegetable"}
              id={e._id}
              name={e.name}
              category={e.category}
              price={e.price}
              image={e.image}
              />
                // <Card>
                //   <Link to={`menu/${e._id}`}><Card.Img variant="top" src={e.image} alt={e.name} /></Link>
                //   <Card.Body>
                //     <Card.Title>{e.name}</Card.Title>
                //     <Card.Subtitle style={{ paddingBottom: 10 }}>
                //       <span>Rs.{e.price.split(".")[0]}</span>
                //       <Rating rating={e.rating} />
                //       <span>{e.category}</span>
                //     </Card.Subtitle>
                //     <Button variant="danger">Remove from Cart</Button>
                //     <Button disabled={e.availability == 0} onClick={handleAddCartProduct(e._id)}>
                //       {e.availability == 0 ? "Out Of Stack" : "Add to cart"}
                //     </Button>
                //   </Card.Body>
                // </Card>
              }
              
            </div>
          );
        })}
      </div>

      {/* <div className='homepage'>

    <Filters/>
    <div className='productContainer'>
        {
     productData.map((product)=>{
        return <SingleProduct product={product} key={product.id}/>
     })       
        }
    </div> */}

      {/* </div> */}
    </>
  );
}

export default Home;
