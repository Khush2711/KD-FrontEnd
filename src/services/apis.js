const BASE_URL = process.env.REACT_APP_BASE_URL;


export const categories = {
    CATEGORIES_API: BASE_URL + "/courseRoutes/showAllCategories",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
    RESETPASSWORDTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORDTOKEN_API: BASE_URL + "/auth/reset-password-token",
    SIGNUP_API : BASE_URL + "/auth/signup",
    SIGNUP_OTP_SENDER : BASE_URL + "/auth/sendotp" 
}   