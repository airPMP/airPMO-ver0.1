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

                if (item.permission.includes('GET-CLIENTS')) {
                    return item.permission = item.permission.filter(v => v != 'GET-CLIENTS');
                }
                else {
                    return item.permission.push(`GET-CLIENTS`)
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
                if (item.permission.includes('CREATE-CLIENTS')) {
                    return item.permission = item.permission.filter(v => v != 'CREATE-CLIENTS' && v != 'EDIT-CLIENTS' && v != 'GET-CLIENTS');
                }
                else {
                    return item.permission.push('CREATE-CLIENTS', 'EDIT-CLIENTS', 'GET-CLIENTS')
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

                if (item.permission.includes(`CREATE-PROJECTS`)) {
                    return item.permission = item.permission.filter(v => v != 'CREATE-PROJECTS' && v != 'EDIT-PROJECTS' && v != 'GET-PROJECTS');
                }
                else {
                    return item.permission.push('CREATE-PROJECTS', 'EDIT-PROJECTS', 'GET-PROJECTS')
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
                if (item.permission.includes(`GET-PROJECTS`)) {
                    return item.permission = item.permission.filter(v => v != 'GET-PROJECTS')
                }
                else {
                    return item.permission.push(`GET-PROJECTS`)
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

                if (item.permission.includes(`CREATE-CATEGORIES`)) {
                    return item.permission = item.permission.filter(v => v != 'CREATE-CATEGORIES' && v != 'EDIT-CATEGORIES' && v != 'GET-CATEGORIES');
                }
                else {
                    return item.permission.push('CREATE-CATEGORIES', 'EDIT-CATEGORIES', 'GET-CATEGORIES')
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

                if (item.permission.includes(`GET-CATEGORIES`)) {
                    return item.permission = item.permission.filter(v => v != 'GET-CATEGORIES')
                }
                else {
                    return item.permission.push(`GET-CATEGORIES`)
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

                if (item.permission.includes(`CREATE-ZONES`)) {
                    return item.permission = item.permission.filter(v => v != 'CREATE-ZONES' && v != 'EDIT-ZONES' && v != 'GET-ZONES');
                }
                else {
                    return item.permission.push('CREATE-ZONES', 'EDIT-ZONES', 'GET-ZONES')
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

                if (item.permission.includes(`GET-ZONES`)) {
                    return item.permission = item.permission.filter(v => v != 'GET-ZONES')
                }
                else {
                    return item.permission.push(`GET-ZONES`)
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

                if (item.permission.includes(`CREATE-SUBZONES`)) {
                    return item.permission = item.permission.filter(v => v != 'CREATE-SUBZONES' && v != 'EDIT-SUBZONES' && v != 'GET-SUBZONES');
                }
                else {
                    return item.permission.push('CREATE-SUBZONES', 'EDIT-SUBZONES', 'GET-SUBZONES')
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

                if (item.permission.includes(`GET-SUBZONES`)) {
                    return item.permission = item.permission.filter(v => v != 'GET-SUBZONES')
                }
                else {
                    return item.permission.push(`GET-SUBZONES`)
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

                if (item.permission.includes(`CREATE-SHEET`)) {
                    return item.permission = item.permission.filter(v => v != 'CREATE-SHEET' && v != 'EDIT-SHEET' && v != 'GET-SHEET');
                }
                else {
                    return item.permission.push('CREATE-SHEET', 'EDIT-SHEET', 'GET-SHEET')
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

                if (item.permission.includes(`GET-SHEET`)) {
                    return item.permission = item.permission.filter(v => v != 'GET-SHEET')
                }
                else {
                    return item.permission.push(`GET-SHEET`)
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

                if (item.permission.includes(`CREATE-JOB-CARD`)) {
                    return item.permission = item.permission.filter(v => v != 'CREATE-JOB-CARD' && v != 'EDIT-JOB-CARD' && v != 'GET-JOB-CARD');
                }
                else {
                    return item.permission.push('CREATE-JOB-CARD', 'EDIT-JOB-CARD', 'GET-JOB-CARD')
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

                if (item.permission.includes(`GET-JOB-CARD`)) {
                    return item.permission = item.permission.filter(v => v != 'GET-JOB-CARD')
                }
                else {
                    return item.permission.push(`GET-JOB-CARD`)
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

                if (item.permission.includes(`CREATE-ASSIGN-JOB-CARD`)) {
                    return item.permission = item.permission.filter(v => v != 'CREATE-ASSIGN-JOB-CARD' && v != 'EDIT-ASSIGN-JOB-CARD' && v != 'GET-ASSIGN-JOB-CARD');
                }
                else {
                    return item.permission.push('CREATE-ASSIGN-JOB-CARD', 'EDIT-ASSIGN-JOB-CARD', 'GET-ASSIGN-JOB-CARD')
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

                if (item.permission.includes(`GET-ASSIGN-JOB-CARD`)) {
                    return item.permission = item.permission.filter(v => v != 'GET-ASSIGN-JOB-CARD')
                }
                else {
                    return item.permission.push(`GET-ASSIGN-JOB-CARD`)
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

                if (item.permission.includes(`CREATE-MY-JOB-CARD`)) {
                    return item.permission = item.permission.filter(v => v != 'CREATE-MY-JOB-CARD' && v != 'EDIT-MY-JOB-CARD' && v != 'GET-MY-JOB-CARD');
                }
                else {
                    return item.permission.push('CREATE-MY-JOB-CARD', 'EDIT-MY-JOB-CARD', 'GET-MY-JOB-CARD')
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

                if (item.permission.includes(`GET-MY-JOB-CARD`)) {
                    return item.permission = item.permission.filter(v => v != 'GET-MY-JOB-CARD')
                }
                else {
                    return item.permission.push(`GET-MY-JOB-CARD`)
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

                if (item.permission.includes(`CREATE-USERS`)) {
                    return item.permission = item.permission.filter(v => v != 'CREATE-USERS' && v != 'EDIT-USERS' && v != 'GET-USERS');
                }
                else {
                    return item.permission.push("CREATE-USERS", "EDIT-USERS", "GET-USERS")
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

                if (item.permission.includes(`GET-USERS`)) {
                    return item.permission = item.permission.filter(v => v != 'GET-USERS')
                }
                else {
                    return item.permission.push(`GET-USERS`)
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

                if (item.permission.includes(`CREATE-ROLES`)) {
                    return item.permission = item.permission.filter(v => v != 'CREATE-ROLES' && v != 'EDIT-ROLES' && v != 'GET-ROLES');
                }
                else {
                    return item.permission.push("CREATE-ROLES", "EDIT-ROLES", "GET-ROLES")
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

                if (item.permission.includes(`GET-ROLES`)) {
                    return item.permission = item.permission.filter(v => v != 'GET-ROLES')
                }
                else {
                    return item.permission.push(`GET-ROLES`)
                }
            }
            else {
                return "nothing"
            }

        })
        setClientId(e)


    }


    const organizationCreateEdit = (e, id) => {
        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission.includes(`CREATE-ORGANIZATION`)) {
                    return item.permission = item.permission.filter(v => v != 'CREATE-ORGANIZATION' && v != 'EDIT-ORGANIZATION' && v != 'GET-ORGANIZATION');
                }
                else {
                    return item.permission.push("CREATE-ORGANIZATION", "EDIT-ORGANIZATION", "GET-ORGANIZATION")
                }
            }
            else {
                return "nothing"
            }
        })
        setClientId(e)
    }

    const organizationView = (e, id) => {
        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission.includes(`GET-ORGANIZATION`)) {
                    return item.permission = item.permission.filter(v => v != 'GET-ORGANIZATION')
                }
                else {
                    return item.permission.push(`GET-ORGANIZATION`)
                }
            }
            else {
                return "nothing"
            }

        })
        setClientId(e)
    }

    const permissionCreateEdit = (e, id) => {
        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission.includes(`CREATE-PERMISSIONS`)) {
                    return item.permission = item.permission.filter(v => v != 'CREATE-PERMISSIONS' && v != 'EDIT-PERMISSIONS' && v != 'GET-PERMISSIONS');
                }
                else {
                    return item.permission.push("CREATE-PERMISSIONS", "EDIT-PERMISSIONS", "GET-PERMISSIONS")
                }
            }
            else {
                return "nothing"
            }
        })
        setClientId(e)
    }

    const permisionsView = (e, id) => {
        let comedata = rolesdata?.map((item, id1) => {

            if (id === item._id) {

                if (item.permission.includes(`GET-PERMISSIONS`)) {
                    return item.permission = item.permission.filter(v => v != 'GET-PERMISSIONS')
                }
                else {
                    return item.permission.push(`GET-PERMISSIONS`)
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
                "permission": item?.permission && [...new Set(item.permission)]
            }
        })
        // let final_data = []
        // roles_all_data.forEach((item)=>{
        //     if(item.permission.includes('CREATE-ROLES')){
        //         if(item.permission.includes('GET-PERMISSIONS') == false){
        //             item.permission.push('GET-PERMISSIONS')  
        //         }
        //         if(item.permission.includes('GET-ORGANIZATION') == false){
        //             item.permission.push('GET-ORGANIZATION')
        //         }

        //        final_data.push(item)
        //     }else{
        //         final_data.push(item)
        //     }


        // })

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
                                <div className="pt-10">
                                    <button className=" bg-[#EDF2F1] text-[13.5px] py-[24px] w-[130px] rounded-[5px]"
                                        style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                        Organization
                                        <br />
                                        Dashboards 10
                                    </button>
                                </div>
                                <div className="pt-10">
                                    <button className=" bg-[#EDF2F1] text-[13.5px] py-[24px] w-[130px] rounded-[5px]"
                                        style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                        Permission
                                        <br />
                                        Dashboards 1
                                    </button>
                                </div>
                            </div>


                            <div className="col-span-10 editAccess_flow ">
                                <div className=" flex">
                                    {rolesdata?.map((items, id) => {
                                        if (id >= 1) {
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
                                                            ${items.permission.includes("CREATE-USERS") ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} 
                                                             text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                Edit/Create
                                                            </button>
                                                        </div>
                                                        <div className="px-[2px]">
                                                            <button
                                                                onClick={(e) => UserView(e, items._id)}
                                                                className={`${items.permission.includes("GET-USERS") ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} text-[13.5px] py-2 w-[75px] rounded-[5px]`}
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
                                            if (id >= 1) {
                                                return <div className=" p-3    " key={id}>



                                                    <div className=" ">
                                                        <div className="flex">
                                                            <div className="px-[2px]">
                                                                <button

                                                                    onClick={(e) => RolesEditCreate(e, items._id)}
                                                                    className={` 
                                                            ${items.permission.includes("CREATE-ROLES") ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} 
                                                             text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Edit/Create
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => RolesView(e, items._id)}
                                                                    className={`${items.permission.includes("GET-ROLES") ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} text-[13.5px] py-2 w-[75px] rounded-[5px]`}
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
                                        if (id >= 1) {
                                            return <div className=" p-3   pt-[28.49px]" key={id}>



                                                <div className=" ">
                                                    <div className="flex">
                                                        <div className="px-[2px]">
                                                            <button

                                                                onClick={(e) => ClientEditCreate(e, items._id)}
                                                                className={` 
                                                            ${items.permission.includes('CREATE-CLIENTS') ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} 
                                                             text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                Edit/Create
                                                            </button>
                                                        </div>
                                                        <div className="px-[2px]">
                                                            <button
                                                                onClick={(e) => ClientView(e, items._id)}
                                                                className={`${items.permission.includes(`GET-CLIENTS`) ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} text-[13.5px] py-2 w-[75px] rounded-[5px]`}
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
                                            if (id >= 1) {
                                                return <div className=" p-3    " key={id}>

                                                    <div className=" ">
                                                        <div className="flex">
                                                            <div className="px-[2px]">
                                                                <button

                                                                    onClick={(e) => ProjectEditCreate(e, items._id)}
                                                                    className={` 
                                                            ${items.permission.includes(`CREATE-PROJECTS`) ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} 
                                                             text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Edit/Create
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => ProjectView(e, items._id)}
                                                                    className={`${items.permission.includes(`GET-PROJECTS`) ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} text-[13.5px] py-2 w-[75px] rounded-[5px]`}
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
                                            if (id >= 1) {
                                                return <div className=" p-3    " key={id}>

                                                    <div className=" ">
                                                        <div className="flex">
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => ZoneEditCreate(e, items._id)}
                                                                    className={` 
                                                                    ${items.permission.includes(`CREATE-ZONES`) ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} 
                                                                     text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Edit/Create
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => ZoneView(e, items._id)}
                                                                    className={`${items.permission.includes(`GET-ZONES`) ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} text-[13.5px] py-2 w-[75px] rounded-[5px]`}
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
                                            if (id >= 1) {
                                                return <div className=" p-3    " key={id}>

                                                    <div className=" ">
                                                        <div className="flex">
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => SubZoneEditCreate(e, items._id)}
                                                                    className={` 
                                                                    ${items.permission.includes(`CREATE-SUBZONES`) ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} 
                                                                     text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Edit/Create
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => SubZoneView(e, items._id)}
                                                                    className={`${items.permission.includes(`GET-SUBZONES`) ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} text-[13.5px] py-2 w-[75px] rounded-[5px]`}
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
                                            if (id >= 1) {
                                                return <div className=" p-3    " key={id}>



                                                    <div className=" ">
                                                        <div className="flex">
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => CategoryEditCreate(e, items._id)}
                                                                    className={` 
                                                                    ${items.permission.includes(`CREATE-CATEGORIES`) ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} 
                                                                     text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Edit/Create
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => CategoryView(e, items._id)}
                                                                    className={`${items.permission.includes(`GET-CATEGORIES`) ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} text-[13.5px] py-2 w-[75px] rounded-[5px]`}
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
                                            if (id >= 1) {
                                                return <div className=" p-3    " key={id}>

                                                    <div className=" ">
                                                        <div className="flex">
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => ProductivitySheetEditCreate(e, items._id)}
                                                                    className={` 
                                                            ${items.permission.includes(`CREATE-SHEET`) ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} 
                                                             text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Edit/Create
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => ProductivitySheetView(e, items._id)}
                                                                    className={`${items.permission.includes(`GET-SHEET`) ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} text-[13.5px] py-2 w-[75px] rounded-[5px]`}
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
                                            if (id >= 1) {
                                                return <div className=" p-3    " key={id}>

                                                    <div className=" ">
                                                        <div className="flex">
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => JobCardEditCreate(e, items._id)}
                                                                    className={` 
                                                            ${items.permission.includes(`CREATE-JOB-CARD`) ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} 
                                                             text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Edit/Create
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => JobCardView(e, items._id)}
                                                                    className={`${items.permission.includes(`GET-JOB-CARD`) ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} text-[13.5px] py-2 w-[75px] rounded-[5px]`}
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
                                            if (id >= 1) {
                                                return <div className=" p-3    " key={id}>

                                                    <div className=" ">
                                                        <div className="flex">
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => AssignJobCardEditCreate(e, items._id)}
                                                                    className={` 
                                                            ${items.permission.includes(`CREATE-ASSIGN-JOB-CARD`) ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} 
                                                             text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Edit/Create
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => AssignJobCardView(e, items._id)}
                                                                    className={`${items.permission.includes("GET-ASSIGN-JOB-CARD") ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} text-[13.5px] py-2 w-[75px] rounded-[5px]`}
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
                                            if (id >= 1) {
                                                return <div className=" p-3    " key={id}>

                                                    <div className=" ">
                                                        <div className="flex">
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => MyobCardEditCreate(e, items._id)}
                                                                    className={` 
                                                            ${items.permission.includes("CREATE-MY-JOB-CARD") ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} 
                                                             text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Edit/Create
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => MyJobCardView(e, items._id)}
                                                                    className={`${items.permission.includes("GET-MY-JOB-CARD") ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} text-[13.5px] py-2 w-[75px] rounded-[5px]`}
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
                                            if (id >= 1) {
                                                return <div className=" p-3    " key={id}>

                                                    <div className=" ">
                                                        <div className="flex">
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => organizationCreateEdit(e, items._id)}
                                                                    className={` 
                                                            ${items.permission.includes("CREATE-ORGANIZATION") ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} 
                                                             text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Edit/Create
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => organizationView(e, items._id)}
                                                                    className={`${items.permission.includes("GET-ORGANIZATION") ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} text-[13.5px] py-2 w-[75px] rounded-[5px]`}
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
                                            if (id >= 1) {
                                                return <div className=" p-3    " key={id}>

                                                    <div className=" ">
                                                        <div className="flex">
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => permissionCreateEdit(e, items._id)}
                                                                    className={` 
                                                            ${items.permission.includes("CREATE-PERMISSIONS") ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} 
                                                             text-[13.5px] py-2 w-[75px] rounded-[5px]`}
                                                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                                    Edit/Create
                                                                </button>
                                                            </div>
                                                            <div className="px-[2px]">
                                                                <button
                                                                    onClick={(e) => permisionsView(e, items._id)}
                                                                    className={`${items.permission.includes("GET-PERMISSIONS") ? "bg-[#0FCC7C]" : "bg-[#ffffff]"} text-[13.5px] py-2 w-[75px] rounded-[5px]`}
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
                                    onClick={() => { navigate("/UserManagement/UserRole") }}
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
