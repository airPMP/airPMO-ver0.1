import React,{useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Header from "../layout/Header";
import SideBar from "../layout/SideBar";
const MyJobCards = () => {
  const [title, setTitle] = useState(null); // the lifted state
  let urlTitle = useLocation();
  useEffect(() => {
     
      if(urlTitle.pathname === "/job_cards/my-job-cards"){
          setTitle("Job Cards");
      } 
     }, [urlTitle.pathname])
  return (
    <div className="flex flex-row justify-start overflow-hidden">
        <div>
          <SideBar />
        </div>
        <div className="flex flex-col">
          <Header title={title}  />
          <div className=" ml-[20px] mt-[10px] text-[#A3AED0] font-bold not-italic text-[29.6px] leading-[53.15px] tracking-[-2%] " > My Job Cards</div>
    <div className="flex flex-col max-w-[939px] max-h-[540px] mt-[20px] pl-[22px] pr-[44px] ml-[20px] bg-[#FFFFFF] rounded-[31.53px]">
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
            <input type="text" placeholder="Search" className="outline-none" />
          </div>
        </div>
        </div>
      </div>
      <div className="ml-[95px]">
        <table className="table-auto pt-[24px] w-[100%]  ">
          <thead className="font-secondaryFont text-[#8F9BBA] font-normal not-italic text-[12px] leading-[20px] tracking-[-2%] py-[36px] ">
            <tr>
              <th className=" pb-[15.39px] ">Activity ID</th>
              <th className="pb-[15.39px]">Job Card No.</th>
              <th className="pb-[15.39px]">Date(YY/MM/DD)</th>
              <th className="pb-[15.39px]">Description</th>
              <th className="pb-[15.39px]">Qty</th>
              <th className="pb-[15.39px]">Zone</th>
              <th className="pb-[15.39px]">Assign To</th>
              <th className="pb-[15.39px]">SPI</th>
              <th className="pb-[15.39px]">CPI</th>
              <th className="pb-[15.39px]">Status</th>
            </tr>
          </thead>
          <tbody className="font-secondaryFont  text-[#8F9BBA] font-normal not-italic text-[12px] leading-[20px] tracking-[-2%]">
            <tr className="mb-[5px] bg-[#ECF1F0] ">
              <th className="py-[13px]">Activity ID</th>
              <th className="">Job Card No.</th>
              <th className="">Date(YY/MM/DD)</th>
              <th className="">Description</th>
              <th className="">Qty</th>
              <th className="">Zone</th>
              <th className="">
                <select className=" outline-none bg-[#ECF1F0] ">
                  <option>Rahul</option>
                  <option>Jhon</option>
                  <option>David</option>
                  <option>Muller</option>
                </select>
              </th>
              <th className="">0</th>
              <th className="">0</th>
              <th className="pl-[20px]">
                <svg
                  width="20"
                  height="16"
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.81806 15.7791L0.454102 9.41515L3.2841 6.58515L6.81806 10.1291L16.716 0.221191L19.546 3.05119L6.81806 15.7791Z"
                    fill="#0FCC7C"
                  />
                </svg>
              </th>
            </tr>
            <tr className="p-[15px]">
            <td className="p-[10px]" ></td>
            </tr>
            <tr className="bg-[#ECF1F0]">
            <th className="py-[13px]">Activity ID</th>
            <th className="">Job Card No.</th>
            <th className="">Date(YY/MM/DD)</th>
            <th className="">Description</th>
            <th className="">Qty</th>
            <th className="">Zone</th>
            <th className="">
              <select className=" outline-none bg-[#ECF1F0] ">
                <option>Rahul</option>
                <option>Jhon</option>
                <option>David</option>
                <option>Muller</option>
              </select>
            </th>
            <th className="">0</th>
            <th className="">0</th>
            <th className="pl-[20px]">
              <svg
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.81806 15.7791L0.454102 9.41515L3.2841 6.58515L6.81806 10.1291L16.716 0.221191L19.546 3.05119L6.81806 15.7791Z"
                  fill="#0FCC7C"
                />
              </svg>
            </th>
          </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-row justify-end py-[20px] space-x-2 ">
        
        
      </div>
    </div>
    </div>
    </div>
  );
};

export default MyJobCards;