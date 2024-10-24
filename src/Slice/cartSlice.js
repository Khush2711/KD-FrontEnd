import { createSlice } from "@reduxjs/toolkit";

const init = {
    totalItem: localStorage.getItem("totalItem") ? JSON.parse(localStorage.getItem("totalItem")) : 0
}

const cart = createSlice({
    name: "Cart",
    initialState: init,
    reducers: {
        setTotalItem: (state, value) => {
            state.totalItem = value.payload
        }
    }
})

export const { setTotalItem } = cart.actions;
export default cart.reducer;