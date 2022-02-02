import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import SideBar from "../layout/SideBar";
import Header from "../layout/Header";
import ZoneList from "./ZoneList";
import SubZoneList from "./SubZoneList";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { reactLocalStorage } from "reactjs-localstorage";

const validate = (values) => {

  const errors = {};
  if (!values.category) {
    errors.category = "Category Required";
  }
  if (!values.clientName) {
    errors.clientName = "Client Name Required";
  }
  if (!values.uploadLogoFile) {
    errors.uploadLogoFile = "uploadLogoFile Required";
  }

  if (!values.projectName) {
    errors.projectName = "projectName Required";
  }
  if (!values.addNewField) {
    errors.addNewField = "Add New Field Required";
  }
  if (!values.addNewField2) {
    errors.addNewField2 = "Company Name Required";
  }
  if (!values.description) {
    errors.description = "description Required";
  }
  // console.log(errors);
  return errors;
};
const EditNewProject = () => {
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState(false);
  const closeModal = () => setOpen(false);
  const closeModalSub = () => setOpenSub(false);
  const [title, setTitle] = useState(null); // the lifted state 
  let urlTitle = useLocation();
  let naviagte = useNavigate();

  useEffect(() => {
    if (urlTitle.pathname === "/master/Projects/Edit_Project") {
      setTitle("Master");
    }

    
  }, [urlTitle.pathname ]);

  const formik = useFormik({
    initialValues: {
      client: "", 
      min_hours: "",
      max_hours: "",
      startDate: "",
      endDate: "",
      zonename: "",
      subzonename: "",
      subzonedescription: "",
      zonedescription: "",
      category: "",
      clientName: "",
      projectName: "",
      category: "",
      sub_category: "",
      uploadLogoFile: "",
      jobtitle: "",
      addNewField2: "",
      description: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      // console.log(`Form data`, values);
      axios.post(`${process.env.REACT_APP_BASE_URL}/api/client/`, values)
        .then((response) => {
          console.log(response)
          if (response.status === 201) {
            // addToast("form submitted Sucessfully", {
            //   appearance: "success",
            //   autoDismiss: true,
            // })
            // navigate('/')
          }
          resetForm()
        })
        .catch((error) => {
          console.log(error)
          // addToast("form submitted fail", {
          //   appearance: "error",
          //   autoDismiss: true,
          // })
        })

    },
  });
 
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
            <div className=" max-w-[208px] max-h-[89px]  font-secondaryFont font-medium not-italic text-[28.09px] leading-[37.83px] tracking-[-2%] ">
              Edit (Project Name)
            </div>
          </div>
          <div className="pl-[120px] pr-[26px] pt-[33.49px]">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-row space-x-20 pb-[16px]">
                <div className="relative w-[350px] border-b border-black ">
                  <select className=" font-secondaryFont font-medium not-italic text-[14px] leading-[
                    37.83px] border-none bg-[#ffffff] w-full focus:outline-none text-[#2E3A59] ">
                      <option>Client</option>
                    
                  </select>
                </div>
                <div className="relative w-[350px]">
                  <input
                    id="projectName"
                    name="projectName"
                    type="text"
                    value={formik.values.projectName}
                    onChange={formik.handleChange}
                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#2E3A59] text-[#2E3A59] placeholder-transparent focus:outline-none focus:border-[#2E3A59]"
                    placeholder="john@doe.com"
                  />
                  <label
                    htmlFor="projectName"
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-sm"
                  >
                    Project Name
                  </label>
                  {
                    //   formik.errors.projectName && (
                    //   <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                    //     {formik.errors.projectName}{" "}
                    //   </div>
                    // )
                  }
                </div>
              </div>
              <div className="flex flex-row space-x-20 pb-[16px]">
                <div className="flex flex-row relative justify-between space-x-2  w-[350px]">
                  <div className="relative w-[165px]">
                    <input
                      id="startDate"
                      name="startDate"
                      type="text"
                      value={formik.values.projectName}
                      onChange={formik.handleChange}
                      className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="startDate"
                      className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                    >
                      Start Date
                    </label>
                    {
                      //   formik.errors.startDate && (
                      //   <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                      //     {formik.errors.startDate}{" "}
                      //   </div>
                      // )
                    }
                  </div>
                  <div className="relative w-[165px]">
                    <input
                      id="endDate"
                      name="endDate"
                      type="text"
                      value={formik.values.projectName}
                      onChange={formik.handleChange}
                      className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#2E3A59] text-[#2E3A59] placeholder-transparent focus:outline-none focus:border-[#2E3A59]"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="endDate"
                      className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-sm"
                    >
                      End Date
                    </label>
                    {
                      //   formik.errors.endDate && (
                      //   <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                      //     {formik.errors.endDate}{" "}
                      //   </div>
                      // )
                    }
                  </div>
                </div>
                <div className=" relative w-[350px]">
                  <input
                    id="description"
                    type="text"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    className="peer h-10 w-full font-medium font-secondaryFont border-b border-[#2E3A59] text-[#2E3A59] placeholder-transparent focus:outline-none focus:border-[#2E3A59]"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="description"
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-sm"
                  >
                    Description
                  </label>
                  {
                    //   formik.errors.description && (
                    //   <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                    //     {formik.errors.description}{" "}
                    //   </div>
                    // )
                  }
                </div>
              </div>
              <div className="flex flex-row space-x-20 pb-[16px]">
                <div className="relative w-[350px]">
                  <input
                    id="zonename"
                    name="zonename"
                    type="text"
                    value={formik.values.zonename}
                    onChange={formik.handleChange}
                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#2E3A59] text-[#2E3A59] placeholder-transparent focus:outline-none focus:border-[#2E3A59]"
                    placeholder="john@doe.com"
                  />
                  <label
                    htmlFor="zonename"
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-sm"
                  >
                    Zone Name
                  </label>
                  {
                    //   formik.errors.zonename && (
                    //   <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                    //     {formik.errors.zonename}{" "}
                    //   </div>
                    // )
                  }
                </div>
                <div className=" relative w-[350px]">
                  <input
                    id="zonedescription"
                    type="text"
                    name="zonedescription"
                    value={formik.values.zonedescription}
                    onChange={formik.handleChange}
                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#2E3A59] text-[#2E3A59] placeholder-transparent focus:outline-none focus:border-[#2E3A59]"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="zonedescription"
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-sm"
                  >
                    Zone Description
                  </label>
                  {
                    //   formik.errors.zonedescription && (
                    //   <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                    //     {formik.errors.zonedescription}{" "}
                    //   </div>
                    // )
                  }
                </div>
              </div>
              <div className="flex flex-row space-x-20 pb-[16px]">
                <div className="relative w-[350px]">
                  <input
                    id="subzonename"
                    name="subzonename"
                    type="text"
                    value={formik.values.subzonename}
                    onChange={formik.handleChange}
                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#2E3A59] text-[#2E3A59] placeholder-transparent focus:outline-none focus:border-[#2E3A59]"
                    placeholder="john@doe.com"
                  />
                  <label
                    htmlFor="subzonename"
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-sm"
                  >
                    Subzone Name
                  </label>
                  {
                    //   formik.errors.addNewField && (
                    //   <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                    //     {formik.errors.addNewField}{" "}
                    //   </div>
                    // )
                  }
                </div>
                <div className=" relative w-[350px]">
                  <input
                    id="subzonedescription"
                    type="text"
                    name="subzonedescription"
                    value={formik.values.subzonedescription}
                    onChange={formik.handleChange}
                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#2E3A59] text-[#2E3A59] placeholder-transparent focus:outline-none focus:border-[#2E3A59]"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="subzonedescription"
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-sm"
                  >
                    Subzone Description
                  </label>
                  {
                    //   formik.errors.subzonedescription && (
                    //   <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                    //     {formik.errors.subzonedescription}{" "}
                    //   </div>
                    // )
                  }
                </div>
              </div>
              <div className="flex flex-row justify-between shadow-[buttonshadow] mr-[-30px] pb-[45.01px] content-center mt-[42px]">
                <div className="flex flex-row">
                  <div className="mr-[45px] shadow-[buttonshadow] ">
                    <button className="w-[100px] btnshadow  h-[25px] rounded text-sm font-secondaryFont text-[14px] text-center font-medium not-italic items-center  bg-[#FFFFFF] text-[#2E3A59] ">
                      Add Delay
                    </button>
                  </div>
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
                  <div className="mr-[45px] shadow-[buttonshadow] ">
                    <button onClick={() => setOpen(o => !o)} className="w-[100px] btnshadow  h-[25px] rounded text-sm font-secondaryFont text-[14px] text-center font-medium not-italic items-center  bg-[#FFFFFF] text-[#2E3A59] ">
                      View Zones
                    </button>
                  </div>
                  <div className="mr-[45px] shadow-[buttonshadow] ">
                    <button onClick={() => setOpenSub(o => !o)} className="w-[100px] btnshadow  h-[25px] rounded text-sm font-secondaryFont text-[14px] text-center font-medium not-italic items-center  bg-[#FFFFFF] text-[#2E3A59] ">
                      View Subzones
                    </button>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="mr-[45px] shadow-[buttonshadow] ">
                    <button onClick={() => { naviagte("/master/clients") }} className="w-[100px] btnshadow  h-[25px] rounded text-sm font-secondaryFont text-[14px] text-center font-medium not-italic items-center  bg-[#F42424] text-[#000000] ">
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

export default EditNewProject;
