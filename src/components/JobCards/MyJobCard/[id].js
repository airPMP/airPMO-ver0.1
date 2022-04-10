import React, { useEffect, useState } from "react";
import { useLocation, useNavigate,useParams } from "react-router-dom";
import Header from "../../layout/Header";
import SideBar from "../../layout/SideBar";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { useToasts } from "react-toast-notifications";

const MyJobCardsId = () => {
  const [title, setTitle] = useState(null); // the lifted state
  const [alljobcarddata, setAllJobCardData] = useState(null);
  const [filteredData, setFilteredData] = useState([null]);

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
    // /api/find_my_all_assign_card_by_user/{id}/{project_id}
    const token = reactLocalStorage.get("access_token", false);
    const user_id = reactLocalStorage.get("user_id", false);
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/find_my_all_assign_card_by_user/${user_id}/${useperma.id}`, {
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


  console.log(filteredData)

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
                  Arab Electricians
                </div>
                <div className="font-secondaryFont font-bold not-italic  text-lg leading-[43.1px] tracking-[-2%] text-[#1B2559] ">
                  Shining Towers
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
                  <th className="whitespace-nowrap  pb-[15.39px] ">Activity ID</th>
                  <th className="whitespace-nowrap pb-[15.39px]">Daily Task No.</th>
                  <th className="whitespace-nowrap pb-[15.39px]">Date(YY/MM/DD)</th>
                  <th className="whitespace-nowrap pb-[15.39px]">Description</th>
                  <th className="whitespace-nowrap pb-[15.39px]">Qty</th>
                  <th className="whitespace-nowrap pb-[15.39px]">Zone</th>
                  <th className="whitespace-nowrap pb-[15.39px]">Assign To</th>
                  <th className="whitespace-nowrap pb-[15.39px]">SPI</th>
                  <th className="whitespace-nowrap pb-[15.39px]">CPI</th>
                  <th className="whitespace-nowrap pb-[15.39px]">Status</th>
                </tr>
              </thead>
              {filteredData && filteredData?.map((item, ids) => {
                return <tbody className="font-secondaryFont  text-[#8F9BBA] font-normal not-italic text-[12px] leading-[20px] tracking-[-2%]">
                  <tr className="mb-[5px] bg-[#ECF1F0]">
                    <th className=" py-[13px]">{item?.activity_code}</th>
                    <th className=" cursor-pointer" onClick={(e) => CardAssignIdPage(e, item._id)} >{item?._id}</th>
                    <th className=" ">{item?.jc_creation}</th>
                    <th className=" ">{item?.activity_name}</th>
                    <th className=" ">{item?.quantity_to_be_achieved}</th>
                    <th className=" ">{item?.zone}</th>
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
