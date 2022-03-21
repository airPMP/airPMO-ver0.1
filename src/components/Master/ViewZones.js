import React, { useState, useEffect } from 'react'
import SideBar from '../layout/SideBar';
import Header from '../layout/Header';
import { useLocation, useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { ViewZoneData, ViewSubZoneData, CategorieLengthSet } from '../../SimplerR/auth'
import axios from "axios";
import Popup from "reactjs-popup";
import ZoneList from './ZoneList';
import SubZoneList from './SubZoneList';

const ViewZones = () => {

    const [title, setTitle] = useState(null);
    const [open, setOpen] = useState(false);
    const [zonedata, setZoneData] = useState(null)
    const [zone_id, setZone_id] = useState(null)
    const [subzonedata, setSubZoneData] = useState(null)


    const [allpermission, setAllPermission] = useState(null)
    const [editpermission, setEditPermission] = useState(null)
    const [filteredData, setFilteredData] = useState(zonedata);
    const CategorieLengthget = CategorieLengthSet.use()

    const [deleteid, setDeleteId] = useState(null);
    let urlTitle = useLocation();
    let navigate = useNavigate();



    const [subzoneid, setSubZoneId] = useState(null);
    const [activezoneshow, setActiveZoneShow] = useState(null);
    const viewzonedata = ViewZoneData.use()
    const viewsubzonedata = ViewSubZoneData.use()

    useEffect(() => {


        if (urlTitle.pathname === "/master/categories") {
            setTitle("Master");
        }

        const token = reactLocalStorage.get("access_token", false);
        const feach = async () => {
            try {
                const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/zone/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                setZoneData(data?.data)
                setFilteredData(data?.data)
            } catch (error) {
                console.log(error)
            }
        }
        feach();
        handleSearch();


        getPermision()

    }, [urlTitle.pathname])


    useEffect(() => {
        const permissionData = reactLocalStorage.get("permisions", false);
        setAllPermission(permissionData)

        getPermision()
    }, [allpermission])


    const getPermision = async () => {

        const url_data = await allpermission
        const database = url_data.split(',')

        let value = "EDIT-CATEGORIES".toUpperCase();
        let result = []
        result = database?.filter((data) => {
            if (isNaN(+value)) {
                return data?.toUpperCase().search(value) !== -1;
            }
        });


        if (result[0] === "EDIT-CATEGORIES") {
            setEditPermission(result[0])
        }
        else {
            let value = "ALL".toUpperCase();
            let result = []
            result = database?.filter((data) => {
                if (isNaN(+value)) {
                    return data?.toUpperCase().search(value) !== -1;
                }
            });
            setEditPermission(result[0])
        }

    }




    const handleSearch = (e) => {
        let value = e?.target?.value?.toUpperCase();
        let result = []
        result = zonedata?.filter((data) => {

            if (isNaN(+value)) {
                return data?.zone_name?.toUpperCase().search(value) !== -1;
            }
        });

        setFilteredData(result)

        if (value === "") {
            setFilteredData(zonedata)
        }
    }


    const DeleteProfile = (e) => {
        setDeleteId(e)
        setOpen(o => !o)
    }

    const conformDelete = () => {

        const token = reactLocalStorage.get("access_token", false);
        const feach = async () => {
            try {
                const data = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/Categories/${deleteid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                if (data?.status === 200) {

                    window.location.reload(false);
                }
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        feach();
        setOpen(o => !o)
    }

    const CancelButton = (e) => {
        setOpen(o => !o)
    }



    const AddCategory = () => {
        if (editpermission === "EDIT-CATEGORIES" || editpermission === "ALL") {
            navigate("/master/categories/add_categories")
        }
    }
    const EditProfile = (e) => {
        if (editpermission === "EDIT-CATEGORIES" || editpermission === "ALL") {
            navigate(`/master/edit_categories/${e}`)
        }

    }

     

    const Subzone = (e, zone_id) => {
        console.log(zone_id)
        setSubZoneId(zone_id)
        setActiveZoneShow(o => !o)


        const feach = async () => {
            const token = reactLocalStorage.get("access_token", false);
            try {
                const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/zone/${zone_id}/subzone`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                setSubZoneData(data?.data)
                if (data?.status === 200) {

                    // window.location.reload(false);
                }
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        feach();



    }


    const ViewSubZoneFun = (e, item_data) => {
        ViewSubZoneData.set(o => !o)
        setZone_id(item_data._id)
    }



    return (

        <div className="flex flex-row justify-start overflow-hidden">
            <div>
                <SideBar />
            </div>
            <div className="flex flex-col">
                <Header title={title} />

                <div className=" flex flex-col max-w-[1099px] mh-[632.01px] mt-[103px] ml-[27px] mr-[80px] rounded-[31.529px] bg-[#FFFFFF] py-[50px] px-[27px]">
                    <div className="flex flex-row justify-between">
                        <div className="flex space-x-[27.92px] self-center">
                            <div className="bg-[#F4F7FE] w-[68.28px] flex items-center justify-center h-[68.28px]  rounded-full">
                                <img
                                    src="/Group8.png"
                                    alt="logo"
                                    width="42.79px"
                                    height="44px"
                                    className="content-center"
                                />
                            </div>
                            <div className="font-secondaryFont font-medium not-italic mt-[10px] text-[28.09px] leading-[37.83px] text-[#000000] ">
                                Zones & Subzones
                            </div>
                        </div>
                        <div
                            style={{ boxShadow: "0px 4px rgba(0, 0, 0, 0.25)" }}
                            className=" basic-1/4 flex flex-row  items-center w-[273.87px] h-[36.94px] bg-[#FFFFFF] rounded-[0.625rem] px-[20px] "
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
                                <input
                                    onChange={(e) => handleSearch(e)}
                                    type="text"
                                    placeholder="Search for zone or subzone"
                                    className="outline-none"
                                />
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex flex-row space-x-sm justify-end items-center mt-[5px] bg-[#FFFFFF]">
                        <div
                            style={{ boxShadow: "0px 4px rgba(0, 0, 0, 0.25)" }}
                            className={`${editpermission === "CREATE-CATEGORIES" || editpermission === "ALL" ? "cursor-pointer" : "  disabledclass"}
              flex items-center space-x-sm px-2 rounded disabled `}
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M8 8V14H6V8H0V6H6V0H8V6H14V8H8Z" fill="#2E3A59" />
                            </svg>

                            <div className=""
                                onClick={() => ViewZoneData.set(o => !o)}
                            >Add Zone</div>
                        </div>
                    </div> */}


                    <div className="pl-[80px]">
                        <table className="table-auto pt-[24px]  w-[100%]">
                            <thead className="font-secondaryFont 
                              text-[#000000] font-normal not-italic text-[12px]
                               leading-[20px] tracking-[-2%]   ">
                                <tr className="max-h-[52.84px] ">
                                    <th className="w-[30%] py-[13px] float-left"> Zone</th>
                                    <th className="w-[50%] py-[13px]">Zone Description</th>
                                    <th className="w-[20%] py-[13px] float-right pr-14  ">Subzone</th>
                                </tr>
                            </thead>
                            {filteredData?.map((item, i) => {
                                return <tbody className="font-secondaryFont 
                                      text-[#000000] font-normal not-italic text-[12px] ">
                                    <tr className="bg-[#ECF1F0] ">
                                        <th className=" w-[30%]  py-[13px] float-left cursor-pointer "
                                            onClick={(e) => Subzone(e, item._id)}>{item.zone_name}</th>


                                        <th className="w-[50%]  py-[13px]">{item.discription}</th>
                                        <th className=" w-[20%] py-[13px]  ">
                                            <div className=" float-right pr-5  space-x-xl">
                                                <div
                                                    // onClick={() => ViewSubZoneData.set(o => !o)}
                                                    onClick={(e) => ViewSubZoneFun(e, item)}
                                                    className={`${editpermission === "EDIT-CATEGORIES" || editpermission === "ALL" ? "cursor-pointer" : "disabledclass"}`}
                                                >
                                                    <svg width="24" height="24" viewBox="0 0 24 24"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M13 13V19H11V13H5V11H11V5H13V11H19V13H13Z" fill="black" />
                                                    </svg>

                                                </div>

                                            </div>
                                        </th>
                                    </tr>

                                    {activezoneshow && item._id === subzoneid ? <>
                                        <tr className="bg-[#ffffff]   " style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                            <td colSpan="1" className="pl-[20px] font-semibold py-5  "  >
                                                <span className="pb-2"
                                                    style={{ borderBottom: "2px solid black" }}>
                                                    Subzones
                                                </span>
                                            </td>
                                            <td colSpan="3" className="pl-[120px]  font-semibold py-5">
                                                <span className="pb-2"
                                                    style={{ borderBottom: "2px solid black" }}>
                                                    Subzone Description
                                                </span>

                                            </td>
                                        </tr>

                                        {subzonedata?.map((item, i) => {
                                            return <tr className="bg-[#ffffff]  " style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                                                <td colSpan="1" className="pl-[20px] py-5">
                                                    {item.subzone_name}
                                                </td>
                                                <td colSpan="3" className="pl-[120px] py-5">
                                                    {item.discription}
                                                </td>
                                            </tr>
                                        })}</> : null}

                                    <tr className="p-[15px]">
                                        <td className="p-[10px]" ></td>
                                    </tr>
                                    <Popup
                                        open={open}
                                        position="right center"
                                        model
                                    >
                                        <div className="p-7">
                                            <div className="flex pb-3">
                                                <div>

                                                </div>
                                                <div style={{ marginLeft: "90%" }}>
                                                    <span className="text-[red] text-[19px] cursor-pointer" onClick={(e) => CancelButton(e)} >
                                                        <b>X</b>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <h3>
                                                    Are You sure You Want to Delete
                                                </h3>
                                            </div>
                                            <div className=" w-[70px] text-center border-[1px] border-solid border-[#000000] rounded bg-[#09a061] mt-[30px]">
                                                <button
                                                    onClick={(e) => conformDelete(e)}
                                                    className="  h-[37px] font-mainFont text-[15px] font-normal not-italic leading-[18px]   text-[#ffffff] ">
                                                    Yes
                                                </button>
                                            </div>
                                        </div>

                                    </Popup>
                                </tbody>
                            })}
                        </table>
                    </div>
                </div>
            </div>

            <Popup
                open={viewzonedata}
                position="right center"
                model
                className="zone_pops"
            >
                <ZoneList />

            </Popup>
            <Popup
                open={viewsubzonedata}
                position="right center"
                model
                className="zone_pops"
            >
                <SubZoneList 
                
                zone_id={zone_id}
                
                />

            </Popup>
        </div>

    );
};

export default ViewZones;
