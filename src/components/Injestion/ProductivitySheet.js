import React, { useState, useEffect } from 'react'
import axios from "axios";
import Popup from "reactjs-popup";
import { reactLocalStorage } from "reactjs-localstorage";
import { useToasts } from "react-toast-notifications";
import Header from '../layout/Header'
import SideBar from '../layout/SideBar'
import { useLocation } from "react-router-dom";
import ProductSearch from './ProductSearch';
import { getClientApi } from '../../AllApi/Api'
import { SearchClientSet, ProductiveSheetId, ProductiveNameActive, UpdateSheetData, EntityShowProductiveEye } from '../../SimplerR/auth'

const ProductivitySheet = () => {


    const [clientdata, setClientData] = useState(null);
    const [openSearchData, setopenSearchData] = useState(false);
    const [openSearchData1, setopenSearchData1] = useState(null);
    const [searchdata, setSearchData] = useState(null);
    const [clientsearchdata, setClientSearchData] = useState(null);
    const [projectsearchdata, setProjectSearchData] = useState(null);
    const [productivesheetdata, setProductiveSheetData] = useState(null);
    const [productivesheetsllsata, setProductiveSheetAllData] = useState(null);
    const [filteredsheetdata, setFilteredSheetData] = useState(null);
    const [activenamedata, setActiveNameData] = useState(null)
    const [activenamedatacode, setActiveNameDataCode] = useState(null)


    const [UNIT, setUNIT] = useState(null)
    const [GANG_PRODUCTIVIVY, setGANG_PRODUCTIVIVY] = useState(null)

    const [chooseprojectopncls, setChooseprojectOpnCls] = useState(false)
    const [sheetupdateddata, setSheetUpdatedData] = useState(false)

    const { addToast } = useToasts();
    const searchclientset = SearchClientSet.use()
    const productivesheetid = ProductiveSheetId.use()
    const projectnameactive = ProductiveNameActive.use()
    const entityshoeproductiveeye = EntityShowProductiveEye.use()
    const updatesheetdata = UpdateSheetData.use()



    useEffect(() => {

        const userData = getClientApi().then((data) => {
            setClientData(data?.data) //get client data c-1 -1a
        })

    }, [])
    useEffect(() => {
        if (openSearchData1 === null || openSearchData1 === "") {
            setopenSearchData(false)
            SearchClientSet.set(false)
            setProjectSearchData(null)
        }
        else {
            setopenSearchData(true)
            SearchClientSet.set(true)
        }
    }, [openSearchData1])

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
        if (productivesheetid) {
            SheetTableData()
        }

    }, [productivesheetid, projectnameactive, updatesheetdata])

    useEffect(() => {

        if (filteredsheetdata === undefined || filteredsheetdata === null) {
            setFilteredSheetData(productivesheetsllsata)
        }
        setFilteredSheetData(productivesheetsllsata)

        UpdateSheetData.set(false)
    }, [productivesheetsllsata, sheetupdateddata, updatesheetdata])

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
                console.log(error)
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
            console.log(data)
            if (isNaN(+value)) {
                return data?.client_name.toUpperCase().search(value) !== -1;
            }
        });

        setSearchData(result) // set Search client data c-1 -4a
        setopenSearchData1(e.target.value)
    }

    const SheetTableData = () => {

        const token = reactLocalStorage.get("access_token", false);
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/upload_productive_file/${productivesheetid}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                console.log(response?.data)



                if (response?.data?.productivitysheet.length !== 0) {
                    setProductiveSheetAllData(response?.data?.productivitysheet)
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
                    console.log("true data")
                    ProductiveNameActive.set(true)

                }

            })
            .catch((error) => {
                console.log(error)
                addToast(error.response.data.message, {
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
            const mainData = data["Activity name"]

            if (isNaN(+value)) {
                if (mainData !== 0) {
                    return mainData?.toUpperCase().search(value) !== -1;
                }
            }
        });

        setFilteredSheetData(result)
        console.log(result)

        if (value === "") {
            setFilteredSheetData(productivesheetsllsata)
        }
    }
    const SaveSheetButton = () => {
        handleSearch()
        EntityShowProductiveEye.set(o => !o)


    }
    const CancelButton = (e) => {
        EntityShowProductiveEye.set(o => !o)


    }

    const ActiveNameSheet = (e, data) => {
        setActiveNameData(o => !o)  
        setGANG_PRODUCTIVIVY(data[" GANG PRODUCTIVIVY (APRVD. BY PM) "])
        setActiveNameDataCode(data["Activity code"]) 
        setUNIT(data[" UNIT "])
    }

    const GangProductData = (e, data) => {
        setGANG_PRODUCTIVIVY(e.target.value)

        // console.log(WATER_TANKERfix / GANG_PRODUCTIVIVYFix * e.target.value) //formula
        //currntcalue / total value *upcoming value
        // var n = 1.0005;
        // n = n.toFixed(3);
        // console.log(n);
        // Output:

        // 1.000 

    }




    return (
        <>

            <div className="flex flex-row justify-start overflow-hidden">
                <div>
                    <SideBar />
                </div>
                <div className="flex flex-col">
                    <Header title="Data&nbsp;Injestion" />


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
                                            searchdata.map((item, id) => { // get Search client data c-2 -5a

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
                            <ProductSearch
                                placeHolderName={"Choose Project"}
                                valueData={projectsearchdata}
                                sheetData={productivesheetdata}
                                chooseprojectopnclsData={chooseprojectopncls}
                            />
                        </div>
                    </div>

                    <div className=" flex flex-col  lg:w-[97%] md:w-[90%] mr-[10px] rounded-[31.529px] mh-[632.01px] mt-[48px] ml-[38px] 
                  bg-[#FFFFFF] ">

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
                                                Productivity Sheet
                                            </p>
                                            <div className="text-[#1B2559] text-[18px] font-bold">
                                                Shining Towers
                                            </div>
                                        </div>
                                        <div className="ml-[110px]">
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
                         font-normal not-italic  " style={{ width: "100%" }}>

                                <tr className="max-h-[52.84px] text-center  ">
                                    <th className="w-[25%] py-[13px]">Activity&nbsp;Code</th>
                                    <th className="w-[35%] py-[13px]">Activity&nbsp;Name</th>
                                    <th className="w-[20%] py-[13px]">Unit of Measure</th>
                                    <th className="w-[20%] py-[13px]">GANG Productivity (Aprvd by PM)</th>

                                </tr>


                                {sheetupdateddata && filteredsheetdata?.map((item, i) => (
                                    <tbody className="  mb-[10px]   ">
                                        <tr className="bg-[#ECF1F0] text-[#8F9BBA] text-[12px] font-sans  ">
                                            <td className="pt-[15px] pb-[14.83px]">{item["Activity code"]} </td>
                                            <td className="pt-[15px] pb-[14.83px] cursor-pointer" onClick={(e) => ActiveNameSheet(e, item)}>{item["Activity name"]}</td>
                                            <td className="pt-[15px] pb-[14.83px]">{item[" UNIT "]}</td>
                                            <td className="pt-[15px] pb-[14.83px]">{item[" GANG PRODUCTIVIVY (APRVD. BY PM) "]}</td>

                                        </tr>
                                        <tr>
                                            <td className="p-[10px]"></td>
                                        </tr>
                                        {activenamedata && activenamedatacode === item["Activity code"] ?

                                            <tr className="mb-4"
                                                style={{ boxShadow: " 0px 82px 54px rgba(57, 78, 119, 0.07), 0px 37.9111px 24.9658px rgba(57, 78, 119, 0.0519173), 0px 21.6919px 14.2849px rgba(57, 78, 119, 0.0438747), 0px 13.1668px 8.67082px rgba(57, 78, 119, 0.0377964), 0px 7.93358px 5.22455px rgba(57, 78, 119, 0.0322036), 0px 4.41793px 2.90937px rgba(57, 78, 119, 0.0261253), 0px 1.90012px 1.2513px rgba(57, 78, 119, 0.06)" }}>

                                                <tr className="h-[35px]   " >
                                                    <div className="flex" style={{ borderBottom: "1px solid black" }}>
                                                        <input type='number' placeholder="Gang Productivity"
                                                            className="border-none pt-2  gang_product_input"
                                                            value={GANG_PRODUCTIVIVY}
                                                            onChange={(e) => GangProductData(e, item)}

                                                        />
                                                        <span className="pl-2 pt-2 text-[15px]" >{UNIT}</span>
                                                    </div>
                                                </tr>


                                                {Object.entries(item).slice(4).map(([key, value]) => {
                                                    return <> {
                                                        value !== 0 ?
                                                            <>
                                                                <tr className="h-[35px]  float-left">
                                                                    <div className="p-[10px]   cursor-pointer whitespace-nowrap">
                                                                        <span className="p-3">
                                                                            {key}</span>
                                                                        =
                                                                        <span className="pl-5">
                                                                            {(value / item[" GANG PRODUCTIVIVY (APRVD. BY PM) "]
                                                                                * GANG_PRODUCTIVIVY).toFixed(2)}
                                                                        </span>
                                                                    </div>
                                                                </tr>
                                                                <br />
                                                            </>
                                                            : <>
                                                            </>
                                                    }
                                                    </> 
                                                })} 
                                            </tr> : <>
                                            </>} 
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
            <Popup
                open={entityshoeproductiveeye}
                position="right center"
                model
            >
                <div className="p-7 ">
                    <div className="flex pb-3">
                        <div onClick={(e) => SaveSheetButton(e)}>
                            <span>
                                <button
                                    type="submit"
                                    className="w-[110px] h-[25px] rounded btnshadow text-sm font-secondaryFont text-[14px] font-medium not-italic  bg-[#0FCC7C] text-[#000000] "
                                >
                                    Save
                                </button>
                            </span>
                        </div>
                        <div style={{ marginLeft: "70%" }}>
                            <span onClick={(e) => CancelButton(e)} >
                                <button
                                    type="submit"
                                    className="w-[100px] h-[25px] rounded btnshadow 
                                text-sm font-secondaryFont text-[14px] font-medium not-italic 
                                 bg-[red] text-[#000000] "
                                >
                                    Cancel
                                </button>
                            </span>
                        </div>
                    </div>
                    <div className="mt-3 ex1">
                        <table className="table-auto   text-center   
                            text-[#8F9BBA] text-[12px] font-sans
                         font-normal not-italic ">
                            <tr className="max-h-[52.84px] text-center  ">
                                <th className="w-[15%] py-[13px]">Activity Code</th>
                                <th className="w-[25%] py-[13px]">Activity Name</th>
                                <th className="w-[20%] py-[13px]">Unit of Measure</th>
                                <th className="w-[20%] py-[13px]">GANG Productivity (Aprvd by PM)</th>

                            </tr>
                            {productivesheetsllsata?.map((item, i) => {

                                return (
                                    <tbody className="  mb-[10px]   ">
                                        <tr className="bg-[#ECF1F0] text-[#8F9BBA] text-[12px] font-sans  ">
                                            <td className="pt-[15px] pb-[14.83px]">{item["Activity code"]} </td>
                                            <td className="pt-[15px] pb-[14.83px]">{item["Activity name"]}</td>
                                            <td className="pt-[15px] pb-[14.83px]">{item[" UNIT "]}</td>
                                            <td className="pt-[15px] pb-[14.83px]">{item[" GANG PRODUCTIVIVY (APRVD. BY PM) "]}</td>

                                        </tr>
                                        <tr>
                                            <td className="p-[10px]"></td>
                                        </tr>
                                    </tbody>
                                )
                            }

                            )}

                        </table>

                    </div>

                </div>

            </Popup>
        </>
    )
}

export default ProductivitySheet
