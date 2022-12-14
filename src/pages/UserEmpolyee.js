import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const validate = (values) => {
    const errors = {};
    if (!values.company_name) {
        errors.company_name = "First Name Required";
    }
    if (!values.location) {
        errors.location = "Last Name Required";
    }
    if (!values.address) {
        errors.address = "address Required";
    } else if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
            values.address
        )
    ) {
        errors.address = "Invalid address format!";
    }
    if (!values.hrms) {
        errors.hrms = "Phone Number Required";
    } else if (
        !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
            values.hrms
        )
    ) {
        errors.hrms = "Invalid Phone Number";
    }
    // if (!values.spread_sheet_id_1) {
    //     errors.spread_sheet_id_1 = "Job Title Required";
    // }
    // if (!values.spread_sheet) {
    //     errors.spread_sheet = "Company Name Required";
    // }
    // if (!values.Comments) {
    //     errors.Comments = "comment Required";
    // }
    return errors;
};

const UserEmpolyee = () => {
    const { addToast } = useToasts();
    let navigate = useNavigate();
    const Login = () => {
        navigate('/');
    };

    const formik = useFormik({
        initialValues: {
            company_name: "",
            location: "",
            address: "",
            hrms: "",
            spread_sheet: "",
            Comments: "",
            spread_sheet_id_1: "",
            spread_sheet_id_2: "",
            spread_sheet_id_3: "",
            spread_sheet_id_4: "",
            spread_sheet_id_5: ""
        },
        validate,
        onSubmit: (values, { resetForm }) => {
            // axios.post(`${process.env.REACT_APP_BASE_URL}/api/users/register/`, values)
            //     .then((response) => {
            //         if (response.status === 201) {
            //             addToast("form submitted Sucessfully", {
            //                 appearance: "success",
            //                 autoDismiss: true,
            //             })
            //             navigate('/')
            //         }
            //         resetForm()
            //     })
            //     .catch((error) => {
            //         addToast("form submitted fail", {
            //             appearance: "error",
            //             autoDismiss: true,
            //         })
            //     })
        },
    });

    return (
        <div className="flex flex-col  justify-center overflow-hidden w-[100%]  h-[100%]">
            <div className="flex flex-row  place-items-start">
                <img
                    src="/logo1.svg"
                    alt="logo"
                    className="ml-[4.313rem] mt-[48px]  w-[150px] h-[50px]  right-[765px]"
                />
            </div>
            <div className="max-w-[1099px] max-h-[632.01px]  bg-[#FFFFFF] justify-center  ml-[171px] mr-[170px] mt-[19px] mb-[110.99px] pb-[20px] rounded-[31.529px]">
                <div className="flex flex-row items-center ">
                    {/* <div className="bg-[#F4F7FE] w-[68.28px] flex items-center justify-center h-[68.28px] mt-[31.93px] ml-[26.8px] rounded-full">
            <img
              src="/Group8.png"
              alt="logo"
              width="42.79px"
              height="44px"
              className="content-center"
            />
          </div> */}
                    <div className=" font-secondaryFont ml-[27.92px] mt-[31.51px] text-[#000000]  font-medium not-italic text-[28.09px] tracking-[-0.02em]">
                        User
                    </div>
                </div>
                <div className="pl-[120px] pr-[96px] pt-[33.49px]">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-row space-x-40 pb-[36px]">
                            <div className="relative w-[350px]">
                                <input
                                    id="company_name"
                                    name="company_name"
                                    type="text"
                                    value={formik.values.company_name}
                                    onChange={formik.handleChange}
                                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                                    placeholder="john@doe.com"
                                />
                                <label
                                    htmlFor="company_name"
                                    className=" after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                >
                                    Phone Number(Personal)
                                    {/* <span className="text-red-700">*</span> */}
                                </label>
                                {/* {formik.errors.company_name && (
                                    <div className="text-red-700 text-xs font-secondaryFont mt-[2px]">
                                        {formik.errors.company_name}{" "}
                                    </div>
                                )} */}
                            </div>
                            <div className="relative w-[350px]">
                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    value={formik.values.location}
                                    onChange={formik.handleChange}
                                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                                    placeholder="john@doe.com"
                                />
                                <label
                                    htmlFor="location"
                                    className=" after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                >
                                    Profile Photo
                                    {/* <span className="text-red-700">*</span> */}
                                </label>
                                {/* {formik.errors.location && (
                                    <div className="text-red-700 text-xs font-secondaryFont mt-[2px]">
                                        {formik.errors.location}{" "}
                                    </div>
                                )} */}
                            </div>
                        </div>
                        <div className="flex flex-row space-x-40 pb-[36px]">
                            <div className=" relative w-[350px]">
                                <input
                                    id="address"
                                    type="text"
                                    name="address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    className="peer h-10 w-full font-medium font-secondaryFont border-b border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                                    placeholder="Password"
                                />
                                <label
                                    htmlFor="address"
                                    className=" after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                >
                                    Address
                                    {/* <span className="text-red-700">*</span> */}
                                </label>
                                {/* {formik.errors.address && (
                                    <div className="text-red-700 text-xs font-secondaryFont mt-[2px]">
                                        {formik.errors.address}{" "}
                                    </div>
                                )} */}
                            </div>
                            <div className="relative w-[350px]">
                                <input
                                    id="hrms"
                                    name="hrms"
                                    type="text"
                                    value={formik.values.hrms}
                                    onChange={formik.handleChange}
                                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                                    placeholder="john@doe.com"
                                />
                                <label
                                    htmlFor="hrms"
                                    className=" after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                >
                                    Blood Group

                                    {/* <span className="text-red-700">*</span> */}
                                </label>
                                {/* {formik.errors.hrms && (
                                    <div className="text-red-700 text-xs font-secondaryFont mt-[2px]">
                                        {formik.errors.hrms}{" "}
                                    </div>
                                )} */}
                            </div>
                        </div>
                        <div className="flex flex-row space-x-40 pb-[36px]">
                            <div className=" relative w-[350px]">
                                <input
                                    id="spread_sheet"
                                    type="text"
                                    name="spread_sheet"
                                    value={formik.values.spread_sheet}
                                    onChange={formik.handleChange}
                                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                                    placeholder="Password"
                                />
                                <label
                                    htmlFor="spread_sheet"
                                    className=" after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                >
                                    District

                                    {/* <span className="text-red-700">*</span> */}
                                </label>
                                {/* {formik.errors.spread_sheet && (
                                    <div className="text-red-700 text-xs font-secondaryFont mt-[2px]">
                                        {formik.errors.spread_sheet}{" "}
                                    </div>
                                )} */}
                            </div>
                            <div className="relative w-[350px]">
                                <input
                                    id="spread_sheet_id_1"
                                    name="spread_sheet_id_1"
                                    type="text"
                                    value={formik.values.spread_sheet_id_1}
                                    onChange={formik.handleChange}
                                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                                    placeholder="john@doe.com"
                                />
                                <label
                                    htmlFor="spread_sheet_id_1"
                                    className="   after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                >
                                    Place
                                    {/* <span className="text-red-700">*</span> */}
                                </label>
                                {/* {formik.errors.spread_sheet_id_1 && (
                                    <div className="text-red-700 text-xs font-secondaryFont mt-[2px]">
                                        {formik.errors.spread_sheet_id_1}{" "}
                                    </div>
                                )} */}
                            </div>

                        </div>
                        <div className="flex flex-row space-x-40 pb-[36px]">
                            <div className="relative w-[350px]">
                                <input
                                    id="spread_sheet_id_2"
                                    name="spread_sheet_id_2"
                                    type="text"
                                    value={formik.values.spread_sheet_id_2}
                                    onChange={formik.handleChange}
                                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                                    placeholder="john@doe.com"
                                />
                                <label
                                    htmlFor="spread_sheet_id_2"
                                    className="   after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                >
                                    Emergency Contact
                                    {/* <span className="text-red-700">*</span> */}
                                </label>
                                {/* {formik.errors.Jobtitle && (
                                    <div className="text-red-700 text-xs font-secondaryFont mt-[2px]">
                                        {formik.errors.Jobtitle}{" "}
                                    </div>
                                )} */}
                            </div>
                        </div> 
                        <div className="flex flex-row justify-end shadow-[buttonshadow]  content-center pb-[38px] mt-[53px] mr-[-60px]">
                            <div className="mr-[45px] shadow-[buttonshadow] ">
                                <button onClick={() => Login()} className="w-[100px] btnshadow  h-[25px] rounded text-sm font-secondaryFont text-[14px] text-center font-medium not-italic items-center  bg-[#F42424] text-[#000000] ">
                                    Cancel
                                </button>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-[110px] h-[25px] rounded btnshadow   text-sm font-secondaryFont text-[14px] font-medium not-italic  bg-[#0FCC7C] text-[#000000] "
                                >
                                    Skip
                                </button>
                            </div>
                        </div> 
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserEmpolyee;
