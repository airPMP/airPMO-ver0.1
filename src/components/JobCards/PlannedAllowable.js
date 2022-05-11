import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { reactLocalStorage } from "reactjs-localstorage";
import Popup from "reactjs-popup";
import React, { useState, useEffect } from "react";
import { CurrentQuantityTOAchivedData, EmployeeChangeData, EquipmentAllData, JobCardEmplyeData, JobCardEquipmentData, MyjobCardAfterPtachApi, MyjobCardAfterPtachApiData } from '../../SimplerR/auth'



const PlannedAllowable = ({ closeModal, heading, Quantityachieved, selectDropDown, assigncarddataA }) => {




    const [open, setOpen] = useState(false);
    const [timesheetdata, setTimeSheetData] = useState(null);
    const [timesheetid, setTimeSheetId] = useState(null);
    const [timesheetname, setTimeSheetName] = useState(null);
    const [quantityachieved, setQuantityAchieved] = useState(null);
    const [spidata, setSpiData] = useState(null)
    const currentquantitytoachivedData = CurrentQuantityTOAchivedData.use()
    const employeechangeData = EmployeeChangeData.use()
    const equipmentallData = EquipmentAllData.use()
    const myjobCardAfterPtachApi = MyjobCardAfterPtachApi.use()
    const myjobCardAfterPtachApiData = MyjobCardAfterPtachApiData.use()
    const jobCardEmplyeData = JobCardEmplyeData.use()
    const jobCardEquipmentData = JobCardEquipmentData.use()

    const [spidatat, setSpiDatat] = useState(true)
    let useperma = useParams()


    useEffect(() => {
        if (assigncarddataA && spidatat) {
            setQuantityAchieved(assigncarddataA?.updated_quantity_to_be_achived)
            setSpiDatat(false)

        }
    }, [assigncarddataA])


    const TimeSelectFun = (e) => {
        let spitData = e.target.value.split(",")
        setTimeSheetId(spitData[0])
        setTimeSheetName(`${spitData[1]} ${spitData[2]}`)
        setOpen(true) ///open popup
    }


     
    useEffect(() => {

        const PatchCalculatedData = (e) => { 


            const token = reactLocalStorage.get("access_token", false);
            axios.patch(`${process.env.REACT_APP_BASE_URL}/api/update_job_card/${useperma.id}`, {

                quantity_to_be_achieved: assigncarddataA?.quantity_to_be_achieved,
                updated_quantity_to_be_achived: quantityachieved,
                manpower_and_machinary: assigncarddataA?.manpower_and_machinary,
                actual_employees: employeechangeData !== null ? employeechangeData : [],
                actual_equipments: equipmentallData !== null ? equipmentallData : [],
                alanned_vs_allowable_vs_actual: [],
                hourly_salrey: "10",
                hourly_standrd_salrey: "10"
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                .then((response) => {
                    console.log(response)
                    if (response.status === 200) {
                        console.log("jobCardEmplyeData")
                        MyjobCardAfterPtachApi.set(true)
                        CurrentQuantityTOAchivedData.set(o => !o)

                    }
                })
                .catch((error) => {
                    console.log(error)

                })

        }  

        PatchCalculatedData()  

    }, [quantityachieved, jobCardEmplyeData, jobCardEquipmentData])


    console.log(employeechangeData)



    return (
        <div className="max-w-[100%]     
        overflow-hidden bg-[#FFFFFF] justify-center items-center 
         my-[10px] mt-[20px]  pb-[20px] rounded-[31.529px]">
            <div className="flex flex-row justify-Start content-center items-center   ">
                <div className="grid grid-cols-2  ">
                    <div className="col-span-1">
                        <div className="  font-secondaryFont ml-[18.65px]  mt-[11.51px] text-[#000000]
                          font-medium not-italic text-[20.09px] tracking-[-0.02em]">
                            {/* Manpower&#160;&&#160;Machinery */}
                            {/* {heading} */}

                        </div>
                    </div>
                    <div className="col-span-1   ">
                        <div className=" float-right font-secondaryFont 
                        ml-[80.65px]  mt-[11.51px] text-[#000000]  font-medium not-italic 
                        text-[28.09px] tracking-[-0.02em]">
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
                                //         <div className="  flex flex-row  items-center     
                                // bg-[#FFFFFF] rounded-[0.625rem] float-right" style={{ dropShadow: "(0px 4.70288px 4.70288px rgba(0, 0, 0, 0.25))" }}>
                                //             <div className="pl-[20px]  pt-2">
                                //                 <svg
                                //                     width="11"
                                //                     height="12"
                                //                     viewBox="0 0 11 12"
                                //                     fill="none"
                                //                     xmlns="http://www.w3.org/2000/svg"
                                //                 >
                                //                     <circle
                                //                         cx="5"
                                //                         cy="5"
                                //                         r="4.3"
                                //                         stroke="#1B2559"
                                //                         strokeWidth="1.4"
                                //                     />
                                //                     <line
                                //                         x1="10.0101"
                                //                         y1="11"
                                //                         x2="8"
                                //                         y2="8.98995"
                                //                         stroke="#1B2559"
                                //                         strokeWidth="1.4"
                                //                         strokeLinecap="round"
                                //                     />
                                //                 </svg>
                                //             </div>
                                //             <div className="bg-[#FFFFFF] pl-[7px]  ">
                                //                 <input type="text" placeholder="Search"
                                //                     className="outline-none  secrchplace  "
                                //                     style={{ dropShadow: ("0px 4.70288px 4.70288px rgba(0, 0, 0, 0.25)") }} />
                                //             </div>
                                //         </div>
                                null
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row mt-[30px]   mr-[20px]  scroll_bar_ManpowerMulti " >
                <table className=" w-[100%]  pt-[24px] ml-[40px]  scroll_bar_ManpowerMulti">
                    <thead className="font-secondaryFont text-[#000000] font-normal 
                    not-italic text-[12px] leading-[20px] tracking-[-2%]    ">
                        <tr className="bg-[#ECF1F0]  h-[40px] ">
                            <th className="py-[20px]">SI No</th>
                            <th className="py-[20px]">Designation</th>
                            <th className="py-[20px]">P Resources</th>
                            <th className="py-[20px]">P Total Hrs</th>
                            <th className="py-[20px]">Allowable Resources</th>
                            <th className="py-[20px]">Allowable Total Hrs</th>
                            <th className="py-[20px]"> Actual Total Hrs</th>
                            <th className="py-[20px]"> Actual Total Cost</th>
                            <th className="py-[20px]">SPI</th>
                            <th className="py-[20px]">CPI</th>
                        </tr>
                        <tr className="p-[15px] ">
                            <td className="p-[10px]" ></td>
                        </tr>
                    </thead>

                    {assigncarddataA && assigncarddataA?.alanned_vs_allowable_vs_actual[0]?.map((item, id) => {
                        return <>  {

                            // item[1]!=="0.00" && !item[0].startsWith(" Part NO") ?


                            <tbody
                                className=" max-w-[100%] font-secondaryFont   
                                         text-[#000000]font-normal not-italic text-[12px]
                                            leading-[20px]tracking-[-2%]
                                             "
                            >

                                <tr className=" h-[20px] text-center">

                                    <> <td className="py-[20px]">{id + 1}</td>
                                        <td className="py-[20px]">{item[0]}</td>

                                        <td className="py-[20px]">
                                            {item[1]}
                                        </td>


                                        <td className="py-[20px]">
                                            {item[2]}
                                        </td>
                                        <td className="py-[20px]">
                                            {item[3]}
                                        </td>
                                        <td className="py-[20px]">

                                            {item[4]}

                                        </td>

                                        <td className="py-[20px]">{item[5]}</td>
                                        <td className="py-[20px]">{item[6]}</td>
                                        <td className="py-[20px]">{item[7]} </td>
                                        <td className="py-[20px]">{item[8]}</td>

                                    </>


                                </tr>


                            </tbody>


                            // : <>
                            // </>
                        }</>
                    })}

                </table>
            </div>

            {Quantityachieved && <div className="flex flex-row justify-between  px-[50px]  mt-[42px]">
                <div className="mr-[45px] border-b solid border-black ml-[30px]">
                    <div className="w-[300px]  h-[25px] rounded text-sm font-secondaryFont text-[12px]  font-medium not-italic    text-[#000000] ">
                        <div className="flex">
                            <div>  Quantity to be achieved  [ {assigncarddataA?.quantity_to_be_achieved}  ]
                                :
                            </div>

                            <div>
                                {/* <p className=" "  >Qty achieved</p> */}
                                <input type='number' placeholder="Qty achieved"
                                    className="border-none pl-2  w-[100px]  gang_product_input"
                                    value={quantityachieved}
                                    // value={assigncarddataA?.manpower_and_machinary[0][" UNIT "]}
                                    onChange={(e) =>
                                        setQuantityAchieved(e.target.value)
                                        //  QtyAchieved(e)
                                    }

                                /> <span>{assigncarddataA?.manpower_and_machinary[0][" UNIT "]}</span>
                            </div>

                        </div>

                    </div>
                </div>
                <div className="flex ">
                    <div className="text-[14px] pr-2">
                        {assigncarddataA?.total_overall_spi}
                    </div>
                    <div className="text-[14px] ">
                        {assigncarddataA?.total_overall_cpi}
                    </div>
                </div>

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
                            ID : {timesheetid}
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
                                    // onChange={formik.handleChange}
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
                                type="number"
                                // value={formik.values.FirstName}
                                // onChange={formik.handleChange}
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
                            <button className=" text-[#4b75e7] text-[15px]   rounded-[5px] p-2" onClick={(e) => setOpen(false)}>
                                ADD TO LIST
                            </button>
                        </div>
                    </div>

                </Popup>
            </div>
        </div>
    );
};

export default PlannedAllowable;
