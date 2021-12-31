import React, { useState } from "react";

const NotificationBar = ({ sendStyle }) => {
  const [dp, setDp] = useState("block");
  return (
    <div
      className="flex flex-col w-[300px]  bg-[#FFFFFF] px-[10px]"
      style={{ display: dp }}
    >
      <div className="flex flex-row justify-between pt-[24px]">
        <div className="cursor-pointer">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              console.log("Notification");
              setDp("none");
              sendStyle("none");
            }}
          >
            <path
              d="M5.83 11L8.41 8.41L7 7L2 12L7 17L8.41 15.59L5.83 13H22V11H5.83Z"
              fill="#2E3A59"
            />
          </svg>
        </div>
        <div className="max-w-[171.41px] max-h-[40.64px] font-secondaryFont font-bold text-[28.56px] not-italic leading-[38.08px] text-[#1B2559] ">
          Notifications
        </div>
        <div
          onClick={() => {}}
          className="max-w-[38px] max-h-[15px] font-secondaryFont font-medium not-italic text-[10px] leading-[32.33px] text-[#053855] align-bottom mt-[22px] cursor-pointer"
        >
          Clear all
        </div>
      </div>
      <div
        className=" max-w-[290px] max-h-[50px] rounded-[4px] py-[20px] px-[10px] font-secondaryFont font-medium not-italic text-xs leading-[
        32.33px] text-[#053855]"
        style={{ boxShadow: "0px 4px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="  ">Description</div>
      </div>
      <div
        className=" max-w-[290px] max-h-[50px] rounded-[4px] py-[20px] px-[10px] font-secondaryFont font-medium not-italic text-xs leading-[
      32.33px] text-[#053855] "
        style={{ boxShadow: "0px 4px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="  ">Description</div>
      </div>
      <div
        className=" max-w-[290px] max-h-[50px] rounded-[4px] py-[20px] px-[10px] font-secondaryFont font-medium not-italic text-xs leading-[
      32.33px] text-[#053855] "
        style={{ boxShadow: "0px 4px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="  ">Description</div>
      </div>
      <div
        className=" max-w-[290px] max-h-[50px] rounded-[4px] py-[20px] px-[10px] font-secondaryFont font-medium not-italic text-xs leading-[
      32.33px] text-[#053855] "
        style={{ boxShadow: "0px 4px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="  ">Description</div>
      </div>
      <div
        className=" max-w-[290px] max-h-[50px] rounded-[4px] py-[20px] px-[10px] font-secondaryFont font-medium not-italic text-xs leading-[
      32.33px] text-[#053855] "
        style={{ boxShadow: "0px 4px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="  ">Description</div>
      </div>
      <div
        className=" max-w-[290px] max-h-[50px] rounded-[4px] py-[20px] px-[10px] font-secondaryFont font-medium not-italic text-xs leading-[
      32.33px] text-[#053855] "
        style={{ boxShadow: "0px 4px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="  ">Description</div>
      </div>
    </div>
  );
};

export default NotificationBar;
