import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../../layout/Header";
import SideBar from "../../layout/SideBar";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { useToasts } from "react-toast-notifications";

const MyJobCardsId = () => {
  const [title, setTitle] = useState(null); // the lifted state
  const [alljobcarddata, setAllJobCardData] = useState(null);
  const [filteredData, setFilteredData] = useState([null]);
  const [alltokenroles, setAllTokenRoles] = useState(null)


  let urlTitle = useLocation();
  const { addToast } = useToasts();
  let navigate = useNavigate();
  let useperma = useParams()

  useEffect(() => {

    if (urlTitle.pathname === "/daily_task/my-daily-task") {
      setTitle("Daily Task");




    }
  }, [urlTitle.pathname])

  useEffect(() => {
    let tokenroles = reactLocalStorage.get("roles", false);
    setAllTokenRoles(tokenroles)

  })



  useEffect(() => {
    // /api/find_my_all_assign_card_by_user/{id}/{project_id}
    const token = reactLocalStorage.get("access_token", false);
    const user_id = reactLocalStorage.get("user_id", false);
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/find_all_assign_card_by_user/${user_id}/${useperma.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

      .then((response) => {
        console.log(response?.data)
        setFilteredData(response?.data)
        setAllJobCardData(response?.data)
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
      { console.log(data) }
      if (isNaN(+value)) {
        return data?.activity_code?.toUpperCase().search(value) !== -1;
      }
    });

    setFilteredData(result)

    if (value === "") {
      setFilteredData(alljobcarddata)
      console.log("alljobcarddata")
    }
    else {
      console.log("FilteredData")
    }
  }



  const CardAssignIdPage = (e, itemid) => {
    console.log(itemid)
    navigate(`/daily_task/CardAssignId/${itemid}`)
  }




  return (
    <div className="flex flex-row justify-start overflow-hidden">
      <div>
        <SideBar />
      </div>
      <div className="flex flex-col">
        <Header title={title} />
        <div className=" ml-[20px] mt-[10px] text-[#A3AED0] font-bold not-italic text-[29.6px]
         leading-[53.15px] tracking-[-2%] " > My Daily Task</div>
        <div className="flex flex-col max-w-[100%]   mt-[20px] pl-[22px] pr-[44px] ml-[20px] 
        bg-[#FFFFFF] rounded-[31.53px]">
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
                className="flex flex-row px-[10px]   items-center w-[234px] h-[46px] bg-[#FFFFFF] rounded-[0.625rem] "
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
                  <input type="text" placeholder="Search" className="outline-none"
                    onChange={(e) => handleSearch(e)} />
                </div>
              </div>
            </div>
          </div>
          <div className="ml-[95px]">
            <table className="table-auto pt-[24px] w-[100%]  ">
              <thead className="font-secondaryFont text-[#8F9BBA] font-normal not-italic text-[12px] leading-[20px] tracking-[-2%] py-[36px] ">
                <tr>
                  <th className="whitespace-nowrap  pb-[15.39px] w-[7%] ">Activity ID</th>
                  {/* <th className="whitespace-nowrap pb-[15.39px] w-[20%]">Daily Task No.</th> */}
                  <th className="whitespace-nowrap pb-[15.39px] w-[10%]">Date(YY/MM/DD)</th>
                  <th className="whitespace-nowrap pb-[15.39px] w-[15%]">Description</th>
                  <th className="whitespace-nowrap pb-[15.39px] w-[6%]">Qty</th>
                  <th className="whitespace-nowrap pb-[15.39px] w-[15%]      ">
                    <div className=" flex justify-center cursor-pointer ">
                      <span>Zone</span>
                      <span> <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 1.875H2.5C2.15438 1.875 1.875 2.15438 1.875 2.5V4.11875C1.875 4.44563 2.00813 4.76688 2.23938 4.99813L5.625 8.38375V13.125C5.625 13.3419 5.7375 13.5425 5.92188 13.6569C6.02188 13.7188 6.13562 13.75 6.25 13.75C6.34562 13.75 6.44125 13.7281 6.52937 13.6844L9.02937 12.4344C9.24125 12.3281 9.375 12.1119 9.375 11.875V8.38375L12.7606 4.99813C12.9919 4.76688 13.125 4.44563 13.125 4.11875V2.5C13.125 2.15438 12.8456 1.875 12.5 1.875ZM8.30813 7.68313C8.19063 7.8 8.125 7.95875 8.125 8.125V11.4888L6.875 12.1138V8.125C6.875 7.95875 6.80937 7.8 6.69187 7.68313L3.125 4.11875V3.125H11.8756L11.8769 4.11438L8.30813 7.68313Z" fill="#8F9BBA" />
                      </svg>
                      </span>
                    </div>

                  </th>
                  <th className="whitespace-nowrap pb-[15.39px] w-[10%]">
                    
                    <div className=" flex justify-center cursor-pointer ">
                      <span>
                    Subzone
                    </span>
                    <span> <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 1.875H2.5C2.15438 1.875 1.875 2.15438 1.875 2.5V4.11875C1.875 4.44563 2.00813 4.76688 2.23938 4.99813L5.625 8.38375V13.125C5.625 13.3419 5.7375 13.5425 5.92188 13.6569C6.02188 13.7188 6.13562 13.75 6.25 13.75C6.34562 13.75 6.44125 13.7281 6.52937 13.6844L9.02937 12.4344C9.24125 12.3281 9.375 12.1119 9.375 11.875V8.38375L12.7606 4.99813C12.9919 4.76688 13.125 4.44563 13.125 4.11875V2.5C13.125 2.15438 12.8456 1.875 12.5 1.875ZM8.30813 7.68313C8.19063 7.8 8.125 7.95875 8.125 8.125V11.4888L6.875 12.1138V8.125C6.875 7.95875 6.80937 7.8 6.69187 7.68313L3.125 4.11875V3.125H11.8756L11.8769 4.11438L8.30813 7.68313Z" fill="#8F9BBA" />
                      </svg>
                      </span>
                     
                    </div>
                    
                    </th>
                  <th className="whitespace-nowrap pb-[15.39px] w-[5%]">Assign To</th>
                  <th className="whitespace-nowrap pb-[15.39px] w-[5%]">SPI</th>
                  <th className="whitespace-nowrap pb-[15.39px] w-[5%]">CPI</th>
                  <th className="whitespace-nowrap pb-[15.39px] w-[10%]">Status</th>
                </tr>
              </thead>
              {filteredData && filteredData?.map((item, ids) => {
                return <tbody className="font-secondaryFont  text-[#8F9BBA] font-normal not-italic text-[12px] leading-[20px] tracking-[-2%]">
                  <tr className="mb-[5px] bg-[#ECF1F0]">
                    <th className=" py-[13px]  cursor-pointer " onClick={(e) => CardAssignIdPage(e, item._id)}>
                      {item?.activity_code}</th>
                    {/* <th className=" "  >
                      {item?._id}</th> */}
                    <th className=" ">{item?.jc_creation}</th>
                    <th className=" ">{item?.activity_name}</th>
                    <th className=" ">{item?.quantity_to_be_achieved}</th>
                    <th className=" ">{item?.zone}</th>
                    <th className=" ">{item?.sub_zone}</th>
                    <th className=" "> {item?.assign ? item.assign : "no"}</th>
                    <th className=" "> {item?.spi ? item.spi : "0"}</th>
                    <th className=" ">{item?.cpi ? item.cpi : "0"}</th>
                    <th className=" ">{item?.status ? item.status : "No Status"}</th>

                    {/* <th className="">
                      <select className=" outline-none bg-[#ECF1F0] cursor-pointer"
                        onFocus={(e) => UserOnFocusSelectFun(e, item)}
                        onClick={(e) => UserSelectFun(e, item)}>
                        <option> Select User</option>
                        {item?.user?.map((items, i) => {


                          return <option value={items.name}>{items.name}</option>
                        })
                        }

                      </select>
                    </th> */}
                  </tr>
                  <tr className="p-[15px]">
                    <td className="p-[10px]" ></td>
                  </tr>

                </tbody>

              })}
            </table>
          </div>
          <div className="flex flex-row justify-end py-[20px] space-x-2 ">


          </div>
        </div>
      </div>
    </div>
  );
};

export default MyJobCardsId;
