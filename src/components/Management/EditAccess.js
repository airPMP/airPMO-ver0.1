import React, { useState, useEffect, useLayoutEffect } from 'react'
import Header from '../layout/Header'
import SideBar from '../layout/SideBar'
import { useLocation, useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { useToasts } from "react-toast-notifications";
import axios from "axios";

const EditAccess = () => {

    const [title, setTitle] = useState(null);
    const [rolesdata, setRolesData] = useState(null)
    const [permissiondata, setPermissionData] = useState(null)
    const [clientid, setClientId] = useState(null) //don't remove this state its very important  

    let navigate = useNavigate();
    let urlTitle = useLocation();
    const { addToast } = useToasts();



    useEffect(() => {

        if (urlTitle.pathname === "/UserManagement/EditAccess") {
            setTitle("User Mgmt");
        }

        const token = reactLocalStorage.get("access_token", false);
        const feachRolls = async () => {
            try {
                const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/roles/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setRolesData(data?.data)
            } catch (error) {
                console.log(error)
            }
        }
        feachRolls();

        const feachPermission = async () => {
            try {
                const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/permission/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                setPermissionData(data?.data)
            } catch (error) {
                console.log(error)
            }
        }
        feachPermission();



    }, [urlTitle.pathname])




    const ClientView = (e, id) => {

        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission[2] === `VIEW-CLIENTS`) {
                    return item.permission[2] = ''
                }
                else {
                    return item.permission[2] = `VIEW-CLIENTS`
                }
            }
            else {
                return "nothing"
            }

        })
        setClientId(e)
    }


    const ClientEditCreate = (e, id) => {

        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission[0] === `CREATE-CLIENTS`) {
                    return item.permission[0] = '', item.permission[1] = ''
                }
                else {
                    return item.permission[0] = `CREATE-CLIENTS`, item.permission[1] = `EDIT-CLIENTS`
                }
            }
            else {
                return "nothing"
            }
        })
        setClientId(e)
        // setClientEditCreate(o => !o)
        // if (clinreditcreate === true) {
        //     setClientEditData(`"EDIT-CLIENTS","CREATE-CLIENTS"`)
        // }
        // else {
        //     setClientEditData(null)
        // } 
        // let data_1 = []
        // data_1 = rolesdata?.filter((data, id) => {
        //     if (isNaN(+e)) {
        //         return data?._id?.search(e) !== -1;
        //     }
        // })
        // const ClickClientId = data_1.map((items, id) => {
        //     // return items._id
        //     return items.permission[0]
        // })  
        // SetColorId(ClickClientId[0]) 
        // if (clinreditcreate === "#0FCC7C") {
        //     setClientEditCreate('#ffffff')
        //     // setClientEditData(`"EDIT-CLIENTS","CREATE-CLIENTS"`)
        // }
        // else if (clinreditcreate === "#ffffff") {
        //     setClientEditCreate('#0FCC7C')
        //     // setClientEditData(null)
        // }
        // let CleintData = {
        //     'id': e,
        //     'permission': [clinreditdata, clientviewdata]
        // }
        // setdata2(CleintData)
        // setdata1([...data1, data2])

        // let savedata = data1?.map((items, id) => {
        //     return items?.id
        // })  
        // setActiveButon(savedata)
        // setActiveButonSave(...activebuttonsave, activebutton)
    }

    const ProjectEditCreate = (e, id) => {
        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission[3] === `CREATE-PROJECT`) {
                    return item.permission[3] = '', item.permission[4] = ''
                }
                else {
                    return item.permission[3] = `CREATE-PROJECT`, item.permission[4] = `EDIT-PROJECT`
                }
            }
            else {
                return "nothing"
            }
        })
        setClientId(e)
    }


    const ProjectView = (e, id) => {
        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission[5] === `VIEW-PROJECT`) {
                    return item.permission[5] = ''
                }
                else {
                    return item.permission[5] = `VIEW-PROJECT`
                }
            }
            else {
                return "nothing"
            }

        })
        setClientId(e)
    }


    const CategoryEditCreate = (e, id) => {
        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission[6] === `CREATE-CATEGORY`) {
                    return item.permission[6] = '', item.permission[7] = ''
                }
                else {
                    return item.permission[6] = `CREATE-CATEGORY`, item.permission[7] = `EDIT-CATEGORY`
                }
            }
            else {
                return "nothing"
            }
        })
        setClientId(e)
    }


    const CategoryView = (e, id) => {
        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission[8] === `VIEW-CATEGORY`) {
                    return item.permission[8] = ''
                }
                else {
                    return item.permission[8] = `VIEW-CATEGORY`
                }
            }
            else {
                return "nothing"
            }

        })
        setClientId(e)
    }

    console.log(rolesdata)

    const SavePermission = () => { 

        let roles_all_data = rolesdata?.map((item, id) => {
            return {
                "id": item?._id,
                "permission":item?.permission
            }
        }) 



        const token = reactLocalStorage.get("access_token", false);
        const feachPermission = async () => {

            try {
                const data = await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/update_roles_permission/`, {
                    roles_permission: roles_all_data
                    
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                console.log(data)
                if (data?.status === 200) {
                    addToast("All Permission Assign Sucessfully", {
                        appearance: "success",
                        autoDismiss: true,
                    }) 
                }

            } catch (error) {
                console.log(error)
            }
        }
        feachPermission();
    
    }

    return (
        <>
            <div className="flex flex-row justify-start overflow-hidden  ">
                <div>
                    <SideBar />
                </div>
                <div className="flex flex-col">
                    <Header title={title} />

                    <div className=" flex flex-col  w-[100%] rounded-[31.529px]  
                    mh-[632.01px] mt-[105.49px] ml-[38px]  pb-10
                      bg-[#FFFFFF]   ">
                        <div className="flex flex-row justify-between">
                            <div className="flex">
                                <div className=" ml-[26.8px] mt-[31.94px]   h-[88.28px] w-[88.28px] bg-[#F4F7FE] rounded-[50%]">
                                    <img
                                        src="/Group8.png"
                                        alt="logo"
                                        className="ml-[23px] mt-[16.57px] h-[44px]  w-[42.79px]"
                                    />
                                </div>
                                <div className="font-secondaryFont font-medium not-italic text-[28.09px] 
                                   leading-[37.83px] text-[#000000] mt-[51.51px] ml-[27.92px] ">
                                    Edit Access
                                </div>
                            </div>

                        </div>

                        <div
                            className="grid grid-cols-12    "
                        >
                            <div className="col-span-2   pl-4 mt-[70px]">
                                <div className=" ml-[20px]">

                                    Dashboards
                                </div>
                                <div className="pt-4">
                                    <button className=" bg-[#EDF2F1] text-[13.5px] py-[24px] w-[130px] rounded-[5px]"
                                        style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>

                                        Client
                                        <br />
                                        Dashboards 1
                                    </button>
                                </div>
                                <div className="pt-10">
                                    <button className=" bg-[#EDF2F1] text-[13.5px] py-[24px] w-[130px] rounded-[5px]"
                                        style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>

                                        Project
                                        <br />
                                        Dashboards 2
                                    </button>
                                </div>
                                <div className="pt-10">
                                    <button className=" bg-[#EDF2F1] text-[13.5px] py-[24px] w-[130px] rounded-[5px]"
                                        style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>

                                        Category
                                        <br />
                                        Dashboards 3
                                    </button>
                                </div>
                            </div>
                            <div className="col-span-10 editAccess_flow ">
                                <div className=" flex">
                                    {rolesdata?.map((items, id) => {
                                        if (id >= 4) {
                                            return <div className=" p-3   pt-[28.49px]" key={id}>

                                                <button className=" bg-[#EDF2F1] text-[13.5px] py-1 w-[155px] rounded-[5px]"
                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                    {items.name}
                                                </button>

                                                <div className="mt-[55px]">
                                                    <div className="flex">
                                                        <div className="px-[2px]">
                                                            <button
                                                                // bg-[${clinreditcreate}]
                                                                // onClick={(e) => setClientEditCreate(`"CREATE-CLIENTS", "EDIT-CLIENTS"${items._id}`)}
                                                                onClick={(e) => ClientEditCreate(e, items._id)}
                                                                className={` 
                                                            ${items.permission[0] === `CREATE-CLIENTS` ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} 
                                                             text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                Edit/Create
                                                            </button>
                                                        </div>
                                                        <div className="px-[2px]">
                                                            <button
                                                                onClick={(e) => ClientView(e, items._id)}
                                                                className={`${items.permission[2] === `VIEW-CLIENTS` ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                View
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="flex mt-3">
                                                        <div className="px-[2px]">
                                                            <button className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                Comment
                                                            </button>
                                                        </div>
                                                        <div className="px-[2px]">
                                                            <button className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                Approve
                                                            </button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    })}
                                </div>

                                <div>
                                    <div className="flex">
                                        {rolesdata?.map((items, id) => {
                                            if (id >= 4) {
                                                return <div className=" p-3    " key={id}>

                                                    {/* <button className=" bg-[#EDF2F1] text-[13.5px] py-1 w-[155px] rounded-[5px]"
                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                    {items.name}
                                                </button> */}

                                                    <div className=" ">
                                                        <div className="flex">
                                                            <div className="px-[2px]">
                                                                <button
                                                                    // bg-[${clinreditcreate}]
                                                                    // onClick={(e) => setClientEditCreate(`"CREATE-CLIENTS", "EDIT-CLIENTS"${items._id}`)}
                                                                    onClick={(e) => ProjectEditCreate(e, items._id)}
                                                                    className={` 
                                                            ${items.permission[3] === `CREATE-PROJECT` ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} 
                                                             text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Edit/Create
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => ProjectView(e, items._id)}
                                                                    className={`${items.permission[5] === `VIEW-PROJECT` ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    View
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="flex mt-3">
                                                            <div className="px-[2px]">
                                                                <button className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Comment
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Approve
                                                                </button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        })}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex mt-5">
                                        {rolesdata?.map((items, id) => {
                                            if (id >= 4) {
                                                return <div className=" p-3    " key={id}>

                                                    {/* <button className=" bg-[#EDF2F1] text-[13.5px] py-1 w-[155px] rounded-[5px]"
                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                    {items.name}
                                                </button> */}

                                                    <div className=" ">
                                                        <div className="flex">
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => CategoryEditCreate(e, items._id)}
                                                                    className={` 
                                                                    ${items.permission[6] === `CREATE-CATEGORY` ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} 
                                                                     text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Edit/Create
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => CategoryView(e, items._id)}
                                                                    className={`${items.permission[8] === `VIEW-CATEGORY` ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    View
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="flex mt-3">
                                                            <div className="px-[2px]">
                                                                <button className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Comment
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Approve
                                                                </button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div className="flex mt-10  ml-[70%]  ">
                            <div className="mr-[45px] shadow-[buttonshadow] ">
                                <button
                                    // onClick={() => { naviagte("/master/projects") }}
                                    className="w-[100px] btnshadow  h-[25px] rounded text-sm font-secondaryFont text-[14px] text-center font-medium not-italic items-center  bg-[#F42424] text-[#000000] ">
                                    Cancel
                                </button>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    onClick={(e) => SavePermission(e)}
                                    className="w-[110px] h-[25px] rounded btnshadow   text-sm font-secondaryFont text-[14px] font-medium not-italic  bg-[#0FCC7C] text-[#000000] "
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditAccess
