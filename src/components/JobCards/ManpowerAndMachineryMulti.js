import React from "react";
const ManpowerAndMachineryMulti = ({ closeModal, heading, Quantityachieved, selectDropDown }) => {


    const ManpowerAndMachinery = [
        { "designation": "Employee ID", "unit": "Employee Name", "no": "Designation", "totalhours": "Total Hours", "action": "action" },
        { "designation": "Employee ID", "unit": "Employee Name", "no": "Designation", "totalhours": "Total Hours", "action": "action" },
        { "designation": "Employee ID", "unit": "Employee Name", "no": "Designation", "totalhours": "Total Hours", "action": "action" },



    ]


    return (
        <div className="max-w-[734px]  scroll_bar_ManpowerMulti  overflow-hidden bg-[#FFFFFF] justify-center items-center  my-[10px] mt-[20px]  pb-[20px] rounded-[31.529px]">
            <div className="flex flex-row justify-Start content-center items-center   ">
                <div className="grid grid-cols-2">
                    <div className="col-span-1">
                        <div className="  font-secondaryFont ml-[18.65px]  mt-[11.51px] text-[#000000]
                          font-medium not-italic text-[20.09px] tracking-[-0.02em]">
                            {/* Manpower&#160;&&#160;Machinery */}
                            {heading}

                        </div>
                    </div>
                    <div className="col-span-1  ">
                        <div className=" float-right font-secondaryFont ml-[80.65px]  mt-[11.51px] text-[#000000]  font-medium not-italic text-[28.09px] tracking-[-0.02em]">
                            {selectDropDown ? <div className=" w-[250px] border-b border-black   ">
                                <select className=" font-secondaryFont font-medium not-italic text-[14px] leading-[
            37.83px] border-none bg-[#ffffff] w-full focus:outline-none text-[#2E3A59] ">
                                    <option>Employee ID</option>
                                </select>
                            </div> :
                                <div className="  flex flex-row  items-center     
                        bg-[#FFFFFF] rounded-[0.625rem] float-right" style={{ dropShadow: "(0px 4.70288px 4.70288px rgba(0, 0, 0, 0.25))" }}>
                                    <div className="pl-[20px]  pt-2">
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
                                    <div className="bg-[#FFFFFF] pl-[7px]  ">
                                        <input type="text" placeholder="Search"
                                            className="outline-none  secrchplace  "
                                            style={{ dropShadow: ("0px 4.70288px 4.70288px rgba(0, 0, 0, 0.25)") }} />
                                    </div>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row mt-[30px] ml-[37px] mr-[20px]">
                <table className=" w-[631px]  pt-[24px] ml-[40px]">
                    <thead className="font-secondaryFont text-[#000000] font-normal not-italic text-[12px] leading-[20px] tracking-[-2%] py-[36px] ">
                        <tr className="bg-[#ECF1F0]">
                            <th className="py-[20px]">Employee ID</th>
                            <th className="">Employee Name</th>
                            <th className="">Designation</th>
                            <th className="">Total Hours</th>
                            <th className="">Remarks</th>
                            <th className="">Action</th>
                        </tr>
                        <tr className="p-[15px] ">
                            <td className="p-[10px]" ></td>
                        </tr>
                    </thead>

                    {ManpowerAndMachinery?.map((item, i) => {
                        return <tbody

                            className=" max-w-[631px] font-secondaryFont   text-[#000000] font-normal not-italic text-[12px] leading-[20px] tracking-[-2%]"
                        >
                            <tr className="rounded  bg-[#ECF1F0]">

                                <th className="text-[#8F9BBA]">{item.designation}</th>
                                <th className="text-[#8F9BBA]">{item.unit}</th>
                                <th className="text-[#8F9BBA]">{item.designation}</th>
                                <th className="text-[#8F9BBA]">{item.no}</th>
                                <th className="text-[#8F9BBA]">{item.totalhours}</th>
                                <th className="text-[#8F9BBA]">{item.action}</th>
                            </tr>
                            <tr className="p-[15px] ">
                                <td className="p-[10px]" ></td>
                            </tr>

                        </tbody>
                    })}
                </table>
            </div>

            {Quantityachieved && <div className="flex flex-row justify-between  px-[50px]  mt-[42px]">
                <div className="mr-[45px] border-b solid border-black ml-[30px]">
                    <div className="w-[200px]  h-[25px] rounded text-sm font-secondaryFont text-[12px]  font-medium not-italic    text-[#000000] ">
                        Quantity to be achieved   :   15  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Nos

                    </div>
                </div>
                {/* <div className="flex flex-row  mr-[-30px]">
                    <div className="mr-[26px] shadow-[buttonshadow] ">

                        <button onClick={closeModal} className="w-[66.79px] btnshadow self-center h-[16.7px] rounded text-sm font-secondaryFont text-[9.35px] text-center font-medium not-italic items-center  bg-[#F42424] text-[#000000] ">
                            Cancel
                        </button>

                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-[66.79px] h-[16.7px] rounded btnshadow  self-center text-sm font-secondaryFont text-[9.35px] font-medium not-italic  bg-[#0FCC7C] text-[#000000] "
                        >
                            Save
                        </button>
                    </div>
                </div> */}
            </div>}
        </div>
    );
};

export default ManpowerAndMachineryMulti;
