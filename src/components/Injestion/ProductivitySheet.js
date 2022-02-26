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

    const [GANG_PRODUCTIVIVYFix, setGANG_PRODUCTIVIVYFix] = useState(null)
    const [_3T_PICKUPfix, set_3T_PICKUPfix] = useState(null)
    const [BACK_HOEfix, setBACK_HOEfix] = useState(null)
    const [BOBCATfix, setBOBCATfix] = useState(null)
    const [BUSfix, setBUSfix] = useState(null)
    const [CARPENTERfix, setCARPENTERfix] = useState(null)
    const [CHAINMANfix, setCHAINMANfix] = useState(null)
    const [CRANEfix, setCRANEfix] = useState(null)
    const [DC_PICKUPfix, setDC_PICKUPfix] = useState(null)
    const [DOZERfix, setDOZERfix] = useState(null)
    const [DRIVERfix, setDRIVERfix] = useState(null)
    const [ELECTRICIANfix, setELECTRICIANfix] = useState(null)
    const [EXCAVATORfix, setEXCAVATORfix] = useState(null)
    const [FABRICATORfix, setFABRICATORfix] = useState(null)
    const [FOREMANfix, setFOREMANfix] = useState(null)
    const [GRADERfix, setGRADERfix] = useState(null)
    const [GENERAL_FOREMANfix, setGENERAL_FOREMANfix] = useState(null)
    const [HAND_ROLLERfix, setHAND_ROLLERfix] = useState(null)
    const [HI_UP_CRANEfix, setHI_UP_CRANEfix] = useState(null)
    const [JUNIOR_SURVEYORfix, setJUNIOR_SURVEYORfix] = useState(null)
    const [LABORfix, setLABORfix] = useState(null)
    const [MASONfix, setMASONfix] = useState(null)
    const [OPERATORfix, setOPERATORfix] = useState(null)
    const [PIPE_FITTERfix, setPIPE_FITTERfix] = useState(null)
    const [PLATE_COMPACTORfix, setPLATE_COMPACTORfix] = useState(null)
    const [RIGGERfix, setRIGGERfix] = useState(null)
    const [ROCK_BREAKERfix, setROCK_BREAKERfix] = useState(null)
    const [STEEL_FIXERfix, setSTEEL_FIXERfix] = useState(null)
    const [SURVEYORfix, setSURVEYORfix] = useState(null)
    const [TRAILERfix, setTRAILERfix] = useState(null)
    const [TRUCKfix, setTRUCKfix] = useState(null)
    const [UNITfix, setUNITfix] = useState(null)
    const [WATER_TANKERfix, setWATER_TANKERfix] = useState(null)
    const [WELDERfix, setWELDERfix] = useState(null)
    const [WHEEL_LOADERfix, setWHEEL_LOADERfix] = useState(null)


    const [_3T_PICKUP, set_3T_PICKUP] = useState(null)
    const [BACK_HOE, setBACK_HOE] = useState(null)
    const [BOBCAT, setBOBCAT] = useState(null)
    const [BUS, setBUS] = useState(null)
    const [CARPENTER, setCARPENTER] = useState(null)
    const [CHAINMAN, setCHAINMAN] = useState(null)
    const [CRANE, setCRANE] = useState(null)
    const [DC_PICKUP, setDC_PICKUP] = useState(null)
    const [DOZER, setDOZER] = useState(null)
    const [DRIVER, setDRIVER] = useState(null)
    const [ELECTRICIAN, setELECTRICIAN] = useState(null)
    const [EXCAVATOR, setEXCAVATOR] = useState(null)
    const [FABRICATOR, setFABRICATOR] = useState(null)
    const [FOREMAN, setFOREMAN] = useState(null)
    const [GRADER, setGRADER] = useState(null)
    const [GENERAL_FOREMAN, setGENERAL_FOREMAN] = useState(null)
    const [HAND_ROLLER, setHAND_ROLLER] = useState(null)
    const [HI_UP_CRANE, setHI_UP_CRANE] = useState(null)
    const [JUNIOR_SURVEYOR, setJUNIOR_SURVEYOR] = useState(null)
    const [LABOR, setLABOR] = useState(null)
    const [MASON, setMASON] = useState(null)
    const [OPERATOR, setOPERATOR] = useState(null)
    const [PIPE_FITTER, setPIPE_FITTER] = useState(null)
    const [PLATE_COMPACTOR, setPLATE_COMPACTOR] = useState(null)
    const [RIGGER, setRIGGER] = useState(null)
    const [ROCK_BREAKER, setROCK_BREAKER] = useState(null)
    const [STEEL_FIXER, setSTEEL_FIXER] = useState(null)
    const [SURVEYOR, setSURVEYOR] = useState(null)
    const [TRAILER, setTRAILER] = useState(null)
    const [TRUCK, setTRUCK] = useState(null)
    const [UNIT, setUNIT] = useState(null)
    const [WATER_TANKER, setWATER_TANKER] = useState(null)
    const [WELDER, setWELDER] = useState(null)
    const [WHEEL_LOADER, setWHEEL_LOADER] = useState(null)

    const [GANG_PRODUCTIVIVY, setGANG_PRODUCTIVIVY] = useState(null)
    const [Activity_code, setActivity_code] = useState(null)
    const [Activity_name, setActivity_name] = useState(null)

    const { addToast } = useToasts();
    const searchclientset = SearchClientSet.use()
    const productivesheetid = ProductiveSheetId.use()
    const projectnameactive = ProductiveNameActive.use()
    const entityshoeproductiveeye = EntityShowProductiveEye.use()
    const updatesheetdata = UpdateSheetData.use()



    useEffect(() => {

        const userData = getClientApi().then((data) => {
            setClientData(data?.data)
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
    }, [clientsearchdata])
    useEffect(() => {
        if (productivesheetid) {
            SheetTableData()
        }

        if (filteredsheetdata === undefined || filteredsheetdata === null) {
            setFilteredSheetData(productivesheetsllsata)
        }

        if (updatesheetdata) {
            SheetTableData()
        }

    }, [productivesheetid, projectnameactive, updatesheetdata])

    const clientidname = (e, Objdata) => {
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

        let value = e.target.value.toUpperCase();
        let result = []
        result = clientdata?.filter((data) => {
            console.log(data)
            if (isNaN(+value)) {
                return data?.client_name.toUpperCase().search(value) !== -1;
            }
        });

        setSearchData(result)
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
                setProductiveSheetAllData(response?.data?.productivitysheet)
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

        setGANG_PRODUCTIVIVY(data[" GANG PRODUCTIVIVY (APRVD. BY PM) "])
        setActiveNameDataCode(data["Activity code"])
        setActiveNameData(o => !o)
        setGANG_PRODUCTIVIVYFix(data[" GANG PRODUCTIVIVY (APRVD. BY PM) "])
        setWATER_TANKERfix(data[" WATER TANKER "])
        set_3T_PICKUPfix(data[" 3T PICKUP "])
        setBACK_HOEfix(data[" BACK HOE "])
        setBOBCATfix(data[" BOBCAT "])
        setBUSfix(data[" BUS "])
        setCARPENTERfix(data[" CARPENTER "])
        setCHAINMANfix(data[" CHAINMAN "])
        setCRANEfix(data[" CRANE "])
        setDC_PICKUPfix(data[" DC PICKUP "])
        setDOZERfix(data[" DOZER "])
        setDRIVERfix(data[" DRIVER "])
        setELECTRICIANfix(data[" ELECTRICIAN "])
        setEXCAVATORfix(data[" EXCAVATOR "])
        setFABRICATORfix(data[" FABRICATOR "])
        setFOREMANfix(data[" FOREMAN "])
        setGRADERfix(data[" GRADER "])
        setGENERAL_FOREMANfix(data[" GENERAL FOREMAN "])
        setHAND_ROLLERfix(data[" HAND ROLLER  "])
        setHI_UP_CRANEfix(data[" HI UP CRANE "])
        setJUNIOR_SURVEYORfix(data[" JUNIOR SURVEYOR "])
        setLABORfix(data[" LABOR "])
        setMASONfix(data[" MASON "])
        setOPERATORfix(data[" OPERATOR "])
        setPIPE_FITTERfix(data[" PIPE FITTER "])
        setPLATE_COMPACTORfix(data[" PLATE COMPACTOR "])
        setRIGGERfix(data[" RIGGER "])
        setROCK_BREAKERfix(data[" ROCK BREAKER "])
        setSTEEL_FIXERfix(data[" STEEL FIXER "])
        setSURVEYORfix(data[" SURVEYOR "])
        setTRAILERfix(data[" TRAILER "])
        setTRUCKfix(data[" TRUCK "])
        setUNITfix(data[" UNIT "])
        setWATER_TANKERfix(data[" WATER TANKER "])
        setWELDERfix(data[" WELDER "])
        setWHEEL_LOADERfix(data[" WHEEL LOADER/SHOVEL "])

        set_3T_PICKUP(data[" 3T PICKUP "])
        setBACK_HOE(data[" BACK HOE "])
        setBOBCAT(data[" BOBCAT "])
        setBUS(data[" BUS "])
        setCARPENTER(data[" CARPENTER "])
        setCHAINMAN(data[" CHAINMAN "])
        setCRANE(data[" CRANE "])
        setDC_PICKUP(data[" DC PICKUP "])
        setDOZER(data[" DOZER "])
        setDRIVER(data[" DRIVER "])
        setELECTRICIAN(data[" ELECTRICIAN "])
        setEXCAVATOR(data[" EXCAVATOR "])
        setFABRICATOR(data[" FABRICATOR "])
        setFOREMAN(data[" FOREMAN "])
        setGRADER(data[" GRADER "])
        setGENERAL_FOREMAN(data[" GENERAL FOREMAN "])
        setHAND_ROLLER(data[" HAND ROLLER  "])
        setHI_UP_CRANE(data[" HI UP CRANE "])
        setJUNIOR_SURVEYOR(data[" JUNIOR SURVEYOR "])
        setLABOR(data[" LABOR "])
        setMASON(data[" MASON "])
        setOPERATOR(data[" OPERATOR "])
        setPIPE_FITTER(data[" PIPE FITTER "])
        setPLATE_COMPACTOR(data[" PLATE COMPACTOR "])
        setRIGGER(data[" RIGGER "])
        setROCK_BREAKER(data[" ROCK BREAKER "])
        setSTEEL_FIXER(data[" STEEL FIXER "])
        setSURVEYOR(data[" SURVEYOR "])
        setTRAILER(data[" TRAILER "])
        setTRUCK(data[" TRUCK "])
        setUNIT(data[" UNIT "])
        setWATER_TANKER(data[" WATER TANKER "])
        setWELDER(data[" WELDER "])
        setWHEEL_LOADER(data[" WHEEL LOADER/SHOVEL "])

        console.log(data)
    }

    const GangProductData = (e, data) => {
        setGANG_PRODUCTIVIVY(e.target.value)


        // console.log(WATER_TANKERfix / GANG_PRODUCTIVIVYFix * e.target.value) //formula
        // var n = 1.0005;
        // n = n.toFixed(3);
        // console.log(n);
        // Output:

        // 1.000



        if (_3T_PICKUPfix !== 0) {
            set_3T_PICKUP(_3T_PICKUPfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        if (BACK_HOEfix !== 0) {
            setBACK_HOE(BACK_HOEfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        if (BOBCATfix !== 0) {
            setBOBCAT(BOBCATfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        if (BUSfix !== 0) {
            setBUS(BUSfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        if (CARPENTERfix !== 0) {
            setCARPENTER(CARPENTERfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        if (CHAINMANfix !== 0) {
            setCHAINMAN(CHAINMANfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        if (CRANEfix !== 0) {
            setCRANE(CRANEfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        if (DC_PICKUPfix !== 0) {
            setDC_PICKUP(DC_PICKUPfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        if (DOZERfix !== 0) {
            setDOZER(DOZERfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        if (DRIVERfix !== 0) {
            setDRIVER(DRIVERfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        if (ELECTRICIANfix !== 0) {
            setELECTRICIAN(ELECTRICIANfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        if (EXCAVATORfix !== 0) {
            setEXCAVATOR(EXCAVATORfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        if (FABRICATORfix !== 0) {
            setFABRICATOR(FABRICATORfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        if (FOREMANfix !== 0) {
            setFOREMAN(FOREMANfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        if (GRADERfix !== 0) {
            setGRADER(GRADERfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        if (GENERAL_FOREMANfix !== 0) {
            setGENERAL_FOREMAN(GENERAL_FOREMANfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }

        if (HAND_ROLLERfix !== 0) {
            setHAND_ROLLER(HAND_ROLLERfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        if (HI_UP_CRANEfix !== 0) {
            setHI_UP_CRANE(HI_UP_CRANEfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        if (JUNIOR_SURVEYORfix !== 0) {
            setJUNIOR_SURVEYOR(JUNIOR_SURVEYORfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        if (LABORfix !== 0) {
            setLABOR(LABORfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        if (MASONfix !== 0) {
            setMASON(MASONfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        if (OPERATORfix !== 0) {
            setOPERATOR(OPERATORfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }


        if (PIPE_FITTERfix !== 0) {
            setPIPE_FITTER(PIPE_FITTERfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        if (PLATE_COMPACTORfix !== 0) {
            setPLATE_COMPACTOR(PLATE_COMPACTORfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        if (RIGGERfix !== 0) {
            setRIGGER(RIGGERfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        if (ROCK_BREAKERfix !== 0) {
            setROCK_BREAKER(ROCK_BREAKERfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        if (STEEL_FIXERfix !== 0) {
            setSTEEL_FIXER(STEEL_FIXERfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        if (SURVEYORfix !== 0) {
            setSURVEYOR(SURVEYORfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        if (TRAILERfix !== 0) {
            setTRAILER(TRAILERfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        if (TRUCKfix !== 0) {
            setTRUCK(TRUCKfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        // if (UNITfix !== 0) {
        //     setUNIT(UNITfix / GANG_PRODUCTIVIVYFix * e.target.value)
        // }
        if (WATER_TANKERfix !== 0) {
            setWATER_TANKER(WATER_TANKERfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }

        if (WELDERfix !== 0) {
            setWELDER(WELDERfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }
        if (WHEEL_LOADERfix !== 0) {
            setWHEEL_LOADER(WHEEL_LOADERfix / GANG_PRODUCTIVIVYFix * e.target.value)
        }

    }

    console.log(FOREMAN)


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
                                            onChange={(e) => handleChangeForClientData(e)}


                                        />


                                    </div>
                                </div>
                                <div className="float-right -mt-[10px] text-[#4D627A] text-[15px]   cursor-pointer font-serif"
                                    style={{ width: "90%", backgroundColor: "white", boxShadow: " 0px 82px 54px rgba(57, 78, 119, 0.07), 0px 37.9111px 24.9658px rgba(57, 78, 119, 0.0519173), 0px 21.6919px 14.2849px rgba(57, 78, 119, 0.0438747), 0px 13.1668px 8.67082px rgba(57, 78, 119, 0.0377964), 0px 7.93358px 5.22455px rgba(57, 78, 119, 0.0322036), 0px 4.41793px 2.90937px rgba(57, 78, 119, 0.0261253), 0px 1.90012px 1.2513px rgba(57, 78, 119, 0.06)" }}>
                                    {openSearchData && <ul className="searchList productiveSeacrhch"  >

                                        {
                                            searchdata.map((item, id) => {

                                                return <li onClick={(e) => clientidname(e, item)}>
                                                    {
                                                        item.client_name
                                                    }
                                                </li>
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


                                {filteredsheetdata?.map((item, i) => (
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
                                                {_3T_PICKUP !== 0 && _3T_PICKUPfix !== undefined ? <tr className="h-[35px]">
                                                    3T PICKUP - {_3T_PICKUP.toFixed(2)}
                                                </tr> : <>
                                                </>}


                                                {BACK_HOE !== 0 && BACK_HOEfix !== undefined ? <tr className="h-[35px]">
                                                    BACK HO - {BACK_HOE.toFixed(2)}
                                                </tr> : <>
                                                </>}

                                                {BOBCAT !== 0 && BOBCATfix !== undefined ? <tr className="h-[35px]">
                                                    BOBCAT - {BOBCAT.toFixed(2)}
                                                </tr> : <>
                                                </>}

                                                {BUS !== 0 && BUSfix !== undefined ? <tr className="h-[35px]">
                                                    BUS - {BUS.toFixed(2)}
                                                </tr> : <>
                                                </>}

                                                {CARPENTER !== 0 && CARPENTERfix !== undefined ? <tr className="h-[35px]">
                                                    CARPENTER - {CARPENTER.toFixed(2)}
                                                </tr> : <>
                                                </>}

                                                {CHAINMAN !== 0 && CHAINMANfix !== undefined ? <tr className="h-[35px]">
                                                    CHAINMAN - {CHAINMAN.toFixed(2)}
                                                </tr> : <>
                                                </>}


                                                {CRANE !== 0 && CRANEfix !== undefined ? <tr className="h-[35px]">
                                                    CRANE - {CRANE.toFixed(2)}
                                                </tr> : <>
                                                </>}


                                                {DC_PICKUP !== 0 && DC_PICKUPfix !== undefined ? <tr className="h-[35px]">
                                                    DC PICKUP - {DC_PICKUP.toFixed(2)}
                                                </tr> : <>
                                                </>}

                                                {DOZER !== 0 && DOZERfix !== undefined ? <tr className="h-[35px]">
                                                    DOZER - {DOZER.toFixed(2)}
                                                </tr> : <>
                                                </>}

                                                {DRIVER !== 0 && DRIVERfix !== undefined ? <tr className="h-[35px]">
                                                    DRIVER - {DRIVER.toFixed(2)}
                                                </tr> : <>
                                                </>}

                                                {ELECTRICIAN !== 0 && ELECTRICIANfix !== undefined ? <tr className="h-[35px]">
                                                    ELECTRICIAN - {ELECTRICIAN.toFixed(2)}
                                                </tr> : <>
                                                </>}

                                                {EXCAVATOR !== 0 && EXCAVATORfix !== undefined ? <tr className="h-[35px]">
                                                    EXCAVATOR - {EXCAVATOR.toFixed(2)}
                                                </tr> : <>
                                                </>}

                                                {FABRICATOR !== 0 && FABRICATORfix !== undefined ? <tr className="h-[35px]">
                                                    FABRICATOR - {FABRICATOR.toFixed(2)}
                                                </tr> : <>
                                                </>}


                                                {FOREMAN !== 0 && FOREMANfix !== undefined ? <tr className="h-[35px]">
                                                    FOREMAN - {FOREMAN.toFixed(2)}
                                                </tr> : <>
                                                </>}

                                                {GRADER !== 0 && GRADERfix !== undefined ? <tr className="h-[35px]">
                                                    GRADER - {GRADER.toFixed(2)}
                                                </tr> : <>
                                                </>}

                                                {GENERAL_FOREMAN !== 0 && GENERAL_FOREMANfix !== undefined ? <tr className="h-[35px]">
                                                    GENERAL FOREMAN - {GENERAL_FOREMAN.toFixed(2)}
                                                </tr> : <>
                                                </>}


                                                {HAND_ROLLER !== 0 && HAND_ROLLERfix !== undefined ? <tr className="h-[35px]">
                                                    HAND ROLLER - {HAND_ROLLER.toFixed(2)}
                                                </tr> : <>
                                                </>}


                                                {HI_UP_CRANE !== 0 && HI_UP_CRANEfix !== undefined ? <tr className="h-[35px]">
                                                    HI UP CRANE - {HI_UP_CRANE.toFixed(2)}
                                                </tr> : <>
                                                </>}

                                                {JUNIOR_SURVEYOR !== 0 && JUNIOR_SURVEYORfix !== undefined ? <tr className="h-[35px]">
                                                    JUNIOR SURVEYOR - {JUNIOR_SURVEYOR.toFixed(2)}
                                                </tr> : <>
                                                </>}

                                                {LABOR !== 0 && LABORfix !== undefined ? <tr className="h-[35px]">
                                                    LABOR - {LABOR.toFixed(2)}
                                                </tr> : <>
                                                </>}

                                                {MASON !== 0 && MASONfix !== undefined ? <tr className="h-[35px]">
                                                    MASON - {MASON.toFixed(2)}
                                                </tr> : <>
                                                </>}


                                                {OPERATOR !== 0 && OPERATORfix !== undefined ? <tr className="h-[35px]">
                                                    OPERATOR - {OPERATOR.toFixed(2)}
                                                </tr> : <>
                                                </>}

                                                {PIPE_FITTER !== 0 && PIPE_FITTERfix !== undefined ? <tr className="h-[35px]">
                                                    PIPE FITTER - {PIPE_FITTER.toFixed(2)}
                                                </tr> : <>
                                                </>}

                                                {PLATE_COMPACTOR !== 0 && PLATE_COMPACTORfix !== undefined ? <tr className="h-[35px]">
                                                    PLATE COMPACTOR - {PLATE_COMPACTOR.toFixed(2)}
                                                </tr> : <>
                                                </>}

                                                {RIGGER !== 0 && RIGGERfix !== undefined ? <tr className="h-[35px]">
                                                    RIGGER - {RIGGER.toFixed(2)}
                                                </tr> : <>
                                                </>}

                                                {ROCK_BREAKER !== 0 && ROCK_BREAKERfix !== undefined ? <tr className="h-[35px]">
                                                    ROCK BREAKER - {ROCK_BREAKER.toFixed(2)}
                                                </tr> : <>
                                                </>}

                                                {STEEL_FIXER !== 0 && STEEL_FIXERfix !== undefined ? <tr className="h-[35px]">
                                                    STEEL FIXER - {STEEL_FIXER.toFixed(2)}
                                                </tr> : <>
                                                </>}

                                                {SURVEYOR !== 0 && SURVEYORfix !== undefined ? <tr className="h-[35px]">
                                                    SURVEYOR - {SURVEYOR.toFixed(2)}
                                                </tr> : <>
                                                </>}

                                                {TRAILER !== 0 && TRAILERfix !== undefined ? <tr className="h-[35px]">
                                                    TRAILER - {TRAILER.toFixed(2)}
                                                </tr> : <>
                                                </>}

                                                {TRUCK !== 0 && TRUCKfix !== undefined ? <tr className="h-[35px]">
                                                    TRUCK - {TRUCK.toFixed(2)}
                                                </tr> : <>
                                                </>}

                                                {WATER_TANKER !== 0 && WATER_TANKERfix !== undefined ? <tr className="h-[35px]">
                                                    WATER TANKER - {WATER_TANKER.toFixed(2)}
                                                </tr> : <>
                                                </>}

                                                {WELDER !== 0 && WELDERfix !== undefined ? <tr className="h-[35px]">
                                                    WELDER - {WELDER.toFixed(2)}
                                                </tr> : <>
                                                </>}


                                                {WHEEL_LOADER !== 0 && WHEEL_LOADERfix !== undefined ? <tr className="h-[35px]">
                                                    WHEEL LOADER - {WHEEL_LOADER.toFixed(2)}
                                                </tr> : <>
                                                </>}

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
