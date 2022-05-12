import React, { useState, useEffect } from 'react'

import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import Popup from "reactjs-popup";
import Header from '../layout/Header'
import SideBar from '../layout/SideBar'
import { useLocation, useNavigate, Link } from "react-router-dom";
import { getUserApi, getRoleApi } from '../../AllApi/Api'

const UserRole1 = () => {

    const [title, setTitle] = useState(null);
    const [userdata, setUserData] = useState(null);
    const [deleteid, setDeleteId] = useState(null);
    const [rolesdata, setRolesData] = useState([]);
  

    const [employeeid, setEmployeeId] = useState(null);
    const [employeedesignation, setEmployeeDesignation] = useState(null);
    const [emailid, setEmailId] = useState(null);
    const [editopen, setEditOpen] = useState(false);


    const [open, setOpen] = useState(false);

    let navigate = useNavigate();
    let urlTitle = useLocation();


    useEffect(() => {

        if (urlTitle.pathname === "/UserManagement/UserRole2") {
            setTitle("User Mgmt");
        }

        const userData = getUserApi().then((data) => {
            setUserData(data?.data)
        })

        const rolesData = getRoleApi().then((data) => {
            setRolesData(data?.data)
        })

    }, [urlTitle.pathname])


    const DeleteProfile = (e) => {

        setDeleteId(e)
        setOpen(o => !o)
    }

    const CancelButton = (e) => {
        setOpen(o => !o)
    }

    const conformDelete = () => {

        const token = reactLocalStorage.get("access_token", false);
        const feach = async () => {
            try {
                const data = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/users/${deleteid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                if (data?.status === 200) {

                    window.location.reload(false);
                }
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        feach();
        setOpen(o => !o)
    }

    const EditProfile = (e, alldata) => {
        setEmployeeId(alldata?.employee_id) 
        setEmailId(alldata.hour) 
        setEmployeeDesignation(alldata.designation)
         

        setEditOpen(true)
    }



    console.log(userdata)


    return (
        <>
            <div className="flex flex-row justify-start overflow-hidden">
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
                    <div className=" flex flex-col max-w-[1099px] rounded-[31.529px] mh-[632.01px] mt-[105.49px] ml-[38px] 
        bg-[#FFFFFF]    ">
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
                                    Users
                                </div>
                            </div>
                            <div style={{ boxShadow: "0px 4px rgba(0, 0, 0, 0.25)" }}
                                className="mt-[73.07px] basic-1/4 flex flex-row  items-center mr-[51.5px] 
                       bg-[#FFFFFF] rounded-[0.625rem]   "
                            >
                                <div className="pt-[4.64px] pl-[16.6px]">
                                    <svg

                                        width="11"
                                        height="12"
                                        viewBox="0 0 11 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle
                                            cx="5"
                                            cy="5"
                                            r="4.3"
                                            stroke="#1B2559"
                                            strokeWidth="1.4"
                                        />
                                        <line
                                            x1="10.0101"
                                            y1="11"
                                            x2="8"
                                            y2="8.98995"
                                            stroke="#1B2559"
                                            strokeWidth="1.4"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                                <div className="bg-[#FFFFFF] pl-[9.64px] mb-[10.44] ">
                                    <input
                                        type="text"
                                        placeholder="Search "
                                        className="outline-none w-[273.87px] h-[36.94px]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pl-[143.96px] pr-[53.84px] pt-[28.49px] pb-[20px]" >
                            <table className="table-auto   text-center font-secondaryFont text-[#000000]
                              font-normal not-italic text-[12px " style={{ width: "100%" }}>

                                <tr className="max-h-[52.84px] text-center  ">
                                    <th className="w-[10%] py-[13px]">User ID</th>
                                    <th className="w-[25%] py-[13px]">Designation</th>
                                    <th className="w-[30%] py-[13px]">Email</th>
                                    <th className="w-[10%] py-[13px]">Actions</th>
                                </tr>


                                {userdata?.slice(0).map((item, id) => {


                                    return <tbody className="  mb-[10px]   " key={id}>
                                        <tr className=" cursor-pointer  bg-[#ECF1F0] text-[#8F9BBA] text-[14.0447px]  "
                                        // onClick={() => { navigate("/UserManagement/UserRole1/Details") }}
                                        >
                                            <td className="pt-[15px] pb-[14.83px]">{item?.spread_sheet_user_id} </td>
                                            <td className="pt-[15px] pb-[14.83px]">{item?.designation}</td>
                                            <td className="pt-[15px] pb-[14.83px]">{item?.Email}</td>
                                            <td className="pt-[15px] pb-[14.83px]">
                                                <div className="flex flex-row justify-center  space-x-xl">
                                                    <div onClick={(e) => EditProfile(e, item)} className="hidden"  >
                                                        <svg
                                                            width="19"
                                                            height="20"
                                                            viewBox="0 0 19 20"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M1.41999 19.0853C1.13948 19.0848 0.872062 18.9665 0.682993 18.7593C0.490439 18.5537 0.394758 18.2758 0.419993 17.9953L0.664993 15.3013L11.983 3.98725L15.52 7.52325L4.20499 18.8363L1.51099 19.0813C1.47999 19.0843 1.44899 19.0853 1.41999 19.0853ZM16.226 6.81625L12.69 3.28025L14.811 1.15925C14.9986 0.971476 15.2531 0.865967 15.5185 0.865967C15.7839 0.865967 16.0384 0.971476 16.226 1.15925L18.347 3.28025C18.5348 3.46782 18.6403 3.72234 18.6403 3.98775C18.6403 4.25316 18.5348 4.50769 18.347 4.69525L16.227 6.81525L16.226 6.81625Z"
                                                                fill="#0FCC7C"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div onClick={(e) => DeleteProfile(item._id)}>
                                                        <svg
                                                            width="18"
                                                            height="21"
                                                            viewBox="0 0 18 21"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M14 20.5063H4C2.89543 20.5063 2 19.6109 2 18.5063V5.50635H0V3.50635H4V2.50635C4 1.40178 4.89543 0.506348 6 0.506348H12C13.1046 0.506348 14 1.40178 14 2.50635V3.50635H18V5.50635H16V18.5063C16 19.6109 15.1046 20.5063 14 20.5063ZM4 5.50635V18.5063H14V5.50635H4ZM6 2.50635V3.50635H12V2.50635H6ZM12 16.5063H10V7.50635H12V16.5063ZM8 16.5063H6V7.50635H8V16.5063Z"
                                                                fill="#F42424"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-[10px]"></td>
                                        </tr>
                                    </tbody>
                                })}

                            </table>
                            <div className="flex  float-right ">
                                <div style={{ boxShadow: "0px 4px rgba(0, 0, 0, 0.25)" }}
                                    className=" rounded-[0.625rem] w-[120px]  ">
                                    <div className="flex  ">
                                        <svg width="31" height="31" viewBox="0 0 31 31"
                                            fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.7916 16.7917V24.5417H14.2083V16.7917H6.45825V14.2083H14.2083V6.45834H16.7916V14.2083H24.5416V16.7917H16.7916Z" fill="#2E3A59" />
                                        </svg>

                                        <span className="text-[15px] pt-1">
                                            <Link to={`/UserManagement/AddNewUser`}>
                                                New User
                                            </Link></span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Popup
                open={open}
                position="right center"
                model
            >
                <div className="p-7">
                    <div className="flex pb-3">
                        <div>

                        </div>
                        <div style={{ marginLeft: "90%" }}>
                            <span className="text-[red] text-[19px] cursor-pointer" onClick={(e) => CancelButton(e)} >
                                <b>X</b>
                            </span>
                        </div>
                    </div>
                    <div className="mt-3">
                        <h3>
                            Are You sure You Want to Delete
                        </h3>
                    </div>
                    <div className="w-[70px]  selection: text-center border-[1px] border-solid border-[#000000] rounded bg-[#09a061] mt-[30px]">
                        <button
                            onClick={(e) => conformDelete(e)}
                            className="  h-[37px] font-mainFont text-[15px] 
                            font-normal not-italic leading-[18px]  w-[70px] text-[#ffffff] ">
                            Yes
                        </button>
                    </div>
                </div>

            </Popup>

            <div>
            <Popup
                    open={editopen}
                    position="right center"
                    model
                    className="jobCard_popup"
                >
                    <div className="p-4 jobCard_popup">
                        
                        <div className=" grid grid-cols-4 p-4 gap-3">
                            <div className="col-span-2    " style={{ borderBottom: "2px solid  black" }}>
                                <label className="text-[14px]  text-[#aaa]" >User Id</label>
                                <p className="text-[18px]  text-[#aaa]" >
                                    {/* {timesheetname} */}
                                    </p>
                            </div>
                            <div className="col-span-2 pt-4">
                                <input
                                    id="FirstName"
                                    name="FirstName"
                                    type="text"
                                    // value={timesheethours}
                                    // onChange={(e) => setTimeSheetHours(e.target.value)}
                                    className="  h-10 w-full border-b
                     font-medium font-secondaryFont border-[#6d6c6c] text-gray-900
                       focus:outline-none focus:border-[#5e5d5d]"
                                    placeholder="Designation"
                                />

                            </div>
                        </div>
                        <div className="p-4">
                            <input
                                id="FirstName"
                                name="FirstName"
                                type="text"
                                // value={timesheetremark}
                                // onChange={(e) => setTimeSheetRemark(e.target.value)}
                                className="  h-10 w-full border-b
                     font-medium font-secondaryFont border-[#6d6c6c] text-gray-900
                       focus:outline-none focus:border-[#5e5d5d]"
                                placeholder="Email"
                            />
                        </div>

                        <div className="mt-10  float-right ">
                            <button className="  text-[#4b75e7] text-[15px]   rounded-[5px] p-2"
                                onClick={(e) => setEditOpen(false)}
                                >
                                CANCEL
                            </button>
                            <button className=" text-[#4b75e7] text-[15px]   rounded-[5px] p-2"
                                // onClick={(e) => EditAddToList(e)}
                                >
                                 EDIT DONE
                            </button>
                        </div>
                    </div>

                </Popup>
            </div>
        </>
    )
}

export default UserRole1
