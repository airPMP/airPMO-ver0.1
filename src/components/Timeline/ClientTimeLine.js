import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../layout/Header";
import SideBar from "../layout/SideBar";
const ClientTimeLine = () => {
  const [title, setTitle] = useState(null);
  let urlTitle = useLocation();

  useEffect(() => {
    if (urlTitle.pathname === "/timeline/client") {
      setTitle("Timeline");
    }
  }, [urlTitle.pathname]);

  const data = [
    {
      page: "Visited Job Card Page",
      time: "Today at 2:00pm",
      
    },
    {
      page: "Visited Dashboard Page",
      time: "Today at 2:00pm",
     
    },
    {
      page: "Logged into portal",
      time: "Today at 2:00pm",
     
    },
    {
      page: "Visited ______ Page",
      time: "Today at 2:00pm",
     
    },
    {
      page: "Visited ______ Page",
      time: "Today at 2:00pm",
     
    },
  ];

  return (
    <>
      <div className="flex flex-row justify-start overflow-hidden">
        <div>
          <SideBar />
        </div>
        <div className="flex flex-col">
          <Header title={title} />

          <div className="flex flex-col px-[38px]">
            <div
              className=" w-[385px] h-[38px] font-secondaryFont font-medium not-italic text-[
                36px] leading-[37.83px] mb-[55px] "
            >
              Adit <span className="text-[#9AA6C1]">(Client) - Arabtech </span>{" "}
            </div>

            {data?.map((item, id) => {
            return ( <div>
                <div className="flex flex-row ">
                  <div>
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="30" cy="30" r="30" fill="#0FCC7C" />
                    </svg>
                  </div>
                  <div className="max-w-[309px] max-h-[60px] px-[17px] text-[#9AA6C1] font-secondaryFont font-medium not-italic text-[24px] leading-[37.83px] tracking-[-2%] ">
                   { item.page} <br/> {item.time}
                  </div>
                </div>
                <div className="ml-[30px]">
                  <svg
                    width="1"
                    height="67"
                    viewBox="0 0 1 67"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="0.5"
                      y1="703.001"
                      x2="0.5"
                      y2="0.000244141"
                      stroke="black"
                    />
                  </svg>
                </div>
              </div>)
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientTimeLine;
