import React from "react";

const InjestionCardOnline = ({ title, iconn, totalNumber, cardTitles }) => {

    return (
        <div className="bg-[#FFFFFF]  rounded-[26.94px] greenball mb-[60px]">
            <div className=" greenballavailable"  >
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="23.6866" cy="23.6866" r="23.6866" fill="#0FCC7C" />
                </svg>

            </div>
            <div onClick={() => { cardTitles(title) }}
                className=" flex flex-row cursor-pointer   max-w-[409.97px]
           max-h-[154.74px] py-[30px]  justify-around    ">


                <div className=" basis-1/4 ml-[20px] flex justify-center items-center max-w-[75.43px]  rounded-full max-h-[75.43px]">

                    <div className="  bg-[#F4F7FE] rounded-[50%] pt-[18px] pl-[5px]" style={{ width: "60px", height: "60px" }}  >
                        {iconn}
                    </div>
                </div>

                <div className=" flex flex-col basis-3/4 pl-[25px] ">
                    <div className="font-sans font-medium not-italic  text-[22.3331px] text-[#A3AED0] leading-[32.33px]">
                        {title}
                    </div>
                    <div
                        className=" max-w-[193.96px] max-h-[41.76px] font-sans font-bold  not-italic
           text-[38.2853px] text-[#1B2559] "
                    >
                        {totalNumber}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InjestionCardOnline;
