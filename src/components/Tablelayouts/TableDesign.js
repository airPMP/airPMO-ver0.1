import React from "react";
const TableDesign = () => {
  return (
    <div className="flex flex-col max-w-[939px] max-h-[540px] mt-[20px] pl-[124px] pr-[44px] ml-[20px] bg-[#FFFFFF]">
      <div className=" font-secondaryFont font-medium bg-[#FFFFFF]  not-italic text-2xl leading-[32.33px] text-[#A3AED0] tracking-[-2%] ">
        Arab Electricians
      </div>
      <div className="flex flex-row justify-between">
        <div className="font-secondaryFont font-bold not-italic text-lg leading-[43.1px] tracking-[-2%] text-[#1B2559] ">
          Shining Towers
        </div>
        <div
          style={{ boxShadow: "0px 4px rgba(0, 0, 0, 0.25)" }}
          className="flex flex-row px-[5px]  items-center w-[234px] h-[46px] bg-[#FFFFFF] rounded-[0.625rem] "
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
      <div>
        <table className="table-auto pt-[24px]">
          <thead className="font-secondaryFont text-[#8F9BBA] font-normal not-italic text-[12px] leading-[20px] tracking-[-2%] py-[36px] ">
            <tr>
              <th className="px-[10px] py-[13px]">Activity ID</th>
              <th className="px-[10px] py-[13px]">Job Card No.</th>
              <th className="px-[10px] py-[13px]">Date(YY/MM/DD)</th>
              <th className="px-[10px] py-[13px]">Description</th>
              <th className="px-[10px] py-[13px]">Qty</th>
              <th className="px-[10px] py-[13px]">Zone</th>
              <th className="px-[10px] py-[13px]">Assign To</th>
              <th className="px-[10px] py-[13px]">SPI</th>
              <th className="px-[10px] py-[13px]">CPI</th>
              <th className="px-[10px] py-[13px]">Status</th>
            </tr>
          </thead>
          <tbody className="font-secondaryFont bg-[#ECF1F0] text-[#8F9BBA] font-normal not-italic text-[12px] leading-[20px] tracking-[-2%]">
            <tr>
              <th className="px-[10px] py-[13px]">Activity ID</th>
              <th className="px-[10px] py-[13px]">Job Card No.</th>
              <th className="px-[10px] py-[13px]">Date(YY/MM/DD)</th>
              <th className="px-[10px] py-[13px]">Description</th>
              <th className="px-[10px] py-[13px]">Qty</th>
              <th className="px-[10px] py-[13px]">Zone</th>
              <th className="px-[10px] py-[13px]">
                <select className="px-[20px] bg-[#ECF1F0] outline-none ">
                  <option>Rahul</option>
                  <option>Jhon</option>
                  <option>David</option>
                  <option>Muller</option>
                </select>
              </th>
              <th className="px-[10px] py-[13px]">0</th>
              <th className="px-[10px] py-[13px]">0</th>
              <th className="px-[10px] py-[13px]">
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
        <div>
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
        <div className="w-[100px] h-[30px] text-center font-secondaryFont font-medium text-[#8F9BBA] text-[14px] leading-[37.83px] self-center pb-[10px]" style={{ boxShadow: "0px 4px rgba(0, 0, 0, 0.25)" }}>
          <button>Export Sheet</button>
        </div>
      </div>
    </div>
  );
};

export default TableDesign;
