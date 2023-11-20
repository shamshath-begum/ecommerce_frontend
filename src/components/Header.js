import React from "react";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {logoutRedux} from '../redux/userSlice'
import { toast } from "react-toastify";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
const userData=useSelector((state)=>state)
console.log(userData.user.email)

const productCartItem=useSelector((state)=>state.product.cartItem)
console.log(productCartItem)

let handleClick = ()=>{

}

  const dispatch=useDispatch()
  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };

  const handleLogout=()=>{
    dispatch(logoutRedux())
    toast("Logout Successfully")
  }
  const cartItemNumber=useSelector((state)=>state.product.cartItem)

//   console.log(process.env.REACT_APP_ADMIN_EMAIL)
  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
        <Container>
          <Navbar.Brand>
            ECOM APP
          </Navbar.Brand>
          <Nav className="right">
            <Link to="/" className="home">Home</Link>
            <Link to='/menu/65578b9c1f25de835f2b8575'>Menu</Link>
            

            <Dropdown>
                <Dropdown.Toggle>Filter Product
                    <Dropdown.Menu>
                        <p onClick={handleClick}>Price</p>
                        <p>Category</p>
                    </Dropdown.Menu>
                </Dropdown.Toggle>
            </Dropdown>

            <Dropdown alignRight>
              <Dropdown.Toggle variant="primary">
                <Link to='/cart'><FaShoppingCart color="white" fontSize="25px" />
                <Badge variant="success">{cartItemNumber.length}</Badge></Link>
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ minWidth: 150 }}>
                <span style={{ padding: 10 }}>cart is empty!</span>
              </Dropdown.Menu>
            </Dropdown>
            
                
            
              <Dropdown alignRight onClick={handleShowMenu}>
                <Dropdown.Toggle>
                  <FaUserCircle size={30} />
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ minWidth: 150 }}>
                    <div className="profile">
                  <Link to="/login" className="login">Login</Link>
                  {
                    userData.user.email===process.env.REACT_APP_ADMIN_EMAIL &&  <Link to="newProduct" className="login">New Product</Link>
                  }
                   
                 
                  <p className="logout"onClick={handleLogout}>Logout&nbsp;{(userData.user.name)}</p>
                  </div>
                </Dropdown.Menu>
              </Dropdown>

          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
