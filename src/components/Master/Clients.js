import React, { useState, useEffect } from 'react'
import SideBar from '../layout/SideBar';
import axios from "axios";
import Header from '../layout/Header';
import { reactLocalStorage } from "reactjs-localstorage";
import { useLocation, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";

const Clients = ({ addNewCliient }) => {

  const [title, setTitle] = useState(null);
  const [clientdata, setClientData] = useState(null)
  const [filteredData, setFilteredData] = useState(clientdata);
  const [delconfom, seDelConfom] = useState(false)
  const [deleteid, setDeleteId] = useState(null);
  const [open, setOpen] = useState(false);

  const [allpermission, setAllPermission] = useState(null)
  const [editpermission, setEditPermission] = useState(null)
  const [createpermission, setCreatePermission] = useState(null)
  const [deletePermission,setDeletePermission] = useState(null)
  const [viewpermission, setViewPermission] = useState(null)
  const [allpermissions, setAllPermissions] = useState(null)

  let urlTitle = useLocation();
  let navigate = useNavigate();

  useEffect(() => {

    if (urlTitle.pathname === "/master/clients") {
      setTitle("Master");
    }

    const token = reactLocalStorage.get("access_token", false);

    const feach = async () => {
      try {
        const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/client`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setFilteredData(data?.data)
        setClientData(data?.data)
      } catch (error) {
        console.log(error)
      }
    }
    feach();
    handleSearch()

  }, [urlTitle.pathname])

  useEffect(() => {
    const permissionData = reactLocalStorage.get("permisions", false);
    setAllPermission(permissionData)

    getPermision()
  }, [allpermission])


  const getPermision = async () => {

    const url_data = await allpermission
    const database = url_data.split(',')

    let value = "EDIT-CLIENTS".toUpperCase();
    let result = []
    result = database?.filter((data) => {
      if (isNaN(+value)) {
        return data?.toUpperCase().search(value) !== -1;
      }
    });


    let value1 = "CREATE-CLIENTS".toUpperCase();
    let result1 = []
    result1 = database?.filter((data) => {
      if (isNaN(+value)) {
        return data?.toUpperCase().search(value1) !== -1;
      }
    });

    let value2 = "GET-CLIENTS".toUpperCase();
    let result2 = []
    result2 = database?.filter((data) => {
      if (isNaN(+value)) {
        return data?.toUpperCase().search(value2) !== -1;
      }
    });

    let value3 = "DELETE-CLIENTS".toUpperCase();
    let result3 = []
    result3 = database?.filter((data) => {
      if (isNaN(+value)) {
        return data?.toUpperCase().search(value3) !== -1;
      }
    });








    if (result[0] === "EDIT-CLIENTS" ||
      result1[0] === "CREATE-CLIENTS" ||
      result2[0] === "GET-CLIENTS" ||
      result3[0] === "DELETE-CLIENTS") {
      setEditPermission(result[0])
      setCreatePermission(result1[0])
      setViewPermission(result2[0])
      setDeletePermission(result3[0])
    }
    else {
      let value = "ALL".toUpperCase();
      let result = []
      result = database?.filter((data) => {
        if (isNaN(+value)) {
          return data?.toUpperCase().search(value) !== -1;
        }
      });
      setAllPermissions(result[0])
    }

  }


  const handleSearch = (e) => {

    let value = e?.target?.value?.toUpperCase();
    let result = []
    console.log("functiom iahsdi")
    result = clientdata?.filter((data) => {
      if (isNaN(+value)) {
        return data?.client_name?.toUpperCase().search(value) !== -1;
      }
    });

    setFilteredData(result)

    if (value === "") {
      setFilteredData(clientdata)
    }
  }

  const AddClient = () => {
    if (createpermission === "CREATE-CLIENTS" || allpermissions === "ALL") {
      navigate("/master/clients/new_client")
    }
  }

  const EditProfile = (e) => {
    if (editpermission === "EDIT-CLIENTS" || allpermissions === "ALL") {
      navigate(`/master/edit_client/${e}`)
    }
  }

  const DeleteProfile = (e) => {
    if(deletePermission === "DELETE-CLIENTS" || allpermission === "ALL"){
      setDeleteId(e)
      setOpen(o => !o)

    }
  }

  const conformDelete = () => {

    const token = reactLocalStorage.get("access_token", false);
    const feach = async () => {
      try {
        const data = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/client/${deleteid}`, {
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

  const CancelButton = (e) => {
    setOpen(o => !o)
  }

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
              <div className="flex space-x-[27.92px] self-center">
                <div className="bg-[#F4F7FE] w-[68.28px] flex items-center justify-center h-[68.28px]  rounded-full">
                  <img
                    src="/Group8.png"
                    alt="logo"
                    width="42.79px"
                    height="44px"
                    className="content-center"
                  />
                </div>
                <div className="font-secondaryFont font-medium not-italic mt-[10px] text-[28.09px] leading-[37.83px] text-[#000000] ">
                  Clients
                </div>
              </div>
              <div
                style={{ boxShadow: "0px 4px rgba(0, 0, 0, 0.25)" }}
                className=" basic-1/4 flex flex-row  items-center w-[273.87px] h-[36.94px] bg-[#FFFFFF] rounded-[0.625rem] px-[20px] "
              >
                <div>
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
                <div className="bg-[#FFFFFF] pl-[7px]">
                  <input
                    onChange={(e) => handleSearch(e)}
                    type="text"
                    placeholder="Search for user"
                    className="outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row space-x-sm justify-end items-center mt-[10px] bg-[#FFFFFF]">
              <div
                style={{ boxShadow: "0px 4px rgba(0, 0, 0, 0.25)" }}
                className={`${createpermission === "CREATE-CLIENTS" || allpermissions === "ALL" ? "cursor-pointer" : "  disabledclass"}
                flex items-center space-x-sm px-2 rounded cursor-pointer`}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 8V14H6V8H0V6H6V0H8V6H14V8H8Z" fill="#2E3A59" />
                </svg>

                <div onClick={() => AddClient()}>Add Client</div>
              </div>
            </div>
            <div className="pl-[80px] mt-[16px]">
              <table className="table-auto pt-[24px] w-[100%] ">
                <thead className="font-secondaryFont text-[#000000] font-normal not-italic text-[12px] leading-[20px] tracking-[-2%] py-[36px] ">
                  <tr className="h-[52.84px] text-center ">
                    <td className="w-[15%]">Logo</td>
                    <td className="w-[20%]">Name</td>
                    <td className="w-[40%]">Location</td>
                    <td className="w-[25%] ">Actions</td>
                  </tr>
                </thead>
                {
                  filteredData?.map((item, i) => {
                    return <tbody key={i} className="font-secondaryFont  text-[#000000] font-normal not-italic text-[12px] leading-[20px] tracking-[-2%]">
                      <tr className="bg-[#ECF1F0] text-center">
                        <td className="w-[15%]  ">
                          <center>
                            <img src={item?.upload_logo_file}
                              style={{ width: "53px", height: "53px", borderRadius: "50%" }} />

                          </center>

                        </td>
                        <td className="w-[20%]">{item?.client_name}</td>
                        <td className="w-[40%]">{item?.location}</td>
                        <td className="w-[25%]">
                          <div className="flex flex-row space-x-xl justify-center">
                            <div className={`${editpermission === "EDIT-CLIENTS" || allpermissions === "ALL" ? "cursor-pointer" : "disabledclass"}`}
                              onClick={(e) => EditProfile(item._id)}>
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
                            <div className={`${deletePermission === "DELETE-CLIENTS" || allpermissions === "ALL" ? "cursor-pointer" : "disabledclass"}`}
                              onClick={(e) => DeleteProfile(item._id)}
                            >
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
                      <tr className="p-[15px]">
                        <td className="p-[10px]" ></td>
                      </tr>

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
                          <div className=" w-[70px] text-center border-[1px] border-solid border-[#000000] rounded bg-[#09a061] mt-[30px]">
                            <button
                              onClick={(e) => conformDelete(e)}
                              className="  h-[37px] font-mainFont text-[15px] font-normal not-italic leading-[18px]   text-[#ffffff] ">
                              Yes
                            </button>
                          </div>
                        </div>

                      </Popup>
                    </tbody>
                  })
                }
              </table>
            </div>
          </div>

        </div>
      </div>

    </>

  );
};

export default Clients;
