import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
const ProductSearch = ({ placeHolderName, handleChangeForClient, handleChangeForProject }) => {

    const [openSearchData, setopenSearchData] = useState(false);
    const [openSearchData1, setopenSearchData1] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        if (openSearchData1 === null || openSearchData1 === "") {
            setopenSearchData(false)
        }
        else {
            setopenSearchData(true)
        }

    }, [openSearchData1])

    const handleChangeForClientData = (e) => {
        setopenSearchData1(e.target.value) 
    }

    console.log(openSearchData)

    return (
        <div>

            <div className=" basic-1/4 flex flex-row px-[20px]       bg-[#FFFFFF] rounded-[0.625rem] ">
                <div className="pt-[18px]">
                    <svg
                        width="11"
                        height="12"
                        viewBox="0 0 11 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="5" cy="5" r="4.3" stroke="#1B2559" strokeWidth="1.4" />
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
                <div className="bg-[#FFFFFF] pl-[7px]    ">
                    <input
                        type="text"
                        placeholder={placeHolderName}
                        className="outline-none w-[332px] h-[46px] rounded-[10px]"
                        onChange={(e) => handleChangeForClientData(e)}

                    />


                </div>
            </div>
            <div className="float-right -mt-[10px] text-[#4D627A] text-[15px] cursor-pointer font-serif"
                style={{ width: "90%", backgroundColor: "white", boxShadow: " 0px 82px 54px rgba(57, 78, 119, 0.07), 0px 37.9111px 24.9658px rgba(57, 78, 119, 0.0519173), 0px 21.6919px 14.2849px rgba(57, 78, 119, 0.0438747), 0px 13.1668px 8.67082px rgba(57, 78, 119, 0.0377964), 0px 7.93358px 5.22455px rgba(57, 78, 119, 0.0322036), 0px 4.41793px 2.90937px rgba(57, 78, 119, 0.0261253), 0px 1.90012px 1.2513px rgba(57, 78, 119, 0.06)" }}>
                {openSearchData && <ul className="searchList"  >
                    <li onClick={()=>{navigate("/job_cards/All-job-cards")}} >
                        Demo client 1
                    </li>
                    <li>
                        Demo client 2
                    </li>
                    <li>
                        Demo client 3
                    </li>
                </ul>}
            </div>
        </div>
    );
};

export default ProductSearch;
