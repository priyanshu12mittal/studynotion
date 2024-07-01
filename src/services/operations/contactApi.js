import React from 'react'
import toast from 'react-hot-toast'
import {apiConnector} from '../apiConnector'
import {contactUsEndpoints} from '../api'

const contactMailSender = async(data, setLoading) => {
    const toastId = toast.loading("Loading...")
    setLoading(true)
    try{
        const response = await apiConnector("POST",
            contactUsEndpoints.CONTACT_US_API,data
        )

        if (response.data.success){
            toast.success(
                "Thanks for reaching out to us , we'll get back to you soon "
            )
        }
        else{
            toast.error("Please try again")
        }
    }
    catch(err){
        toast.error("Error in sending message")
    }
    setLoading(false)
    toast.dismiss(toastId)
}

export default contactMailSender