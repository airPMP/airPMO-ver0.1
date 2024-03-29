import React, { useState, useEffect } from 'react'
import Header from '../layout/Header'
import SideBar from '../layout/SideBar'
import { useLocation, useNavigate, Link } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import Popup from "reactjs-popup";

const UserRole1 = () => {

    const [title, setTitle] = useState(null);
    const [rolesdata, setRolesData] = useState(null)
    const [deleteid, setDeleteId] = useState(null);
    const [open, setOpen] = useState(false);
    const [allpermission, setAllPermission] = useState(null)
    const [editpermission, setEditPermission] = useState(null)
    const [createpermission, setCreatePermission] = useState(null)
    const [viewpermission, setViewPermission] = useState(null)
    const [allpermissions, setAllPermissions] = useState(null)
    let navigate = useNavigate();
    let urlTitle = useLocation();

    useEffect(() => {

        if (urlTitle.pathname === "/UserManagement/UserRole") {
            setTitle("User Mgmt");
        }
        const token = reactLocalStorage.get("access_token", false);
        const feach = async () => {
            try {
                const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/roles/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setRolesData(data?.data);
            } catch (error) {
                console.log(error);
            }
        }
        feach();
    }, [urlTitle.pathname])

    const DeleteProfile = (e) => {
        setDeleteId(e);
        setOpen(o => !o);
    }

    const conformDelete = () => {

        const token = reactLocalStorage.get("access_token", false);
        const feach = async () => {
            try {
                const data = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/roles/${deleteid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                if (data?.status === 200) {

                    window.location.reload(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
        feach();
        setOpen(o => !o);
    }

    const CancelButton = (e) => {
        setOpen(o => !o);
    }

    useEffect(() => {
        const permissionData = reactLocalStorage.get("permisions", false);
        setAllPermission(permissionData);
        getPermision();
      }, [allpermission]);
    
      const getPermision = async () => {
    
        const url_data = await allpermission
        const database = url_data?.split(',')
    
        let value = "EDIT-ROLES".toUpperCase();
        let result = []
        result = database?.filter((data) => {
          if (isNaN(+value)) {
            return data?.toUpperCase().search(value) !== -1;
          }
        });

        let value1 = "CREATE-ROLES".toUpperCase();
        let result1 = []
        result1 = database?.filter((data) => {
          if (isNaN(+value)) {
            return data?.toUpperCase().search(value1) !== -1;
          }
        });
    
        let value2 = "GET-ROLES".toUpperCase();
        let result2 = []
        result2 = database?.filter((data) => {
          if (isNaN(+value)) {
            return data?.toUpperCase().search(value2) !== -1;
          }
        });
    
        if (result[0] === "EDIT-ROLES" ||
          result1[0] === "CREATE-ROLES" ||
          result2[0] === "GET-ROLES") {
          setEditPermission(result[0]);
          setCreatePermission(result1[0]);
          setViewPermission(result2[0]);
        }
        else {
          let value = "ALL".toUpperCase();
          let result = []
          result = database?.filter((data) => {
            if (isNaN(+value)) {
              return data?.toUpperCase().search(value) !== -1;
            }
          });
          setAllPermissions(result[0]);
        }
      }

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
        bg-[#FFFFFF]">
                        <div className="flex flex-row justify-between">
                            <div className="flex">
                                {/* <Link to={`/UserManagement/AddUserRole`}> */}
                                <div className=" ml-[26.8px] mt-[31.94px]   h-[88.28px] w-[88.28px] bg-[#F4F7FE] rounded-[50%]">
                                    <img
                                        src="/Group8.png"
                                        alt="logo"
                                        className="ml-[23px] mt-[16.57px] h-[44px]  w-[42.79px]"
                                    />
                                </div>
                                <div className="font-secondaryFont font-medium not-italic text-[28.09px] 
                                   leading-[37.83px] text-[#000000] mt-[51.51px] ml-[27.92px] ">
                                    Users Roles
                                </div>
                                {/* </Link> */}
                            </div>
                            <div className="flex items-center mr-[51.5px] ">
                                <div className="pt-[10px] pr-[8px]">
                                    <Link to={`/UserManagement/EditAccess`}>
                                        <svg width="31" height="21" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.70916 26.5813C5.34682 26.5806 5.00141 26.4278 4.7572 26.1602C4.50848 25.8947 4.3849 25.5357 4.41749 25.1733L4.73395 21.6936L19.353 7.07967L23.9217 11.647L9.30645 26.2596L5.8267 26.5761C5.78666 26.58 5.74662 26.5813 5.70916 26.5813ZM24.8336 10.7338L20.2662 6.16646L23.0059 3.42683C23.2481 3.18429 23.5769 3.048 23.9197 3.048C24.2625 3.048 24.5913 3.18429 24.8336 3.42683L27.5732 6.16646C27.8157 6.40873 27.952 6.73749 27.952 7.08031C27.952 7.42313 27.8157 7.75189 27.5732 7.99417L24.8349 10.7325L24.8336 10.7338Z" fill="#2E3A59" />
                                        </svg>
                                    </Link>
                                </div>
                                <Link to={createpermission || allpermissions ?`/UserManagement/AddUserRole`: `/UserManagement/UserRole`}>
                                    <div style={{ boxShadow: "0px 4px rgba(0, 0, 0, 0.25)" }}
                                        className={`${createpermission === "CREATE-ROLES" || allpermissions === "ALL" ? "cursor-pointer" : "  disabledclass"}
                                         rounded-[0.625rem] w-[120px]  `}>
                                        <div className="flex  ">
                                            <svg width="28" height="28" viewBox="0 0 31 31"
                                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.7916 16.7917V24.5417H14.2083V16.7917H6.45825V14.2083H14.2083V6.45834H16.7916V14.2083H24.5416V16.7917H16.7916Z" fill="#2E3A59" />
                                            </svg>
                                            <span className="text-[15px] pt-1"> New Roles</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                        </div>
                        <div className="pl-[143.96px] pr-[53.84px] pt-[28.49px]" >
                            <table className="table-auto   text-center font-secondaryFont text-[#000000]
                         font-normal not-italic text-[12px " style={{ width: "100%" }}>
                                <tr className="max-h-[52.84px] text-center  " >
                                    {/* <th className="w-[10%] py-[13px]">Name</th> */}
                                    <th className="w-[10%] py-[13px]">Role</th>
                                    <th className="w-[25%] py-[13px]">Discription</th>
                                    {/* <th className="w-[25%] py-[13px]">Mobile</th> */}
                                    <th className="w-[10%] py-[13px]">Actions</th>
                                </tr>

                                {rolesdata?.slice(0).map((item, i) => {
                                        return <tbody className="mb-[10px]">
                                            <tr className=" cursor-pointer  bg-[#ECF1F0] text-[#8F9BBA] text-[14.0447px]" >
                                                {/* <td className="pt-[15px] pb-[14.83px]">{item.name} </td> */}
                                                <td className="pt-[15px] pb-[14.83px]">{item.name}</td>
                                                <td className="pt-[15px] pb-[14.83px]">{item.description}</td>
                                                {/* <td className="pt-[15px] pb-[14.83px]">{item.mobile}</td> */}
                                                <td className="pt-[15px] pb-[14.83px]">
                                                    <div className="flex flex-row justify-center  space-x-xl">
                                                        {/* <div>
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
                                                    </div> */}
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
        </>
    )
}

export default UserRole1
