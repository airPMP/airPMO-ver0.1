import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchClientSet, WiringQuantitySheetId, ProductiveNameActive, UpdateSheetData, EntityShowProductiveEye } from '../../SimplerR/auth'
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { useToasts } from "react-toast-notifications";


const QuantitySearch = ({ placeHolderName, valueData,  chooseprojectopnclsData
    , sheetData }) => {

    const [openSearchData, setopenSearchData] = useState(false);
    const [openSearchData1, setopenSearchData1] = useState(null);
    const [searchdata, setSearchData] = useState(null);
    const [projectsearchdata, setProjectSearchData] = useState(null);
    const [projectsheetid, setProjectSheetId] = useState(null); 

    const wiringquantitysheetid = WiringQuantitySheetId.use()
    const searchclientset = SearchClientSet.use()
    const projectnameactive = ProductiveNameActive.use()
    const updatesheetdata = UpdateSheetData.use()
    const entityshoeproductiveeye = EntityShowProductiveEye.use()

    const { addToast } = useToasts();
    let navigate = useNavigate();

    useEffect(() => {
        if (openSearchData1 === null || openSearchData1 === "") {
            setopenSearchData(false)
        }
        else {
            setopenSearchData(true)
        }

    }, [openSearchData1])


    useEffect(() => {
        handleChangeForClientData()
    }, [valueData])


    useEffect(() => {
        if (searchclientset) {
            setopenSearchData(true)
        }
        else {
            setopenSearchData(false)
        }

    }, [searchclientset])

    useEffect(() => {
        const ProjectIdName = (e, ObjData) => {
            setProjectSearchData(ObjData?.project_name)
        }
        ProjectIdName()


        if(chooseprojectopnclsData){
            setopenSearchData(chooseprojectopnclsData)
            setProjectSearchData("Choose Project")
        }


    }, [projectsearchdata ,chooseprojectopnclsData])


    useEffect(() => {
        if (sheetData) {
            SheetUpload()
        }

    }, [sheetData])

    const handleChangeForClientData = (e) => {

        if (e?.target?.value === undefined || e?.target?.value === "") {
            setSearchData(valueData)
        }
        else {
            let value = e?.target?.value.toUpperCase();
            let result = []
            result = valueData?.filter((data) => {
                if (isNaN(+value)) {
                    return data?.project_name.toUpperCase().search(value) !== -1;
                }
            });
            setSearchData(result)
            setopenSearchData1(e.target.value)
        }
    }

    const ProjectIdName = (e, ObjData) => {
        setProjectSearchData(ObjData?.project_name)
        setProjectSheetId(ObjData?._id)
        WiringQuantitySheetId.set(ObjData?._id);
        setopenSearchData(false)
    }



    const SheetUpload = async () => {
        const formData = new FormData();
        formData.append("quantity_sheet", sheetData);
        formData.append("projectid", projectsheetid);
        const token = reactLocalStorage.get("access_token", false);
        await axios.post(`${process.env.REACT_APP_BASE_URL}/api/upload_quantity_file`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            },

        )
            .then((response) => {
                if (response.status === 201) {
                    UpdateSheetData.set(true)
                    EntityShowProductiveEye.set(o => !o)
                    addToast("Upload Sucessfully", {
                        appearance: "success",
                        autoDismiss: true,
                    })
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


    return (
        <div>
            <div className=" basic-1/4 flex flex-row px-[20px] bg-[#FFFFFF] rounded-[0.625rem] ">
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
                        value={projectsearchdata}
                        className="outline-none w-[332px] h-[46px] rounded-[10px]"
                        onChange={(e) => handleChangeForClientData(e)}
                    />

                </div>
            </div>
            <div className="float-right -mt-[10px] text-[#4D627A] text-[15px]   cursor-pointer font-serif"
                style={{ width: "90%", backgroundColor: "white", boxShadow: " 0px 82px 54px rgba(57, 78, 119, 0.07), 0px 37.9111px 24.9658px rgba(57, 78, 119, 0.0519173), 0px 21.6919px 14.2849px rgba(57, 78, 119, 0.0438747), 0px 13.1668px 8.67082px rgba(57, 78, 119, 0.0377964), 0px 7.93358px 5.22455px rgba(57, 78, 119, 0.0322036), 0px 4.41793px 2.90937px rgba(57, 78, 119, 0.0261253), 0px 1.90012px 1.2513px rgba(57, 78, 119, 0.06)" }}>
                {openSearchData && <ul className="searchList productiveSeacrhch"  >

                    {
                        searchdata?.map((item, id) => {
                            return <li onClick={(e) => ProjectIdName(e, item)}>
                                {
                                    item?.project_name
                                }
                            </li>
                        })
                    }

                </ul>}
            </div>

        </div>
    );
};

export default QuantitySearch;
