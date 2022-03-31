import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { reactLocalStorage } from "reactjs-localstorage";
import Popup from "reactjs-popup";
import React, { useState, useEffect } from "react";



const ManpowerAndMachineryMulti = ({ closeModal, heading, Quantityachieved, selectDropDown, assigncarddataId }) => {



    const [open, setOpen] = useState(false);
    const [hrmsdata, setHRMSData] = useState("AIzaSyDoh4Gj_-xV033rPKneUFSpQSUpbqDqfDw");
    const [spread_sheet, setSpreadSheet] = useState("1LtpGuZdUivXEA4TqUvK9T3qRr1HER6TKzdSxTYPEAQ8");
    const [spread_sheet_id_1, setSpreadSheet_1] = useState('time sheet employees');

    const [timesheetdata, setTimeSheetData] = useState(null);
    const [timesheetname, setTimeSheetName] = useState(null);
    const [timesheetremark, setTimeSheetRemark] = useState(null);
    const [timesheethours, setTimeSheetHours] = useState(null);
    const [employeeid, setEmployeeId] = useState(null);
    const [employeedesignation, setEmployeeDesignation] = useState(null);
    const [addtolistdata, setAddToListData] = useState([]);



    useEffect(() => {

        const token = reactLocalStorage.get("access_token", false);
        const feach = async () => {
            try {
                const data1 = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${spread_sheet}/values/${spread_sheet_id_1}?key=${hrmsdata}`,)
                // console.log(data1?.data?.values)
                setTimeSheetData(data1?.data?.values)
            } catch (error) {
                console.log(error)
            }
        }

        feach();



    }, []);



    const ManpowerAndMachinery = [
        { "designation": "Employee ID", "unit": "Employee Name", "no": "Designation", "totalhours": "Total Hours", "action": "action" },
        { "designation": "Employee ID", "unit": "Employee Name", "no": "Designation", "totalhours": "Total Hours", "action": "action" },
        { "designation": "Employee ID", "unit": "Employee Name", "no": "Designation", "totalhours": "Total Hours", "action": "action" },

    ]

    const TimeSelectFun = (e) => {
        console.log(e.target.value)
        let spitData = e.target.value.split(",")
        setTimeSheetName(`${spitData[1]} ${spitData[2]}`)
        setEmployeeId(spitData[0])
        setEmployeeDesignation(spitData[3])
        console.log(spitData)

        setOpen(true) ///open popup
    }

    const AddToList = () => {

        let AddlistObject = {
            "jc_number": assigncarddataId,
            "employee_id": employeeid,
            "designation": employeedesignation,
            "name": timesheetname,
            "hours": timesheethours,
            "remark": timesheetremark
        }
        setAddToListData([...addtolistdata, AddlistObject])

        setOpen(false)
    }


    console.log(addtolistdata)


    return (
        <div className="max-w-[100%]  scroll_bar_ManpowerMulti  overflow-hidden bg-[#FFFFFF] justify-center items-center  my-[10px] mt-[20px]  pb-[20px] rounded-[31.529px]">
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
                        <div className=" float-right font-secondaryFont ml-[180.65px]
                          mt-[11.51px] text-[#000000]  font-medium not-italic text-[28.09px]
                           tracking-[-0.02em]">
                            {selectDropDown ? <div className=" w-[250px] border-b border-black   ">
                                <select className=" font-secondaryFont font-medium not-italic text-[14px] leading-[
            37.83px] border-none bg-[#ffffff] w-full focus:outline-none text-[#2E3A59] "
                                    onClick={(e) => TimeSelectFun(e)}>
                                    <option>Employee ID</option>
                                    {timesheetdata?.slice(1).map((item, id) => {
                                        return <option value={item}>{`${item[0]} [${item[3]}]`}</option>
                                    })}

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
                <table className=" w-[100%]  pt-[24px] ml-[40px]">
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
            <div className=" ">

                <Popup
                    open={open}
                    position="right center"
                    model
                    className="jobCard_popup"
                >
                    <div className="p-4 jobCard_popup">
                        <div className="text-[24px]">
                            ID : {employeeid}
                        </div>
                        <div className=" grid grid-cols-4 p-4 gap-3">
                            <div className="col-span-3    " style={{ borderBottom: "2px dotted  black" }}>
                                <label className="text-[14px]  text-[#aaa]" >Name</label>
                                <p className="text-[18px]  text-[#aaa]" >{timesheetname}</p>
                            </div>
                            <div className="col-span-1 pt-4">
                                <input
                                    id="FirstName"
                                    name="FirstName"
                                    type="number"
                                    // value={formik.values.FirstName}
                                    onChange={(e) => setTimeSheetHours(e.target.value)}
                                    className="  h-10 w-full border-b
                                     font-medium font-secondaryFont border-[#6d6c6c] text-gray-900
                                       focus:outline-none focus:border-[#5e5d5d]"
                                    placeholder="Hour(s)"
                                />

                            </div>
                        </div>
                        <div className="p-4">
                            <input
                                id="FirstName"
                                name="FirstName"
                                type="text"
                                // value={formik.values.FirstName}
                                onChange={(e) => setTimeSheetRemark(e.target.value)}
                                className="  h-10 w-full border-b
                                     font-medium font-secondaryFont border-[#6d6c6c] text-gray-900
                                       focus:outline-none focus:border-[#5e5d5d]"
                                placeholder="Remarks"
                            />
                        </div>

                        <div className="mt-10  float-right ">
                            <button className="  text-[#4b75e7] text-[15px]   rounded-[5px] p-2"
                                onClick={(e) => setOpen(false)}>
                                CANCEL
                            </button>
                            <button className=" text-[#4b75e7] text-[15px]   rounded-[5px] p-2"
                                onClick={(e) => AddToList(e)}>
                                ADD TO LIST
                            </button>
                        </div>
                    </div>

                </Popup>
            </div>
        </div>
    );
};

export default ManpowerAndMachineryMulti;
