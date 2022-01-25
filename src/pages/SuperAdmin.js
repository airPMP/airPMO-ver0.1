import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import Popup from "reactjs-popup";


// const validate = (values) => {



//     const errors = {};
//     // if (!values.name) {
//     //     errors.name = "First Name Required";
//     // }
//     // if (!values.location) {
//     //     errors.location = "Last Name Required";
//     // }
//     // if (!values.address) {
//     //     errors.address = "address Required";
//     // } else if (
//     //     !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
//     //         values.address
//     //     )
//     // ) {
//     //     errors.address = "Invalid address format!";
//     // }

//     // if (!values.hrms) {
//     //     errors.hrms = "Phone Number Required";
//     // } else if (
//     //     !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
//     //         values.hrms
//     //     )
//     // ) {
//     //     errors.hrms = "Invalid Phone Number";
//     // }
//     // if (!values.spread_sheet_id_1) {
//     //     errors.spread_sheet_id_1 = "Job Title Required";
//     // }
//     // if (!values.spread_sheet) {
//     //     errors.spread_sheet = "Company Name Required";
//     // }
//     // if (!values.Comments) {
//     //     errors.Comments = "comment Required";
//     // }
//     // console.log(errors);
//     return errors;
// };



const SuperAdmin = () => {
    const { addToast } = useToasts();
    const [open, setOpen] = useState(false);
    const [name, setNameData] = useState('')
    const [location, setLocation] = useState('')
    const [address, setAddress] = useState('')
    const [hrmsdata, setHRMSData] = useState("AIzaSyDoh4Gj_-xV033rPKneUFSpQSUpbqDqfDw");
    const [spread_sheet, setSpreadSheet] = useState("1LtpGuZdUivXEA4TqUvK9T3qRr1HER6TKzdSxTYPEAQ8");
    const [spread_sheet_id_1, setSpreadSheet_1] = useState('AT - HRMS format');
    const [sheetdata, setSheetData] = useState(null)

    const [showpassword, setshowpassword] = useState("password");
    const [showeye, setShowEye] = useState(" ");
    const [designationdata, setDesignationData] = useState(null)


    let navigate = useNavigate();
    const Login = () => {
        navigate('/');
    };


    const SubmitForm = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/organization/`, {
            hrms_api_url: hrmsdata,
            location: location,
            discription: "string",
            logo_url: "string",
            spread_sheet_id: spread_sheet,
            user_id: "string",
            address: address,
            contact_details: "string",
            name: name

        })
            .then((response) => {
                console.log(response)
                if (response.status === 201) {
                    addToast("form submitted Sucessfully", {
                        appearance: "success",
                        autoDismiss: true,
                    })
                    // navigate('/')
                }
            })
            .catch((error) => {
                console.log(error)
                addToast(error.response.data.message, {
                    appearance: "error",
                    autoDismiss: true,
                })
            })
    }


    const ShowPasswordButton = () => {
        setShowEye(o => !o)
        setOpen(o => !o)
        if (showeye) {
            setshowpassword("input")
            const feach = async () => {
                try {
                    const data1 = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${spread_sheet}/values/${spread_sheet_id_1}?key=${hrmsdata}`,)
                    setSheetData(data1?.data?.values)

                    let storedDesignamtion=[]

                    data1?.data?.values.map((items, id) => {
                        storedDesignamtion.push(items[3]) 
                    })
                    setDesignationData(storedDesignamtion)

                } catch (error) {
                    console.log(error)
                }
            }
            feach();
        }
        else {
            setshowpassword("password")
        }
    }


    const CancelButton = (e) => {
        setOpen(o => !o)
        setShowEye(o => !o)
    }

    const Forget = () => {

    }

    console.log(designationdata)

    return (
        <>
            <div className="flex flex-col  justify-center overflow-hidden w-[100%]  h-[100%] ">
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
                            Super Admin
                        </div>
                    </div>
                    <div className="pl-[120px] pr-[96px] pt-[33.49px]">
                        <form
                        // onSubmit={formik.handleSubmit}
                        >
                            <div className="flex flex-row space-x-40 pb-[36px]">
                                <div className="relative w-[350px]">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setNameData(e.target.value)}
                                        className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                                        placeholder="john@doe.com"
                                    />
                                    <label
                                        htmlFor="name"
                                        className=" after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                    >
                                        Company Name
                                        {/* <span className="text-red-700">*</span> */}
                                    </label>
                                    {/* {formik.errors.name && (
                                    <div className="text-red-700 text-xs font-secondaryFont mt-[2px]">
                                        {formik.errors.name}{" "}
                                    </div>
                                )} */}
                                </div>
                                <div className="relative w-[350px]">
                                    <input
                                        id="location"
                                        name="location"
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                                        placeholder="john@doe.com"
                                    />
                                    <label
                                        htmlFor="location"
                                        className=" after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                    >
                                        Location
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
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
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
                                        value={hrmsdata}
                                        onChange={(e) => setHRMSData(e.target.value)}
                                        // value={formik.values.hrms}
                                        // onChange={formik.handleChange}
                                        className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                                        placeholder="john@doe.com"
                                    />
                                    <label
                                        htmlFor="hrms"
                                        className=" after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                    >
                                        HRMS (API)

                                        {/* <span className="text-red-700">*</span> */}
                                    </label>
                                    {/* {formik.errors.hrms && (
                                    <div className="text-red-700 text-xs font-secondaryFont mt-[2px]">
                                        {formik.errors.hrms}{" "}
                                    </div>
                                )} */}
                                    <div>

                                    </div>
                                </div>

                            </div>
                            <div className="flex flex-row space-x-40 pb-[36px]">

                                <div className=" relative w-[350px]">
                                    <input
                                        id="spread_sheet"
                                        type="text"
                                        name="spread_sheet"
                                        value={spread_sheet}
                                        onChange={(e) => setSpreadSheet(e.target.value)}
                                        // value={formik.values.spread_sheet}
                                        // onChange={formik.handleChange}
                                        className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                                        placeholder="Password"
                                    />
                                    <label
                                        htmlFor="spread_sheet"
                                        className=" after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                    >
                                        Spreadsheet URL

                                        {/* <span className="text-red-700">*</span> */}
                                    </label>
                                    {/* {formik.errors.spread_sheet && (
                                    <div className="text-red-700 text-xs font-secondaryFont mt-[2px]">
                                        {formik.errors.spread_sheet}{" "}
                                    </div>
                                )} */}
                                </div>

                                <div className="relative w-[350px]">
                                    <div className="flex">
                                        <input
                                            id="spread_sheet_id_1"
                                            name="spread_sheet_id_1"
                                            type="text"
                                            value={spread_sheet_id_1}
                                            onChange={(e) => setSpreadSheet_1(e.target.value)}
                                            // value={formik.values.spread_sheet_id_1}
                                            // onChange={formik.handleChange}
                                            className="peer h-10 w-full border-b font-medium 
                                    font-secondaryFont border-[#000000] text-[#000000] 
                                      focus:outline-none focus:border-[#000000]"
                                            placeholder="Spreadsheet ID 1"
                                        />
                                        <div>
                                            {showeye ? (<div onClick={() => ShowPasswordButton()}
                                                className="cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">

                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                </svg>
                                            </div>)
                                                :
                                                (<div onClick={() => ShowPasswordButton()} className="cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </div>)}
                                        </div>
                                    </div>

                                    {/* <label
                                    htmlFor="spread_sheet_id_1"
                                    className="after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                >
                                    Spreadsheet ID 1
                                    <span className="text-red-700">*</span>
                                    
                                </label> */}


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
                                        // value={formik.values.spread_sheet_id_2}
                                        // onChange={formik.handleChange}
                                        className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                                        placeholder="john@doe.com"
                                    />
                                    <label
                                        htmlFor="spread_sheet_id_2"
                                        className="   after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                    >
                                        Spreadsheet ID 2
                                        {/* <span className="text-red-700">*</span> */}
                                    </label>
                                    {/* {formik.errors.Jobtitle && (
                                    <div className="text-red-700 text-xs font-secondaryFont mt-[2px]">
                                        {formik.errors.Jobtitle}{" "}
                                    </div>
                                )} */}
                                </div>
                                <div className=" relative w-[350px]">
                                    <input
                                        id="spread_sheet_id_3"
                                        type="text"
                                        name="spread_sheet_id_3"
                                        // value={formik.values.spread_sheet_id_3}
                                        // onChange={formik.handleChange}
                                        className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                                        placeholder="Password"
                                    />
                                    <label
                                        htmlFor="spread_sheet_id_3"
                                        className="   after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                    >
                                        Spreadsheet ID 3
                                        {/* <span className="text-red-700">*</span> */}
                                    </label>
                                    {/* {formik.errors.CompanyName && (
                                    <div className="text-red-700 text-xs font-secondaryFont mt-[2px]">
                                        {formik.errors.CompanyName}{" "}
                                    </div>
                                )} */}
                                </div>
                            </div>

                            <div className="flex flex-row space-x-40 ">
                                <div className="relative w-[350px]">
                                    <input
                                        id="spread_sheet_id_4"
                                        name="spread_sheet_id_4"
                                        type="text"
                                        // value={formik.values.spread_sheet_id_4}
                                        // onChange={formik.handleChange}
                                        className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                                        placeholder="john@doe.com"
                                    />
                                    <label
                                        htmlFor="spread_sheet_id_4"
                                        className="  after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                    >
                                        Spreadsheet ID 4
                                        {/* <span className="text-red-700">*</span> */}
                                    </label>
                                    {/* {formik.errors.Jobtitle && (
                                    <div className="text-red-700 text-xs font-secondaryFont mt-[2px]">
                                        {formik.errors.Jobtitle}{" "}
                                    </div>
                                )} */}
                                </div>
                                <div className=" relative w-[350px]">
                                    <input
                                        id="spread_sheet_id_5"
                                        type="text"
                                        name="spread_sheet_id_5"
                                        // value={formik.values.spread_sheet_id_5}
                                        // onChange={formik.handleChange}
                                        className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                                        placeholder="Password"
                                    />
                                    <label
                                        htmlFor="spread_sheet_id_5"
                                        className="   after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                    >
                                        Spreadsheet ID 5
                                        {/* <span className="text-red-700">*</span> */}
                                    </label>
                                    {/* {formik.errors.CompanyName && (
                                    <div className="text-red-700 text-xs font-secondaryFont mt-[2px]">
                                        {formik.errors.CompanyName}{" "}
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
                                        onClick={(e) => SubmitForm(e)}
                                        className="w-[110px] h-[25px] rounded btnshadow   text-sm font-secondaryFont text-[14px] font-medium not-italic  bg-[#0FCC7C] text-[#000000] "
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Popup
                open={open}
                position="right center"
                model
            >
                <div className="p-7 ">
                    <div className="flex pb-3">
                        {/* <div>
                            <label
                                htmlFor="email"
                                className="font-size-4 text-black-2 font-weight-semibold  "
                            >
                                Email
                            </label>
                        </div> */}
                        <div style={{ marginLeft: "95%" }}>
                            <span className="text-[red] text-[19px] cursor-pointer" onClick={(e) => CancelButton(e)} >
                                <b>X</b>
                            </span>
                        </div>
                    </div>
                    <div className="mt-3 ex1">
                        <table className="table-auto   text-center   
                            text-[#8F9BBA] text-[12px] font-sans
                         font-normal not-italic ">

                            {sheetdata?.map((item, i) => {
                                if (i <= 0) {
                                    return (
                                        <tr className="max-h-[52.84px] text-center  ">
                                            <th className="w-[15%] py-[13px]">{item[0]}</th>
                                            <th className="w-[15%] py-[13px]">{item[1]}</th>
                                            <th className="w-[20%] py-[13px]">{item[2]}</th>
                                            <th className="w-[30%] py-[13px]">{item[3]}</th>

                                        </tr>
                                    )
                                }
                                else {
                                    return (
                                        <tbody className=" mb-[10px]   ">
                                            <tr className="bg-[#e4eeec] text-[#8F9BBA] text-[12px] font-sans  ">
                                                <td className=" pt-[15px] w-[15%] pb-[14.83px]">{item[0]} </td>
                                                <td className="pt-[15px] w-[15%] pb-[14.83px]">{item[1]}</td>
                                                <td className="pt-[15px] w-[20%] pb-[14.83px]">{item[2]}</td>
                                                <td className="pt-[15px] w-[30%] pb-[14.83px]">{item[3]}</td>

                                            </tr>
                                            <tr>
                                                <td className="p-[10px]"></td>
                                            </tr>
                                        </tbody>
                                    )
                                }
                            })}

                        </table>

                    </div>

                </div>

            </Popup>
        </>
    );
};

export default SuperAdmin;
