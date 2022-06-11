

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useFormik } from "formik";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import SideBar from "../../layout/SideBar";
import Header from "../../layout/Header";
import ZoneList from "../ZoneList";
import SubZoneList from "../SubZoneList";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { reactLocalStorage } from "reactjs-localstorage";
import { ViewZoneData } from "../../../SimplerR/auth";


const validate = (values) => {

    const errors = {};
    if (!values.category) {
        errors.category = "Category Required";
    }

    if (!values.sub_category) {
        errors.sub_category = "Sub Category Required";
    }

    if (!values.client_name) {
        errors.client_name = "Client Name Required";
    }

    if (!values.project_name) {
        errors.project_name = "Project Name Required";
    }
    if (!values.start_date) {
        errors.start_date = "Start Date Required";
    }
    if (!values.end_date) {
        errors.end_date = "End Date Required";
    }

    return errors;
};
const EditProject = () => {
    const [open, setOpen] = useState(false);
    const [openSub, setOpenSub] = useState(false);
    const [client_name_data, setdeta] = useState("");

    const closeModal = () => setOpen(false);
    const closeModalSub = () => setOpenSub(false);
    const [title, setTitle] = useState(null); // the lifted state
    const [projectdata, setProjectData] = useState(null)
    const [categoriesdata, setCategoriesData] = useState(null)
    const [category, setCategory] = useState(null)
    const [responcedata, setResponceData] = useState(true)
    const [showeye, setShowEye] = useState(" ");
    const [sheetdata, setSheetData] = useState(null)


    const [allpermission, setAllPermission] = useState(null)
    const [editpermission, setEditPermission] = useState(null)
    const [createpermission, setCreatePermission] = useState(null)
    const [viewpermission, setViewPermission] = useState(null)
    const [allpermissions, setAllPermissions] = useState(null)


    const viewzonedata = ViewZoneData.use()
    let useperma = useParams()

    let urlTitle = useLocation();
    let naviagte = useNavigate();
    const { addToast } = useToasts();

    console.log(viewzonedata)

    useEffect(() => {
        if (urlTitle.pathname === "/master/projects/new_project") {
            setTitle("Master");
        }

        const token = reactLocalStorage.get("access_token", false);
        const feach = async () => {
            try {
                const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/client/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setProjectData(data?.data)
            } catch (error) {
                console.log(error)
            }
        }
        feach();


        const feach1 = async () => {

            try {
                const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/categories/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setCategoriesData(data?.data)
            } catch (error) {
                console.log(error)
            }
        }
        feach1();




    }, [urlTitle.pathname]);

    useEffect(() => {


        const token = reactLocalStorage.get("access_token", false);
        if (responcedata) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/projects/${useperma.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

                .then((response) => {


                    formik.values.category = response?.data?.category
                    formik.values.sub_category = response?.data?.sub_category
                    formik.values.project_name = response?.data?.project_name
                    formik.values.client_name = response?.data?.client_name
                    formik.values.start_date = response?.data?.start_date
                    formik.values.end_date = response?.data?.end_date
                    formik.values.project_id = response?.data?.project_id
                    formik.values.project_value = response?.data?.project_value
                    formik.values.discription = response?.data?.discription
                    formik.values.min_hours = response?.data?.min_hours
                    formik.values.max_hours = response?.data?.max_hours
                    formik.values.time_sheet_id = response?.data?.time_sheet_id
                    formik.values.spread_sheet_id = response?.data?.spread_sheet_id
                    formik.values.spread_sheet_key = response?.data?.spread_sheet_key

                    if (response?.data?.category) {
                        setResponceData(false)//this condition will stop the in finite loop
                    }
                    if (response.status === 201) {
                        addToast("Project is Added Sucessfully", {
                            appearance: "success",
                            autoDismiss: true,
                        })
                        // navigate('/')
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

    }, [responcedata])

    console.log(responcedata)

    const formik = useFormik({
        initialValues: {
            project_name: "",
            min_hours: "",
            max_hours: "",
            start_date: "",
            end_date: "",
            zone_name: "",
            project_id: "",
            project_value: "",
            subzone_name: "",
            subzone_discription: "",
            client_name: "",
            category: "",
            sub_category: "",
            discription: "",
            uploadLogoFile: "",
            jobtitle: "",
            addNewField2: "",
            client: "",
            time_sheet_id: "",
            spread_sheet_id: "",
            spread_sheet_key: ""
        },
        validate,
        onSubmit: async (values, { resetForm }) => {
            const token = reactLocalStorage.get("access_token", false);
            axios.patch(`${process.env.REACT_APP_BASE_URL}/api/projects/${useperma.id}`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
                .then((response) => {
                    console.log(response)

                    if (response.status === 200) {
                        addToast("Project is Added Sucessfully", {
                            appearance: "success",
                            autoDismiss: true,
                        })
                        // navigate('/')
                    }
                    resetForm()
                })
                .catch((error) => {
                    console.log(error)
                    addToast(error.response.data.message, {
                        appearance: "error",
                        autoDismiss: true,
                    })
                })

        },
    });



    const ShowPasswordButton = (e, sheet2) => {

        if (showeye) {
            const feach = async () => {
                try {
                    const data1 = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${formik.values.spread_sheet_id}/values/${formik.values.time_sheet_id}?key=${formik.values.spread_sheet_key}`,)
                    setSheetData(data1?.data?.values)
                    console.log(data1)
                } catch (error) {
                    console.log(error)
                }
            }
            feach();
        }
        setShowEye(o => !o)
        setOpen(o => !o)

    }
    const CancelButton = (e) => {
        setOpen(o => !o)
        setShowEye(o => !o)
    }


    useEffect(() => {
        const permissionData = reactLocalStorage.get("permisions", false);
        setAllPermission(permissionData)

        getPermision()
    }, [allpermission])

    const getPermision = async () => {

        const url_data = await allpermission
        const database = url_data?.split(',')

        let value = "EDIT-ZONES".toUpperCase();
        let result = []
        result = database?.filter((data) => {
            if (isNaN(+value)) {
                return data?.toUpperCase().search(value) !== -1;
            }
        });


        let value1 = "CREATE-ZONES".toUpperCase();
        let result1 = []
        result1 = database?.filter((data) => {
            if (isNaN(+value)) {
                return data?.toUpperCase().search(value1) !== -1;
            }
        });

        let value2 = "GET-ZONES".toUpperCase();
        let result2 = []
        result2 = database?.filter((data) => {
            if (isNaN(+value)) {
                return data?.toUpperCase().search(value2) !== -1;
            }
        });






        if (result[0] === "EDIT-ZONES" ||
            result1[0] === "CREATE-ZONES" ||
            result2[0] === "GET-ZONES") {
            setEditPermission(result[0])
            setCreatePermission(result1[0])
            setViewPermission(result2[0])
        }
        else {
            let value = "ALL".toUpperCase();
            let result = []
            result = database?.filter((data) => {
                if (isNaN(+value)) {
                    return data?.toUpperCase().search(value) !== -1;
                }
            });
            setAllPermissions(result[0])
        }

    }






    return (
        <div className="flex flex-row justify-start overflow-hidden">
            <div>
                <SideBar />
            </div>
            <div className="flex flex-col">
                <Header title={title} />

                <div className=" flex flex-col max-w-[1099px] max-h-[632.01px] bg-[#FFFFFF] pl-[26px] pr-[46.02px] mt-[103px] ml-[38px] mr-[51px] rounded-[31.53px] ">
                    <div className="flex flex-row space-x-[27.92px] pt-[31.94px] items-center ">
                        <div className="bg-[#F4F7FE] w-[88.28px] flex items-center justify-center h-[88.28px]   rounded-full">
                            <img
                                src="/Group8.png"
                                alt="logo"
                                width="42.79px"
                                height="44px"
                                className="content-center"
                            />
                        </div>






                        <div className="grid grid-cols-2">

                            <div className="col-span-1">
                                <div className=" max-w-[208px] max-h-[89px]  font-secondaryFont font-medium not-italic text-[28.09px] leading-[37.83px] tracking-[-2%] ">
                                    Create new Project
                                </div>
                            </div>

                            <div className="col-span-1  pl-14">

                                <div className="flex ">

                                    <div className="mr-[25px] shadow-[buttonshadow] ">
                                        <button

                                            className="w-[100px] btnshadow  h-[25px] rounded text-sm font-secondaryFont text-[14px] text-center font-medium not-italic items-center  bg-[#FFFFFF] text-[#2E3A59] ">
                                            Add Delay
                                        </button>
                                    </div>

                                    <div className="mr-[25px] shadow-[buttonshadow] ">
                                        <button
                                            onClick={() => createpermission || allpermissions ? ViewZoneData.set(o => !o) : null}
                                            className={`${createpermission === "CREATE-ZONES" || allpermissions === "ALL" ? "cursor-pointer" : "  disabledclass"}
                                                   w-[160px] btnshadow  h-[25px] rounded text-sm font-secondaryFont
                                                   text-[14px] text-center font-medium not-italic items-center 
                                                   bg-[#FFFFFF] text-[#2E3A59] `}
                                        >
                                            Add Zones & Subzone
                                        </button>

                                    </div>

                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="pl-[120px] pr-[26px] pt-[33.49px]">

                        <form onSubmit={formik.handleSubmit}>
                            <div className="flex flex-row space-x-20 pb-[16px]">
                                <div className="flex flex-row relative justify-between space-x-2  w-[350px]">
                                    <div>
                                        <div className="relative w-[165px] border-b border-black ">

                                            <select
                                                name="category"
                                                value={formik.values.category}
                                                onChange={formik.handleChange}
                                                className="bg-white  text-[14px] pr-[25%]"
                                            >
                                                <option value="" label="Select category" />
                                                {categoriesdata?.map((item, id) => {
                                                    return <>
                                                        <option value={item.category} label={item.category} />
                                                    </>
                                                })}
                                            </select>


                                        </div>
                                        {
                                            formik.errors.category && (
                                                <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                                                    {formik.errors.category}{" "}
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div>
                                        <div className="relative w-[165px] border-b border-black ">

                                            <select
                                                name="sub_category"
                                                value={formik.values.sub_category}
                                                onChange={formik.handleChange}
                                                className="bg-white  text-[14px] pr-[7%]"
                                            >
                                                <option value="" label="Select Sub category" />
                                                {categoriesdata?.map((item, id) => {
                                                    return <>
                                                        <option value={item.sub_category} label={item.sub_category} />
                                                    </>
                                                })}
                                            </select>
                                        </div>
                                        {
                                            formik.errors.sub_category && (
                                                <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                                                    {formik.errors.sub_category}{" "}
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="relative w-[350px] -mt-[12px]">
                                    <input
                                        id="project_name"
                                        name="project_name"
                                        type="text"
                                        value={formik.values.project_name}
                                        onChange={formik.handleChange}
                                        className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#2E3A59] text-[#2E3A59] placeholder-transparent focus:outline-none focus:border-[#2E3A59]"
                                        placeholder="john@doe.com"
                                    />
                                    <label
                                        htmlFor="project_name"
                                        className="absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-sm"
                                    >
                                        Project Name
                                    </label>
                                    {
                                        formik.errors.project_name && (
                                            <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                                                {formik.errors.project_name}{" "}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex flex-row space-x-20 pb-[16px]">
                                <div className="mt-2">
                                    <div className="relative w-[350px]  border-b border-black">

                                        <select
                                            name="client_name"
                                            value={formik.values.client_name}
                                            onChange={formik.handleChange}
                                            className="bg-white pr-[54%] text-[14px]"
                                        >
                                            <option value="" label="Select Client Name" />
                                            {projectdata?.map((item, id) => {
                                                return <>
                                                    <option value={item.client_name} label={item.client_name} />
                                                </>
                                            })}
                                        </select>


                                    </div>
                                    {
                                        formik.errors.client_name && (
                                            <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                                                {formik.errors.client_name}{" "}
                                            </div>
                                        )
                                    }
                                </div>
                                <div className=" relative w-[350px]">
                                    <input
                                        id="project_id"
                                        type="text"
                                        name="project_id"
                                        value={formik.values.project_id}
                                        onChange={formik.handleChange}
                                        className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#2E3A59] text-[#2E3A59] placeholder-transparent focus:outline-none focus:border-[#2E3A59]"
                                        placeholder="Password"
                                    />
                                    <label
                                        htmlFor="project_id"
                                        className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-sm"
                                    >
                                        Project ID
                                    </label>
                                    {
                                        formik.errors.project_id && (
                                            <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                                                {formik.errors.project_id}{" "}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex flex-row space-x-20 pb-[16px]">
                                <div className="flex flex-row relative justify-between space-x-2  w-[350px]">
                                    <div className="relative w-[165px]">
                                        <input
                                            id="start_date"
                                            name="start_date"
                                            type="date"
                                            value={formik.values.start_date}
                                            onChange={formik.handleChange}
                                            className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                                            placeholder="john@doe.com"
                                        />
                                        <label
                                            htmlFor="start_date"
                                            className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                        >
                                            Start Date
                                        </label>
                                        {
                                            formik.errors.start_date && (
                                                <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                                                    {formik.errors.start_date}{" "}
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="relative w-[165px]">
                                        <input
                                            id="end_date"
                                            name="end_date"
                                            type="date"
                                            value={formik.values.end_date}
                                            onChange={formik.handleChange}
                                            className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#2E3A59] text-[#2E3A59] placeholder-transparent focus:outline-none focus:border-[#2E3A59]"
                                            placeholder="john@doe.com"
                                        />
                                        <label
                                            htmlFor="end_date"
                                            className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-sm"
                                        >
                                            End Date
                                        </label>
                                        {
                                            formik.errors.end_date && (
                                                <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                                                    {formik.errors.end_date}{" "}
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className=" relative w-[350px]">
                                    <input
                                        id="discription"
                                        type="text"
                                        name="discription"
                                        value={formik.values.discription}
                                        onChange={formik.handleChange}
                                        className="peer h-10 w-full font-medium font-secondaryFont border-b border-[#2E3A59] text-[#2E3A59] placeholder-transparent focus:outline-none focus:border-[#2E3A59]"
                                        placeholder="Password"
                                    />
                                    <label
                                        htmlFor="discription"
                                        className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-sm"
                                    >
                                        Project Discription
                                    </label>
                                    {
                                        formik.errors.discription && (
                                            <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                                                {formik.errors.discription}{" "}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex flex-row space-x-20 pb-[16px]">
                                <div className="relative w-[350px]">
                                    <div className="flex flex-row relative justify-between space-x-2  w-[350px]">
                                        <div className="relative w-[165px]">
                                            <input
                                                id="min_hours"
                                                name="min_hours"
                                                type="text"
                                                value={formik.values.min_hours}
                                                onChange={formik.handleChange}
                                                className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                                                placeholder="john@doe.com"
                                            />
                                            <label
                                                htmlFor="min_hours"
                                                className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                            >
                                                Min hours
                                            </label>
                                            {
                                                formik.errors.min_hours && (
                                                    <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                                                        {formik.errors.min_hours}{" "}
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className="relative w-[165px]">
                                            <input
                                                id="max_hours"
                                                name="max_hours"
                                                type="text"
                                                value={formik.values.max_hours}
                                                onChange={formik.handleChange}
                                                className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#2E3A59] text-[#2E3A59] placeholder-transparent focus:outline-none focus:border-[#2E3A59]"
                                                placeholder="john@doe.com"
                                            />
                                            <label
                                                htmlFor="max_hours"
                                                className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-sm"
                                            >
                                                Max hours
                                            </label>
                                            {
                                                formik.errors.max_hours && (
                                                    <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                                                        {formik.errors.max_hours}{" "}
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className=" relative w-[350px]">
                                    <input
                                        id="project_value"
                                        type="text"
                                        name="project_value"
                                        value={formik.values.project_value}
                                        onChange={formik.handleChange}
                                        className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#2E3A59] text-[#2E3A59] placeholder-transparent focus:outline-none focus:border-[#2E3A59]"
                                        placeholder="Password"
                                    />
                                    <label
                                        htmlFor="project_value"
                                        className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-sm"
                                    >
                                        Project value
                                    </label>
                                    {
                                        formik.errors.project_value && (
                                            <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                                                {formik.errors.project_value}{" "}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex flex-row space-x-20 pb-[16px]">

                                <div className=" relative w-[350px]">
                                    <input
                                        id="spread_sheet_id"
                                        type="text"
                                        name="spread_sheet_id"
                                        value={formik.values.spread_sheet_id}
                                        onChange={formik.handleChange}
                                        className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#2E3A59] text-[#2E3A59] placeholder-transparent focus:outline-none focus:border-[#2E3A59]"
                                        placeholder="Password"
                                    />
                                    <label
                                        htmlFor="spread_sheet_id"
                                        className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-sm"
                                    >
                                        Spreadsheet ID
                                    </label>
                                    {
                                        formik.errors.spread_sheet_id && (
                                            <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                                                {formik.errors.spread_sheet_id}{" "}
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="relative w-[350px]">
                                    <input
                                        id="spread_sheet_key"
                                        name="spread_sheet_key"
                                        type="text"
                                        value={formik.values.spread_sheet_key}
                                        onChange={formik.handleChange}
                                        className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#2E3A59] text-[#2E3A59] placeholder-transparent focus:outline-none focus:border-[#2E3A59]"
                                        placeholder="john@doe.com"
                                    />
                                    <label
                                        htmlFor="spread_sheet_key"
                                        className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-sm"
                                    >
                                        Spreadsheet  Key
                                    </label>
                                    {
                                        formik.errors.spread_sheet_key && (
                                            <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                                                {formik.errors.spread_sheet_key}{" "}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex flex-row space-x-20 pb-[16px]">

                                <div className="relative w-[350px]">
                                    <div className="flex">
                                        <input
                                            id="time_sheet_id"
                                            name="time_sheet_id"
                                            type="text"
                                            value={formik.values.time_sheet_id}
                                            onChange={formik.handleChange}
                                            className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#2E3A59] text-[#2E3A59] placeholder-transparent focus:outline-none focus:border-[#2E3A59]"
                                            placeholder="john@doe.com"
                                        />
                                        <label
                                            htmlFor="time_sheet_id"
                                            className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-sm"
                                        >
                                            Time Sheet ID
                                        </label>
                                        {
                                            formik.errors.time_sheet_id && (
                                                <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                                                    {formik.errors.time_sheet_id}{" "}
                                                </div>
                                            )
                                        }
                                        <div>
                                            {showeye ? (<div onClick={(e) => ShowPasswordButton(e)}
                                                className="cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">

                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                </svg>
                                            </div>)
                                                :
                                                (<div onClick={(e) => ShowPasswordButton(e)} className="cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </div>
                                                )}
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div className="flex flex-row justify-between shadow-[buttonshadow] mr-[-30px] pb-[45.01px] content-center mt-[42px]">
                                <div className="flex flex-row">
                                    <div className="mr-[45px] shadow-[buttonshadow] ">
                                        <Popup
                                            open={open}
                                            position="right center"
                                            model
                                        >
                                            <ZoneList closeModal={closeModal} />
                                        </Popup>

                                        <Popup
                                            open={openSub}
                                            position="right center"
                                            model
                                        >
                                            <SubZoneList closeModal={closeModalSub} />
                                        </Popup>


                                        <Popup
                                            open={open}
                                            position="right center"
                                            model
                                        >
                                            <div className="p-7 ">
                                                <div className="flex pb-3">

                                                    <div style={{ marginLeft: "95%" }}>
                                                        <span className="text-[red] text-[19px] cursor-pointer" onClick={(e) => CancelButton(e)} >
                                                            <b>X</b>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="mt-3 ex1">
                                                    <table className="table-auto   text-center   
                            text-[#8F9BBA] text-[12px] font-sans w-[100%]
                         font-normal not-italic ">
                                                        {sheetdata?.map((item, i) => {
                                                            if (i <= 0) {
                                                                return (
                                                                    <tr className="max-h-[52.84px] text-center w-[100%]  ">
                                                                        <th className="w-[20%] py-[13px]">{item[0]}</th>
                                                                        <th className="w-[40%] py-[13px]">{item[1]}</th>
                                                                        <th className="w-[40%] py-[13px]  ">{item[2]}</th>

                                                                    </tr>
                                                                )
                                                            }
                                                            else {
                                                                return (
                                                                    <tbody className=" mb-[10px]   ">
                                                                        <tr className="bg-[#e4eeec]  text-[#8F9BBA] text-[12px] font-sans  ">
                                                                            <td className=" pt-[15px] w-[11%] pb-[14.83px]">{item[0]} </td>
                                                                            <td className="pt-[15px] w-[20%] pb-[14.83px]">{item[1]}</td>
                                                                            <td className="pt-[15px] w-[30%] pb-[14.83px]">{item[2]}</td>

                                                                        </tr>
                                                                        <tr>
                                                                            <td className="p-[10px]"></td>
                                                                        </tr>
                                                                    </tbody>
                                                                )
                                                            }
                                                        })
                                                        }
                                                    </table>

                                                </div>

                                            </div>

                                        </Popup>

                                        {/* <button onClick={() => { naviagte("/master/clients") }} className="w-[100px] btnshadow  h-[25px] rounded text-sm font-secondaryFont text-[14px] text-center font-medium not-italic items-center  bg-[#FFFFFF] text-[#2E3A59] ">
                                            Add Delay
                                        </button> */}
                                    </div>

                                    <div className="mr-[25px] shadow-[buttonshadow] ">
                                        <button
                                            onClick={() =>
                                                viewpermission || allpermissions ? naviagte(`/master/zones/${useperma.id}`) : null
                                            }
                                            className={`${viewpermission === "GET-ZONES" || allpermissions === "ALL" ? "cursor-pointer" : "  disabledclass"}
                                                    w-[160px] btnshadow  h-[25px] rounded text-sm
                                                    font-secondaryFont text-[14px] text-center font-medium not-italic
                                                    items-center  bg-[#FFFFFF] text-[#2E3A59] `}
                                        >
                                            View Zones & Subzones
                                        </button>
                                    </div>

                                    <div className="mr-[25px] shadow-[buttonshadow] ">
                                        <button onClick={() => { naviagte("/UserManagement/EditAccess") }}
                                            className="w-[160px] btnshadow  h-[25px] rounded text-sm font-secondaryFont
                      text-[14px] text-center font-medium not-italic items-center 
                       bg-[#FFFFFF] text-[#2E3A59] ">
                                            View Edit Access
                                        </button>
                                    </div>

                                    {/* <div className="mr-[45px] shadow-[buttonshadow] ">
                                        <button
                                            // onClick={() => setOpenSub(o => !o)}
                                            className="w-[100px] btnshadow  h-[25px] rounded text-sm font-secondaryFont text-[14px] text-center font-medium not-italic items-center  bg-[#FFFFFF] text-[#2E3A59] ">
                                            View Subzones
                                        </button>
                                    </div> */}
                                </div>
                                <div className="flex flex-row">
                                    <div className="mr-[45px] shadow-[buttonshadow] ">
                                        <button onClick={() => { naviagte("/master/projects") }} className="w-[100px] btnshadow  h-[25px] rounded text-sm font-secondaryFont text-[14px] text-center font-medium not-italic items-center  bg-[#F42424] text-[#000000] ">
                                            Cancel
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-[110px] h-[25px] rounded btnshadow   text-sm font-secondaryFont text-[14px] font-medium not-italic  bg-[#0FCC7C] text-[#000000] "
                                        >
                                            Save
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

export default EditProject;

