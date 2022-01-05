import React from "react";
import {useNavigate} from "react-router-dom";
import { useFormik } from "formik";

const validate = (values) => {

    
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "First Name Required";
  }
  if (!values.lastName) {
    errors.lastName = "Last Name Required";
  }
  if (!values.email) {
    errors.email = "Email Required";
  } else if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
      values.email
    )
  ) {
    errors.email = "Invalid email format!";
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = "Phone Number Required";
  } else if (
    !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
      values.phoneNumber
    )
  ) {
    errors.phoneNumber = "Invalid Phone Number";
  }
  if (!values.jobtitle) {
    errors.jobtitle = "Job Title Required";
  }
  if (!values.companyName) {
    errors.companyName = "Company Name Required";
  }
  if (!values.comment) {
    errors.comment = "comment Required";
  }
  // console.log(errors);
  return errors;
};
const SignUpTemplate = () => {
    let navigate = useNavigate();
    const redirectToAdmin =()=>{
       navigate("/");
    }
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      jobtitle: "",
      companyName: "",
      comment: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      // console.log(`Form data`, values);
    },
  });
  console.log(formik.values);
  return (
    <div className="max-w-[999px] max-h-[632.01px]  overflow-hidden bg-[#FFFFFF] justify-center mr-[60px] ml-[20px] my-[10px] px-[20px] mt-[37px] pb-[20px] rounded-[31.529px]">
      <div className="flex flex-row justify-between content-center items-center px-[30px] ">
      <div className="flex flex-row items-center ">
      <div className="bg-[#F4F7FE] w-[68.28px] flex items-center justify-center h-[68.28px] mt-[31.93px]  rounded-full">
        <img
          src="/Group 8.png"
          alt="logo"
          width="42.79px"
          height="44px"
          className="content-center"
        />
      </div>
      <div className=" font-secondaryFont ml-[27.92px] mt-[31.51px] text-[#000000]  font-medium not-italic text-[28.09px] tracking-[-0.02em]">
        My Account
      </div>
    </div>
        <div className="flex flex-row justify-end shadow-[buttonshadow]  mr-[40px]  content-center mt-[42px]">
          <div className="mr-[45px] shadow-[buttonshadow] ">
            <button className="w-[120px] btnshadow  h-[25px] rounded text-sm font-secondaryFont text-[14px] text-center font-medium not-italic items-center  bg-[#FFFFFF] text-[#000000] ">
              Forgot Password
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="w-[110px] h-[25px] rounded btnshadow   text-sm font-secondaryFont text-[14px] font-medium not-italic  bg-[#F42424] text-[#000000] "
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="pl-[120px] pr-[96px] pt-[33.49px]">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-row space-x-40 pb-[16px]">
            <div className="relative w-[350px]">
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                placeholder="john@doe.com"
              />
              <label
                htmlFor="firstName"
                className=" after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
              >
                First Name
                {/* <span className="text-red-700">*</span> */}
              </label>
              {formik.errors.firstName && (
                <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                  {formik.errors.firstName}{" "}
                </div>
              )}
            </div>
            <div className="relative w-[350px]">
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                placeholder="john@doe.com"
              />
              <label
                htmlFor="lastName"
                className=" after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
              >
                Last Name
                {/* <span className="text-red-700">*</span> */}
              </label>
              {formik.errors.lastName && (
                <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                  {formik.errors.lastName}{" "}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row space-x-40 pb-[16px]">
            <div className="relative w-[350px]">
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                placeholder="john@doe.com"
              />
              <label
                htmlFor="phoneNumber"
                className=" after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
              >
                Phone Number
                {/* <span className="text-red-700">*</span> */}
              </label>
              {formik.errors.phoneNumber && (
                <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                  {formik.errors.phoneNumber}{" "}
                </div>
              )}
            </div>
            <div className=" relative w-[350px]">
              <input
                id="email"
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="peer h-10 w-full font-medium font-secondaryFont border-b border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                placeholder="Password"
              />
              <label
                htmlFor="email"
                className=" after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
              >
                Email
                {/* <span className="text-red-700">*</span> */}
              </label>
              {formik.errors.email && (
                <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                  {formik.errors.email}{" "}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row space-x-40 pb-[16px]">
            <div className="relative w-[350px]">
              <input
                id="jobtitle"
                name="jobtitle"
                type="text"
                value={formik.values.jobtitle}
                onChange={formik.handleChange}
                className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                placeholder="john@doe.com"
              />
              <label
                htmlFor="jobtitle"
                className=" after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
              >
                Job Title
                {/* <span className="text-red-700">*</span> */}
              </label>
              {formik.errors.jobtitle && (
                <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                  {formik.errors.jobtitle}{" "}
                </div>
              )}
            </div>
            <div className=" relative w-[350px]">
              <input
                id="companyName"
                type="text"
                name="companyName"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                placeholder="Password"
              />
              <label
                htmlFor="companyName"
                className=" after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
              >
                Company Name
                {/* <span className="text-red-700">*</span> */}
              </label>
              {formik.errors.companyName && (
                <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                  {formik.errors.companyName}{" "}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col ">
            <div className="relative max-w-[860px]">
              <input
                id="comment"
                name="comment"
                type="text"
                value={formik.values.comment}
                onChange={formik.handleChange}
                className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                placeholder="john@doe.com"
              />
              <label
                htmlFor="comment"
                className=" after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
              >
                Comment
                {/* <span className="text-red-700">*</span> */}
              </label>
              {formik.errors.comment && (
                <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                  {formik.errors.comment}{" "}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-end shadow-[buttonshadow] mr-[-30px] content-center mt-[42px]">
            <div className="mr-[45px] shadow-[buttonshadow] ">
              <button className="w-[100px] btnshadow  h-[25px] rounded text-sm font-secondaryFont text-[14px] text-center font-medium not-italic items-center  bg-[#FFFFFF] text-[#000000] "
              onClick={()=>{redirectToAdmin()}}
              >
                Cancel
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="w-[110px] h-[25px] rounded btnshadow   text-sm font-secondaryFont text-[14px] font-medium not-italic  bg-[#0FCC7C] text-[#000000] "
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpTemplate;
