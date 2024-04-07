import {createSlice} from "@reduxjs/toolkit"

const userInitState={
    user:0
}
const userSlice = createSlice({
    name:"user",
    initialState:userInitState,
    reducers:{
        updateUser:(state, action)=> {
            state.user = action.payload.getAll
        }
    }
})