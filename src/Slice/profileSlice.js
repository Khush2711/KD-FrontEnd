import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name:"Profile",
    initialState: { user : null},
    setUser : (state,value) => {
        state.user = value.payload
    }
})

export const {setUser} = profileSlice.actions;
export default profileSlice.reducer;