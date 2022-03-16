import React, { useState, useEffect } from 'react'
import Header from '../layout/Header'
import SideBar from '../layout/SideBar'
import { useLocation, useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { useToasts } from "react-toast-notifications";
import { getClientApi } from '../../AllApi/Api'
import { SearchClientSet, FireQuantitySheetId, ProductiveNameActive, UpdateSheetData, EntityShowProductiveEye } from '../../SimplerR/auth'
import axios from "axios";
import FireQuantitySearch from './FireQuantitySearch';


const FireQuantity = () => {

    const [clientdata, setClientData] = useState(null);
    const [openSearchData, setopenSearchData] = useState(false);
    const [openSearchData1, setopenSearchData1] = useState(null);
    const [searchdata, setSearchData] = useState(null);
    const [clientsearchdata, setClientSearchData] = useState(null);
    const [projectsearchdata, setProjectSearchData] = useState(null);
    const [productivesheetdata, setProductiveSheetData] = useState(null);
    const [productivesheetsllsata, setProductiveSheetAllData] = useState(null);
    const [filteredsheetdata, setFilteredSheetData] = useState(null);
    const [activedatashow, setActiveDataShow] = useState(null)
    const [activedata, setActiveData] = useState(null)
    const [zonetotal, setZoneTotal] = useState(null)
    const [allsubzonevalue, setAllSubZoneValue] = useState([])
    const [allsubzoneshow, setAllSubZoneShow] = useState(null)
    const [allsubzoneuniqe, setAllSubZoneUniqe] = useState(null)
    const [chooseprojectopncls, setChooseprojectOpnCls] = useState(false)
    const [sheetupdateddata, setSheetUpdatedData] = useState(false)

    const [title, setTitle] = useState(null);
    let urlTitle = useLocation();
    const { addToast } = useToasts();
    const searchclientset = SearchClientSet.use()
    const firequantitysheetid = FireQuantitySheetId.use()
    const projectnameactive = ProductiveNameActive.use()
    const entityshoeproductiveeye = EntityShowProductiveEye.use()
    const updatesheetdata = UpdateSheetData.use()

    let LocationButton = useLocation();
    let navigate = useNavigate();


    useEffect(() => {

        if (urlTitle.pathname === "/DataInjestion/QuantitySheet") {
            setTitle("Data Injestion");
        }
    }, [urlTitle.pathname])


    useEffect(() => {
        const clientidname = (e, Objdata) => {
            setClientSearchData(Objdata?.client_name)
        }
        setopenSearchData(false)
        clientidname()
        //when he click to seach client  then this useState will and run the clientNameFun run -7a
        //
    }, [clientsearchdata])



    useEffect(() => {

        const userData = getClientApi().then((data) => {
            setClientData(data?.data) //get client data c-1 -1a
        })

    }, [])
    useEffect(() => {

        if (openSearchData1 === null || openSearchData1 === "") {

            setopenSearchData(false)     //this state close the choose  client data dropdown
            SearchClientSet.set(false)   //this state close the choose project data dropdown
            setProjectSearchData(null)
        }
        else {
            setopenSearchData(true)     //this state open the choose  client data dropdown
            SearchClientSet.set(true)   //this state open the choose project data dropdown
        }

        // openSearchData1  this ths the choose client onChange data  

    }, [openSearchData1])




    useEffect(() => {
        if (firequantitysheetid) {
            SheetTableData()
        }

    }, [firequantitysheetid, projectnameactive, updatesheetdata])
 
    useEffect(() => {

        if (filteredsheetdata === undefined || filteredsheetdata === null) {
            setFilteredSheetData(productivesheetsllsata) 
        }
        setFilteredSheetData(productivesheetsllsata)   

    }, [productivesheetsllsata, sheetupdateddata])


    const clientidname = (e, Objdata) => {

        setChooseprojectOpnCls(false)
        setClientSearchData(Objdata?.client_name)

        const token = reactLocalStorage.get("access_token", false);
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/client/${Objdata?._id}/project`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {

                console.log(response?.data)
                setProjectSearchData(response?.data)

                if (response?.data.length === 0) { 
                    setSheetUpdatedData(false)
                }
                else {
                    setSheetUpdatedData(true)
                }
                // if (response.status === 200) {
                //     addToast("Project is Added Sucessfully", {
                //         appearance: "success",
                //         autoDismiss: true,
                //     })

                // }

            })
            .catch((error) => {
                // console.log(error)
                addToast(error.response.data.message, {
                    appearance: "error",
                    autoDismiss: true,
                })
            })
    }
    const handleChangeForClientData = (e) => {
        setChooseprojectOpnCls(true)
        let value = e.target.value.toUpperCase();
        let result = []
        result = clientdata?.filter((data) => {  //get client data c-2 -3a

            if (isNaN(+value)) {
                return data?.client_name.toUpperCase().search(value) !== -1;
            }
        });

        setSearchData(result) // set Search client data c-1 -4a
        setopenSearchData1(e.target.value)
    }




    const SheetTableData = () => {

        const token = reactLocalStorage.get("access_token", false);
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/upload_productive_file/${firequantitysheetid}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                // console.log(response?.data)
                if (response?.data?.fire_quantity_sheets.length !== 0) {
                    setProductiveSheetAllData(response?.data?.fire_quantity_sheets)
                    setSheetUpdatedData(true)
                }
                else {
                    addToast("sheet not Found", {
                        appearance: "error",
                        autoDismiss: true,
                    })

                    setSheetUpdatedData(false)  //when there is  no data in sheet then the condition will false and data will hide 
                }

                if (response?.status === 200) {
                    ProductiveNameActive.set(true)

                }

            })
            .catch((error) => {
                console.log(error)
                addToast(error.response?.data?.message, {
                    appearance: "error",
                    autoDismiss: true,
                })
                setSheetUpdatedData(false)  //when there is  no data in sheet then the condition will false and data will hide
            })
    }
    const SheetFile = (e) => {
        setProductiveSheetData(e?.target?.files[0])
    }


    const handleSearch = (e) => {

        let value = e?.target?.value?.toUpperCase();
        let result = []

        result = productivesheetsllsata?.filter((data) => {
            const mainData = data["Activity Description"]

            if (isNaN(+value)) {
                if (mainData !== 0) {
                    return mainData?.toUpperCase().search(value) !== -1;
                }
            }
        });


        setFilteredSheetData(result)

        if (value === "") {
            setFilteredSheetData(productivesheetsllsata)
        }
    }

    const ActiveNameData = (e, itemData) => {
        setZoneTotal(itemData)
        setActiveDataShow(o => !o)
        setActiveData(itemData["Acitivity ID"])
    }

    const SubZoneDataFun = (e, item) => {
        setAllSubZoneShow(o => !o)
        setAllSubZoneUniqe(item.zone)
        setAllSubZoneValue(item)
    }


    return (
        <>
            <div className="flex flex-row justify-start overflow-hidden">
                <div>
                    <SideBar />
                </div>
                <div className="flex flex-col">
                    <Header title="Data&nbsp;Injestion" />

                    <div className=" flex  justify-center ">
                        <button onClick={() => { navigate("/DataInjestion/QuantitySheet"); window.location.reload(false); }}
                            className={LocationButton.pathname.includes("QuantitySheet") ? "bg-[#8d8b8b] p-4 text-[#f0f0f0] m-3 rounded-[8px]" : "bg-[#fff] p-4 m-3 rounded-[8px]"}  >
                            Quantity Sheet
                        </button>
                        <button onClick={() => { navigate("/DataInjestion/LightQuantity"); window.location.reload(false); }}
                            className={LocationButton.pathname.includes("LightQuantity") ? "bg-[#8d8b8b] p-4 text-[#f0f0f0] m-3 rounded-[8px]" : "bg-[#fff]  p-4 m-3 rounded-[8px]"}    >
                            Light Quantity
                        </button>
                        <button onClick={() => { navigate("/DataInjestion/FireQuantity"); window.location.reload(false); }}
                            className={LocationButton.pathname.includes("FireQuantity") ? "bg-[#8d8b8b] p-4 text-[#f0f0f0] m-3 rounded-[8px]" : "bg-[#fff]  p-4 m-3 rounded-[8px]"}    >
                            Fire Quantity
                        </button>


                    </div>
                    <div className="flex flex-row justify-start space-x-10 mt-[63px] px-[30px]  ">

                        <div className="mr-[70px]"   >
                            <div>

                                <div className=" basic-1/4 flex flex-row px-[20px] 
                                bg-[#FFFFFF] rounded-[0.625rem] ">
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
                                            placeholder="Choose Client"
                                            value={clientsearchdata}
                                            className="outline-none w-[332px] h-[46px] rounded-[10px]"
                                            onChange={(e) => handleChangeForClientData(e)} //-2a 
                                        />
                                    </div>
                                </div>
                                <div className="float-right -mt-[10px] text-[#4D627A] text-[15px]   cursor-pointer font-serif"
                                    style={{ width: "90%", backgroundColor: "white", boxShadow: " 0px 82px 54px rgba(57, 78, 119, 0.07), 0px 37.9111px 24.9658px rgba(57, 78, 119, 0.0519173), 0px 21.6919px 14.2849px rgba(57, 78, 119, 0.0438747), 0px 13.1668px 8.67082px rgba(57, 78, 119, 0.0377964), 0px 7.93358px 5.22455px rgba(57, 78, 119, 0.0322036), 0px 4.41793px 2.90937px rgba(57, 78, 119, 0.0261253), 0px 1.90012px 1.2513px rgba(57, 78, 119, 0.06)" }}>
                                    {openSearchData && <ul className="searchList productiveSeacrhch"  >

                                        {
                                            searchdata?.map((item, id) => { // get Search client data c-2 -5a

                                                return <li onClick={(e) => clientidname(e, item)}>
                                                    {
                                                        item.client_name
                                                    }
                                                </li> //-6a
                                            })
                                        }

                                    </ul>}
                                </div>
                            </div>
                        </div>
                        <div>
                            <FireQuantitySearch
                                placeHolderName={"Choose Project"}
                                valueData={projectsearchdata}
                                sheetData={productivesheetdata}
                                chooseprojectopnclsData={chooseprojectopncls}

                            />
                        </div>
                    </div>

                    <div className=" flex flex-col  mb-10 pb-5 lg:w-[97%] md:w-[90%] mr-[10px] rounded-[31.529px] mh-[632.01px] mt-[48px] ml-[38px] 
                  bg-[#FFFFFF] ">

                        <div className="flex flex-row justify-between">
                            <div className="flex">
                                <div className=" ml-[26.8px] mt-[31.94px]      ">

                                    <svg width="77" height="76" viewBox="0 0 77 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="38.6122" cy="37.9999" r="37.7143" fill="#F4F7FE" />
                                    </svg>
                                </div>
                                <div className="font-secondaryFont font-medium not-italic  
                              leading-[37.83px] text-[#000000] mt-[27px] ml-[32.92px] ">
                                    <div className=" grid grid-cols-3  ">
                                        <div className="col-span-1">
                                            <p className="text-[#A3AED0] text-[24px] 
                                            font-medium font-sans">
                                                Fire Quantity Sheet
                                            </p>
                                            <div className="text-[#1B2559] text-[18px] font-bold">
                                                Shining Towers
                                            </div>
                                        </div>
                                        <div  >

                                        </div>


                                        <div className="col-span-1     ">
                                            <div className="flex  ml-[50%] " style={{ marginTop: "-15px" }}>
                                                <div className=" mr-[14px] mt-[10px] text-[#8F9BBA]">
                                                    <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M14 20H0L0 18H14V20ZM7 16L1 10L2.41 8.59L6 12.17V0L8 0V12.17L11.59 8.59L13 10L7 16Z" fill="#8F9BBA" />
                                                    </svg>

                                                </div>
                                                <div className="text-[14px]  cursor-pointer   
                                                 text-[#8F9BBA] font-sans font-medium text-center"
                                                    style={{
                                                        width: "100px",
                                                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                                                    }}>
                                                    <div>
                                                        <input type="file"
                                                            onChange={(e) => SheetFile(e)}
                                                            placeholder="Import Sheet"
                                                            name="file_upload"
                                                            className="w-[90%] fileSheet" />
                                                    </div>
                                                </div>
                                                <div className="shhetText">Import Sheet</div>
                                            </div>


                                            <div>
                                                <div className="pl-[13px] -mt-[40px]   rounded-[0.625rem]"
                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>

                                                    <div
                                                        className="mt-[73.07px]  flex flex-row 
                                                     items-center mr-[55.5px] bg-[#FFFFFF]       "
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
                                                                onChange={(e) => handleSearch(e)}
                                                                placeholder="Search "
                                                                className="outline-none
                                                                text-[12px]
                                                                 w-[173.87px] h-[36.94px]  
                                                            "

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

                        <div className="pl-[143.96px] pr-[53.84px] pt-[28.49px] w-[100%]" >
                            <table className="table-auto   text-center 
                             text-[#8F9BBA] text-[12px] font-sans
                               font-normal not-italic w-[100%]"
                            >

                                <tr className="max-h-[52.84px] text-center  ">
                                    <th className="w-[25%] py-[13px]">Activity&nbsp;Code</th>
                                    <th className="w-[35%] py-[13px]">Activity&nbsp;Name</th>
                                    <th className="w-[20%] py-[13px]">Unit of Measure</th>
                                    <th className="w-[20%] py-[13px]">Quentity</th>
                                </tr>


                                {sheetupdateddata && filteredsheetdata?.map((item, i) => (

                                    <tbody className="  mb-[10px]   ">
                                        <tr className="max-h-[52.84px] text-center  ">
                                            <th className=" py-[13px]">{item["Acitivity ID"]}</th>
                                            <th className="  py-[13px] cursor-pointer "
                                                onClick={(e) => ActiveNameData(e, item)}> {item["Activity Description"]}</th>
                                            <th className="  py-[13px]">Unit of Measure</th>
                                            <th className="  py-[13px]">{item.total}</th>
                                        </tr>
                                        <tr>
                                            <td className="p-[10px]"></td>
                                        </tr>



                                        {activedatashow && activedata === item["Acitivity ID"] ?
                                            <td className="mb-4  text-justify  " colspan="5"
                                                style={{ boxShadow: " 0px 82px 54px rgba(57, 78, 119, 0.07), 0px 37.9111px 24.9658px rgba(57, 78, 119, 0.0519173), 0px 21.6919px 14.2849px rgba(57, 78, 119, 0.0438747), 0px 13.1668px 8.67082px rgba(57, 78, 119, 0.0377964), 0px 7.93358px 5.22455px rgba(57, 78, 119, 0.0322036), 0px 4.41793px 2.90937px rgba(57, 78, 119, 0.0261253), 0px 1.90012px 1.2513px rgba(57, 78, 119, 0.06)" }}>

                                                <tr className=" w-[100%] pr-4         h-[35px] "    >

                                                    <div className="p-[0px] ml-[270px] text-[#180c5a] font-semibold  cursor-pointer  "
                                                        onClick={(e) => SubZoneDataFun(e, item)}>
                                                        <span className="pl-9"> Zone'S</span>
                                                        <span className="pl-10"> Values</span>
                                                    </div>

                                                </tr>
                                                {Object.entries(zonetotal).slice(2).map(([key, value]) => {
                                                    return <>
                                                        <tr className=" w-[100%] pr-4 h-[35px]">
                                                            <div className="p-[10px] whitespace-nowrap  ml-[275px]    cursor-pointer">
                                                                <span className="p-3">
                                                                    {key}</span>
                                                                =
                                                                <span className="pl-5">
                                                                    {value}</span>

                                                            </div>
                                                        </tr>
                                                        <br />
                                                    </>


                                                })}

                                            </td> : null
                                        }


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

export default FireQuantity

