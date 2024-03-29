import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../../layout/Header";
import SideBar from "../../layout/SideBar";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { getUserApi } from "../../../AllApi/Api";
import { useToasts } from "react-toast-notifications";

const JobCardAssignedId = () => {

    const [title, setTitle] = useState(null); // the lifted state
    const [alljobcarddata, setAllJobCardData] = useState(null);
    const [userdata, setUserData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [userrolesdata, setUserRolesData] = useState(null);
    const [allpermission, setAllPermission] = useState(null)
    const [editpermission, setEditPermission] = useState(null)
    const [createpermission, setCreatePermission] = useState(null)
    const [viewpermission, setViewPermission] = useState(null)
    const [allpermissions, setAllPermissions] = useState(null)
    const [someallpermissions, setSomeAllPermissions] = useState([null])
    const [alltokenroles, setAllTokenRoles] = useState(null)
    const [selectrefrance, setSelectRefrance] = useState(false);
    const [userdetail, setDetail] = useState([]);

    const { addToast } = useToasts();
    let navigate = useNavigate();
    let urlTitle = useLocation();
    let useperma = useParams()

    useEffect(() => {
        if (urlTitle.pathname === `/daily_task/AssignById/${useperma.id}`) {
            setTitle("Activities");
        }
        const tokenroles= reactLocalStorage.get("roles", false);
        setAllTokenRoles(tokenroles)
    }, [urlTitle.pathname])

    useEffect(() => {
        const token = reactLocalStorage.get("access_token", false);
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/find_job_card_by_project/${useperma.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setAllJobCardData(response?.data)
                setFilteredData(response?.data)
            })
            .catch((error) => {
                console.log(error)
            })

        const userData = getUserApi().then((data) => {
            setUserData(data?.data)
        })
        handleSearch()
    }, [])

    useEffect(() => {
        let userdataArray = []
        let usersName = ""
        userdata?.map((items, id) => {
            usersName = {
                "name": `${items.FirstName} ${items.LastName}`,
                "assignuserid": `${items._id}`
            }
            userdataArray.push(usersName)
        })
        alljobcarddata?.forEach((items) => items.user = userdataArray) //this add user name in to the job card data
        setAllJobCardData(alljobcarddata)
        setFilteredData(alljobcarddata)
    }, [alljobcarddata, userdata, selectrefrance])

    const UserSelectFun = (e, itemData) => {
        let organizationId = ""
        const organization_Id = reactLocalStorage.get("organization_id", false);

        if (organization_Id !== "undefined" && organization_Id !== null) {
            organizationId = organization_Id
        }

        const userDetail = e.target.value
        const database = userDetail.split(',')
        let selectedObject = itemData
        let selectedValue = database[0]
        selectedObject.assign_to = selectedValue
        selectedObject.assign_user_id = database[1]
        selectedObject.assign_user_id = database[1]

        selectedObject.job_card_no = itemData._id

        const token = reactLocalStorage.get("access_token", false);
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/${database[1]}/roles`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setUserRolesData(response?.data[0]?.permission)
                selectedObject.assign_user_roles = response?.data[0]?.permission
                if (response.status === 201) {

                }
            })
            .catch((error) => {
                console.log(error)
            })
        setDetail([...userdetail, selectedObject]);
    }

    const UserOnFocusSelectFun = (e, itemData) => {
        setSelectRefrance(true)  //this refrace the select data
    }

    const SavePostApi = () => {
        let UserSdata = userdetail.filter((ele, ind) => ind === userdetail.findIndex(elem => elem._id === ele._id))
        let organizationId = ""

        const token = reactLocalStorage.get("access_token", false);
        const organization_Id = reactLocalStorage.get("organization_id", false);

        if (organization_Id !== "undefined" && organization_Id !== null) {
            organizationId = organization_Id
        }
        
        axios.patch(`${process.env.REACT_APP_BASE_URL}/api/update_job_card`,
             UserSdata,
             {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    addToast("your daily task is assign Sucessfully", {
                        appearance: "success",
                        autoDismiss: true,
                    })
                }
            })
            .catch((error) => {
                addToast(error.response.data.message, {
                    appearance: "error",
                    autoDismiss: true,
                })
            });
    }


    const handleSearch = (e) => {
        let value = e?.target?.value?.toUpperCase();
        let result = []
        result = alljobcarddata?.filter((data) => {
            if (isNaN(+value)) {
                return data?.activity_code?.toUpperCase().search(value) !== -1;
            }
        });
        setFilteredData(result)
        if (value === "") {
            setFilteredData(alljobcarddata)
        }
    }

    useEffect(() => {
        const permissionData = reactLocalStorage.get("permisions", false);
        setAllPermission(permissionData)
        getPermision()
    }, [allpermission])

    const getPermision = async () => {

        const url_data = await allpermission
        const database = url_data?.split(',')

        let value = "CREATE-ASSIGN-JOB-CARD".toUpperCase();
        let result = []
        result = database?.filter((data) => {
            if (isNaN(+value)) {
                return data?.toUpperCase().search(value) !== -1;
            }
        });

        let value1 = "CREATE-ASSIGN-JOB-CARD".toUpperCase();
        let result1 = []
        result1 = database?.filter((data) => {
            if (isNaN(+value)) {
                return data?.toUpperCase().search(value1) !== -1;
            }
        });

        let value2 = "GET-ASSIGN-JOB-CARD".toUpperCase();
        let result2 = []
        result2 = database?.filter((data) => {
            if (isNaN(+value)) {
                return data?.toUpperCase().search(value2) !== -1;
            }
        });

        if (result[0] === "CREATE-ASSIGN-JOB-CARD" ||
            result1[0] === "CREATE-ASSIGN-JOB-CARD" ||
            result2[0] === "GET-ASSIGN-JOB-CARD") {
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
                <div className=" ml-[20px] mt-[10px] text-[#A3AED0] font-bold not-italic text-[29.6px] leading-[53.15px] tracking-[-2%] " >
                Activities Assigned</div>
                <div className="flex flex-col w-[100%] mt-[20px] pl-[22px] pr-[44px] ml-[20px] bg-[#FFFFFF] rounded-[31.53px]">
                    <div className="flex flex-row items-center space-x-[24.67px] pt-[27.29px]">
                        <div className="">
                            <svg
                                width="75.43"
                                height="75.43"
                                viewBox="0 0 75.43 75.43"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="38.6122" cy="37.9999" r="37.7143" fill="#F4F7FE" />
                            </svg>
                        </div>
                        <div className="flex flex-row space-x-[350px] ">
                            <div className="flex flex-col">
                                <div className=" font-secondaryFont font-medium bg-[#FFFFFF]  not-italic text-2xl leading-[32.33px] text-[#A3AED0] tracking-[-2%] ">
                                {alltokenroles ==="albannaadmin"?  "Albanna" : "Arab Electricians"}
                                </div>
                                <div className="font-secondaryFont font-bold not-italic  text-lg leading-[43.1px] tracking-[-2%] text-[#1B2559] ">
                                {alltokenroles ==="albannaadmin"?  "J725" : "Shining Towers"}
                                </div>
                            </div>
                            <div
                                style={{ boxShadow: "0px 4px rgba(0, 0, 0, 0.25)" }}
                                className="flex flex-row px-[10px]   items-center w-[234px] h-[46px] bg-[#FFFFFF] rounded-[0.625rem] "
                            >
                                <div>
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
                                <div className="bg-[#FFFFFF] pl-[7px]">
                                    <input type="text" placeholder="Search" className="outline-none"
                                        onChange={(e) => handleSearch(e)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ml-[95px]">
                        <table className="table-auto pt-[24px] w-[100%]  ">
                            <thead className="font-secondaryFont text-[#8F9BBA] font-normal not-italic text-[12px] leading-[20px] tracking-[-2%] py-[36px] ">
                                <tr>
                                    <th className="pb-[15.39px] w-[10%]">Activity ID</th>
                                    {/* <th className="pb-[15.39px]">Daily Task No.</th> */}
                                    <th className="pb-[15.39px] w-[10%]">Date(YY/MM/DD)</th>
                                    <th className="pb-[15.39px] w-[20%]">Description</th>
                                    <th className="pb-[15.39px] w-[5%]">Qty</th>
                                    <th className="pb-[15.39px] w-[20%]">Zone</th>
                                    <th className="pb-[15.39px] w-[20%]">SubZone</th>
                                    <th className="pb-[15.39px] w-[10%]">Assign To</th>
                                </tr>
                            </thead>
                            {filteredData?.map((item, id) => { 
                                return <tbody className="font-secondaryFont  text-[#8F9BBA] font-normal not-italic text-[12px] leading-[20px] tracking-[-2%]">
                                    <tr className="mb-[5px] bg-[#ECF1F0]">
                                        <th className="py-[13px]">{item.activity_code}</th>
                                        {/* <th className=" "   >{item._id}</th> */}
                                        <th className="">{item.jc_creation}</th>
                                        <th className="">{item.activity_name}</th>
                                        <th className="">{item.quantity_to_be_achieved}</th>
                                        <th className="">{item.zone}</th>
                                        <th className="">{item.sub_zone}</th>
                                        <th className="">
                                            <select className=" outline-none bg-[#ECF1F0] cursor-pointer"
                                                onFocus={(e) => UserOnFocusSelectFun(e, item)}
                                                onChange={(e) => UserSelectFun(e, item)}>
                                                <option selected="true" disabled="disabled"> {item?.assign_to!==""?item?.assign_to:`Select User`}</option>
                                                {item?.user?.map((items, i) => { 
                                                    return <option 
                                                    // selected= {`${item?.assign_to===items.name?"true":null}`} 
                                                     className={`${item?.assign_to===items.name?"bg-[red] text-[black]":null}`} 
                                                     value={[items.name, items.assignuserid]}>
                                                        {  items.name}</option>
                                                })
                                                }
                                            </select>
                                        </th>
                                    </tr>
                                    <tr className="p-[15px]">
                                        <td className="p-[10px]" ></td>
                                    </tr>
                                </tbody>
                            })}
                        </table>
                    </div>
                    <div className="flex flex-row justify-end py-[20px] space-x-2 ">
                        <div
                            onClick={(e) => editpermission || allpermissions ? SavePostApi(e) : null}
                            className={`${editpermission === "CREATE-ASSIGN-JOB-CARD" || allpermissions === "ALL" ? "cursor-pointer" : "disabledclass"} cursor-pointer flex justify-center items-center w-[100px] 
              h-[25px]   font-secondaryFont font-medium bg-[#0FCC7C] text-[#000000]
               rounded-[4px] text-[14px] leading-[37.83px] self-center` }
                            style={{ boxShadow: "0px 4px rgba(0, 0, 0, 0.25)" }}
                        >
                            <span
                            >Save</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobCardAssignedId;
