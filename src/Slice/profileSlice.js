import { createSlice } from "@reduxjs/toolkit";
import { decryptData } from "../utils/encryptionUtils";

const initialState = {
    signupData: null,
    loading: false,
    user: null
};

const profileSlice = createSlice({
    name: "Profile",
    initialState: initialState,

    reducers: {
        setSignupData(state, value) {
            state.signupData = value.payload
        },
        setLoading(state, value) {
            state.loading = value.payload
        },
        setUser: (state, value) => {
            state.user = value.payload
        }
    }
})

export const { setSignupData, setLoading, setUser } = profileSlice.actions;
export default profileSlice.reducer;

export const initializeUser = () => (dispatch) => {
    const encryptedData = localStorage.getItem("userData");
    if (encryptedData) {
      try {
        const decryptedData = decryptData(encryptedData);
  
        // Validate the expiry time
        const currentTime = new Date().getTime();
        if (decryptedData.expiryTime && decryptedData.expiryTime > currentTime) {
          dispatch(setUser(decryptedData)); // Set decrypted user data in Redux
        } else {
          console.warn("User data has expired.");
          localStorage.removeItem("userData"); // Remove expired data
        }
      } catch (error) {
        console.error("Failed to decrypt user data:", error);
        localStorage.removeItem("userData"); // Remove corrupted data
      }
    }
  };
  