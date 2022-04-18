import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
// import { useToasts } from "react-toast-notifications";
import Popup from "reactjs-popup";
import Header from "../layout/Header";
import SideBar from "../layout/SideBar";
import "reactjs-popup/dist/index.css";
import { useFormik } from "formik";
import { useToasts } from "react-toast-notifications";
import ManpowerAndMachinery from "./ManpowerAndMachinery";
import { ProductivitySheetData, ProductiveSheetId, QuantityTOAchivedData, ProjectObjectData } from "../../SimplerR/auth";

const validate = (values) => {
  const errors = {};

  // if (!values.qc_remark) {
  //   errors.qc_remark = "qc_remark Required";
  // }  
  // if (!values.hse_remark) {
  //   errors.hse_remark = "HSE Remarks Required";
  // }
  // if (!values.manager_comments) {
  //   errors.manager_comments = "Manager Comments Required";
  // }
  // if (!values.discription) {
  //   errors.discription = "discription Required";
  // } 
  return errors;
};
const NewJobCard = () => {

  const [title, setTitle] = useState(null); // the lifted state
  const [activityname, setActivityName] = useState(null)
  const [activitycode, setActivityCode] = useState(null)
  const [zonedata, setZoneData] = useState(null)
  const [subzonedata, setSubZoneData] = useState(null)
  const [zonename, setZoneName] = useState(null)
  const [subzonename, setSubZoneName] = useState(null)
  const [productivitysheetobject, seProductivitySheetObject] = useState([])
  const [productivitysheetarray, seProductivitySheetArray] = useState([])
  const [currentdate, setCurrentDate] = useState(null)
  const [projectidperma, setProjectIdPerma] = useState(null)
  const [allCalcultedMachineryData, setAllCalcultedMachineryData] = useState([null])
  const [dataData, setdataData] = useState(currentdate)

  const [projectobjectdata, setProjectObjectData] = useState(null)

  let useperma = useParams()
  let urlTitle = useLocation();
  let naviagte = useNavigate();
  const { addToast } = useToasts();

  const productivitysheetdata = ProductivitySheetData.use()
  const quantitytoachivedData = QuantityTOAchivedData.use()




  useEffect(() => {

    if (urlTitle.pathname === "/daily_task/new_daily_task") {
      setTitle("Daily Task");
    }


  }, [urlTitle.pathname])



  useEffect(() => {

    const token = reactLocalStorage.get("access_token", false);
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/project/${useperma.id}/zone`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

      .then((response) => {
        console.log(response?.data)
        setZoneData(response?.data)
        if (response.status === 201) {

        }
      })
      .catch((error) => {
        console.log(error)

      })

    axios.get(`${process.env.REACT_APP_BASE_URL}/api/projects/${useperma.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

      .then((response) => {
        // console.log(response?.data)
        setProjectObjectData(response?.data)


      })
      .catch((error) => {
        console.log(error)

      })




    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    setCurrentDate(date)

    setProjectIdPerma(useperma.id)
  }, [])

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);


  const formik = useFormik({
    initialValues: {
      project_id: "",
      project_name: "",
      activity_code: "",
      activity_name: "",
      jc_creation: "",
      zone: "",
      sub_zone: "",
      quantity_to_be_achieved: "",
      manpower_and_machinary: [],
      qc_remark: "",
      hse_remark: "",
      manager_comments: "",
      discription: "",
      organization_id: "",
      assign_user_id: "",
      assign_to: "",
      permissions: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {

      const organization_Id = reactLocalStorage.get("organization_id", false);
      const permisions_data = reactLocalStorage.get("permisions", false);

      if (organization_Id !== "undefined" && organization_Id !== null) {
        values.organization_id = organization_Id
        values.permissions = permisions_data
      }


      values.project_id = projectidperma
      values.project_name = projectobjectdata.project_name
      values.activity_code = activitycode
      values.activity_name = activityname
      values.jc_creation = dataData
      values.zone = zonename
      values.sub_zone = subzonename
      values.quantity_to_be_achieved = quantitytoachivedData
      values.manpower_and_machinary = [productivitysheetobject]




      const token = reactLocalStorage.get("access_token", false);

      axios.post(`${process.env.REACT_APP_BASE_URL}/api/create_job_card`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((response) => {
          console.log(response)
          if (response.status === 201) {
            addToast("Issue JC Sucessfully", {
              appearance: "success",
              autoDismiss: true,
            })

            naviagte("/daily_task")

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

  const ActivityCode = (e) => {

    setActivityCode(e.target.value)

    let productArray = []
    productivitysheetdata?.map((items, id) => {
      if (e.target.value === items["Activity code"]) {

        productArray.push(items)
        seProductivitySheetObject(items)
        setActivityName(items["Activity name"])
      }

    })
    seProductivitySheetArray(productArray)
  }

  const ZoneNameFun = (e) => {
    const zoneData = e.target.value
    const ZoneDataSplit = zoneData.split(',a,')
    setZoneName(ZoneDataSplit[1])

    const token = reactLocalStorage.get("access_token", false);
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/zone/${ZoneDataSplit[0]}/subzone`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

      .then((response) => {
        console.log(response?.data)
        setSubZoneData(response?.data)
        if (response.status === 201) {

        }
      })
      .catch((error) => {
        console.log(error)

      })

  }



  useEffect(() => {
    const token = reactLocalStorage.get("access_token", false);
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/upload_productive_file/${useperma.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((response) => {
        console.log(response?.data?.productivitysheet)
        ProductivitySheetData.set(response?.data?.productivitysheet)
      })
      .catch((error) => {
        console.log(error)
        addToast(error.response.data.message, {
          appearance: "error",
          autoDismiss: true,
        })

      })

  }, [])

console.log(productivitysheetobject)

  useEffect(() => {

    const token = reactLocalStorage.get("access_token", false);
    if (activitycode) {
      axios.post(`${process.env.REACT_APP_BASE_URL}/api/job_card_create_data`, {
        activity_code: activitycode,
        client_name: projectobjectdata?.client_name,
        project_name: projectobjectdata?.project_name,
        project_id: projectobjectdata?._id,
        min_hour: projectobjectdata?.min_hours,
        productivity: [
          productivitysheetobject
        ],
        gang_productivity:""

      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((response) => {
          console.log(response)
          if (response.status === 201) {
            GetCalculatedData()
            // addToast("Issue JC Sucessfully", {
            //   appearance: "success",
            //   autoDismiss: true,
            // })



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

  }, [activitycode])

  console.log(productivitysheetobject)

  const GetCalculatedData = (e) => {

    const token = reactLocalStorage.get("access_token", false);
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/get_create_job_card_cal/${activitycode}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

      .then((response) => {
        console.log(response)
        setAllCalcultedMachineryData(response?.data)

        if (response.status === 201) {

        }
      })
      .catch((error) => {
        console.log(error)

      })

  }

  useEffect(()=>{
    if (quantitytoachivedData){
      PatchCalculatedData()
      GetCalculatedData()
    }

  },[quantitytoachivedData])

 

  const PatchCalculatedData = (e) => {

    console.log(quantitytoachivedData)
    const token = reactLocalStorage.get("access_token", false);
    axios.patch(`${process.env.REACT_APP_BASE_URL}/api/update_create_job_card_cal/${useperma.id}/${activitycode}`,{
      activity_code: activitycode,
      client_name: projectobjectdata?.client_name,
      project_name: projectobjectdata?.project_name,
      project_id: projectobjectdata?._id,
      min_hour: projectobjectdata?.min_hours,
      productivity: [
        productivitysheetobject
      ],
      gang_productivity:quantitytoachivedData,
      quantity_to_be_achived:""
    } ,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

      .then((response) => {
        console.log(response)  
        if (response.status === 201) {

        }
      })
      .catch((error) => {
        console.log(error)

      })

  }


  return (
    <div className="flex flex-row justify-start overflow-hidden">
      <div>
        <SideBar />
      </div>
      <div className="flex flex-col">
        <Header title={title} />
        <div className="max-w-[1099px]  mt-[103px] overflow-hidden bg-[#FFFFFF] justify-center mr-[50px] ml-[20px] my-[10px]   pb-[20px] rounded-[31.529px]">
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
            <div className=" max-w-[208px] max-h-[89px]  font-secondaryFont font-medium not-italic text-[28.09px] leading-[37.83px] tracking-[-2%] ">
              Create new Job Card
            </div>
          </div>
          <div className="pl-[140px] pr-[96px] pt-[33.49px]">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-row space-x-20 pb-[30px] ">
                <div className="relative w-[350px] border-b border-black   ">

                  <select className=" font-secondaryFont font-medium not-italic text-[14px] leading-[
                     37.83px] border-none bg-[#ffffff] w-full focus:outline-none text-[#2E3A59] cursor-pointer "
                    onChange={(e) => ActivityCode(e)}
                  >

                    <option selected="true" disabled="disabled" >Activity Code</option>

                    {productivitysheetdata?.map((items, id) => {

                      return <option className="cursor-pointer" >
                        {items["Activity code"]}</option>
                    })}
                  </select>
                </div>



                <div className="relative w-[350px]  ">
                  <input
                    id="jcCreation"
                    name="jcCreation"
                    type="text"
                    value={activityname}
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
              </div>
              <div className="flex flex-row space-x-20 pb-[30px]">
                <div className=" relative w-[350px]">

                  <input
                    id="jcCreation"
                    name="jcCreation"
                    type="date"
                    value={dataData}
                    // onChange={formik.handleChange}
                    onChange={(e) => setdataData(e.target.value)}
                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                    placeholder="john@doe.com"
                  />

                </div>

                <div className="flex flex-row relative justify-between space-x-2  w-[350px]">
                  <div className="w-[165px] border-b border-black">

                    <select className=" font-secondaryFont font-medium not-italic text-[14px] leading-[
                      37.83px] border-none bg-[#ffffff] w-full focus:outline-none text-[#2E3A59] cursor-pointer"
                      onChange={(e) => ZoneNameFun(e)}
                    // placeholder="ikhdm"
                    >

                      <option selected="true" disabled="disabled" >Select Zone</option>

                      {zonedata?.map((items, id) => {

                        return <option value={[items._id, "a", items.zone_name]}  >
                          {items.zone_name}
                        </option>
                      })}
                    </select>

                  </div>
                  <div className="relative w-[165px] border-b  border-black ">


                    <select className=" font-secondaryFont font-medium not-italic text-[14px] leading-[
            37.83px] border-none bg-[#ffffff] w-full focus:outline-none text-[#2E3A59] cursor-pointer"
                      onChange={(e) => setSubZoneName(e.target.value)}

                    >

                      <option selected="true" disabled="disabled">Select Subzone </option>

                      {subzonedata?.map((items, id) => {

                        return <option value={items.subzone_name} >
                          {items.subzone_name}
                        </option>
                      })}
                    </select>
                  </div>
                </div>

              </div>


              <div style={{ boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
                <ManpowerAndMachinery
                  productivitysheetobject={productivitysheetobject}
                  productivitysheetarray={productivitysheetarray} 
                  allCalcultedMachineryData={allCalcultedMachineryData}
                  />
              </div>

              <div className="flex flex-col mb-10 ">
                <div className="relative max-w-[860px]">
                  <input
                    id="qc_remark"
                    type="text"
                    name="qc_remark"
                    value={formik.values.qc_remark}
                    onChange={formik.handleChange}
                    className="peer h-10 w-full font-medium font-secondaryFont border-b border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="qc_remark"
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                  >

                    QC Remarks
                    {/* <span className="text-red-700">*</span> */}
                  </label>
                  {
                    //   formik.errors.qc_remark && (
                    //   <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                    //     {formik.errors.qc_remark}{" "}
                    //   </div>
                    // )
                  }
                </div>
              </div>

              <div className="flex flex-col mb-10 ">
                <div className="relative max-w-[860px]">
                  <input
                    id="hse_remark"
                    name="hse_remark"
                    type="text"
                    value={formik.values.hse_remark}
                    onChange={formik.handleChange}
                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                    placeholder="john@doe.com"
                  />
                  <label
                    htmlFor="hse_remark"
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                  >
                    HSE Remarks
                    {/* <span className="text-red-700">*</span> */}
                  </label>
                  {
                    //   formik.errors.hse_remark && (
                    //   <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                    //     {formik.errors.hse_remark}{" "}
                    //   </div>
                    // )
                  }
                </div>
              </div>




              <div className="flex flex-col mb-10 ">
                <div className="relative max-w-[860px]">
                  <input
                    id="manager_comments"
                    type="text"
                    name="manager_comments"
                    value={formik.values.manager_comments}
                    onChange={formik.handleChange}
                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="manager_comments"
                    className="absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                  >
                    Manager Comments
                    {/* <span className="text-red-700">*</span> */}
                  </label>
                  {
                    //   formik.errors.manager_comments && (
                    //   <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                    //     {formik.errors.manager_comments}{" "}
                    //   </div>
                    // )
                  }
                </div>
              </div>
              <div className="flex flex-col ">
                <div className="relative max-w-[860px]">
                  <input
                    id="discription"
                    name="discription"
                    type="text"
                    value={formik.values.discription}
                    onChange={formik.handleChange}
                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                    placeholder="john@doe.com"
                  />
                  <label
                    htmlFor="discription"
                    className="absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                  >
                    discription
                    {/* <span className="text-red-700">*</span> */}
                  </label>
                  {
                    //   formik.errors.discription && (
                    //   <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                    //     {formik.errors.discription}{" "}
                    //   </div>
                    // )
                  }
                </div>
              </div>



              <div className="flex flex-row justify-between shadow-[buttonshadow]   mt-[42px]">
                <div className="mr-[45px] shadow-[buttonshadow] ">
                  {/* <button onClick={() => setOpen(o => !o)} className="w-[200px] btnshadow  h-[25px] rounded text-sm font-secondaryFont text-[14px]  font-medium not-italic   bg-[#FFFFFF] text-[#2E3A59] ">
                    Add Manpower & Machinery
                  </button> */}
                  <Popup
                    open={open}
                    modal
                    position="right center"
                  >
                    {/* <ManpowerAndMachinery closeModal={closeModal} /> */}
                  </Popup>
                </div>
                <div className="flex flex-row mr-[-50px]">
                  <div className="mr-[45px] shadow-[buttonshadow] ">
                    <button onClick={() => { naviagte("/daily_task") }} className="w-[100px] btnshadow  h-[25px] rounded text-sm font-secondaryFont text-[14px] text-center font-medium not-italic items-center  bg-[#F42424] text-[#000000] ">
                      Cancel
                    </button>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-[110px] h-[25px] rounded btnshadow   text-sm font-secondaryFont text-[14px] font-medium not-italic  bg-[#0FCC7C] text-[#000000] "
                    >
                      Issue JC
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

export default NewJobCard;
