import React, { useState, useEffect } from 'react'
import Header from '../layout/Header'
import SideBar from '../layout/SideBar'
import { useLocation } from "react-router-dom";
import ProductSearch from './ProductSearch';

const HRMS = () => {

    const [title, setTitle] = useState(null);
    let urlTitle = useLocation();
    useEffect(() => {

        if (urlTitle.pathname === "/DataInjestion/HRMS") {
            setTitle("Data Injestion");
        }
    }, [urlTitle.pathname])

    const data = [
        { "name": "Activity Code", "role": "Activity Name", "email": "Unit of Measure", "mobile": "GANG Productivity (Aprvd by PM)", "action": "action" }
        ,
        { "name": "Activity Code", "role": "Activity Name", "email": "Unit of Measure", "mobile": "GANG Productivity (Aprvd by PM)", "action": "action" }
    ]


    return (
        <>
            <div className="flex flex-row justify-start overflow-hidden">
                <div>
                    <SideBar />
                </div>
                <div className="flex flex-col">
                    <Header title={title} />


                    <div className="flex flex-row justify-start space-x-10 mt-[48px] px-[30px]  ">

                        <div className="mr-[70px]"   >
                            <ProductSearch
                                placeHolderName={"Choose Client"}

                            // value={client}
                            />
                        </div>
                        <div>
                            <ProductSearch
                                placeHolderName={"Choose Project"}

                            // value={project}
                            />
                        </div>
                    </div>

                    <div className=" flex flex-col max-w-[899px] rounded-[31.529px] mh-[632.01px] mt-[48px] ml-[38px] 
        bg-[#FFFFFF]   ">

                        <div className="flex flex-row justify-between">
                            <div className="flex">
                                <div className=" ml-[26.8px] mt-[31.94px]      ">

                                    <svg width="77" height="76" viewBox="0 0 77 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="38.6122" cy="37.9999" r="37.7143" fill="#F4F7FE" />
                                    </svg>
                                </div>
                                <div className="font-secondaryFont font-medium not-italic text-[28.09px] 
                              leading-[37.83px] text-[#000000] mt-[27px] ml-[32.92px] ">
                                    <div className=" grid grid-cols-2">
                                        <div>
                                            <p className="text-[#A3AED0] text-[24px] font-medium font-sans">
                                                HRMS
                                            </p>
                                            <div className="text-[#1B2559] text-[18px] font-bold">
                                                Shining Towers
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex float-right mr-[20px]" style={{ marginTop: "-15px" }}>

                                                <div className=" mr-[14px] mt-[10px] text-[#8F9BBA]">
                                                    <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M14 20H0L0 18H14V20ZM7 16L1 10L2.41 8.59L6 12.17V0L8 0V12.17L11.59 8.59L13 10L7 16Z" fill="#8F9BBA" />
                                                    </svg>

                                                </div>
                                                <div className="text-[14px]    
                                              text-[#8F9BBA] font-sans font-medium text-center"
                                                    style={{
                                                        width: "100px",
                                                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                                                    }}>
                                                    Import Sheet
                                                </div>
                                            </div>
                                            <div>
                                                <div className="pl-[13px] -mt-[40px]">

                                                    <div style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
                                                        className="mt-[73.07px] basic-1/4 flex flex-row 
                                                     items-center mr-[55.5px] bg-[#FFFFFF]   rounded-[0.625rem]   "
                                                    >
                                                        <div className="pt-[4.64px] pl-[16.6px]">
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
                                                        <div className="bg-[#FFFFFF] 
                                                        pl-[9.64px] mb-[10.44]  ">
                                                            <input
                                                                type="text"
                                                                placeholder="Search "
                                                                className="outline-none
                                                                text-[12px]
                                                                 w-[273.87px] h-[36.94px]  
                                                            
                                                            "
                                                            // w-[273.87px] h-[36.94px]
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pl-[143.96px] pr-[53.84px] pt-[28.49px]" >
                            <table className="table-auto   text-center   
                            text-[#8F9BBA] text-[12px] font-sans
                         font-normal not-italic  " style={{ width: "100%" }}>

                                <tr className="max-h-[52.84px] text-center  ">
                                    <th className="w-[15%] py-[13px]">Activity Code</th>
                                    <th className="w-[15%] py-[13px]">Activity Name</th>
                                    <th className="w-[20%] py-[13px]">Unit of Measure</th>
                                    <th className="w-[30%] py-[13px]">GANG Productivity (Aprvd by PM)</th>

                                </tr>


                                {data?.map((item, i) => (
                                    <tbody className="  mb-[10px]   ">
                                        <tr className="   bg-[#ECF1F0] text-[#8F9BBA] text-[12px] font-sans  ">
                                            <td className="pt-[15px] pb-[14.83px]">{item.name} </td>
                                            <td className="pt-[15px] pb-[14.83px]">{item.role}</td>
                                            <td className="pt-[15px] pb-[14.83px]">{item.email}</td>
                                            <td className="pt-[15px] pb-[14.83px]">{item.mobile}</td>

                                        </tr>
                                        <tr>
                                            <td className="p-[10px]"></td>
                                        </tr>
                                    </tbody>
                                ))}

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HRMS
