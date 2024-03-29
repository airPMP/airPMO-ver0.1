import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    SearchClientSet, ProductiveSheetId, ProductiveNameActive,
    UpdateSheetData, EntityShowProductiveEye, ProductivitySheetData, ProjectObjectData, ProjectDataFreze
}
    from '../../SimplerR/auth'
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { useToasts } from "react-toast-notifications";
import Popup from "reactjs-popup";

const ProductSearch = ({ placeHolderName, valueData, chooseprojectopnclsData
    , sheetData }) => {

    const [openSearchData, setopenSearchData] = useState(false);
    const [openSearchData1, setopenSearchData1] = useState(null);
    const [searchdata, setSearchData] = useState(null);
    const [projectsearchdata, setProjectSearchData] = useState(null);
    const [projectsheetid, setProjectSheetId] = useState(null);
    const [checkMultiFiles, setCheckMultiFiles] = useState()
    const [isMultiFiles, setIsMultiFiles] = useState(false)

    const productivesheetid = ProductiveSheetId.use()
    const searchclientset = SearchClientSet.use()
    const projectnameactive = ProductiveNameActive.use()
    const updatesheetdata = UpdateSheetData.use()
    const entityshoeproductiveeye = EntityShowProductiveEye.use()
    const productivitysheetdata = ProductivitySheetData.use()
    const projectobjectdata = ProjectObjectData.use()
    const projectdatafreze = ProjectDataFreze.use()



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
        

        if (chooseprojectopnclsData) {
            setopenSearchData(chooseprojectopnclsData)
            setProjectSearchData("Choose Project")
        }


    }, [projectdatafreze, chooseprojectopnclsData, productivitysheetdata])


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
        ProjectDataFreze.set(ObjData?.project_name)
        setProjectSearchData(ObjData?.project_name)
        setProjectSheetId(ObjData?._id)
        ProductiveSheetId.set(ObjData?._id)
        setopenSearchData(false)

        ProjectObjectData.set(ObjData)




    }



    const SheetUpload = async () => {
        let organizationId = ""

        const organization_Id = reactLocalStorage.get("organization_id", false);

        if (organization_Id !== "undefined" && organization_Id !== null) {
            organizationId = organization_Id
        }


        const formData = new FormData();
        formData.append("productivity", sheetData);
        formData.append("projectid", projectsheetid);
        formData.append("organization_id", organizationId);
        const token = reactLocalStorage.get("access_token", false);

        await axios.post(`${process.env.REACT_APP_BASE_URL}/api/check_multiple_file`,
            formData, { headers: { Authorization: `Bearer ${token}`, } },
        )
            .then((response) => {

                if(response && response?.data?.length > 1){
                    setCheckMultiFiles(response?.data)
                    setIsMultiFiles(true)
                }else if(response && response?.data?.length == 1){
                    commonUploadApi(response?.data[0])
                }
            })
        
    }

    const commonUploadApi = async (file_name) => {
        let organizationId = ""

        const organization_Id = reactLocalStorage.get("organization_id", false);

        if (organization_Id !== "undefined" && organization_Id !== null) {
            organizationId = organization_Id
        }

        const formData = new FormData();
        formData.append("productivity", sheetData);
        formData.append("projectid", projectsheetid);
        formData.append("organization_id", organizationId);
        formData.append("file_name", file_name);
        const token = reactLocalStorage.get("access_token", false);

        await axios.post(`${process.env.REACT_APP_BASE_URL}/api/upload_productive_file`,
        formData, { headers: { Authorization: `Bearer ${token}`, } }, )
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


    const chooseFile = async (e) => {
        if(e.target.value){
            commonUploadApi(e.target.value)
        }
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
                        value={projectdatafreze}
                        className="outline-none w-[332px] h-[46px] rounded-[10px]"
                        onChange={(e) => { ProjectDataFreze.set(e.target.value); handleChangeForClientData(e) }}
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
            <Popup
                open={isMultiFiles}
                position="right center"
                model
                >
                    <div className="p-7">
                        <div className="pb-5">
                            Which file do you want to upload? &nbsp;
                            Select one of the following files.
                        </div>
                        {
                            checkMultiFiles && checkMultiFiles?.map((item)=>{
                                return(
                                    <div className="choose-multi-file">
                                        <div className="">
                                            <input type="radio"  onChange={(e)=>chooseFile(e)} value={item} name="excel"/> {item}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Popup>
        </div>
    );
};

export default ProductSearch;
