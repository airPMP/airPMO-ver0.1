import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import SideBar from "../layout/SideBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAllOrganization } from "../../AllApi/Api";
import { reactLocalStorage } from "reactjs-localstorage";

const Organization = () => {

  const [title, setTitle] = useState(null);
  const [orgData, setOrgData] = useState(null);
  const [orgSerachData, setOrgSerachData] = useState(null);
  let urlTitle = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if (urlTitle.pathname === "/organization") {
      setTitle("Organization");
    }

    const orgData = getAllOrganization().then((data) => {
      setOrgData(data?.data)
      setOrgSerachData(data?.data)
    })

  }, [urlTitle.pathname]);

  useEffect(()=>{
    const role_name = reactLocalStorage.get("roles", false);
    if(role_name !== "Airpmo Super Admin"){
      navigate("/dashboard")
    }
  },[])

  const EditOrganization = (item) => {
    navigate(`/organization/edit/${item._id}`)
  }

  const searchOrgData = (val) => {
    setOrgData(orgSerachData.filter((item)=> (item.name.toLowerCase()).includes(val.toLowerCase())))
  }

  return (
    <>
      <div className="flex flex-row justify-start overflow-hidden">
        <div>
          <SideBar />
        </div>
        <div className="flex flex-col">
          <Header title={title} />
          <div className="flex flex-col max-w-[1099px] rounded-[31.529px] mh-[632.01px] mt-[105.49px] ml-[38px] bg-[#FFFFFF]">
            <div className="flex flex-row justify-between">
              <div className="flex">
                <div className=" ml-[26.8px] mt-[31.94px] h-[88.28px] w-[88.28px] bg-[#F4F7FE] rounded-[50%]">
                  <img
                    src="/Group8.png"
                    alt="logo"
                    className="ml-[23px] mt-[16.57px] h-[44px] w-[42.79px]"
                  />
                </div>
                <div
                  className="font-secondaryFont font-medium not-italic text-[28.09px] 
                    leading-[37.83px] text-[#000000] mt-[51.51px] ml-[27.92px] "
                >
                  Organization
                </div>
              </div>
              <div style={{ boxShadow: "0px 4px rgba(0, 0, 0, 0.25)" }}
                    className="mt-[73.07px] basic-1/4 flex flex-row  items-center mr-[51.5px] bg-[#FFFFFF] rounded-[0.625rem]" >
                    <div className="pt-[4.64px] pl-[16.6px]">
                        <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg" >
                            <circle cx="5" cy="5" r="4.3" stroke="#1B2559" strokeWidth="1.4" />
                            <line x1="10.0101" y1="11" x2="8" y2="8.98995" stroke="#1B2559" strokeWidth="1.4" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div className="bg-[#FFFFFF] pl-[9.64px] mb-[10.44] ">
                        <input
                            type="text"
                            placeholder="Search "
                            className="outline-none w-[273.87px] h-[36.94px]"
                            onChange={(e)=>searchOrgData(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="pl-[143.96px] pr-[53.84px] pt-[28.49px] pb-[20px]">
              <div className="flex  float-right">
                  <div
                    style={{ boxShadow: "0px 4px rgba(0, 0, 0, 0.25)" }}
                    className=" rounded-[0.625rem] w-[200px]"
                  >
                    <div className="flex justify-center">
                      <svg
                        width="31"
                        height="31"
                        viewBox="0 0 31 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.7916 16.7917V24.5417H14.2083V16.7917H6.45825V14.2083H14.2083V6.45834H16.7916V14.2083H24.5416V16.7917H16.7916Z"
                          fill="#2E3A59"
                        />
                      </svg>

                      <span className="text-[15px] pt-1">
                        <Link to={`/organization/super_admin`}>New Organization</Link>
                      </span>
                    </div>
                  </div>
                </div>
                <table className="table-auto   text-center font-secondaryFont text-[#000000]
                    font-normal not-italic text-[12px " style={{ width: "100%" }}>

                      <tr className="max-h-[52.84px] text-center  ">
                          <th className="w-[10%] py-[13px]">Organization ID</th>
                          <th className="w-[25%] py-[13px]">Name</th>
                          <th className="w-[10%] py-[13px]">Actions</th>
                      </tr>


                      {orgData?.slice(0).map((item, id) => {


                          return <tbody className="  mb-[10px]   " key={id}>
                              <tr className=" cursor-pointer  bg-[#ECF1F0] text-[#8F9BBA] text-[14.0447px] "
                              // onClick={() => { navigate("/UserManagement/UserRole1/Details") }}
                              >
                                  <td className="pt-[15px] pb-[14.83px]">{item?._id} </td>
                                  <td className="pt-[15px] pb-[14.83px]">{item?.name}</td>
                                  <td className="pt-[15px] pb-[14.83px]">
                                      <div className="flex flex-row justify-center  space-x-xl">
                                          <div onClick={() => EditOrganization(item)} >
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
    </>
  );
};

export default Organization;
