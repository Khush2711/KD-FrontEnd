import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import countrycode from "../../data/countrycode.json";

function ContactForm() {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm({
        defaultValues: {
            countryCode: "+91"
        }
    });

    const submitContactForm = async (data) => {
        console.log(data);
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                firstName: "",
                lastName: "",
                email: "",
                message: "",
                countryCode: "+91",
                contactNumber: ""
            })
        }
    }, [reset, isSubmitSuccessful]);

    return (
        <div className="mt-12 mx-auto">
            <form className="flex flex-col gap-7" onSubmit={handleSubmit(submitContactForm)}>

                <div className="flex gap-5 below-md:flex-col">
                    {/* First Name */}
                    <div className="flex flex-col gap-2 md:w-[48%] below-md:flex-col">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="Enter Your First Name"
                            className="focus:outline-none custom-box-shadow w-full bg-richblack-700 px-2 py-3 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100 leading-6"
                            {...register("firstName", { required: "Please Enter Your First Name" })}
                        />
                        {errors.firstName && <span className="-mt-1 text-[12px] text-yellow-100">{errors.firstName.message}</span>}
                    </div>
                    {/* Last Name */}
                    <div className="flex flex-col gap-2 md:w-[48%] below-md:flex-col">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Enter Your Last Name"
                            className="focus:outline-none custom-box-shadow w-full bg-richblack-700 px-2 py-3 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100"
                            {...register("lastName", { required: "Please Enter Your Last Name" })}
                        />
                        {errors.lastName && <span className="-mt-1 text-[12px] text-yellow-100">{errors.lastName.message}</span>}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter Your Email Address"
                        className="focus:outline-none custom-box-shadow w-full bg-richblack-700 px-2 py-3 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100 leading-6"
                        {...register("email", { required: "Please Enter Email Address" })}
                    />
                    {errors.email && <span className="-mt-1 text-[12px] text-yellow-100">{errors.email.message}</span>}
                </div>

                <div className="flex flex-col gap-5">
                    <label htmlFor="phoneNumber" className="-mb-4">Phone Number</label>
                    <div className="flex gap-4">
                        {/* Country Code */}
                        <div className="flex gap-2">
                            <select
                                {...register("countryCode", { required: "Please Select Country Code" })}
                                className="focus:outline-none custom-box-shadow w-[4.7rem] bg-richblack-700 px-2 py-3 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100"
                                defaultValue="+91"
                            >
                                {countrycode.map((element, index) => (
                                    <option value={element.code} key={index}>
                                        {element.code + " - " + element.country}
                                    </option>
                                ))}
                            </select>
                            {errors.countryCode && <span className="-mt-1 text-[12px] text-yellow-100">{errors.countryCode.message}</span>}
                        </div>
                        {/* Contact Number */}
                        <div className="flex gap-2 w-full">
                            <input
                                type="tel"
                                name="contactNumber"
                                id="phoneNumber"
                                placeholder="Enter Your Contact Number"
                                className="focus:outline-none custom-box-shadow w-full bg-richblack-700 px-2 py-3 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100"
                                {...register("contactNumber", {
                                    required: "Please Enter Your Phone Number",
                                    minLength: {
                                        value: 8,
                                        message: "Enter a Valid Phone Number (min 8 digits)"
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: "Enter a Valid Phone Number (max 10 digits)"
                                    },
                                })}
                            />
                            
                        </div>
                    </div>
                </div>
                    {errors.contactNumber && <span className="-mt-5 text-[12px] text-yellow-100">{errors.contactNumber.message}</span>}

                <div className="flex flex-col gap-2">
                    <label htmlFor="message">Message</label>
                    <textarea
                        name="message"
                        id="message"
                        placeholder="Enter Your message Here"
                        cols={30}
                        rows={7}
                        className="focus:outline-none custom-box-shadow w-full bg-richblack-700 px-2 py-3 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100 leading-6"
                        {...register("message", { required: "Please Enter Your Message" })}
                    />
                    {errors.message && <span className="-mt-1 text-[12px] text-yellow-100">{errors.message.message}</span>}
                </div>

                <button className="py-2 rounded-lg font-inter font-bold w-full bg-yellow-50 text-black" type="submit">
                    Send Message
                </button>
            </form>
        </div>
    );
}

export default ContactForm;
