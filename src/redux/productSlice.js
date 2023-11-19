import {createSlice} from '@reduxjs/toolkit'
import { toast } from "react-toastify";

const initialState={
    productList:[],
    cartItem:[]
};

export const productSlice=createSlice({
    name:"product",
    initialState,
    reducers:{
        setDataProduct:(state,action)=>{
            console.log(action.payload.data)
            state.productList=[...action.payload.data]
            console.log(state)
        },
        addCartItem:(state,action)=>{
console.log(action)
const check = state.cartItem.some((el) => el._id === action.payload._id);
      if (check) {
        toast.error("Already Item is in the Cart");
      } else {
        toast.success("Item Added successfully");
        const total = action.payload.price;
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: total },
        ];
      }
// const total=action.payload.price
// state.cartItem=[...state.cartItem,{...action.payload,qty:1,total:total}]
        },
        
        deleteCartItem:(state,action)=>{
            console.log(action.payload)
toast("one item deleted")
let index = state.cartItem.findIndex(
    (product) => product._id === action.payload
  );
  console.log(index);
  state.cartItem.splice(index, 1);
        },

        increaseQty(state, action) {
            let index = state.cartItem.findIndex(
              (product) => product._id === action.payload
            );
            let qty = state.cartItem[index].qty;
            let qtyInc = ++qty;
            state.cartItem[index].qty = qtyInc;
      
            let price = state.cartItem[index].price;
            let total = price * qtyInc;
      
            state.cartItem[index].total = total;
          },
          decreaseQty(state, action) {
            const index = state.cartItem.findIndex((el) => el._id === action.payload);
            console.log(index);
            let qty = state.cartItem[index].qty;
            if (qty > 1) {
              let qtyDec = --qty;
              state.cartItem[index].qty = qtyDec;
      
              let price = state.cartItem[index].price;
              let total = price * qtyDec;
      
              state.cartItem[index].total = total;
            }
          },
    }
})

export const {setDataProduct,addCartItem,deleteCartItem, decreaseQty,
    increaseQty,}=productSlice.actions

export default productSlice.reducer