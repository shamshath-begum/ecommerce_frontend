
import './App.css';
import Header from './components/Header';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './page/Home';
import SignUp from './page/SignUp';
import Login from './page/Login';
import NewProduct from './page/NewProduct';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setDataProduct } from './redux/productSlice';
import Menu from './page/Menu';
import Cart from './page/Cart';

export const url="https://ecommerce-backend-c70h.onrender.com"
// export const url="http://localhost:8000";


function App() {

  const dispatch=useDispatch()
  let productData=useSelector((state)=>state.product)
  
  useEffect(()=>{
(async()=>{
  let res=await fetch(`${url}/product`)
  let resData=await res.json()
  console.log(resData)
  dispatch(setDataProduct(resData))
})()
  },[])
  return (
   <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/newProduct' element={<NewProduct/>}/>
      <Route path='/menu/:filterby'element={<Menu/>}/>
      <Route path='/cart'element={<Cart/>}/>
      
    </Routes>
    </BrowserRouter>
     
  
  );
}

export default App;
