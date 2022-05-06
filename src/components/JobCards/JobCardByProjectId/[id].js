import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link, useParams } from "react-router-dom";
import Header from "../../layout/Header";
import SideBar from "../../layout/SideBar";
import SearchBox from "../../layout/SearchBox";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { ProjectObjectData } from "../../../SimplerR/auth";
import Popup from "reactjs-popup";


const AllJobCardsId = () => {
  const [title, setTitle] = useState(null); // the lifted state
  const [alljobcarddata, setAllJobCardData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  const [allpermission, setAllPermission] = useState(null)
  const [editpermission, setEditPermission] = useState(null)
  const [createpermission, setCreatePermission] = useState(null)
  const [viewpermission, setViewPermission] = useState(null)
  const [allpermissions, setAllPermissions] = useState(null)
  const [alltokenroles, setAllTokenRoles] = useState(null)

  const [deleteid, setDeleteId] = useState(null);
  const [open, setOpen] = useState(false);
  const [deletedatarefrace, setDeleteDataRefrace] = useState(false);

  const projectobjectdata = ProjectObjectData.use()

  let urlTitle = useLocation();
  let navigate = useNavigate();
  let useperma = useParams()

  useEffect(() => {
    if (urlTitle.pathname === `/daily_task/JobCardByProjectId/${useperma.id}`) {
      setTitle("Activities");
    }
    const tokenroles = reactLocalStorage.get("roles", false);
    setAllTokenRoles(tokenroles)

  }, [urlTitle.pathname]);


  useEffect(() => {

    const token = reactLocalStorage.get("access_token", false);
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/find_job_card_by_project/${useperma.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

      .then((response) => {
        console.log(response?.data)
        setAllJobCardData(response?.data)
        setFilteredData(response?.data)

        if (response.status === 201) {

        }
      })
      .catch((error) => {
        console.log(error)

      })
    handleSearch()

  }, [deletedatarefrace])

  const handleSearch = (e) => {

    let value = e?.target?.value?.toUpperCase();
    let result = []
    result = alljobcarddata?.filter((data) => {
      if (isNaN(+value)) {
        return data?.activity_code?.toUpperCase().search(value) !== -1;
      }
    });

    setFilteredData(result)

    if (value === "") {
      setFilteredData(alljobcarddata)
    }
  }


  useEffect(() => {
    const permissionData = reactLocalStorage.get("permisions", false);
    setAllPermission(permissionData)

    getPermision()
  }, [allpermission])

  const getPermision = async () => {

    const url_data = await allpermission
    const database = url_data?.split(',')

    let value = "EDIT-JOB-CARD".toUpperCase();
    let result = []
    result = database?.filter((data) => {
      if (isNaN(+value)) {
        return data?.toUpperCase().search(value) !== -1;
      }
    });


    let value1 = "CREATE-JOB-CARD".toUpperCase();
    let result1 = []
    result1 = database?.filter((data) => {
      if (isNaN(+value)) {
        return data?.toUpperCase().search(value1) !== -1;
      }
    });

    let value2 = "GET-JOB-CARD".toUpperCase();
    let result2 = []
    result2 = database?.filter((data) => {
      if (isNaN(+value)) {
        return data?.toUpperCase().search(value2) !== -1;
      }
    });






    if (result[0] === "EDIT-JOB-CARD" ||
      result1[0] === "CREATE-JOB-CARD" ||
      result2[0] === "GET-JOB-CARD") {
      setEditPermission(result[0])
      setCreatePermission(result1[0])
      setViewPermission(result2[0])
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

  const DeleteProfile = (e) => {
    setDeleteId(e)
    setOpen(o => !o)

  }




  const conformDelete = () => {

    const token = reactLocalStorage.get("access_token", false);
    const feach = async () => {
      try {
        const data = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/delete_job_card/${deleteid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (data?.status === 200) {
          setDeleteDataRefrace(o => !o)
          // window.location.reload(false);
        }

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


  const EditProfile = (e) => {
    console.log(e)
    if (editpermission === "EDIT-JOB-CARD" || allpermissions === "ALL") {
    navigate(`/daily_task/update_create_daily_task/${e}`)
    }
  }


  return (
    <div className="flex flex-row justify-start overflow-hidden">
      <div>
        <SideBar />
      </div>
      <div className="flex flex-col">
        <Header title={title} />
        <div className="flex flex-row justify-start space-x-10 mt-[63px] px-[30px]">
          {/* <SearchBox placeHolderName={"Arab Electrician"} />
          <SearchBox placeHolderName={"Shinning Towers"} /> */}
        </div>
        <div className="flex flex-col max-w-[100%]   mt-[20px] pl-[22px] pr-[44px] ml-[20px] bg-[#FFFFFF] rounded-[31.53px]">
          <div className="flex flex-row items-center space-x-[24.67px] pt-[27.29px]">
            <div className="">
              <svg
                width="75.43"
                height="75.43"
                viewBox="0 0 75.43 75.43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="38.6122" cy="37.9999" r="37.7143" fill="#F4F7FE" />
              </svg>
            </div>

            <div className="flex flex-row space-x-[350px] ">
              <div className="flex flex-col">
                <div className=" font-secondaryFont font-medium bg-[#FFFFFF]  not-italic text-2xl leading-[32.33px] text-[#A3AED0] tracking-[-2%] ">
                  {alltokenroles === "albannaadmin" ? "Albanna" : "Arab Electricians"}
                </div>
                <div className="font-secondaryFont font-bold not-italic  text-lg leading-[43.1px] tracking-[-2%] text-[#1B2559] ">
                  {alltokenroles === "albannaadmin" ? "J725" : "Shining Towers"}
                </div>

              </div>
              <div
                style={{ boxShadow: "0px 4px rgba(0, 0, 0, 0.25)" }}
                className="flex flex-row px-[10px]  
                 items-center w-[234px] h-[46px] bg-[#FFFFFF] rounded-[0.625rem] "
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
                    type="text"
                    onChange={(e) => handleSearch(e)}
                    placeholder="Search"
                    className="outline-none"
                  />
                </div>

              </div>

            </div>
          </div>
          <div className=" flex justify-end   pr-14">
            <Link to={`${createpermission || allpermissions ? `/daily_task/${useperma.id}/new_daily_task` : `/daily_task/JobCardByProjectId/${useperma.id}`}`}>

              <button
                className={`${createpermission === "CREATE-JOB-CARD" || allpermissions === "ALL" ? "cursor-pointer" : "  disabledclass"}
                  p-2 text-[#000000] mb-4 rounded-[8px] flex justify-end`}
                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25" }}>
                <span>
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.7916 10.7918V18.5418H8.20825V10.7918H0.458252V8.2085H8.20825V0.458496H10.7916V8.2085H18.5416V10.7918H10.7916Z" fill="#2E3A59" />
                  </svg>
                </span>

                <span className="pl-2">
                New Activities
                </span>
              </button>
            </Link>


          </div>
          <div className="ml-[95px]">
            <table className="table-auto pt-[24px] w-[100%]  ">
              <thead className="font-secondaryFont text-[#8F9BBA] font-normal not-italic text-[12px] leading-[20px] tracking-[-2%] py-[36px] ">
                <tr>
                  <th className="pb-[15.39px] w-[10%]">Activity ID</th>
                  {/* <th className="pb-[15.39px]"> Daily Task No.</th> */}
                  <th className="pb-[15.39px] w-[10%]">Date(YY/MM/DD)</th>
                  <th className="pb-[15.39px] w-[20%]">Description</th>
                  <th className="pb-[15.39px]w-[6%]">Qty</th>
                  <th className="pb-[15.39px] w-[20%]">Zone</th>
                  <th className="pb-[15.39px] w-[20%]">Subzone</th>
                  <th className="pb-[15.39px]w-[10%]">Status</th>
                  <th className="pb-[15.39px]w-[10%]">Action</th>
                </tr>
              </thead>
              {filteredData?.map((item, id) => {
                console.log(item)
                return <tbody className="font-secondaryFont  text-[#8F9BBA] font-normal not-italic text-[12px] leading-[20px] tracking-[-2%]">
                  <tr className="mb-[5px] bg-[#ECF1F0]">
                    <th className="py-[13px]">{item.activity_code}</th>
                    {/* <th className="">{item._id}</th> */}
                    <th className="">{item.jc_creation}</th>
                    <th className="">{item.activity_name}</th>
                    <th className="">{item.quantity_to_be_achieved}</th>
                    <th className="">{item.zone}</th>
                    <th className="">{item.sub_zone}</th>

                    <th
                      className="cursor-pointer"
                    // onClick={() => {
                    //   navigate("/job_cards/job-cards-assigned");
                    // }}
                    >
                      Status
                    </th>
                    <th>

                      <div className="flex flex-row space-x-xl justify-center">
                        <div className={` ${editpermission || allpermissions ? 'cursor-pointer':"disabledclass"}   `}
                          onClick={(e) => EditProfile(item._id)}  >
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
                        <div className="cursor-pointer"
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

                    </th>
                  </tr>
                  <tr className="p-[15px]">
                    <td className="p-[10px]"></td>
                  </tr>

                </tbody>
              })}
            </table>
          </div>
          <div className="flex flex-row justify-end py-[20px] space-x-2 ">
            <div className="mt-[5px]">
              <svg
                width="20"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 2H19V4H5V2ZM12 6L18 12L16.59 13.41L13 9.83L13 22H11L11 9.83L7.41 13.41L6 12L12 6Z"
                  fill="#8F9BBA"
                />
              </svg>
            </div>
            <div
              className="w-[100px] h-[30px] text-center font-secondaryFont font-medium text-[#8F9BBA] text-[14px] leading-[37.83px] self-center pb-[10px]"
              style={{ boxShadow: "0px 4px rgba(0, 0, 0, 0.25)" }}
            >
              <button>Export Sheet</button>
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
          <div className=" w-[70px] text-center border-[1px] border-solid border-[#000000] rounded bg-[#09a061] mt-[30px]">
            <button
              onClick={(e) => conformDelete(e)}
              className="  h-[37px] font-mainFont text-[15px] font-normal not-italic leading-[18px]   text-[#ffffff] ">
              Yes
            </button>
          </div>
        </div>

      </Popup>
    </div>
  );
};

export default AllJobCardsId;
