import React, { useState, useEffect } from 'react'
import Header from '../layout/Header'
import SideBar from '../layout/SideBar'
import { useLocation, useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { useToasts } from "react-toast-notifications";
import axios from "axios";

const EditAccess = () => {

    const [title, setTitle] = useState(null);
    const [rolesdata, setRolesData] = useState(null)
    const [permissiondata, setPermissionData] = useState(null)
    const [clientid, setClientId] = useState('') //don't remove this state its very important  

    let navigate = useNavigate();
    let urlTitle = useLocation();
    const { addToast } = useToasts();



    useEffect(() => {

        if (urlTitle.pathname === "/UserManagement/EditAccess") {
            setTitle("User Mgmt");
        }

        const token = reactLocalStorage.get("access_token", false);
        const feachRolls = async () => {
            try {
                const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/roles/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setRolesData(data?.data)
            } catch (error) {
                console.log(error)
            }
        }
        feachRolls();

        const feachPermission = async () => {
            try {
                const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/permission/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                setPermissionData(data?.data)
            } catch (error) {
                console.log(error)
            }
        }
        feachPermission();



    }, [urlTitle.pathname])




    const ClientView = (e, id) => {

        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission[2] === `GET-CLIENTS`) {
                    return item.permission[2] = ''
                }
                else {
                    return item.permission[2] = `GET-CLIENTS`
                }
            }
            else {
                return "nothing"
            }

        })
        setClientId(e)
    }


    const ClientEditCreate = (e, id) => {

        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {
                if (item.permission[0] === `CREATE-CLIENTS`) {
                    return item.permission[0] = '', item.permission[1] = '', item.permission[2] = ''
                }
                else {
                    return item.permission[0] = `CREATE-CLIENTS`, item.permission[1] = `EDIT-CLIENTS`, item.permission[2] = `GET-CLIENTS`
                }
            }
            else {
                return "nothing"
            }
        })
        setClientId(e)

    }

    const ProjectEditCreate = (e, id) => {
        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission[3] === `CREATE-PROJECTS`) {
                    return item.permission[3] = '', item.permission[4] = '', item.permission[5] = ''
                }
                else {
                    return item.permission[3] = `CREATE-PROJECTS`, item.permission[4] = `EDIT-PROJECTS`, item.permission[5] = `GET-PROJECTS`
                }
            }
            else {
                return "nothing"
            }
        })
        setClientId(e)
    }


    const ProjectView = (e, id) => {
        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                console.log(item)
                if (item.permission[5] === `GET-PROJECTS`) {
                    return item.permission[5] = ''
                }
                else {
                    return item.permission[5] = `GET-PROJECTS`
                }
            }
            else {
                return "nothing"
            }

        })
        setClientId(e)
    }


    const CategoryEditCreate = (e, id) => {
        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission[6] === `CREATE-CATEGORIES`) {
                    return item.permission[6] = '', item.permission[7] = '', item.permission[8] = ''
                }
                else {
                    return item.permission[6] = `CREATE-CATEGORIES`, item.permission[7] = `EDIT-CATEGORIES`, item.permission[8] = `GET-CATEGORIES`
                }
            }
            else {
                return "nothing"
            }
        })
        setClientId(e)
    }


    const CategoryView = (e, id) => {
        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission[8] === `GET-CATEGORIES`) {
                    return item.permission[8] = ''
                }
                else {
                    return item.permission[8] = `GET-CATEGORIES`
                }
            }
            else {
                return "nothing"
            }

        })
        setClientId(e)
    }






    const ZoneEditCreate = (e, id) => {
        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission[9] === `CREATE-ZONES`) {
                    return item.permission[9] = '', item.permission[10] = '', item.permission[11] = ''
                }
                else {
                    return item.permission[9] = `CREATE-ZONES`, item.permission[10] = `EDIT-ZONES`, item.permission[11] = `GET-ZONES`
                }
            }
            else {
                return "nothing"
            }
        })
        setClientId(e)

    }

    const ZoneView = (e, id) => {
        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission[11] === `GET-ZONES`) {
                    return item.permission[11] = ''
                }
                else {
                    return item.permission[11] = `GET-ZONES`
                }
            }
            else {
                return "nothing"
            }

        })
        setClientId(e)

    }


    const SubZoneEditCreate = (e, id) => {
        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission[12] === `CREATE-SUBZONES`) {
                    return item.permission[12] = '', item.permission[13] = '', item.permission[14] = ''
                }
                else {
                    return item.permission[12] = `CREATE-SUBZONES`, item.permission[13] = `EDIT-SUBZONES`, item.permission[14] = `GET-SUBZONES`
                }
            }
            else {
                return "nothing"
            }
        })
        setClientId(e)

    }

    const SubZoneView = (e, id) => {
        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission[14] === `GET-SUBZONES`) {
                    return item.permission[14] = ''
                }
                else {
                    return item.permission[14] = `GET-SUBZONES`
                }
            }
            else {
                return "nothing"
            }

        })
        setClientId(e)

    }






    //////////////////////////////////////// Start ProductivitySheet //////////////////////

    const ProductivitySheetEditCreate = (e, id) => {

        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission[15] === `CREATE-SHEET`) {
                    return item.permission[15] = '', item.permission[16] = '', item.permission[17] = ''
                }
                else {
                    return item.permission[15] = `CREATE-SHEET`, item.permission[16] = `EDIT-SHEET`, item.permission[17] = `GET-SHEET`
                }
            }
            else {
                return "nothing"
            }
        })
        setClientId(e)



    }




    const ProductivitySheetView = (e, id) => {

        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission[17] === `GET-SHEET`) {
                    return item.permission[17] = ''
                }
                else {
                    return item.permission[17] = `GET-SHEET`
                }
            }
            else {
                return "nothing"
            }

        })
        setClientId(e)



    }


    ////////////////////////////////////////   ProductivitySheet End ////////////////////////////


    ////////////////////////////////////////  JobCard start ////////////////////////////


    const JobCardEditCreate = (e, id) => {

        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission[18] === `CREATE-JOB-CARD`) {
                    return item.permission[18] = '', item.permission[19] = '', item.permission[20] = ''
                }
                else {
                    return item.permission[18] = `CREATE-JOB-CARD`, item.permission[19] = `EDIT-JOB-CARD`, item.permission[20] = `GET-JOB-CARD`
                }
            }
            else {
                return "nothing"
            }
        })
        setClientId(e)



    }



    const JobCardView = (e, id) => {

        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission[20] === `GET-JOB-CARD`) {
                    return item.permission[20] = ''
                }
                else {
                    return item.permission[20] = `GET-JOB-CARD`
                }
            }
            else {
                return "nothing"
            }

        })
        setClientId(e)



    }

    ////////////////////////////////////////  JobCard End ////////////////////////////


    ////////////////////////////////////////  AssignJobCard start ////////////////////////////


    const AssignJobCardEditCreate = (e, id) => {

        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission[21] === `CREATE-ASSIGN-JOB-CARD`) {
                    return item.permission[21] = '', item.permission[22] = '', item.permission[23] = ''
                }
                else {
                    return item.permission[21] = `CREATE-ASSIGN-JOB-CARD`, item.permission[22] = `CREATE-ASSIGN-JOB-CARD`, item.permission[23] = `GET-ASSIGN-JOB-CARD`
                }
            }
            else {
                return "nothing"
            }
        })
        setClientId(e)


    }



    const AssignJobCardView = (e, id) => {

        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission[23] === `GET-ASSIGN-JOB-CARD`) {
                    return item.permission[23] = ''
                }
                else {
                    return item.permission[23] = `GET-ASSIGN-JOB-CARD`
                }
            }
            else {
                return "nothing"
            }

        })
        setClientId(e)

    }

    ////////////////////////////////////////  AssignJobCard End ////////////////////////////



    ////////////////////////////////////////   MyJobCard start ////////////////////////////
    const MyobCardEditCreate = (e, id) => {

        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission[24] === `CREATE-MY-JOB-CARD`) {
                    return item.permission[24] = '', item.permission[25] = '', item.permission[26] = ''
                }
                else {
                    return item.permission[24] = `CREATE-MY-JOB-CARD`, item.permission[25] = `EDIT-MY-JOB-CARD`, item.permission[26] = `GET-MY-JOB-CARD`
                }
            }
            else {
                return "nothing"
            }
        })
        setClientId(e)

    }


    const MyJobCardView = (e, id) => {

        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission[26] === `GET-MY-JOB-CARD`) {
                    return item.permission[26] = ''
                }
                else {
                    return item.permission[26] = `GET-MY-JOB-CARD`
                }
            }
            else {
                return "nothing"
            }

        })
        setClientId(e)


    }


    ////////////////////////////////////////   MyJobCard End ////////////////////////////



    ////////////////////////////////////////   UserEditCreate   start ////////////////////////////


    const UserEditCreate = (e, id) => {


        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission[27] === `EDIT-USERS`) {
                    return item.permission[27] = '', item.permission[28] = '', item.permission[29] = ''
                }
                else {
                    return item.permission[27] = `EDIT-USERS`, item.permission[28] = `EDIT-USERS`, item.permission[29] = `GET-USERS`
                }
            }
            else {
                return "nothing"
            }
        })
        setClientId(e)

    }


    const UserView = (e, id) => {

        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission[29] === `GET-USERS`) {
                    return item.permission[29] = ''
                }
                else {
                    return item.permission[29] = `GET-USERS`
                }
            }
            else {
                return "nothing"
            }

        })
        setClientId(e)


    }

    ////////////////////////////////////////   UserEditCreate End ////////////////////////////


    ////////////////////////////////////////   RoleEditCreate start ////////////////////////////

    const RolesEditCreate = (e, id) => {


        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission[30] === `CREATE-ROLES`) {
                    return item.permission[30] = '', item.permission[31] = '', item.permission[32] = ''
                }
                else {
                    return item.permission[30] = `CREATE-ROLES`, item.permission[31] = `EDIT-ROLES`, item.permission[32] = `GET-ROLES`
                }
            }
            else {
                return "nothing"
            }
        })
        setClientId(e)




    }


    const RolesView = (e, id) => {


        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission[32] === `GET-ROLES`) {
                    return item.permission[32] = ''
                }
                else {
                    return item.permission[32] = `GET-ROLES`
                }
            }
            else {
                return "nothing"
            }

        })
        setClientId(e)


    }

    ////////////////////////////////////////   RoleEditCreate End ////////////////////////////





    const SavePermission = () => {

        let roles_all_data = rolesdata?.map((item, id) => {
            return {
                "id": item?._id,
                "permission": item?.permission
            }
        })



        const token = reactLocalStorage.get("access_token", false);
        const feachPermission = async () => {

            try {
                const data = await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/update_roles_permission/`, {
                    roles_permission: roles_all_data

                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                console.log(data)
                if (data?.status === 200) {
                    addToast("All Permission Assign Sucessfully", {
                        appearance: "success",
                        autoDismiss: true,
                    })
                }

            } catch (error) {
                console.log(error)
            }
        }
        feachPermission();

    }






    return (
        <>
            <div className="flex flex-row justify-start overflow-hidden  ">
                <div>
                    <SideBar />
                </div>
                <div className="flex flex-col">
                    <Header title={title} />

                    <div className=" flex flex-col  w-[100%] rounded-[31.529px]  
                    mh-[632.01px] mt-[105.49px] ml-[38px]  pb-10
                      bg-[#FFFFFF]   ">
                        <div className="flex flex-row justify-between">
                            <div className="flex">
                                <div className=" ml-[26.8px] mt-[31.94px]   h-[88.28px] w-[88.28px] bg-[#F4F7FE] rounded-[50%]">
                                    <img
                                        src="/Group8.png"
                                        alt="logo"
                                        className="ml-[23px] mt-[16.57px] h-[44px]  w-[42.79px]"
                                    />
                                </div>
                                <div className="font-secondaryFont font-medium not-italic text-[28.09px] 
                                   leading-[37.83px] text-[#000000] mt-[51.51px] ml-[27.92px] ">
                                    Edit Access
                                </div>
                            </div>

                        </div>

                        <div
                            className="grid grid-cols-12    "
                        >
                            <div className="col-span-2   pl-4 mt-[70px]">
                                <div className=" ml-[20px]">

                                    Dashboards
                                </div>
                                <div className="pt-4">
                                    <button className=" bg-[#EDF2F1] text-[13.5px] py-[24px] w-[130px] rounded-[5px]"
                                        style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>

                                        Users
                                        <br />
                                        Dashboards 0
                                    </button>
                                </div>
                                <div className="pt-10">
                                    <button className=" bg-[#EDF2F1] text-[13.5px] py-[24px] w-[130px] rounded-[5px]"
                                        style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>


                                        Roles
                                        <br />
                                        Dashboards
                                    </button>
                                </div>
                                <div className="pt-10">
                                    <button className=" bg-[#EDF2F1] text-[13.5px] py-[24px] w-[130px] rounded-[5px]"
                                        style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>


                                        Client
                                        <br />
                                        Dashboards 1
                                    </button>
                                </div>
                                <div className="pt-10">
                                    <button className=" bg-[#EDF2F1] text-[13.5px] py-[24px] w-[130px] rounded-[5px]"
                                        style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>

                                        Project
                                        <br />
                                        Dashboards 2
                                    </button>
                                </div>
                                <div className="pt-10">
                                    <button className=" bg-[#EDF2F1] text-[13.5px] py-[24px] w-[130px] rounded-[5px]"
                                        style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>

                                        Zone
                                        <br />
                                        Dashboards 3
                                    </button>
                                </div>
                                <div className="pt-10">
                                    <button className=" bg-[#EDF2F1] text-[13.5px] py-[24px] w-[130px] rounded-[5px]"
                                        style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>

                                        Sub Zone
                                        <br />
                                        Dashboards 4
                                    </button>
                                </div>
                                <div className="pt-10">
                                    <button className=" bg-[#EDF2F1] text-[13.5px] py-[24px] w-[130px] rounded-[5px]"
                                        style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>

                                        Category
                                        <br />
                                        Dashboards 5
                                    </button>
                                </div>

                                <div className="pt-10">
                                    <button className=" bg-[#EDF2F1] text-[13.5px] py-[24px] w-[130px] rounded-[5px]"
                                        style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>

                                        Productivity Sheet
                                        <br />
                                        Dashboards 6
                                    </button>
                                </div>

                                <div className="pt-10">
                                    <button className=" bg-[#EDF2F1] text-[13.5px] py-[24px] w-[130px] rounded-[5px]"
                                        style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>

                                        Job Cards
                                        <br />
                                        Dashboards 7
                                    </button>
                                </div>

                                <div className="pt-10">
                                    <button className=" bg-[#EDF2F1] text-[13.5px] py-[24px] w-[130px] rounded-[5px]"
                                        style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>

                                        Job Cards Assigned
                                        <br />
                                        Dashboards 8
                                    </button>
                                </div>

                                <div className="pt-10">
                                    <button className=" bg-[#EDF2F1] text-[13.5px] py-[24px] w-[130px] rounded-[5px]"
                                        style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>

                                        My Job Cards
                                        <br />
                                        Dashboards 9
                                    </button>
                                </div>
                            </div>


                            <div className="col-span-10 editAccess_flow ">
                                <div className=" flex">
                                    {rolesdata?.map((items, id) => {
                                        if (id >= 3) {
                                            return <div className=" p-3   pt-[28.49px]" key={id}>

                                                <button className=" bg-[#EDF2F1] text-[13.5px] py-1 w-[155px] rounded-[5px]"
                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                    {items.name}
                                                </button>

                                                <div className="mt-[55px]">

                                                    <div className="flex">
                                                        <div className="px-[2px]">
                                                            <button

                                                                onClick={(e) => UserEditCreate(e, items._id)}
                                                                className={` 
                                                            ${items.permission[27] === `EDIT-USERS` ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} 
                                                             text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                Edit/Create
                                                            </button>
                                                        </div>
                                                        <div className="px-[2px]">
                                                            <button
                                                                onClick={(e) => UserView(e, items._id)}
                                                                className={`${items.permission[29] === `GET-USERS` ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                View
                                                            </button>
                                                        </div>
                                                    </div>



                                                    <div className="flex mt-3">
                                                        <div className="px-[2px]">
                                                            <button className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                Comment
                                                            </button>
                                                        </div>
                                                        <div className="px-[2px]">
                                                            <button className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                Approve
                                                            </button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    })}
                                </div>


                                <div>
                                    <div className="flex mt-5">
                                        {rolesdata?.map((items, id) => {
                                            if (id >= 3) {
                                                return <div className=" p-3    " key={id}>



                                                    <div className=" ">
                                                        <div className="flex">
                                                            <div className="px-[2px]">
                                                                <button

                                                                    onClick={(e) => RolesEditCreate(e, items._id)}
                                                                    className={` 
                                                            ${items.permission[30] === `CREATE-ROLES` ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} 
                                                             text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Edit/Create
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => RolesView(e, items._id)}
                                                                    className={`${items.permission[32] === `GET-ROLES` ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    View
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="flex mt-3">
                                                            <div className="px-[2px]">
                                                                <button className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Comment
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Approve
                                                                </button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        })}
                                    </div>
                                </div>


                                <div className=" flex">
                                    {rolesdata?.map((items, id) => {
                                        if (id >= 3) {
                                            return <div className=" p-3   pt-[28.49px]" key={id}>



                                                <div className=" ">
                                                    <div className="flex">
                                                        <div className="px-[2px]">
                                                            <button

                                                                onClick={(e) => ClientEditCreate(e, items._id)}
                                                                className={` 
                                                            ${items.permission[0] === `CREATE-CLIENTS` ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} 
                                                             text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                Edit/Create
                                                            </button>
                                                        </div>
                                                        <div className="px-[2px]">
                                                            <button
                                                                onClick={(e) => ClientView(e, items._id)}
                                                                className={`${items.permission[2] === `GET-CLIENTS` ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                View
                                                            </button>
                                                        </div>
                                                    </div>


                                                    <div className="flex mt-3">
                                                        <div className="px-[2px]">
                                                            <button className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                Comment
                                                            </button>
                                                        </div>
                                                        <div className="px-[2px]">
                                                            <button className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                Approve
                                                            </button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    })}
                                </div>






                                <div>
                                    <div className="flex mt-5">
                                        {rolesdata?.map((items, id) => {
                                            if (id >= 3) {
                                                return <div className=" p-3    " key={id}>



                                                    <div className=" ">
                                                        <div className="flex">
                                                            <div className="px-[2px]">
                                                                <button

                                                                    onClick={(e) => ProjectEditCreate(e, items._id)}
                                                                    className={` 
                                                            ${items.permission[3] === `CREATE-PROJECTS` ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} 
                                                             text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Edit/Create
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => ProjectView(e, items._id)}
                                                                    className={`${items.permission[5] === `GET-PROJECTS` ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    View
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="flex mt-3">
                                                            <div className="px-[2px]">
                                                                <button className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Comment
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Approve
                                                                </button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        })}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex mt-5">
                                        {rolesdata?.map((items, id) => {
                                            if (id >= 3) {
                                                return <div className=" p-3    " key={id}>

                                                    <div className=" ">
                                                        <div className="flex">
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => ZoneEditCreate(e, items._id)}
                                                                    className={` 
                                                                    ${items.permission[9] === `CREATE-ZONES` ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} 
                                                                     text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Edit/Create
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => ZoneView(e, items._id)}
                                                                    className={`${items.permission[11] === `GET-ZONES` ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    View
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="flex mt-3">
                                                            <div className="px-[2px]">
                                                                <button className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Comment
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Approve
                                                                </button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        })}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex mt-5">
                                        {rolesdata?.map((items, id) => {
                                            if (id >= 3) {
                                                return <div className=" p-3    " key={id}>

                                                    <div className=" ">
                                                        <div className="flex">
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => SubZoneEditCreate(e, items._id)}
                                                                    className={` 
                                                                    ${items.permission[12] === `CREATE-SUBZONES` ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} 
                                                                     text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Edit/Create
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => SubZoneView(e, items._id)}
                                                                    className={`${items.permission[14] === `GET-SUBZONES` ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    View
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="flex mt-3">
                                                            <div className="px-[2px]">
                                                                <button className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Comment
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Approve
                                                                </button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        })}
                                    </div>
                                </div>





                                <div>
                                    <div className="flex mt-5">
                                        {rolesdata?.map((items, id) => {
                                            if (id >= 3) {
                                                return <div className=" p-3    " key={id}>



                                                    <div className=" ">
                                                        <div className="flex">
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => CategoryEditCreate(e, items._id)}
                                                                    className={` 
                                                                    ${items.permission[6] === `CREATE-CATEGORIES` ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} 
                                                                     text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Edit/Create
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => CategoryView(e, items._id)}
                                                                    className={`${items.permission[8] === `GET-CATEGORIES` ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    View
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="flex mt-3">
                                                            <div className="px-[2px]">
                                                                <button className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Comment
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Approve
                                                                </button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        })}
                                    </div>
                                </div>


                                <div>
                                    <div className="flex mt-5">
                                        {rolesdata?.map((items, id) => {
                                            if (id >= 3) {
                                                return <div className=" p-3    " key={id}>

                                                    <div className=" ">
                                                        <div className="flex">
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => ProductivitySheetEditCreate(e, items._id)}
                                                                    className={` 
                                                            ${items.permission[15] === `CREATE-SHEET` ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} 
                                                             text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Edit/Create
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => ProductivitySheetView(e, items._id)}
                                                                    className={`${items.permission[17] === `GET-SHEET` ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    View
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="flex mt-3">
                                                            <div className="px-[2px]">
                                                                <button className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Comment
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Approve
                                                                </button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        })}
                                    </div>
                                </div>


                                <div>
                                    <div className="flex mt-5">
                                        {rolesdata?.map((items, id) => {
                                            if (id >= 3) {
                                                return <div className=" p-3    " key={id}>

                                                    <div className=" ">
                                                        <div className="flex">
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => JobCardEditCreate(e, items._id)}
                                                                    className={` 
                                                            ${items.permission[18] === `CREATE-JOB-CARD` ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} 
                                                             text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Edit/Create
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => JobCardView(e, items._id)}
                                                                    className={`${items.permission[20] === `GET-JOB-CARD` ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    View
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="flex mt-3">
                                                            <div className="px-[2px]">
                                                                <button className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Comment
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Approve
                                                                </button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        })}
                                    </div>
                                </div>


                                <div>
                                    <div className="flex mt-5">
                                        {rolesdata?.map((items, id) => {
                                            if (id >= 3) {
                                                return <div className=" p-3    " key={id}>

                                                    <div className=" ">
                                                        <div className="flex">
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => AssignJobCardEditCreate(e, items._id)}
                                                                    className={` 
                                                            ${items.permission[21] === `CREATE-ASSIGN-JOB-CARD` ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} 
                                                             text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Edit/Create
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => AssignJobCardView(e, items._id)}
                                                                    className={`${items.permission[23] === `GET-ASSIGN-JOB-CARD` ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    View
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="flex mt-3">
                                                            <div className="px-[2px]">
                                                                <button className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Comment
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Approve
                                                                </button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        })}
                                    </div>
                                </div>


                                <div>
                                    <div className="flex mt-5">
                                        {rolesdata?.map((items, id) => {
                                            if (id >= 3) {
                                                return <div className=" p-3    " key={id}>

                                                    <div className=" ">
                                                        <div className="flex">
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => MyobCardEditCreate(e, items._id)}
                                                                    className={` 
                                                            ${items.permission[24] === `CREATE-MY-JOB-CARD` ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} 
                                                             text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Edit/Create
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => MyJobCardView(e, items._id)}
                                                                    className={`${items.permission[26] === `GET-MY-JOB-CARD` ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    View
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="flex mt-3">
                                                            <div className="px-[2px]">
                                                                <button className=" bg-[#0FCC7C] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Comment
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button className=" bg-[#ffffff] text-[13.5px] py-2 w-[75px] rounded-[5px]"
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Approve
                                                                </button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        })}
                                    </div>
                                </div>


                            </div>


                        </div>

                        <div className="flex mt-10  ml-[70%]  ">
                            <div className="mr-[45px] shadow-[buttonshadow] ">
                                <button
                                    // onClick={() => { naviagte("/master/projects") }}
                                    className="w-[100px] btnshadow  h-[25px] rounded text-sm font-secondaryFont text-[14px] text-center font-medium not-italic items-center  bg-[#F42424] text-[#000000] ">
                                    Cancel
                                </button>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    onClick={(e) => SavePermission(e)}
                                    className="w-[110px] h-[25px] rounded btnshadow   text-sm font-secondaryFont text-[14px] font-medium not-italic  bg-[#0FCC7C] text-[#000000] "
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditAccess
