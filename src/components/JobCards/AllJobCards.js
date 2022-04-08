import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Header from "../layout/Header";
import SideBar from "../layout/SideBar";
import SearchBox from "../layout/SearchBox";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";


const AllJobCards = () => {
  const [title, setTitle] = useState(null); // the lifted state
  const [alljobcarddata, setAllJobCardData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  const [allpermission, setAllPermission] = useState(null)
  const [editpermission, setEditPermission] = useState(null)
  const [createpermission, setCreatePermission] = useState(null)
  const [viewpermission, setViewPermission] = useState(null)
  const [allpermissions, setAllPermissions] = useState(null)

  let urlTitle = useLocation();
  let navigate = useNavigate();


  useEffect(() => {
    if (urlTitle.pathname === "/daily_task/All-daily-task") {
      setTitle("Daily Task");
    }
  }, [urlTitle.pathname]);


  useEffect(() => {

    const token = reactLocalStorage.get("access_token", false);
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/find_all_job_card`, {
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
  }, [])

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





  return (
    <div className="flex flex-row justify-start overflow-hidden">
      <div>
        <SideBar />
      </div>
      <div className="flex flex-col">
        <Header title={title} />
        <div className="flex flex-row justify-start space-x-10 mt-[63px] px-[30px]">
          <SearchBox placeHolderName={"Arab Electrician"} />
          <SearchBox placeHolderName={"Shinning Towers"} />
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
                  Arab Electricians
                </div>
                <div className="font-secondaryFont font-bold not-italic  text-lg leading-[43.1px] tracking-[-2%] text-[#1B2559] ">
                  Shining Towers
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
          <div className=" text-right pr-20">
            <Link to={`${createpermission || allpermissions ? `/daily_task/new_daily_task` : `/daily_task/All-daily-task`}`}>
              <button
                className={`${createpermission === "CREATE-JOB-CARD" || allpermissions === "ALL" ? "cursor-pointer" : "  disabledclass"}
                bg-[#8d8b8b] p-2 text-[#f0f0f0] mb-4 rounded-[8px]`}>
                Add  DailyTask
              </button>
            </Link>


          </div>
          <div className="ml-[95px]">
            <table className="table-auto pt-[24px] w-[100%]  ">
              <thead className="font-secondaryFont text-[#8F9BBA] font-normal not-italic text-[12px] leading-[20px] tracking-[-2%] py-[36px] ">
                <tr>
                  <th className="pb-[15.39px]">Activity ID</th>
                  <th className="pb-[15.39px]"> Daily Task No.</th>
                  <th className="pb-[15.39px]">Date(YY/MM/DD)</th>
                  <th className="pb-[15.39px]">Description</th>
                  <th className="pb-[15.39px]">Qty</th>
                  <th className="pb-[15.39px]">Zone</th>
                  <th className="pb-[15.39px]">Status</th>
                </tr>
              </thead>
              {filteredData?.map((item, id) => {
                return <tbody className="font-secondaryFont  text-[#8F9BBA] font-normal not-italic text-[12px] leading-[20px] tracking-[-2%]">
                  <tr className="mb-[5px] bg-[#ECF1F0]">
                    <th className="py-[13px]">{item.activity_code}</th>
                    <th className="">{item._id}</th>
                    <th className="">{item.jc_creation}</th>
                    <th className="">{item.activity_name}</th>
                    <th className="">{item.quantity_to_be_achieved}</th>
                    <th className="">{item.zone}</th>

                    <th
                      className="cursor-pointer"
                    // onClick={() => {
                    //   navigate("/job_cards/job-cards-assigned");
                    // }}
                    >
                      Status
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
    </div>
  );
};

export default AllJobCards;
