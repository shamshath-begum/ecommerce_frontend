import { createSlice } from '@reduxjs/toolkit'

const initialState={
    email: "",
    name: "",
    _id: "",
    role:"",
}
export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        loginRedux:(state,action)=>{
            console.log(action.payload.user)
            // state.user=action.payload.user
            state._id = action.payload.user._id;
      state.name = action.payload.user.name;
      state.email = action.payload.user.email;
      state.role = action.payload.user.role;
        },
        logoutRedux:(state,action)=>{
            state._id="";
            state.name="";
            state.email="";
            
        }
    }
})

export const {loginRedux,logoutRedux} =userSlice.actions
export default userSlice.reducer