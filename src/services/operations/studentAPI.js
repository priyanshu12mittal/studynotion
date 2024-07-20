import toast from "react-hot-toast";
import { studentEndpoints } from "../api";
import { apiConnector } from '../apiConnector';
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const { COURSE_PAYMENT_API, COURSE_VERIFY_PAYMENT_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;



export async function buyCourse(token, courseIds, user, dispatch, navigate) {
    const toastId = toast.loading("Loading...");
    try {

        //initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, { courseIds }, {
            Authorization: `Bearer ${token}`
        });

        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }
        console.log("orderResponse",orderResponse)

        //send successful wala mail
        sendPaymentSuccessEmail(orderResponse.data.message.amount, token);

        //   verifyPayment
        verifyPayment(courseIds, token, navigate, dispatch);


    } catch (error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment")
    }
    toast.dismiss(toastId)
}

async function sendPaymentSuccessEmail(amount, token) {
    try {

        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: 1,
            paymentId: 1,
            amount,
        }, {
            Authorization: `Bearer ${token}`
        })

    } catch (error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);

    }
}



//verify payment
async function verifyPayment(courseIds, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try {
        const response = await apiConnector("POST", COURSE_VERIFY_PAYMENT_API, { courseIds }, {
            Authorization: `Bearer ${token}`,
        })

        if (!response.data.success) {
            console.log("Print Pay Result....", response);
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, you are addded to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }
    catch (error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}