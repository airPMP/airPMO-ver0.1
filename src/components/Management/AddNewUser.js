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
    if (!values.Email) {
        errors.Email = "Email Required";
    } else if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
            values.Email
        )
    ) {
        errors.Email = "Invalid email format!";
    }

    if (!values.Password) {
        errors.Password = "Password Required";
    }

    if (!values.PhoneNumber) {
        errors.PhoneNumber = "Phone Number Required";
    } else if (
        !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
            values.PhoneNumber
        )
    ) {
        errors.PhoneNumber = "Invalid Phone Number";
    }
    // if (!values.spread_sheet_user_id) {
    //     errors.spread_sheet_user_id = "User Id Required";
    // }
    // if (!values.Designation) {
    //     errors.Designation = "Designation  Required";
    // }
    // if (!values.Comments) {
    //     errors.Comments = "comment Required";
    // }
    // console.log(errors);
    return errors;
};

const AddNewUser = () => {
    const { addToast } = useToasts();
    const [rolesdata, setRolesData] = useState(null)
    const [clientiddata, setClientIdData] = useState(null)
    const [registoruserdetails, setRegisterUserDetails] = useState(null)
    const [userid_designation, setUserId_Designation] = useState(null)
    const [designationdata, setDesignationData] = useState(null)
    const [roleid, setRoleId] = useState(null)
    const [rolename, setRoleName] = useState(null)
    const [firstnamedata, setFirstNameData] = useState(null)
    const [lastnamedata, setLastNameData] = useState(null)
    const [designationedata, setDesignaionData] = useState(null)
    const [nodesignationedata, setNoDesignaionData] = useState([])
    const [errdesignation, setErrDesignation] = useState(false)
    const [assignproject, setAssignProject] = useState(false)
    const [spreadsheetid, setSpreadSheetId] = useState(null)
    const [spreadsheetalldata, setSpreadSheetIdAllData] = useState(null)
    const [spreadalldata, setSpreadAllData] = useState(null)
    const [errspreadalldata, setErrSpreadAllData] = useState(false)
    const [refracedata, setRefraceData] = useState(false)
    const [designatiotrue, setDesignatioTrue] = useState(false)
    

    const [hrmsdata, setHRMSData] = useState(null);
    const [spread_sheet, setSpreadSheet] = useState(null);
    const [spread_sheet_id_1, setSpreadSheet_1] = useState(null);


    let navigate = useNavigate();


    useEffect(() => {
        const token = reactLocalStorage.get("access_token", false);

        const feachRolls = async () => {
            try {
                const data1 = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/roles/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setRolesData(data1?.data)
                // let lastlengh = data1?.data[data1?.data.length - 1]
                // setRoleId(lastlengh?._id)

            } catch (error) {
                console.log(error)
            }
        }
        feachRolls();

        const user_id = reactLocalStorage.get("user_id", false);
        const feachAddUser = async () => {
            try {
                const data1 = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/${user_id}/organization`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                // let hrmsapi=data1?.data[0].hrms_api_url
                // let spread_sheet_id=data1?.data[0].spread_sheet_id
                // let ATHRMSformat=data1?.data[0].discription


                console.log(data1)

                setHRMSData(data1?.data[0].hrms_api_url)
                setSpreadSheet(data1?.data[0].spread_sheet_id)
                setSpreadSheet_1(data1?.data[0].discription)
                 
                
            } catch (error) {
                console.log(error)
            }
        }
        feachAddUser();

  

    }, [ ])


    useEffect(()=>{
        const feachSheetId = async () => {
            try {
                const data1 = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${spread_sheet}/values/${spread_sheet_id_1}?key=${hrmsdata}`,)

                let ClientIdStore = []
                data1?.data?.values.map((items, id) => {
                    if (id >= 1) {
                        ClientIdStore.push(items[0])
                    }
                })

                console.log(data1)

                setSpreadSheetIdAllData(data1?.data?.values)
                let ClientFirstNameStore = []
                let ClientLastNameStore = []
                let ClientDesignaionStore = []
                data1?.data?.values.map((items, id) => {
                    if (id >= 1) {
                        ClientFirstNameStore.push(items[1])
                        ClientLastNameStore.push(items[2])
                        ClientDesignaionStore.push(items[3])
                    }
                })

                setClientIdData(ClientIdStore)

            } catch (error) {
                console.log(error)
            }
        }
        feachSheetId();


    },[spread_sheet_id_1])


    useEffect(() => {
        if (designationdata) {
            setErrDesignation(false)
        }
        if (spreadalldata) {
            setErrSpreadAllData(false)
        }

    }, [designationdata, spreadalldata])

    useEffect(() => {
        if (refracedata) {
            AssignUserRole()
        }
    }, [refracedata])

    useEffect(() => {
        if (designationedata) {
            postRole()
        }
    }, [designationedata])

    useEffect(() => {
        if (designatiotrue) {
            RolePostApi()
            setDesignatioTrue(false)
        }
    }, [designatiotrue])

    const CancelButton = () => {
        navigate('/UserManagement/UserRole2')
    }

    const formik = useFormik({
        initialValues: {
            spread_sheet_user_id: "",
            FirstName: " ",
            LastName: " ",
            Email: "",
            Password: "",
            PhoneNumber: "",
            organization_id: ""

        },
        validate,
        onSubmit: (values, { resetForm }) => {

            const token = reactLocalStorage.get("access_token", false);
            const organization_Id = reactLocalStorage.get("organization_id", false);

            values.FirstName = firstnamedata
            values.LastName = lastnamedata
            values.spread_sheet_user_id = spreadalldata

            if (organization_Id !== "undefined" && organization_Id !== null) {
                values.organization_id = organization_Id
            }


            // if (designationdata && spreadalldata) {
            if (spreadalldata) {
                axios.post(`${process.env.REACT_APP_BASE_URL}/api/users/register/`, values, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                    .then((response) => {
                        console.log(response)
                        setUserId_Designation(response?.data._id)
                        if (response.status === 201) {

                            addToast("User Created Sucessfully", {
                                appearance: "success",
                                autoDismiss: true,
                            })


                            UserDetails()
                            AssignRoles()

                        }
                        resetForm()
                    })

                    .catch((error) => {
                        addToast(error.response.data.message, {
                            appearance: "error",
                            autoDismiss: true,
                        })
                    })
            }
            else {
                setErrDesignation(true)
                setErrSpreadAllData(true)

            }
        },
    });



    const AssignRoles = () => {

        const token = reactLocalStorage.get("access_token", false);
        axios.patch(`${process.env.REACT_APP_BASE_URL}/api/roles/${roleid}`, {
            is_assign_to_all_project: assignproject
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }

        )
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    addToast("Role Assign  Sucessfully", {
                        appearance: "success",
                        autoDismiss: true,
                    })
                }

            })
            .catch((error) => {
                console.log("patch api")
                addToast(error.response.data.message, {
                    appearance: "error",
                    autoDismiss: true,
                })
            })

    }

    const UserDetails = () => {

        const token = reactLocalStorage.get("access_token", false);
        const feachUser = async () => {
            try {
                const data1 = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setRegisterUserDetails(data1?.data)
                let lastlengh = data1?.data[data1?.data.length - 1]
                // setUserId_Designation(lastlengh?._id)
                setRefraceData(o => !o)
            } catch (error) {

            }
        }
        feachUser();
    }



    const AssignUserRole = () => {
        const organization_Id = reactLocalStorage.get("organization_id", false);
        const token = reactLocalStorage.get("access_token", false);

        let organizationid = ""
        if (organization_Id !== "undefined" && organization_Id !== null) {
            organizationid = organization_Id
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/api/assign_user_roles`, {
            user_id: userid_designation,
            role_id: roleid,
            organization_id: organizationid
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                console.log(response)
                if (response.status === 201) {
                    addToast("Designation Selected Sucessfully", {
                        appearance: "success",
                        autoDismiss: true,
                    })
                }

            })
            .catch((error) => {
                addToast(error.response.data.message, {
                    appearance: "error",
                    autoDismiss: true,
                })
            })

    }

    const SpreadFun = (e) => {
        setSpreadAllData(e.target.value)

        spreadsheetalldata?.map((item, id) => {
            if (e.target.value === item[0]) {
                setFirstNameData(item[1])
                setLastNameData(item[2])
                setDesignaionData(item[3])
            }
        })

    }


    const postRole = () => {
        let value = designationedata.toUpperCase();
        let result
        result = rolesdata?.filter((data) => {
            if (isNaN(+value)) {
                return data?.name?.toUpperCase().search(value) !== -1;
            }
        });


        if (result?.length === 0) {
            setRoleName(designationedata)
            setDesignatioTrue(true)

        }
        else {
            // console.log(result[0]._id)
            if (result) {
                setRoleId(result[0]?._id)
            }
        }
    }


    const RolePostApi = () => {

        const organization_Id = reactLocalStorage.get("organization_id", false);

        const token = reactLocalStorage.get("access_token", false);
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/roles/`, {
            "name": rolename,
            "organization_id": organization_Id
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        )
            .then((response) => {
                console.log(response?.data._id)
                setRoleId(response?.data._id)
                if (response.status === 201) {

                    addToast("Roles Created Sucessfully", {
                        appearance: "success",
                        autoDismiss: true,
                    })

                }

            })

            .catch((error) => {
                console.log("post api")
                addToast(error.response.data.message, {
                    appearance: "error",
                    autoDismiss: true,
                })
            })
    }

    const ChangeDesignation = (e) => {
        // const url_data = e.target.value
        // const designation_data = url_data.split(',')
        // setDesignationData(designation_data[0])
        // setRoleId(designation_data[1]) 
    }

    console.log(clientiddata)

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
                                    <div className=" font-secondaryFont ml-[27.92px] mt-[21.51px] text-[#000000]  font-medium not-italic text-[28.09px] tracking-[-0.02em]">
                                        User Name
                                    </div>
                                    <div className="text-[#A3AED0] ml-[29px]">
                                        User Role
                                    </div>
                                </div>
                            </div>

                            <div className="lg:pl-[120px] md:pl-[80px] pr-[96px] pt-[33.49px]">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="flex flex-row   lg:space-x-40 md:space-x-20 sm:space-x-10    pb-[36px]">

                                        <div>
                                            <div className="relative lg:w-[300px] md:w-[230px] sm:w-[140px]  border-b border-black ">
                                                <select
                                                    name="spread_sheet_user_id"
                                                    onChange={(e) => SpreadFun(e)}
                                                    className=" font-secondaryFont font-medium not-italic 
                                                    text-[14px] leading-[
                                                    37.83px] border-none bg-[#ffffff] w-full 
                                                    focus:outline-none "
                                                >
                                                    <option value="" label="User Id" />
                                                    {clientiddata ?.map((item, id) => {
                                                        return <>
                                                            <option value={item} label={item} key={id} />
                                                        </>
                                                    })}
                                                </select>
                                            </div>
                                            {errspreadalldata && (
                                                <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                                                    User Id  Required
                                                </div>
                                            )}

                                        </div>

                                        {/* <div>
                                            <div className="relative w-[300px] border-b border-black ">
                                                <select
                                                    onChange={(e) => ChangeDesignation(e)}
                                                    className=" font-secondaryFont font-medium not-italic text-[14px] leading-[
                                                    37.83px] border-none bg-[#ffffff] w-full focus:outline-none "
                                                >
                                                    <option value="" label="Designation" />
                                                    {rolesdata?.map((item, id) => {
                                                        if (id >= 3)
                                                            return <>
                                                                <option value={[item.name, item._id]} index={item._id} label={item.name} key={id}
                                                                />
                                                            </>
                                                    })}

                                                </select>
                                            </div>
                                            {errdesignation && (
                                                <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                                                    Designation  Required
                                                </div>
                                            )
                                            }
                                        </div> */}


                                        <div className="relative lg:w-[300px] md:w-[230px] sm:w-[140px] ">

                                            <input
                                                id="Designation"
                                                name="Designation"
                                                type="text"
                                                value={designationedata}
                                                onChange={(e) => ChangeDesignation(e)}
                                                className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                                                placeholder="john@doe.com"
                                            />
                                            <label
                                                htmlFor="lastName"
                                                className=" after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                            >
                                                Designation

                                            </label>
                                            {errdesignation && (
                                                <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                                                    {nodesignationedata}
                                                </div>
                                            )
                                            }
                                        </div>
                                    </div>
                                    <div className="flex flex-row  lg:space-x-40 md:space-x-20 sm:space-x-10 pb-[36px]">

                                        <div className=" relative lg:w-[300px] md:w-[230px] sm:w-[140px] ">
                                            <input
                                                id="Email"
                                                type="text"
                                                name="Email"
                                                value={formik.values.Email}
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
                                            {formik.errors.Email && (
                                                <div className="text-red-700 text-xs font-secondaryFont mt-[2px]">
                                                    {formik.errors.Email}{" "}
                                                </div>
                                            )}
                                        </div>
                                        <div className="relative lg:w-[300px] md:w-[230px] sm:w-[140px] ">
                                            <input
                                                id="Password"
                                                name="Password"
                                                type="text"
                                                value={formik.values.Password}
                                                onChange={formik.handleChange}
                                                className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                                                placeholder="john@doe.com"
                                            />
                                            <label
                                                htmlFor="Password"
                                                className=" after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                            >
                                                Password
                                                {/* <span className="text-red-700">*</span> */}
                                            </label>
                                            {formik.errors.Password && (
                                                <div className="text-red-700 text-xs font-secondaryFont mt-[2px]">
                                                    {formik.errors.Password}{" "}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-row  lg:space-x-40 md:space-x-20 sm:space-x-10 pb-[36px]">
                                        <div className="relative lg:w-[300px] md:w-[230px] sm:w-[140px] ">
                                            <input
                                                id="PhoneNumber"
                                                name="PhoneNumber"
                                                type="text"
                                                value={formik.values.PhoneNumber}
                                                onChange={formik.handleChange}
                                                className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                                                placeholder="john@doe.com"
                                            />
                                            <label
                                                htmlFor="PhoneNumber"
                                                className=" after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                            >
                                                Company Contact details
                                                {/* <span className="text-red-700">*</span> */}
                                            </label>
                                            {formik.errors.PhoneNumber && (
                                                <div className="text-red-700 text-xs font-secondaryFont mt-[2px]">
                                                    {formik.errors.PhoneNumber}{" "}
                                                </div>
                                            )}
                                        </div>
                                        <div className=" relative lg:w-[300px] md:w-[230px] sm:w-[140px] " style={{ borderBottom: "1px solid black" }}>
                                            <div className=" ml-[90%]">
                                                <input
                                                    id="AssignProject"
                                                    type="checkbox"
                                                    name="AssignProject"
                                                    // value={assignproject}
                                                    onChange={(e) => setAssignProject(e.target.checked)}
                                                    className="peer h-4 mt-3     w-full border-b font-medium 
                                                font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent 
                                                focus:outline-none focus:border-[#000000]"
                                                    placeholder="Password"
                                                />
                                            </div>
                                            <label
                                                htmlFor="AssignProject"
                                                className=" after:content-['*'] after:ml-0.5 after:text-red-500 
                                                absolute left-0 top-2 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                            >
                                                Assign to all projects

                                            </label>
                                            {/* {formik.errors.CompanyName && (
                                                    <div className="text-red-700 text-xs font-secondaryFont mt-[2px]">
                                                        {formik.errors.CompanyName}{" "}
                                                    </div>
                                                )} */}
                                        </div>
                                    </div>

                                    <div className="flex flex-row  ml-[70%] shadow-[buttonshadow] 
                                     content-center mt-[42px] lg:mr-[-60px]">
                                        <div className="mr-[45px] shadow-[buttonshadow] ">
                                            <button onClick={() => CancelButton()} className="w-[100px] btnshadow  h-[25px] rounded text-sm font-secondaryFont text-[14px] text-center font-medium not-italic items-center  bg-[#F42424] text-[#000000] ">
                                                Cancel
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                className="w-[110px] h-[25px] rounded btnshadow text-sm font-secondaryFont text-[14px] font-medium not-italic  bg-[#0FCC7C] text-[#000000] "
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

export default AddNewUser;