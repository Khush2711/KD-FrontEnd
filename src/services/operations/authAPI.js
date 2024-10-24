import toast from "react-hot-toast";
import { setLoading, setEmailSent } from "../../Slice/authSlice";
import { apiConnector } from "../apiconnector";
import { categories } from "../apis";

export function getPasswordResetToken(email) {
    return async (dispatch) => {
        dispatch(setLoading(true));  // Start loading

        try {
            const response = await apiConnector("POST", categories.RESETPASSWORDTOKEN_API, { email });
            // console.log("Reset Password Response......", response);

            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }

            toast.success("Reset Email Sent");
            dispatch(setEmailSent(true));
        } catch (error) {
            toast.error(error.response?.data?.message || "Error occurred while sending the password reset email.");
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export function resetPassword(password, confirmPassword, token) {
    return async (dispatch) => {
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", categories.RESETPASSWORD_API, { password, confirmPassword, token });
            // console.log("Reset Password Response......", response);

            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }

            toast.success("Password Update Successfully....");
            dispatch(setEmailSent(true));
        } catch (error) {
            toast.error(error.response?.data?.message || "Error occurred while updating password.");
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
    };
}


export function Signup(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", categories.SIGNUP_API, { accountType, firstName, lastName, email, password, confirmPassword, otp });


            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }

            toast.success("Signup Successfully....");
            dispatch(setEmailSent(true));
        } catch (error) {
            toast.error(error.response?.data?.message || "Error occurred while Signup.");
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export function sendOTP(email) {
    return async (dispatch) => {
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", categories.SIGNUP_OTP_SENDER, { email });

            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }

            toast.success("OTP sent Successfully....");
            dispatch(setEmailSent(true));
            return Promise.resolve(); // Resolving promise to handle in SignupForm
        } catch (error) {
            toast.error(error.response?.data?.message || "Error occurred while sending OTP.");
            return Promise.reject(error); // Rejecting promise to handle error in SignupForm
        } finally {
            dispatch(setLoading(false));
        }
    };
}

