import React, { useEffect, useLayoutEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import SideBar from "../layout/SideBar";
import Header from "../layout/Header";
import { reactLocalStorage } from "reactjs-localstorage";

const validate = (values) => {



    const errors = {};
    // if (!values.FirstName) {
    //     errors.FirstName = "First Name Required";
    // }
    // if (!values.LastName) {
    //     errors.LastName = "Last Name Required";
    // }
    // if (!values.Email) {
    //     errors.Email = "Email Required";
    // } else if (
    //     !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
    //         values.Email
    //     )
    // ) {
    //     errors.Email = "Invalid email format!";
    // }

    // if (!values.Password) {
    //     errors.Password = "Password Required";
    // }

    // if (!values.Description) {
    //     errors.Description = "Phone Number Required";
    // } else if (
    //     !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
    //         values.Description
    //     )
    // ) {
    //     errors.Description = "Invalid Phone Number";
    // }
    if (!values.description) {
        errors.description = "Description Required";
    }
    // if (!values.Designation) {
    //     errors.Designation = "Designation  Required";
    // }
    // if (!values.Comments) {
    //     errors.Comments = "comment Required";
    // }
    // console.log(errors);
    return errors;
};

const AddUserRole = () => {
    const { addToast } = useToasts();
    const [rolesdata, setRolesData] = useState(null)
    const [designationdata, setDesignationData] = useState(null)
    const [errdesignation, setErrDescription] = useState(false)
    const [rolesalldata, setRolesAllData] = useState(null)
    const [hierarchydata, setHierarchyData] = useState(null)
    const [errrolesalldata, setErrRolesAllData] = useState(false)
    const [hrmsdata, setHRMSData] = useState("http://159.65.154.14:8000/api/hrms-api/");

    const [spread_sheet_id_1, setSpreadSheet_1] = useState('59');

    let navigate = useNavigate();



    useEffect(() => {

        const feachSheetId = async () => {
            let newDate = new Date().toLocaleString()
            let curentDta = newDate.split('/')
            let yearsplit = curentDta[2].split(",") 
            let cuurctData = `${curentDta[0]}${curentDta[1]}${yearsplit[0]}-${curentDta[0]}${curentDta[1]}${yearsplit[0]}`
            

            try {
                // const data1 = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/1LtpGuZdUivXEA4TqUvK9T3qRr1HER6TKzdSxTYPEAQ8/values/AT - HRMS Std Salaries?key=AIzaSyDoh4Gj_-xV033rPKneUFSpQSUpbqDqfDw`,)

                const token = reactLocalStorage.get("access_token", false);
                const data1 = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/hrms-api/59/${cuurctData}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })

                // let ClientIdStore = []
                // data1?.data?.values.map((items, id) => {
                //     if (id >= 1) {
                //         ClientIdStore.push(items[0])
                //     }
                // })
                // setRolesData(ClientIdStore)

                setRolesData(data1?.data)

            } catch (error) {
                console.log(error)
            }
        }
        feachSheetId();


    } )

    useEffect(() => {
        if (designationdata) {
            setErrDescription(false)
        }
        if (rolesalldata) {
            setErrRolesAllData(false)
        }


    }, [designationdata, rolesalldata])


    const Hierarchy = [
        { "number": "1", },
        { "number": "2", },
        { "number": "3", },
        { "number": "4", },
        { "number": "5", }
    ]

    const CancelButton = () => {
        navigate('/UserManagement/UserRole')
    }


    const formik = useFormik({

        initialValues: {
            name: "",
            description: "",
            organization_id: "",
            hierarchy: ""
        },

        validate,
        onSubmit: (values, { resetForm }) => {
            const organization_Id = reactLocalStorage.get("organization_id", false);

            if (organization_Id !== "undefined" && organization_Id !== null) {
                values.organization_id = organization_Id
            }


            values.name = rolesalldata

            values.hierarchy = hierarchydata

            const token = reactLocalStorage.get("access_token", false);
            // if (designationdata && rolesalldata) {
            axios.post(`${process.env.REACT_APP_BASE_URL}/api/roles/`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            )
                .then((response) => {
                    console.log(response)
                    if (response.status === 201) {
                        navigate('/UserManagement/UserRole')
                        addToast("User Created Sucessfully", {
                            appearance: "success",
                            autoDismiss: true,
                        })

                    }
                    resetForm()
                })

                .catch((error) => {
                    addToast(error.response.data.message, {
                        appearance: "error",
                        autoDismiss: true,
                    })
                })
            // }
            // else {
            //     setErrDescription(true)
            //     setErrRolesAllData(true)

            // }
        },
    });

    const SpreadFun = (e) => {
        setRolesAllData(e.target.value)
        console.log(e.target.value)
    }
    const HierarchyFun = (e) => {
        setHierarchyData(e.target.value)
        console.log(e.target.value)

    }

console.log(rolesdata)

    return (
        <>
            <div className="flex flex-row justify-start overflow-hidden">
                <div>
                    <SideBar />
                </div>
                <div className="flex flex-col">
                    <Header />
                    <div className="flex flex-col  justify-center overflow-hidden w-[100%] 
                     h-[100vh]  ">

                        <div className="max-w-[1099px] max-h-[632.01px]  
                        bg-[#FFFFFF] justify-center  ml-[38px] mr-[170px] mt-[36px] mb-[110.99px] pb-[20px] rounded-[31.529px]">
                            <div className="flex flex-row items-center ">
                                <div className="bg-[#F4F7FE] w-[68.28px] flex items-center justify-center h-[68.28px] mt-[31.93px] ml-[26.8px] rounded-full">
                                    <img
                                        src="/Group8.png"
                                        alt="logo"
                                        width="42.79px"
                                        height="44px"
                                        className="content-center"
                                    />
                                </div>
                                <div>
                                    <div className=" font-secondaryFont ml-[27.92px]
                                     mt-[21.51px] text-[#000000]  font-medium not-italic
                                      text-[26.09px] tracking-[-0.02em]">
                                        Create New <br />User Role
                                    </div>
                                    {/* <div className="text-[#A3AED0] ml-[29px]">
                                        User Role
                                    </div> */}
                                </div>
                            </div>

                            <div className="pl-[120px] pr-[96px] pt-[33.49px]">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="flex flex-row space-x-40 pb-[36px]">

                                        <div>
                                            <div className="relative w-[300px] border-b border-black ">
                                                <select
                                                    name="spread_sheet_user_id"
                                                    onChange={(e) => SpreadFun(e)}
                                                    className=" font-secondaryFont font-medium not-italic text-[14px] leading-[
                                                    37.83px] border-none bg-[#ffffff] w-full focus:outline-none "
                                                >
                                                    <option value="" label="Role" />
                                                    {rolesdata?.map((item, id) => {
                                                        return <>
                                                            <option value={item.designation} label={item.designation} key={id} />
                                                        </>
                                                    })}
                                                </select>
                                            </div>
                                            {/* {errrolesalldata && (
                                                <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                                                    Role
                                                </div>
                                            )} */}

                                        </div>

                                        <div>
                                            <div className="relative w-[300px]  ">
                                                <input
                                                    id="description"
                                                    name="description"
                                                    type="text"
                                                    value={formik.values.description}
                                                    onChange={formik.handleChange}
                                                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                                                    placeholder="john@doe.com"
                                                />
                                                <label
                                                    htmlFor="description"
                                                    className="  after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                                >
                                                    Description
                                                    {/* <span className="text-red-700">*</span> */}
                                                </label>
                                                {formik.errors.description && (
                                                    <div className="text-red-700 text-xs font-secondaryFont mt-[2px]">
                                                        {formik.errors.description}{" "}
                                                    </div>
                                                )}
                                            </div>
                                            {/* {errdesignation && (
                                                <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                                                    Designation  Required
                                                </div>
                                            )
                                            } */}
                                        </div>

                                    </div>

                                    <div className="flex flex-row space-x-40 pb-[36px]">

                                        <div className=" relative w-[300px]" >
                                            <div>
                                                <div className="relative w-[300px] border-b border-black ">
                                                    <select
                                                        // name="spread_sheet_user_id"
                                                        onChange={(e) => HierarchyFun(e)}
                                                        className=" font-secondaryFont font-medium not-italic text-[14px] leading-[
                                                    37.83px] border-none bg-[#ffffff] w-full focus:outline-none  "
                                                    >
                                                        <option value="" label="Hierarchy" />
                                                        {Hierarchy?.map((item, id) => {
                                                            return <>
                                                                <option value={item.number} label={item.number} />
                                                            </>
                                                        })}
                                                    </select>
                                                </div>
                                                {/* {errrolesalldata && (
                                                <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                                                   Hierarchy
                                                </div>
                                            )} */}

                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-row justify-end shadow-[buttonshadow]  content-center mt-[42px] mr-[-60px]">
                                        <div className="mr-[45px] shadow-[buttonshadow] ">
                                            <button onClick={() => CancelButton()} className="w-[100px] btnshadow  h-[25px] rounded text-sm font-secondaryFont text-[14px] text-center font-medium not-italic items-center  bg-[#F42424] text-[#000000] ">
                                                Cancel
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                className="w-[110px] h-[25px] rounded btnshadow   text-sm font-secondaryFont text-[14px] font-medium not-italic  bg-[#0FCC7C] text-[#000000] "
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddUserRole;