import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { reactLocalStorage } from "reactjs-localstorage";
import Popup from "reactjs-popup";
import React, { useState, useEffect } from "react";



const EquipmentComponent = ({ closeModal, heading, Quantityachieved, selectDropDown, assigncarddataId }) => {



    const [open, setOpen] = useState(false);
    const [hrmsdata, setHRMSData] = useState("AIzaSyDoh4Gj_-xV033rPKneUFSpQSUpbqDqfDw");
    const [spread_sheet, setSpreadSheet] = useState("1LtpGuZdUivXEA4TqUvK9T3qRr1HER6TKzdSxTYPEAQ8");
    const [spread_sheet_id_1, setSpreadSheet_1] = useState('time sheet equipments');

    const [timesheetdata, setTimeSheetData] = useState(null);
    const [timesheetname, setTimeSheetName] = useState(null);
    const [timesheetremark, setTimeSheetRemark] = useState(null);
    const [timesheethours, setTimeSheetHours] = useState(null);
    const [employeeid, setEmployeeId] = useState(null);
    const [employeedesignation, setEmployeeDesignation] = useState(null);
    const [addtolistdata, setAddToListData] = useState([]);
    const [empoyeedata, setEmpoyeeData] = useState(null);
    const [empoyeealldata, setEmpoyeeAllData] = useState(null);
    const [filterempoyeealldata, setFilterEmpoyeeAllData] = useState(null);
    const [empoyeeupdate, setEmpoyeeUpdate] = useState(false);
    const [editopen, setEditOpen] = useState(false);
    const [cenceldelete, setCencelDelete] = useState(false);
    const [editprofileid, setEditProfileId] = useState(null);

    const [deleteid, setDeleteId] = useState(null);

    const [textData, settextData] = useState([]);

    const [DropDownSelect, setDropDownSelect] = useState(false);



    const { addToast } = useToasts();

    useEffect(() => {

        const token = reactLocalStorage.get("access_token", false);
        const feach = async () => {
            try {
                const data1 = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${spread_sheet}/values/${spread_sheet_id_1}?key=${hrmsdata}`,)
                // console.log(data1?.data?.values)
                setTimeSheetData(data1?.data?.values)
                setFilterEmpoyeeAllData(data1?.data?.values)
            } catch (error) {
                console.log(error)
            }
        }

        feach();

        // const feach1 = async () => {
        //     try {
        //         const data1 = await axios.get(`${process.env.REACT_APP_BASE_EMPLOYEE}/equipments`,)
        //         console.log(data1?.data)
        //         setFilterEmpoyeeAllData(data1?.data)
        //         setEmpoyeeData(data1?.data)
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }

        // feach1();

        const feach2 = async () => {
            try {
                const data1 = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/find_my_job_card_equipments_by_jc_no/${assigncarddataId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                if (data1?.status === "200") {
                    setEmpoyeeUpdate(false)
                }
                console.log(data1?.status)
                setEmpoyeeAllData(data1?.data)

            } catch (error) {
                console.log(error)
            }
        }

        feach2();

    }, [assigncarddataId, empoyeeupdate]);






    useEffect(() => {

        if (timesheetdata && empoyeealldata) {


            let deta = timesheetdata?.filter((item) => {
                return !empoyeealldata.find((items) => {
                    return item[0] === items.equipment_id
                })
            }

            )
            setFilterEmpoyeeAllData(deta)
        }
    }, [empoyeealldata, timesheetdata])



    const TimeSelectFun = (e) => {



        let spitData = e.target.value.split(",")
        setTimeSheetName(`${spitData[1]} ${spitData[2]}`)
        setEmployeeId(spitData[0])
        setEmployeeDesignation(spitData[3])


        if (spitData[1]) {
            console.log(spitData[1])
            setOpen(true)  ///open popup
        }

    }

    const AddToList = () => {


        let organizationId = ""

        const token = reactLocalStorage.get("access_token", false);
        const organization_Id = reactLocalStorage.get("organization_id", false);

        if (organization_Id !== "undefined" && organization_Id !== null) {
            organizationId = organization_Id
        }


        let AddlistObject = {
            "jc_id": assigncarddataId,
            "equipment_id": employeeid,
            "designation": employeedesignation,
            "equipment_name": timesheetname,
            "hour": timesheethours,
            "remarks": timesheetremark,
            "organization_id": organizationId
        }



        axios.post(`${process.env.REACT_APP_BASE_URL}/api/create_my_job_card_equipments`, AddlistObject, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                // console.log(response);
                if (response.status === 201) {
                    addToast(" Equipments is add Sucessfully", {
                        appearance: "success",
                        autoDismiss: true,
                    })
                    setEmpoyeeUpdate(o => !o)
                    setDropDownSelect(true)
                    setDropDownSelect(false)
                }
            })
            .catch((error) => {
                addToast(error.response.data.message, {
                    appearance: "error",
                    autoDismiss: true,
                })
            });


        setAddToListData([...addtolistdata, AddlistObject])

        setOpen(false)
    }

    const EditProfile = (e, alldata) => {
        setEmployeeId(alldata?.employee_id)
        setTimeSheetName(alldata.employee_name)
        setTimeSheetHours(alldata.hour)
        setTimeSheetRemark(alldata.remarks)
        setEmployeeDesignation(alldata.designation)
        setEditProfileId(alldata?._id)

        setEditOpen(true)
    }

    const EditAddToList = () => {

        let AddlistObject = {
            "jc_id": assigncarddataId,
            "equipment_id": employeeid,
            "designation": employeedesignation,
            "equipment_name": timesheetname,
            "hour": timesheethours,
            "remarks": timesheetremark
        }


        const token = reactLocalStorage.get("access_token", false);
        axios.patch(`${process.env.REACT_APP_BASE_URL}/api/update_my_job_card_equipments/${editprofileid}`, AddlistObject, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                // console.log(response);
                if (response.status === 200) {
                    addToast(" Equipments is edit Sucessfully", {
                        appearance: "success",
                        autoDismiss: true,
                    })
                    setEmpoyeeUpdate(o => !o)
                    setEditOpen(false)
                }
            })
            .catch((error) => {
                addToast(error.response.data.message, {
                    appearance: "error",
                    autoDismiss: true,
                })
            });


    }

    const DeleteProfile = (e, alldata) => {
        setDeleteId(alldata)
        setCencelDelete(true)
    }


    const conformDelete = () => {

        const token = reactLocalStorage.get("access_token", false);
        const feach = async () => {
            try {
                const data = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/delete_my_job_card_equipments/${deleteid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                if (data?.status === 200) {

                    window.location.reload(false);
                }

            } catch (error) {
                console.log(error)
            }
        }
        feach();
        setCencelDelete(false)
    }


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
                                    onChange={(e) => TimeSelectFun(e)}>
                                    <option>Employee ID</option>
                                    {!DropDownSelect && filterempoyeealldata && filterempoyeealldata?.slice(2).map((item, id) => {
                                        return <option value={[item[0], item[1], item[2], item[3]]}>
                                            {`${item[0]} [${item[3]}]`}
                                        </option>
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

                    {empoyeealldata?.map((item, i) => {
                        return <tbody

                            className=" max-w-[631px] font-secondaryFont   text-[#000000] font-normal not-italic text-[12px] leading-[20px] tracking-[-2%]"
                        >
                            <tr className="rounded  bg-[#ECF1F0] h-[35px]">

                                <th className="text-[#8F9BBA]">{item.equipment_id}</th>
                                <th className="text-[#8F9BBA]">{item.equipment_name}</th>
                                <th className="text-[#8F9BBA]">{item.designation}</th>
                                <th className="text-[#8F9BBA]">{item.hour}</th>
                                <th className="text-[#8F9BBA]">{item.remarks}</th>
                                <th className="text-[#8F9BBA]">


                                    <div className="flex flex-row space-x-xl justify-center">
                                        <div
                                            // className={`${editpermission === "EDIT-CLIENTS" || editpermission === "ALL" ? "cursor-pointer" : "disabledclass"}`}
                                            onClick={(e) => EditProfile(e, item)}
                                            className="cursor-pointer"
                                        >
                                            <svg
                                                width="19"
                                                height="20"
                                                viewBox="0 0 19 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M1.41999 19.0853C1.13948 19.0848 0.872062 18.9665 0.682993 18.7593C0.490439 18.5537 0.394758 18.2758 0.419993 17.9953L0.664993 15.3013L11.983 3.98725L15.52 7.52325L4.20499 18.8363L1.51099 19.0813C1.47999 19.0843 1.44899 19.0853 1.41999 19.0853ZM16.226 6.81625L12.69 3.28025L14.811 1.15925C14.9986 0.971476 15.2531 0.865967 15.5185 0.865967C15.7839 0.865967 16.0384 0.971476 16.226 1.15925L18.347 3.28025C18.5348 3.46782 18.6403 3.72234 18.6403 3.98775C18.6403 4.25316 18.5348 4.50769 18.347 4.69525L16.227 6.81525L16.226 6.81625Z"
                                                    fill="#0FCC7C"
                                                />
                                            </svg>
                                        </div>
                                        <div className="cursor-pointer"
                                            onClick={(e) => DeleteProfile(e, item._id)}
                                        >
                                            <svg
                                                width="18"
                                                height="21"
                                                viewBox="0 0 18 21"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M14 20.5063H4C2.89543 20.5063 2 19.6109 2 18.5063V5.50635H0V3.50635H4V2.50635C4 1.40178 4.89543 0.506348 6 0.506348H12C13.1046 0.506348 14 1.40178 14 2.50635V3.50635H18V5.50635H16V18.5063C16 19.6109 15.1046 20.5063 14 20.5063ZM4 5.50635V18.5063H14V5.50635H4ZM6 2.50635V3.50635H12V2.50635H6ZM12 16.5063H10V7.50635H12V16.5063ZM8 16.5063H6V7.50635H8V16.5063Z"
                                                    fill="#F42424"
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                </th>
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
                    open={editopen}
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
                                    value={timesheethours}
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
                                value={timesheetremark}
                                onChange={(e) => setTimeSheetRemark(e.target.value)}
                                className="  h-10 w-full border-b
                     font-medium font-secondaryFont border-[#6d6c6c] text-gray-900
                       focus:outline-none focus:border-[#5e5d5d]"
                                placeholder="Remarks"
                            />
                        </div>

                        <div className="mt-10  float-right ">
                            <button className="  text-[#4b75e7] text-[15px]   rounded-[5px] p-2"
                                onClick={(e) => setEditOpen(false)}>
                                CANCEL
                            </button>
                            <button className=" text-[#4b75e7] text-[15px]   rounded-[5px] p-2"
                                onClick={(e) => EditAddToList(e)}>
                                ADD TO LIST
                            </button>
                        </div>
                    </div>

                </Popup>
            </div>


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

            <div>
                <Popup
                    open={cenceldelete}
                    position="right center"
                    model
                >
                    <div className="p-7">
                        <div className="flex pb-3">
                            <div>

                            </div>
                            <div style={{ marginLeft: "90%" }}>
                                <span className="text-[red] text-[19px] cursor-pointer" onClick={(e) => setCencelDelete(false)} >
                                    <b>X</b>
                                </span>
                            </div>
                        </div>
                        <div className="mt-3">
                            <h3>
                                Are You sure You Want to Delete
                            </h3>
                        </div>
                        <div className=" w-[70px] text-center border-[1px] border-solid border-[#000000] rounded bg-[#09a061] mt-[30px]">
                            <button
                                onClick={(e) => conformDelete(e)}
                                className="  h-[37px] font-mainFont text-[15px] font-normal not-italic leading-[18px]   text-[#ffffff] ">
                                Yes
                            </button>
                        </div>
                    </div>

                </Popup>

            </div>

        </div>
    );
};

export default EquipmentComponent;
