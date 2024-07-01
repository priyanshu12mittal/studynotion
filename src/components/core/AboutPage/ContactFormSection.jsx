import React from 'react'
import ContactForm from '../../common/ContactForm'

const ContactFormSection = () => {
  return (
    <div className=' flex flex-col items-center gap-4 pb-32'>
        <h2 className=' text-center text-4xl font-semibold leading-10'>
            Get in Touch
        </h2>
        <p className=' text-center font-inter text-base font-medium text-richblack-300'>
            We&apos; d love to here from you, Please fill out this form.
        </p>
        <ContactForm width={'max-w-[460px] min-w-[400px]'} />
    </div>
  )
}

export default ContactFormSection