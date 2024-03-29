import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../../layout/Header";
import SideBar from "../../layout/SideBar";
import "reactjs-popup/dist/index.css";
import { useFormik } from "formik";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import PlannedAllowable from "../PlannedAllowable";
import { CurrentQuantityTOAchivedData, JobCardEmplyeData, JobCardEquipmentData, MyjobCardAfterPtachApi, MyjobCardAfterPtachApiData, QuantityToBeAchived,CumilativeQuntity,ExceCuteDate, CumilativeQuntityChange } from "../../../SimplerR/auth";
import EmployeComponent from "../EmployeComponent";
import EquipmentComponent from "../EquipmentComponent";


const validate = (values) => {
    const errors = {};
    if (!values.activityCode) {
        errors.activityCode = "Activity code Required";
    }
    if (!values.activityName) {
        errors.activityName = "Activity Name Required";
    }
    if (!values.qcRemarks) {
        errors.qcRemarks = "qcRemarks Required";
    }

    if (!values.jcCreation) {
        errors.jcCreation = "JC Creation Required";
    }
    if (!values.hseRemarks) {
        errors.hseRemarks = "HSE Remarks Required";
    }
    if (!values.managerComments) {
        errors.managerComments = "Manager Comments Required";
    }
    if (!values.Description) {
        errors.Description = "Description Required";
    }
    if (!values.zone) {
        errors.zone = "Zone Required";
    }
    // console.log(errors);
    return errors;
};

const NewJobCardMultiId = () => {
    const [title, setTitle] = useState(null); // the lifted state 
    const [assignCardData, setAssignCardData] = useState(null); // the lifted state
    const [currentdate, setCurrentDate] = useState(new Date().toISOString().split('T')[0])
    const [open, setOpen] = useState(false);
    const currentquantitytoachivedData = CurrentQuantityTOAchivedData.use()
    const myjobCardAfterPtachApi = MyjobCardAfterPtachApi.use()
    const myjobCardAfterPtachApiData = MyjobCardAfterPtachApiData.use()

    const jobCardEmplyeData = JobCardEmplyeData.use()
    const jobCardEquipmentData = JobCardEquipmentData.use()
    const quantityToBeAchived = QuantityToBeAchived.use()
    const cumilativeQuntity = CumilativeQuntity.use()
    const [roleDataLocal, setRoleDataLocal] = useState(null)
    const [isLoading, setIsLoading] = useState(false);

    const closeModal = () => setOpen(false);
    let urlTitle = useLocation();
    let naviagte = useNavigate();
    let useperma = useParams()

    useEffect(() => {
        if (urlTitle.pathname === "/job_cards/new_job_card_multi") {
            setTitle("Job Cards");
        }
        const roleData = reactLocalStorage.get("roles", false);
        setRoleDataLocal(roleData)
    }, [urlTitle.pathname])

    useEffect(() => {
        let metch = false
        if(assignCardData?.cumilative_quantity_log){
            assignCardData.cumilative_quantity_log.filter((item) =>{
                if(item.date == currentdate){ 
                    if(item?.updated_quantity_to_be_achieved){
                        metch = true
                        let quntity = Number(item.updated_quantity_to_be_achieved)
                        QuantityToBeAchived.set(quntity);
                    }
                }
            })
        }
        if(!metch){
            QuantityToBeAchived.set(0);
        }
    },[currentdate, assignCardData])

    useEffect(() => {
        ///this api not Run's  for first time 
        const token = reactLocalStorage.get("access_token", false);
        const feach = async () => {
            try {
                setIsLoading(true)
                const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/find_job_card/${useperma.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setAssignCardData(data?.data)
                JobCardEmplyeData.set(false)
                JobCardEquipmentData.set(false)
                CurrentQuantityTOAchivedData.set(false)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        feach();
    }, [
        currentquantitytoachivedData,
    ]);


    useEffect(() => {
        ///this api Run's only for first time 
        const token = reactLocalStorage.get("access_token", false);
        const feach = async () => {
            try {
                setIsLoading(true)
                const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/find_job_card/${useperma.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                if (data.status === 200) {
                    MyjobCardAfterPtachApi.set(true)
                }
                setAssignCardData(data?.data)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        feach();
    }, [myjobCardAfterPtachApi, myjobCardAfterPtachApiData]);

    const formik = useFormik({
        initialValues: {
            activityCode: "",
            activityName: "",
            jcCreation: "",
            zone: "",
            qcRemarks: "",
            hseRemarks: "",
            managerComments: "",
            Description: "",
        },
        validate,
        onSubmit: async (values, { resetForm }) => {
            
        },
    });

    const IssueJc = () => {
        const token = reactLocalStorage.get("access_token", false);
        setIsLoading(true)
            axios.post(`${process.env.REACT_APP_BASE_URL}/api/create_my_job_card`,
                {
                    "jc_number": assignCardData?._id,
                    "current_quantity_to_be_achieved": currentquantitytoachivedData
                }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then((response) => {
                if (response.status === 201) {
                    // addToast("your job card is assign Sucessfully", {
                    //     appearance: "success",
                    //     autoDismiss: true,
                    // })
                }
                setIsLoading(false)
            })
            .catch((error) => {
                // addToast(error.response.data.message, {
                //     appearance: "error",
                //     autoDismiss: true,
                // })
                setIsLoading(false)
            });
    }

    return (
        <div className="flex flex-row justify-start overflow-hidden">
            {isLoading && <div className="loading-layout">
                <span className="loading-spinner"></span>
            </div>}
            <div>
                <SideBar />
            </div>
            <div className="flex flex-col">
                <Header title={title} />
                <div className="max-w-[100%]  mt-[103px] overflow-hidden bg-[#FFFFFF] justify-center 
                mr-[50px] ml-[20px] my-[10px]   pb-[20px] rounded-[31.529px]">
                    <div className="flex flex-row space-x-[27.92px] pt-[31.94px] pl-[26px] items-center ">
                        <div className="bg-[#F4F7FE] w-[88.28px] flex items-center justify-center h-[88.28px]   rounded-full">
                            <img
                                src="/Group8.png"
                                alt="logo"
                                width="42.79px"
                                height="44px"
                                className="content-center"
                            />
                        </div>
                        <div className=" max-w-[308px] max-h-[89px]  font-secondaryFont font-medium not-italic text-[28.09px] leading-[37.83px] tracking-[-2%] ">
                            Activities executed
                        </div>
                    </div>
                    <div className="pl-[140px] pr-[96px] pt-[33.49px]">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="flex flex-row space-x-20 pb-[30px]">
                                <div className=" relative w-[350px]">
                                    <input
                                        id="jcCreation"
                                        name="jcCreation"
                                        type="text"
                                        value={assignCardData?.activity_code}
                                        onChange={formik.handleChange}
                                        className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                                        placeholder="john@doe.com"
                                    />
                                    <label
                                        htmlFor="jcCreation"
                                        className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                    >
                                        Activity ID

                                    </label>
                                </div>

                                <div className="flex flex-row relative justify-between space-x-2  w-[350px]">
                                    <div className="w-[165px]">
                                        <input
                                            id="hseRemarks"
                                            name="hseRemarks"
                                            type="text"
                                            value={assignCardData?.zone}
                                            onChange={formik.handleChange}
                                            className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                                            placeholder="john@doe.com"
                                        />
                                        <label
                                            htmlFor="hseRemarks"
                                            className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                        >
                                            Zone

                                        </label>
                                    </div>
                                    <div className="relative w-[165px] border-b  ">
                                        <input
                                            id="hseRemarks"
                                            name="hseRemarks"
                                            type="text"
                                            value={assignCardData?.sub_zone}
                                            onChange={formik.handleChange}
                                            className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                                            placeholder="john@doe.com"
                                        />
                                        <label
                                            htmlFor="hseRemarks"
                                            className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                        >
                                            Sub zones

                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row space-x-20 pb-[30px]">
                                <div className=" relative w-[350px]">
                                    <input
                                        id="jcCreation"
                                        name="jcCreation"
                                        type="text"
                                        value={assignCardData?.activity_name}
                                        onChange={formik.handleChange}
                                        className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                                        placeholder="john@doe.com"
                                    />
                                    <label
                                        htmlFor="jcCreation"
                                        className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                    >
                                        Activity  Name
                                    </label>
                                </div>
                                <div className="flex flex-row relative justify-between space-x-2  w-[350px]">
                                    <div className="w-[165px]">
                                        <input
                                            id="hseRemarks"
                                            name="hseRemarks"
                                            type="text"
                                            value={assignCardData?.jc_creation}
                                            onChange={formik.handleChange}
                                            className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                                            placeholder="john@doe.com"
                                        />
                                        <label
                                            htmlFor="hseRemarks"
                                            className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                        >
                                            Date

                                        </label>
                                    </div>
                                    <div className="relative w-[165px] border-b  ">
                                        <input
                                            id="hseRemarks"
                                            name="hseRemarks"
                                            type="date"
                                            value={currentdate}
                                            onChange={(e) => { setCurrentDate(e.target.value);  ExceCuteDate.set(e.target.value);  formik.handleChange() }}
                                            className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                                            placeholder="john@doe.com"
                                        />
                                        <label
                                            htmlFor="hseRemarks"
                                            className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                        >
                                            Executed Date
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {/* { roleDataLocal === "albannaadmin" && <div className="flex flex-row relative justify-between space-x-2  w-[350px]"> 
                                <div className="flex text-[14px]  border-b border-[#000000] text-gray-900 w-[400px] mb-5">
                                    <div className=" ">  Quantity to be achieved
                                        [ {assignCardData?.quantity_to_be_achieved}  ]
                                        :
                                    </div>
                                    <div className="relative">
                                        <input type='number' placeholder="Qty achieved"
                                            className="border-none pl-2  w-[100px]  gang_product_input"
                                            value={quantityToBeAchived}
                                            onChange={(e) =>
                                                QuantityToBeAchived.set(e.target.value)
                                            }
                                        /> 
                                        <span className="absolute right-0 top-0">
                                            {assignCardData?.unit}
                                        </span>
                                    </div>
                                </div>  
                            </div>} */}
                            <div className="flex flex-row space-x-20 pb-[30px]">
                                <div className="flex flex-row relative justify-between space-x-2  w-[350px]">
                                    <div className="flex text-[14px]  border-b border-[#000000] text-gray-900 w-[400px] mb-5">
                                        <div className=" ">  Quantity to be achieved
                                            [ {assignCardData?.quantity_to_be_achieved}  ]
                                            :
                                        </div>
                                        <div className="relative">
                                            <input type='number' placeholder="Qty achieved"
                                                className="border-none pl-2  w-[100px]  gang_product_input quntity_input"
                                                value={quantityToBeAchived}
                                                onChange={(e) =>{
                                                    let main_quntity = quantityToBeAchived
                                                    let event_val = e.target.value?Number(e.target.value):0;
                                                    CumilativeQuntityChange.set(event_val)
                                                    if(cumilativeQuntity){
                                                        if(Number(main_quntity) > event_val){
                                                            let diff = Number(main_quntity) - event_val
                                                            CumilativeQuntity.set(parseInt(cumilativeQuntity)-parseInt(diff))
                                                        }else{
                                                            let diff = event_val - Number(main_quntity)
                                                            CumilativeQuntity.set(parseInt(cumilativeQuntity)+parseInt(diff))
                                                        }
                                                    }else{
                                                        CumilativeQuntity.set(event_val)
                                                    }
                                                    QuantityToBeAchived.set(e.target.value);
                                                }
                                                }
                                            />
                                            <span className="absolute right-0 top-0">
                                                [ {assignCardData?.unit} ]
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row relative justify-between space-x-2  w-[350px]">
                                    <div className="flex text-[14px]  border-b border-[#000000] text-gray-900 w-[400px] mb-5">
                                        <div className="">  Cumilative Quantity to be achieve
                                            [ {cumilativeQuntity}  ]  
                                            
                                        </div>
                                        <div className="relative">
                                        [ {assignCardData?.unit} ]
                                            {/* <input type='number' placeholder="Cumilative Qty achieved"
                                                className="border-none pl-2  w-[100px]  gang_product_input"
                                                value={quantityToBeAchived}
                                                onChange={(e) =>
                                                    QuantityToBeAchived.set(e.target.value)
                                                }
                                            /> */}
                                            {/* <span className="absolute right-0 top-0">
                                                [ {assignCardData?.unit} ]
                                            </span> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="mb-6" style={{ boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                    {assignCardData && (
                                        <EmployeComponent
                                            heading={"Actual Employees"}
                                            selectDropDown={true}
                                            assigncarddataId={assignCardData}
                                            currentdate={currentdate}
                                            assigncarddataA={assignCardData}
                                        />
                                    )}
                                </div>
                                <div className="mb-6" style={{ boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                    {assignCardData && (
                                        <EquipmentComponent
                                            heading={"Actual Equipments"}
                                            selectDropDown={true}
                                            assigncarddataId={assignCardData?._id}
                                            assigncarddataA={assignCardData}
                                        />
                                    )}
                                </div>
                                <div className="mb-6" style={{ boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                    {assignCardData && (
                                        <PlannedAllowable
                                            heading={"Planned vs Allowable vs Actual"}
                                            selectDropDown={false}
                                            Quantityachieved={"Quantity to be achieved"}
                                            assigncarddataA={assignCardData}
                                            setLoading={setIsLoading}
                                        />
                                    )}
                                </div>
                            </div>
                            {/* <div className="flex flex-row space-x-20 pb-[30px]">
                                <div className=" relative w-[350px]">
                                    <input
                                        id="jcCreation"
                                        name="jcCreation"
                                        type="text"
                                        value={formik.values.jcCreation}
                                        onChange={formik.handleChange}
                                        className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                                        placeholder="john@doe.com"
                                    />
                                    <label
                                        htmlFor="jcCreation"
                                        className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                    >
                                        Comments
                                        <span className="text-red-700">*</span> 
                                    </label>
                                    {
                                           formik.errors.jcCreation && (
                                           <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                                             {formik.errors.jcCreation}{" "}
                                           </div>
                                         )
                                    }
                                </div>
                                <div className=" relative w-[350px]">
                                    <input
                                        id="jcCreation"
                                        name="jcCreation"
                                        type="text"
                                        value={formik.values.jcCreation}
                                        onChange={formik.handleChange}
                                        className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                                        placeholder="john@doe.com"
                                    />
                                    <label
                                        htmlFor="jcCreation"
                                        className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                    >
                                        Attech Photo
                                      <span className="text-red-700">*</span>  
                                    </label>
                                    {
                                            formik.errors.jcCreation && (
                                            <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                                              {formik.errors.jcCreation}{" "}
                                            </div>
                                          )
                                    }
                                </div>
                            </div>  
                            <div className="flex flex-col mb-10 ">
                                <div className="relative max-w-[860px]">
                                    <input
                                        id="qcRemarks"
                                        type="text"
                                        name="qcRemarks"
                                        value={assigncarddata?.qc_remark}
                                        onChange={formik.handleChange}
                                        className="peer h-10 w-full font-medium font-secondaryFont border-b border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                                        placeholder="Password"
                                    />
                                    <label
                                        htmlFor="qcRemarks"
                                        className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                    >
                                        QC Remarks
                                        <span className="text-red-700">*</span>
                                    </label>
                                    {
                                          formik.errors.qcRemarks && (
                                          <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                                            {formik.errors.qcRemarks}{" "}
                                          </div>
                                        )
                                    }
                                </div>
                            </div> 
                            <div className="flex flex-col mb-10 ">
                                <div className="relative max-w-[860px]">
                                    <input
                                        id="hseRemarks"
                                        name="hseRemarks"
                                        type="text"
                                        value={assigncarddata?.hse_remark}
                                        onChange={formik.handleChange}
                                        className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                                        placeholder="john@doe.com"
                                    />
                                    <label
                                        htmlFor="hseRemarks"
                                        className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                    >
                                        HSE Remarks
                                        <span className="text-red-700">*</span>
                                    </label>
                                    {
                                          formik.errors.hseRemarks && (
                                          <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                                            {formik.errors.hseRemarks}{" "}
                                          </div>
                                        )
                                    }
                                </div>
                            </div> 
                            <div className="flex flex-col mb-10 ">
                                <div className="relative max-w-[860px]">
                                    <input
                                        id="managerComments"
                                        type="text"
                                        name="managerComments"
                                        value={assigncarddata?.manager_comments}
                                        onChange={formik.handleChange}
                                        className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                                        placeholder="Password"
                                    />
                                    <label
                                        htmlFor="managerComments"
                                        className="absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                    >
                                        Manager Comments
                                        <span className="text-red-700">*</span>
                                    </label>
                                    {
                                          formik.errors.managerComments && (
                                          <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                                            {formik.errors.managerComments}{" "}
                                          </div>
                                        )
                                    }
                                </div>
                            </div> 
                            <div className="flex flex-col ">
                                <div className="relative max-w-[860px]">
                                    <input
                                        id="Description"
                                        name="Description"
                                        type="text"
                                        value={assigncarddata?.discription}
                                        onChange={formik.handleChange}
                                        className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                                        placeholder="john@doe.com"
                                    />
                                    <label
                                        htmlFor="Description"
                                        className="absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                    >
                                        Description
                                        <span className="text-red-700">*</span>
                                    </label>
                                    {
                                          formik.errors.Description && (
                                          <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                                            {formik.errors.Description}{" "}
                                          </div>
                                        )
                                    }
                                </div>
                            </div> */}

                            <div className="flex flex-row justify-between shadow-[buttonshadow]   mt-[42px]">

                                <div className="flex flex-row mr-[-50px]">
                                    <div className="mr-[45px] shadow-[buttonshadow] ">
                                        <button onClick={() => { naviagte("/daily_task") }} className="w-[100px] btnshadow  h-[25px] rounded text-sm font-secondaryFont text-[14px] text-center font-medium not-italic items-center  bg-[#F42424] text-[#000000] ">
                                            Activity Log
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            onClick={(e) => IssueJc(e)}
                                            type="submit"
                                            className="w-[110px] h-[25px] rounded btnshadow   text-sm font-secondaryFont text-[14px] font-medium not-italic  bg-[#0FCC7C] text-[#000000] "
                                        >
                                            Execute Activity
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewJobCardMultiId;
