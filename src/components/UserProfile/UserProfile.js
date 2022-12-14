import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import SideBar from "../layout/SideBar";
import Header from "../layout/Header";
import { reactLocalStorage } from "reactjs-localstorage";
import { getOrganizationByUserId, getUserById } from "../../AllApi/Api";
import axios from "axios";
import { useToasts } from "react-toast-notifications";

const initialValue = {
  first_name: "",
  last_name: "",
  phone_number: "",
  email: "",
  job_title: "",
  location: "",
  comment: "",
  address: "",
  blood_group: "",
  district: "",
  hrms: "",
  companyName: "",
  spreadsheetURL: "",
  spreadsheetID1: "",
  spreadsheetID2: "",
  spreadsheetID3: "",
  spreadsheetID4: "",
  companyLogoURL: "",
};

const UserProfile = () => {
  let urlTitle = useLocation();
  const [title, setTitle] = useState(null);
  const [userId, setUserId] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [initialFormValues, setInitialFormValues] = useState();
  const [formikUser, setFormikUser] = useState();
  const [formikOrganization, setFormikOrganization] = useState();
  const [errorData, setErrorData] = useState();
  const { addToast } = useToasts();

  useEffect(() => {
    if (urlTitle.pathname === "/userProfile") {
      setTitle("Profile");
    }
  }, [urlTitle.pathname]);

  const formik = useFormik({
    initialValues: initialValue,
    // validate,
    onSubmit: async (values) => {
      const token = reactLocalStorage.get("access_token", false);
      let error = validate(values)
      if(Object.keys(error).length !== 0){
        console.log("error--is");
      }else{
        let user_payload = {
          FirstName: values?.first_name,
          LastName: values?.last_name,
          PhoneNumber: values?.phone_number,
          Email: values?.email,
          job_title: values?.job_title,
          location: values?.location,
          Comments: values?.comment,
          address: values?.address,
          blood_group: values?.blood_group,
          district: values?.district
        }
        let userUp = await UpdateUser(user_payload, token)
        let org_payload = {
          hrms_api_url: values?.hrms,
          name: values?.companyName,
          spread_sheet_url: values?.spreadsheetURL,
          spread_sheet_id1: values?.spreadsheetID1,
          spread_sheet_id2: values?.spreadsheetID2,
          spread_sheet_id3: values?.spreadsheetID3,
          spread_sheet_id4: values?.spreadsheetID4,
          logo_url: values?.companyLogoURL
        }
        let orgUp = await UpdateOrganization(org_payload, token)
      }
    },
  });

  const UpdateUser = async (user_payload, token) => {
    let updateUser
    await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/users/${userId}`, user_payload, {
      headers: {
          Authorization: `Bearer ${token}`,
      }
    })
    .then((response) => {
      if (response.status === 200) {
        updateUser = response?.data
    }
    })
    .catch((error) => {
      addToast(error.response?.data?.message, {
          appearance: "error",
          autoDismiss: true,
      })
    })
    return updateUser;
  }
  const UpdateOrganization = async (org_payload, token) => {
    let updateOrg
    await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/organization/${organizationId}`, org_payload, {
      headers: {
          Authorization: `Bearer ${token}`,
      }
    })
    .then((response) => {
      if (response.status === 200) {
        updateOrg = response?.data
        if(response?.data){
          addToast("Profile Updated Sucessfully", {
              appearance: "success",
              autoDismiss: true,
          })
        }
    }
    })
    .catch((error) => {
      addToast(error.response?.data?.message, {
          appearance: "error",
          autoDismiss: true,
      })
    })
    return updateOrg;
  }

  useEffect(()=>{
    const user_id = reactLocalStorage.get("user_id", false);
    setUserId(user_id)
    const organization_id = reactLocalStorage.get("organization_id", false);
    setOrganizationId(organization_id)
    getUserById(user_id).then((data) => {
      let user = data?.data
      setFormikUser({
        first_name: user?.FirstName,
        last_name: user?.LastName,
        phone_number: user?.PhoneNumber,
        email: user?.Email,
        job_title: user?.job_title,
        location: user?.location,
        comment: user?.Comments,
        address: user?.address,
        blood_group: user?.blood_group,
        district: user?.district
      })
    })

    getOrganizationByUserId(user_id).then((o_data)=>{
      let org = o_data?.data[0]
      setFormikOrganization({
        hrms: org?.hrms_api_url,
        companyName: org?.name,
        spreadsheetURL: org?.spread_sheet_url,
        spreadsheetID1: org?.spread_sheet_id1,
        spreadsheetID2: org?.spread_sheet_id2,
        spreadsheetID3: org?.spread_sheet_id3,
        spreadsheetID4: org?.spread_sheet_id4,
        companyLogoURL: org?.logo_url
      })
    })
  },[])

  useEffect(()=>{
    let formData = [{...formikUser, ...formikOrganization}]
    setInitialFormValues(formData[0])
  },[formikUser, formikOrganization])

  useEffect(()=>{
    if(initialFormValues){
      formik.setValues({
        ...initialFormValues
      });
    }
  },[initialFormValues])

  const validate = (values) => {
    const errors = {};
    if (!values.first_name) {
      errors.first_name = "Name Required";
    }
    if (!values.last_name) {
      errors.last_name = "Last Name Required";
    }
    if (!values.phone_number) {
      errors.phone_number = "Phone Number is Required";
    }
    if (!values.email) {
      errors.email = "Email Required";
    }
    if (!values.comment) {
      errors.comment = "Comment Required";
    }
    if (!values.job_title) {
      errors.job_title = "Job Title is Required";
    }
    if (!values.address) {
      errors.address = "address Required";
    }
    if (!values.blood_group) {
      errors.blood_group = "blood group Required";
    }
    if (!values.address) {
      errors.address = "Address Required";
    }
    if (!values.district) {
      errors.district = "District Required";
    }
    if (!values.hrms) {
      errors.hrms = "HRMS Required";
    }
    if (!values.companyName) {
      errors.companyName = "Company Name Required";
    }
    if (!values.spreadsheetURL) {
      errors.spreadsheetURL = "Spreadsheet URL Required";
    }
    setErrorData(errors)
    return errors;
  };


  return (
    <>
      <div className="flex flex-row justify-start overflow-hidden">
        <div>
          <SideBar />
        </div>
        <div className="flex flex-col">
          <Header title={title} />
          <div className=" flex flex-col max-w-[1099px] mh-[632.01px] mt-[103px] ml-[27px] mr-[80px] rounded-[31.529px] bg-[#FFFFFF] py-[50px] px-[27px]">
            <div className="flex flex-row justify-between">
              <div className="flex">
                <div className=" ml-[26.8px] mt-[31.94px]   h-[88.28px] w-[88.28px] bg-[#F4F7FE] rounded-[50%]">
                  <img
                    src="/Group8.png"
                    alt="logo"
                    className="ml-[23px] mt-[16.57px] h-[44px]  w-[42.79px]"
                  />
                </div>
                <div className="font-secondaryFont font-medium not-italic text-[28.09px] leading-[37.83px] text-[#000000] mt-[51.51px] ml-[27.92px] ">
                  My Account
                </div>
              </div>
              <div className="flex items-center mr-[51.5px] ">
                <div className="flex flex-row justify-end shadow-[buttonshadow]  content-center mt-[42px] mr-[-60px]">
                  <div className="mr-[45px] shadow-[buttonshadow] ">
                    <button className="w-[130px] btnshadow  h-[35px] rounded text-sm font-secondaryFont text-[14px] text-center font-medium not-italic items-center  bg-[#FFF] text-[#000000] ">
                      Forgot Password
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="w-[130px] h-[35px] rounded btnshadow   text-sm font-secondaryFont text-[14px] font-medium not-italic  bg-[#F42424] text-[#000000] "
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="pl-[120px] pr-[26px] pt-[33.49px]">
              <form onSubmit={formik.handleSubmit}>
                <div className="text-[#000000] mb-3 font-secondaryFont not-italic font-bold text-base leading-7 text-[20.09px]">
                  <h1>Personal Information</h1>
                </div>
                <div className="flex flex-row space-x-20 pb-6">
                  <div className="relative w-[350px]">
                    <input
                      id="first_name"
                      onChange={formik.handleChange}
                      value={formik.values?.first_name}
                      name="first_name"
                      type="text"
                      className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="first_name"
                      className="after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                    >
                      First Name
                    </label>
                    {errorData?.first_name && (
                      <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                        {errorData?.first_name}{" "}
                      </div>
                    )}
                  </div>
                  <div className="relative w-[350px]">
                    <input
                      id="last_name"
                      onChange={formik.handleChange}
                      value={formik.values?.last_name}
                      name="last_name"
                      type="text"
                      className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="last_name"
                      className="after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                    >
                      Last Name
                    </label>
                    {errorData?.last_name && (
                      <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                        {errorData?.last_name}{" "}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-row space-x-20 pb-6">
                  <div className="relative w-[350px]">
                    <input
                      id="phone_number"
                      onChange={formik.handleChange}
                      value={formik.values?.phone_number}
                      name="phone_number"
                      type="text"
                      className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="phone_number"
                      className=" after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                    >
                      Phone Number
                    </label>
                    {errorData?.phone_number && (
                      <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                        {errorData?.phone_number}{" "}
                      </div>
                    )}
                  </div>
                  <div className="relative w-[350px]">
                    <input
                      id="email"
                      onChange={formik.handleChange}
                      value={formik.values?.email}
                      name="email"
                      type="text"
                      className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="email"
                      className="after:content-['*'] after:ml-0.5 after:text-red-500  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                    >
                      Email
                    </label>
                    {errorData?.email && (
                      <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                        {errorData?.email}{" "}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-row space-x-20 pb-6">
                  <div className="relative w-[350px]">
                    <input
                      id="job_title"
                      name="job_title"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values?.job_title}
                      className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="job_title"
                      className="after:content-['*'] after:ml-0.5 after:text-red-500  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                    >
                      Job Title
                    </label>
                    {errorData?.job_title && (
                      <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                        {errorData?.job_title}{" "}
                      </div>
                    )}
                  </div>
                  <div className="relative w-[350px]">
                    <input
                      id="location"
                      onChange={formik.handleChange}
                      value={formik.values?.location}
                      name="location"
                      type="text"
                      className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="location"
                      className="absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                    >
                      Location
                    </label>
                  </div>
                </div>
                <div className="flex flex-row space-x-20 pb-6">
                  <div className="relative w-[350px]">
                    <input
                      id="comment"
                      onChange={formik.handleChange}
                      value={formik.values?.comment}
                      name="comment"
                      type="text"
                      className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="comment"
                      className="after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                    >
                      Comment
                    </label>
                    {errorData?.comment && (
                      <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                        {errorData?.comment}{" "}
                      </div>
                    )}
                  </div>
                  <div className="relative w-[350px]">
                    <input
                      id="address"
                      onChange={formik.handleChange}
                      value={formik.values?.address}
                      name="address"
                      type="text"
                      className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="address"
                      className="after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                    >
                      Address
                    </label>
                    {errorData?.address && (
                      <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                        {errorData?.address}{" "}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-row space-x-20 pb-6">
                  <div className="relative w-[350px]">
                    <input
                      id="blood_group"
                      onChange={formik.handleChange}
                      value={formik.values?.blood_group}
                      name="blood_group"
                      type="text"
                      className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="blood_group"
                      className="after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                    >
                      Blood Group
                    </label>
                    {errorData?.blood_group && (
                      <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                        {errorData?.blood_group}{" "}
                      </div>
                    )}
                  </div>
                  <div className="relative w-[350px]">
                    <input
                      id="district"
                      onChange={formik.handleChange}
                      value={formik.values?.district}
                      name="district"
                      type="text"
                      className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="district"
                      className="after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                    >
                      District
                    </label>
                    {errorData?.district && (
                      <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                        {errorData?.district}{" "}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-[#000000] my-5 font-secondaryFont not-italic font-bold text-base leading-7 tracking-[-0.02em] text-[20.09px]">
                  <h1>Company InhtmlFormation</h1>
                </div>
                <div className="flex flex-row space-x-20 pb-6">
                  <div className="relative w-[350px]">
                    <input
                      id="hrms"
                      onChange={formik.handleChange}
                      value={formik.values?.hrms}
                      name="hrms"
                      type="text"
                      className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="hrms"
                      className="after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                    >
                      HRMS (API)
                    </label>
                    {errorData?.hrms && (
                      <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                        {errorData?.hrms}{" "}
                      </div>
                    )}
                  </div>
                  <div className="relative w-[350px]">
                    <input
                      id="companyName"
                      onChange={formik.handleChange}
                      value={formik.values?.companyName}
                      name="companyName"
                      type="text"
                      className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="companyName"
                      className="after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                    >
                      Company Name
                    </label>
                    {errorData?.companyName && (
                      <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                        {errorData?.companyName}{" "}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-row space-x-20 pb-6">
                  <div className="relative w-[350px]">
                    <input
                      id="spreadsheetURL"
                      onChange={formik.handleChange}
                      value={formik.values?.spreadsheetURL}
                      name="spreadsheetURL"
                      type="text"
                      className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="spreadsheetURL"
                      className="after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                    >
                      SpreadsheetURL
                    </label>
                    {errorData?.spreadsheetURL && (
                      <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                        {errorData?.spreadsheetURL}{" "}
                      </div>
                    )}
                  </div>
                  <div className="relative w-[350px]">
                    <input
                      id="spreadsheetID1"
                      onChange={formik.handleChange}
                      value={formik.values?.spreadsheetID1}
                      name="spreadsheetID1"
                      type="text"
                      className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="spreadsheetID1"
                      className="absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                    >
                      Spreadsheet ID 1
                    </label>
                  </div>
                </div>
                <div className="flex flex-row space-x-20 pb-6">
                  <div className="relative w-[350px]">
                    <input
                      id="spreadsheetID2"
                      onChange={formik.handleChange}
                      value={formik.values?.spreadsheetID2}
                      name="spreadsheetID2"
                      type="text"
                      className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="spreadsheetID2"
                      className="absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                    >
                      Spreadsheet ID 2
                    </label>
                  </div>
                  <div className="relative w-[350px]">
                    <input
                      id="spreadsheetID3"
                      onChange={formik.handleChange}
                      value={formik.values?.spreadsheetID3}
                      name="spreadsheetID3"
                      type="text"
                      className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="spreadsheetID3"
                      className="absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                    >
                      Spreadsheet ID 3
                    </label>
                  </div>
                </div>
                <div className="flex flex-row space-x-20 pb-6">
                  <div className="relative w-[350px]">
                    <input
                      id="spreadsheetID4"
                      onChange={formik.handleChange}
                      value={formik.values?.spreadsheetID4}
                      name="spreadsheetID4"
                      type="text"
                      className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="spreadsheetID4"
                      className="absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                    >
                      Spreadsheet ID 4
                    </label>
                  </div>
                  <div className="relative w-[350px]">
                    <input
                      id="companyLogoURL"
                      onChange={formik.handleChange}
                      value={formik.values?.companyLogoURL}
                      name="companyLogoURL"
                      type="text"
                      className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="companyLogoURL"
                      className="absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                    >
                      Company Logo URL
                    </label>
                  </div>
                </div>

                <div className="flex flex-row justify-end shadow-[buttonshadow] mr-[-30px] content-center mt-[42px]">
                  <div className="mr-[45px] shadow-[buttonshadow] ">
                    <button
                      type="button"
                      className="w-[100px] btnshadow  h-[25px] rounded text-sm font-secondaryFont text-[14px] text-center font-medium not-italic items-center  bg-[#FFF] text-[#000000] "
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
        </div>
      </div>
    </>
  );
};

export default UserProfile;
