import React from "react";

const Card = ({title, iconn, totalNumber, cardTitles}) => {
  //console.log(cardTitles);
  //console.log(cardTitles(title));

  return (
    <div onClick={()=> {cardTitles(title)}} className=" flex flex-row cursor-pointer max-w-[346.16px] max-h-[130.65px] py-[30px]  justify-around  bg-[#FFFFFF]  rounded-[26.94px] ">
      <div className=" basis-1/4 ml-[20px] flex justify-center items-center max-w-[75.43px]  rounded-full max-h-[75.43px]">
        {iconn}
      </div>
      <div className=" flex flex-col basis-3/4 pl-[25px] ">
        <div className="font-secondaryFont font-medium not-italic  text-[18.86px] text-[#A3AED0] leading-[32.33px]">
          {title}
        </div>
        <div
          className=" max-w-[193.96px] max-h-[41.76px] font-secondaryFont font-bold  not-italic text-[
                32.33px] text-[#1B2559] "
        >
          {totalNumber}
        </div>
      </div>
    </div>
  );
};

export default Card;
