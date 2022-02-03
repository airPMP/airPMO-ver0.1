import React, { useState, useEffect } from 'react'
import Header from '../layout/Header'
import SideBar from '../layout/SideBar'
import { useLocation, useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";

const EditAccess = () => {

    const [title, setTitle] = useState(null);
    const [rolesdata, setRolesData] = useState(null)
    const [permissiondata, setPermissionData] = useState(null)
    const [clinreditcreate, setClientEditCreate] = useState(null)
    const [clientview, setClientView] = useState(null)


    let navigate = useNavigate();
    let urlTitle = useLocation();
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

     
    console.log(rolesdata) 

    return (
        <>
            <div className="flex flex-row justify-start overflow-hidden  ">
                <div>
                    <SideBar />
                </div>
                <div className="flex flex-col">
                    <Header title={title} />
                    {/* <div>
                <SideBar />
            </div>
            <div className="flex flex-col">
                <Header title={title} />
            </div> */}
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
                            {/* <div className="flex items-center mr-[51.5px] ">
                                <div>
                                    <svg width="31" height="21" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.70916 26.5813C5.34682 26.5806 5.00141 26.4278 4.7572 26.1602C4.50848 25.8947 4.3849 25.5357 4.41749 25.1733L4.73395 21.6936L19.353 7.07967L23.9217 11.647L9.30645 26.2596L5.8267 26.5761C5.78666 26.58 5.74662 26.5813 5.70916 26.5813ZM24.8336 10.7338L20.2662 6.16646L23.0059 3.42683C23.2481 3.18429 23.5769 3.048 23.9197 3.048C24.2625 3.048 24.5913 3.18429 24.8336 3.42683L27.5732 6.16646C27.8157 6.40873 27.952 6.73749 27.952 7.08031C27.952 7.42313 27.8157 7.75189 27.5732 7.99417L24.8349 10.7325L24.8336 10.7338Z" fill="#2E3A59" />
                                    </svg>
                                </div>
                                <div style={{ boxShadow: "0px 4px rgba(0, 0, 0, 0.25)" }}
                                    className=" rounded-[0.625rem] w-[120px]  ">
                                    <div className="flex  ">
                                        <svg width="28" height="28" viewBox="0 0 31 31"
                                            fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.7916 16.7917V24.5417H14.2083V16.7917H6.45825V14.2083H14.2083V6.45834H16.7916V14.2083H24.5416V16.7917H16.7916Z" fill="#2E3A59" />
                                        </svg>

                                        <span className="text-[15px] pt-1"> New Roles</span>
                                    </div>

                                </div>
                            </div> */}

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
                                        <br/>
                                        Dashboards 1
                                    </button>
                                </div>
                                <div className="pt-4">
                                    <button className=" bg-[#EDF2F1] text-[13.5px] py-[24px] w-[130px] rounded-[5px]"
                                        style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>

                                        Project
                                        <br/>
                                        Dashboards 2
                                    </button>
                                </div>
                                <div className="pt-4">
                                    <button className=" bg-[#EDF2F1] text-[13.5px] py-[24px] w-[130px] rounded-[5px]"
                                        style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>

                                       Category
                                       <br/>
                                        Dashboards 3
                                    </button>
                                </div>
                            </div>  

                            {/* <div className="col-span-10">
                                <div className="grid-cols-10">  */}
                            <div className="editAccess_flow flex   ">


                                {rolesdata?.map((items, id) => {
                                    return <div className=" p-3   pt-[28.49px]" >

                                          <button className=" bg-[#EDF2F1] text-[13.5px] py-1 w-[155px] rounded-[5px]"
                                            style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}> 
                                            {items.name}
                                        </button>

                                            <div className="mt-[55px]">
                                                <div className="flex">
                                                    <div className="px-[2px]">
                                                        <button
                                                        onClick={(e)=>setClientEditCreate("CREATE-CLIENTS","EDIT-CLIENTS")}
                                                        className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                            style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                            Edit/Create
                                                        </button>
                                                    </div>
                                                    <div className="px-[2px]">
                                                        <button
                                                        onClick={(e)=>setClientView("GET-CLIENTS")}
                                                        className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
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
                                        


                                        {/* <div className="mt-[20px]">
                                    <div className="flex">
                                        <div className="px-[2px]">
                                            <button className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                Edit/Create
                                            </button>
                                        </div>
                                        <div className="px-[2px]">
                                            <button className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
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

                                <div className="mt-[20px]">
                                    <div className="flex">
                                        <div className="px-[2px]">
                                            <button className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                Edit/Create
                                            </button>
                                        </div>
                                        <div className="px-[2px]">
                                            <button className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
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
                                </div> */}

                                    </div>
                                })}
                            </div>
                            {/* <div className="col-span-2     pt-[28.49px]" >
                                <button className=" bg-[#EDF2F1] text-[13.5px] py-1 w-[155px] rounded-[5px]"
                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                    Project&nbsp;Manager
                                </button>
                                <div className="mt-[55px]">
                                    <div className="flex">
                                        <div className="px-[2px]">
                                            <button className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                Edit/Create
                                            </button>
                                        </div>
                                        <div className="px-[2px]">
                                            <button className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
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
                                <div className="mt-[20px]">
                                    <div className="flex">
                                        <div className="px-[2px]">
                                            <button className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                Edit/Create
                                            </button>
                                        </div>
                                        <div className="px-[2px]">
                                            <button className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
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

                                <div className="mt-[20px]">
                                    <div className="flex">
                                        <div className="px-[2px]">
                                            <button className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                Edit/Create
                                            </button>
                                        </div>
                                        <div className="px-[2px]">
                                            <button className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
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
                            <div className="col-span-2     pt-[28.49px]" >
                                <button className=" bg-[#EDF2F1] text-[13.5px] py-1 w-[155px] rounded-[5px]"
                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                    Construction&nbsp;Manager
                                </button>
                                <div className="mt-[55px]">
                                    <div className="flex">
                                        <div className="px-[2px]">
                                            <button className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                Edit/Create
                                            </button>
                                        </div>
                                        <div className="px-[2px]">
                                            <button className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
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
                                <div className="mt-[20px]">
                                    <div className="flex">
                                        <div className="px-[2px]">
                                            <button className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                Edit/Create
                                            </button>
                                        </div>
                                        <div className="px-[2px]">
                                            <button className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
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

                                <div className="mt-[20px]">
                                    <div className="flex">
                                        <div className="px-[2px]">
                                            <button className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                Edit/Create
                                            </button>
                                        </div>
                                        <div className="px-[2px]">
                                            <button className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
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
                            <div className="col-span-2     pt-[28.49px]" >
                                <button className=" bg-[#EDF2F1] text-[13.5px] py-1 w-[155px] rounded-[5px]"
                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                    Project&nbsp;Engineer
                                </button>
                                <div className="mt-[55px]">
                                    <div className="flex">
                                        <div className="px-[2px]">
                                            <button className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                Edit/Create
                                            </button>
                                        </div>
                                        <div className="px-[2px]">
                                            <button className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
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
                                <div className="mt-[20px]">
                                    <div className="flex">
                                        <div className="px-[2px]">
                                            <button className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                Edit/Create
                                            </button>
                                        </div>
                                        <div className="px-[2px]">
                                            <button className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
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

                                <div className="mt-[20px]">
                                    <div className="flex">
                                        <div className="px-[2px]">
                                            <button className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                Edit/Create
                                            </button>
                                        </div>
                                        <div className="px-[2px]">
                                            <button className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
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
                            <div className="col-span-2     pt-[28.49px]" >
                                <button className=" bg-[#EDF2F1] text-[13.5px] py-1 w-[155px] rounded-[5px]"
                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                    Lead&nbsp;Planning&nbsp;Engineer
                                </button>
                                <div className="mt-[55px]">
                                    <div className="flex">
                                        <div className="px-[2px]">
                                            <button className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                Edit/Create
                                            </button>
                                        </div>
                                        <div className="px-[2px]">
                                            <button className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
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
                                <div className="mt-[20px]">
                                    <div className="flex">
                                        <div className="px-[2px]">
                                            <button className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                Edit/Create
                                            </button>
                                        </div>
                                        <div className="px-[2px]">
                                            <button className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
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

                                <div className="mt-[20px]">
                                    <div className="flex">
                                        <div className="px-[2px]">
                                            <button className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                Edit/Create
                                            </button>
                                        </div>
                                        <div className="px-[2px]">
                                            <button className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
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
                            </div> */}
                            {/* </div>
                            </div> */}
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
