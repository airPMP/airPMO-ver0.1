import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { reactLocalStorage } from "reactjs-localstorage";
import Popup from "reactjs-popup";
import React, { useState, useEffect } from "react";
import { CurrentQuantityTOAchivedData, EmployeeChangeData, EquipmentAllData, JobCardEmplyeData, JobCardEquipmentData, MyjobCardAfterPtachApi, MyjobCardAfterPtachApiData, QuantityToBeAchived, CumilativeQuntity, ExceCuteDate } from '../../SimplerR/auth'



const PlannedAllowable = ({ closeModal, heading, Quantityachieved, selectDropDown, assigncarddataA }) => {

    const [open, setOpen] = useState(false);
    const [timesheetdata, setTimeSheetData] = useState(null);
    const [timesheetid, setTimeSheetId] = useState(null);
    const [timesheetname, setTimeSheetName] = useState(null);
    const [quantityachieved, setQuantityAchieved] = useState(null);
    const [spidata, setSpiData] = useState(null)
    const [stdSalaries,setStdSalaries] = useState(null)
    const [hrmsFormat,setHrmsFormat] = useState(null)
    const [stdRentals,setStdRentals] = useState(null)
    const [hrmsEquipment,setHrmsEquipment] = useState(null)
    const currentquantitytoachivedData = CurrentQuantityTOAchivedData.use()
    const employeechangeData = EmployeeChangeData.use()
    const equipmentallData = EquipmentAllData.use()
    const myjobCardAfterPtachApi = MyjobCardAfterPtachApi.use()
    const myjobCardAfterPtachApiData = MyjobCardAfterPtachApiData.use()
    const jobCardEmplyeData = JobCardEmplyeData.use()
    const jobCardEquipmentData = JobCardEquipmentData.use()
    const quantityToBeAchived = QuantityToBeAchived.use()
    const cumilativeQuntity = CumilativeQuntity.use()
    const exceCuteDate = ExceCuteDate.use()


    const [spidatat, setSpiDatat] = useState(true)
    const [roleDataLocal, setRoleDataLocal] = useState(true)
    let useperma = useParams()

    useEffect(() => {
        const fetchSalary = async () =>{
            const data1 = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/1LtpGuZdUivXEA4TqUvK9T3qRr1HER6TKzdSxTYPEAQ8/values/AT%20-%20HRMS%20Std%20Salaries?key=AIzaSyDoh4Gj_-xV033rPKneUFSpQSUpbqDqfDw`)
            let ClientIdStore = []
            
            data1?.data?.values.map((items, index) => {
                if (index >= 1) {
                    let res={}
                    items.forEach((val,i) =>{
                        res[data1.data.values[0][i]] = val
                    })
                    ClientIdStore.push(res)
                }
            })
            setStdSalaries(ClientIdStore)
        }
        fetchSalary()
        const fetchStdRentals = async () =>{
            const data1 = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/1LtpGuZdUivXEA4TqUvK9T3qRr1HER6TKzdSxTYPEAQ8/values/AT%20-%20HRMS%20Std%20Rentals?key=AIzaSyDoh4Gj_-xV033rPKneUFSpQSUpbqDqfDw`)
            let ClientIdStore = []
            
            data1?.data?.values.map((items, index) => {
                if (index >= 1) {
                    let res={}
                    items.forEach((val,i) =>{
                        res[data1.data.values[0][i]] = val
                    })
                    ClientIdStore.push(res)
                }
            })
            setStdRentals(ClientIdStore)
        }
        fetchStdRentals()

        const fetchHrmsEmployee = async () =>{
            const data1 = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/1LtpGuZdUivXEA4TqUvK9T3qRr1HER6TKzdSxTYPEAQ8/values/AT%20-%20HRMS%20format?key=AIzaSyDoh4Gj_-xV033rPKneUFSpQSUpbqDqfDw`)
            let ClientIdStore = []
            
            data1?.data?.values.map((items, index) => {
                if (index >= 1) {
                    let res={}
                    items.forEach((val,i) =>{
                        res[data1.data.values[0][i]] = val
                    })
                    ClientIdStore.push(res)
                }
            })
            setHrmsFormat(ClientIdStore)
        }
        fetchHrmsEmployee()

        const hEquipment = async () => {
            const data1 = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/1LtpGuZdUivXEA4TqUvK9T3qRr1HER6TKzdSxTYPEAQ8/values/AT%20-%20Equipment%20List%20format?key=AIzaSyDoh4Gj_-xV033rPKneUFSpQSUpbqDqfDw`)
            let ClientIdStore = []
            
            data1?.data?.values.map((items, index) => {
                if (index >= 1) {
                    let res={}
                    items.forEach((val,i) =>{
                        res[data1.data.values[0][i]] = val
                    })
                    ClientIdStore.push(res)
                }
            })
            setHrmsEquipment(ClientIdStore)
        }
        hEquipment()
    },[])

    useEffect(() => {
        if (assigncarddataA && spidatat) {
            setQuantityAchieved(assigncarddataA?.updated_quantity_to_be_achived)
            QuantityToBeAchived.set(assigncarddataA?.updated_quantity_to_be_achived)
            CumilativeQuntity.set(assigncarddataA.cumilative_quantity_to_be_achived ? assigncarddataA.cumilative_quantity_to_be_achived : assigncarddataA?.updated_quantity_to_be_achived)
            setSpiDatat(false)

        }

        const roleData = reactLocalStorage.get("roles", false);
        setRoleDataLocal(roleData)
    }, [assigncarddataA])


    const TimeSelectFun = (e) => {
        let spitData = e.target.value.split(",")
        setTimeSheetId(spitData[0])
        setTimeSheetName(`${spitData[1]} ${spitData[2]}`)
        setOpen(true) ///open popup
    }

    const onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
      }

    useEffect(() => {

        const PatchCalculatedData = (e) => {
            let assign_arr = []
            if (assigncarddataA.cumilative_quantity_log && assigncarddataA.cumilative_quantity_log.length > 0) {
                assigncarddataA.cumilative_quantity_log.forEach((item) => {

                    if (item.date && item.date == exceCuteDate) {
                        assign_arr.push({
                            ...item,
                            'cumilative_quantity_to_be_achived': cumilativeQuntity,
                            updated_quantity_to_be_achived: quantityToBeAchived
                        })
                    } else {
                        assign_arr.push(item,{
                            'date': exceCuteDate,
                            updated_quantity_to_be_achived: quantityToBeAchived,
                            'cumilative_quantity_to_be_achived': cumilativeQuntity
                        })
                    }
                })
            } else {
               
                assign_arr.push({
                    'date': exceCuteDate,
                    'cumilative_quantity_to_be_achived': cumilativeQuntity
                })
            }
            const key = 'date';
            assign_arr = [...new Map(assign_arr.map(item =>
                [item[key], item])).values()];
            const token = reactLocalStorage.get("access_token", false);
            // let empCheck = employeechangeData &&  employeechangeData[employeechangeData.length - 1]
            let hourly_salrey = 0
            let hourly_standrd_salrey = 0
            const final_employee = []
            if(hrmsFormat && stdSalaries){
                employeechangeData && employeechangeData.forEach((empCheck) =>{

                    let ogEmployee = hrmsFormat && hrmsFormat.find(item => item.Id === empCheck.employee_id)
                    let stdSalary = stdSalaries && stdSalaries.find(item => item.Designation.toLowerCase() === empCheck.designation.toLowerCase())
                    let ctc = ogEmployee?.CTC
                    let std = stdSalary?.CTC
                    var date = new Date();
                    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                    // To calculate the time difference of two dates
                    var Difference_In_Time = new Date(exceCuteDate).getTime() - firstDay.getTime();
      
                    // To calculate the no. of days between two dates
                    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                    hourly_salrey = ctc / Number(Difference_In_Days) / Number(empCheck.hour)
                    hourly_standrd_salrey = std / Number(Difference_In_Days) / Number(empCheck.hour)

                    final_employee.push({...empCheck,ctc,std,hourly_salrey,hourly_standrd_salrey})
                })

            }
            const eqData = []
            if(stdRentals && hrmsEquipment){
                equipmentallData && equipmentallData.forEach((empCheck) =>{
                    let ogEmployee = hrmsEquipment && hrmsEquipment.find(item => item.Id === empCheck.equipment_id)
                    let stdSalary = stdRentals && stdRentals.find(item => item['Equipment Type'].toLowerCase() === empCheck.designation.toLowerCase())
                    let ctc = ogEmployee?.CTC
                    let std = stdSalary?.CTC
                    var date = new Date();
                    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                    // To calculate the time difference of two dates
                    var Difference_In_Time = new Date(exceCuteDate).getTime() - firstDay.getTime();
      
                    // To calculate the no. of days between two dates
                    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                    hourly_salrey = ctc / Number(Difference_In_Days) / Number(empCheck.hour)
                    hourly_standrd_salrey = std / Number(Difference_In_Days) / Number(empCheck.hour)

                    eqData.push({...empCheck,ctc,std,hourly_salrey,hourly_standrd_salrey})
                })
            }
            axios.patch(`${process.env.REACT_APP_BASE_URL}/api/update_job_card/${useperma.id}`, {

                quantity_to_be_achieved: assigncarddataA?.quantity_to_be_achieved,
                // updated_quantity_to_be_achived: quantityachieved,
                updated_quantity_to_be_achived: quantityToBeAchived,
                cumilative_quantity_log: assign_arr.length > 0 ? assign_arr : [],
                cumilative_quantity_to_be_achived: cumilativeQuntity,
                manpower_and_machinary: assigncarddataA?.manpower_and_machinary,
                actual_employees: final_employee ? final_employee : [],
                actual_equipments: eqData? eqData : [],
                alanned_vs_allowable_vs_actual: [],
                hourly_salrey: hourly_salrey,
                hourly_standrd_salrey: hourly_standrd_salrey
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                .then((response) => {
                    console.log(response)
                    if (response.status === 200) {
                        MyjobCardAfterPtachApi.set(true)
                        CurrentQuantityTOAchivedData.set(o => !o)

                    }
                })
                .catch((error) => {
                    console.log(error)

                })

        }

        PatchCalculatedData()

    }, [quantityToBeAchived,
        // quantityachieved, 
        jobCardEmplyeData, jobCardEquipmentData])


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
                            {heading}

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
                <table className=" w-[100%]  pt-[24px] ml-[40px]  scroll_bar_ManpowerMulti planned_table">
                    <thead className="font-secondaryFont text-[#000000] font-normal 
                    not-italic text-[12px] leading-[20px] tracking-[-2%]    ">
                        <tr className="bg-[#ECF1F0]  h-[40px] ">
                            <th className="py-[20px] bg-[#ECF1F0]  h-[40px]">SI No</th>
                            <th className="py-[20px] bg-[#ECF1F0]  h-[40px]">Designation</th>

                            {roleDataLocal !== "albannaadmin" && <th className="py-[20px] bg-[#ECF1F0]  h-[40px]">P Resources</th>}
                            {roleDataLocal !== "albannaadmin" && <th className="py-[20px] bg-[#ECF1F0]  h-[40px]">P Total Hrs</th>}
                            {roleDataLocal !== "albannaadmin" && <th className="py-[20px] bg-[#ECF1F0]  h-[40px]">Allowable Resources</th>}
                            {roleDataLocal !== "albannaadmin" && <th className="py-[20px] bg-[#ECF1F0]  h-[40px]">Allowable Total Hrs</th>}
                            <th className="py-[20px] bg-[#ECF1F0]  h-[40px]"> Actual Total Hrs</th>

                            {roleDataLocal !== "albannaadmin" && <th className="py-[20px] bg-[#ECF1F0]  h-[40px]"> Actual Total Cost</th>}
                            {roleDataLocal !== "albannaadmin" && <th className="py-[20px] bg-[#ECF1F0]  h-[40px]">SPI</th>}
                            {roleDataLocal !== "albannaadmin" && <th className="py-[20px] bg-[#ECF1F0]  h-[40px]">CPI</th>}
                        </tr>
                        <tr className="p-[15px]">
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

                                        {roleDataLocal !== "albannaadmin" &&
                                            <td className="py-[20px]">
                                                {item[1]}
                                            </td>}


                                        {roleDataLocal !== "albannaadmin" &&
                                            <td className="py-[20px]">
                                                {item[2]}
                                            </td>}


                                        {roleDataLocal !== "albannaadmin" &&
                                            <td className="py-[20px]">
                                                {item[3]}
                                            </td>}


                                        {roleDataLocal !== "albannaadmin" &&
                                            <td className="py-[20px]">
                                                {item[4]}
                                            </td>}


                                        <td className="py-[20px]">{item[5]}</td>

                                        {roleDataLocal !== "albannaadmin" && <td className="py-[20px]">{item[6]}</td>}

                                        {roleDataLocal !== "albannaadmin" && <td className="py-[20px]">{item[7]} </td>}
                                        {roleDataLocal !== "albannaadmin" && <td className="py-[20px]">{item[8]}</td>}

                                    </>


                                </tr>


                            </tbody>


                            // : <>
                            // </>
                        }</>
                    })}

                </table>
            </div>
            {roleDataLocal !== "albannaadmin" && Quantityachieved && <div className="flex flex-row justify-end  px-[50px]  mt-[42px]">
                {/* <div className="mr-[45px] border-b solid border-black ml-[30px]">
                    <div className="w-[300px]  h-[25px] rounded text-sm font-secondaryFont text-[12px]  font-medium not-italic    text-[#000000] ">
                        <div className="flex">
                            <div>  Quantity to be achieved  [ {assigncarddataA?.quantity_to_be_achieved}  ]
                                :
                            </div>

                            <div className="relative">
                                <input type='number' placeholder="Qty achieved"
                                    className="border-none pl-2  w-[100px]  gang_product_input"
                                    // value={quantityachieved} 
                                    value={quantityToBeAchived}
                                    onChange={(e) => {
                                        //    setQuantityAchieved(e.target.value);
                                        QuantityToBeAchived.set(e.target.value)
                                    }
                                    }

                                /> 
                            <div className="absolute right-0 top-0">  
                                [ {assigncarddataA?.manpower_and_machinary.length > 0 && assigncarddataA.manpower_and_machinary[0][" UNIT "] ?assigncarddataA.manpower_and_machinary[0][" UNIT "]: assigncarddataA?.unit} ]
                            </div>
                            </div>

                        </div>

                    </div>
                </div> */}
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
