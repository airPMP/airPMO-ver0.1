import React, { useEffect } from "react";

const UserRolesCard = ({title, iconn, totalNumber, cardTitles,pathSet}) => {
  
  return (
    <div className=" flex flex-row cursor-pointer
     max-w-[346.16px] max-h-[130.65px] py-[30px]  justify-around  bg-[#FFFFFF]  rounded-[26.94px] ">
      <div className=" basis-1/4 ml-[20px] flex justify-center items-center 
      max-w-[75.43px]  rounded-full max-h-[75.43px]">
        {iconn}
      </div>
      <div className=" flex flex-col basis-3/4 pl-[25px]  ">
        <div className="font-sans font-medium not-italic 
         text-[32px] text-[#2E3A59] leading-[32.33px]  ">
          {title}
        </div>
        <div
          className=" max-w-[193.96px] max-h-[41.76px] font-sans  font-semibold not-italic
           text-[20px] text-[#A3AED0] "
        >
          {totalNumber}
        </div>
      </div>
    </div>
  );
};

export default UserRolesCard;
