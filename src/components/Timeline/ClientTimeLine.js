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

  return (
    <>
      <div className="flex flex-row justify-start overflow-hidden">
        <div>
          <SideBar />
        </div>
        <div className="flex flex-col">
          <Header title={title} />

          <div className="flex flex-col">
            <div>Adit (Client) - Arabtech</div>
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
              <div>
              <svg
                width="1"
                height="672"
                viewBox="0 0 1 672"
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientTimeLine;
