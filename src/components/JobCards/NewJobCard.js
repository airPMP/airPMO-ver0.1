import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import Header from "../layout/Header";
import SideBar from "../layout/SideBar";
import "reactjs-popup/dist/index.css";
import { useFormik } from "formik";
import ManpowerAndMachinery from "./ManpowerAndMachinery";
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
const NewJobCard = () => {

  const [title, setTitle] = useState(null); // the lifted state
  let urlTitle = useLocation();
  let naviagte = useNavigate();
  useEffect(() => {

    if (urlTitle.pathname === "/job_cards/new_job_card") {
      setTitle("Job Cards");
    }
  }, [urlTitle.pathname])

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
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
      // console.log(`Form data`, values);
    },
  });
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
            37.83px] border-none bg-[#ffffff] w-full focus:outline-none text-[#2E3A59] ">
                    <option>Activity Code</option>
                  </select>
                </div>
                <div className="relative w-[350px] border-b border-black ">
                  <select className=" font-secondaryFont font-medium not-italic text-[14px] leading-[
            37.83px] border-none bg-[#ffffff] w-full focus:outline-none text-[#2E3A59] ">
                    <option>Activity  Name</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-row space-x-20 pb-[30px]">
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
                    JC Creation
                    {/* <span className="text-red-700">*</span> */}
                  </label>
                  {
                    //   formik.errors.jcCreation && (
                    //   <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                    //     {formik.errors.jcCreation}{" "}
                    //   </div>
                    // )
                  }


                </div>

                <div className="flex flex-row relative justify-between space-x-2  w-[350px]">
                  <div className="w-[165px]">
                    <input
                      id="hseRemarks"
                      name="hseRemarks"
                      type="text"
                      value={formik.values.hseRemarks}
                      onChange={formik.handleChange}
                      className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="hseRemarks"
                      className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                    >
                      Zones
                      {/* <span className="text-red-700">*</span> */}
                    </label>
                    {
                      //   formik.errors.hseRemarks && (
                      //   <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                      //     {formik.errors.hseRemarks}{" "}
                      //   </div>
                      // )
                    }






                  </div>
                  <div className="relative w-[165px] border-b  ">
                    <input
                      id="hseRemarks"
                      name="hseRemarks"
                      type="text"
                      value={formik.values.hseRemarks}
                      onChange={formik.handleChange}
                      className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="hseRemarks"
                      className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                    >
                      Sub zones
                      {/* <span className="text-red-700">*</span> */}
                    </label>
                    {
                      //   formik.errors.hseRemarks && (
                      //   <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                      //     {formik.errors.hseRemarks}{" "}
                      //   </div>
                      // )
                    }
                  </div>
                </div>

              </div>


              <div style={{boxShadow:" 0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
                <ManpowerAndMachinery />
              </div>

              <div className="flex flex-col mb-10 ">
                <div className="relative max-w-[860px]">
                  <input
                    id="qcRemarks"
                    type="text"
                    name="qcRemarks"
                    value={formik.values.qcRemarks}
                    onChange={formik.handleChange}
                    className="peer h-10 w-full font-medium font-secondaryFont border-b border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="qcRemarks"
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                  >
                    QC Remarks
                    {/* <span className="text-red-700">*</span> */}
                  </label>
                  {
                    //   formik.errors.qcRemarks && (
                    //   <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                    //     {formik.errors.qcRemarks}{" "}
                    //   </div>
                    // )
                  }
                </div>
              </div>

              <div className="flex flex-col mb-10 ">
                <div className="relative max-w-[860px]">
                  <input
                    id="hseRemarks"
                    name="hseRemarks"
                    type="text"
                    value={formik.values.hseRemarks}
                    onChange={formik.handleChange}
                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                    placeholder="john@doe.com"
                  />
                  <label
                    htmlFor="hseRemarks"
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                  >
                    HSE Remarks
                    {/* <span className="text-red-700">*</span> */}
                  </label>
                  {
                    //   formik.errors.hseRemarks && (
                    //   <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                    //     {formik.errors.hseRemarks}{" "}
                    //   </div>
                    // )
                  }
                </div>
              </div>




              <div className="flex flex-col mb-10 ">
                <div className="relative max-w-[860px]">
                  <input
                    id="managerComments"
                    type="text"
                    name="managerComments"
                    value={formik.values.managerComments}
                    onChange={formik.handleChange}
                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="managerComments"
                    className="absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                  >
                    Manager Comments
                    {/* <span className="text-red-700">*</span> */}
                  </label>
                  {
                    //   formik.errors.managerComments && (
                    //   <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                    //     {formik.errors.managerComments}{" "}
                    //   </div>
                    // )
                  }
                </div>
              </div>







              <div className="flex flex-col ">
                <div className="relative max-w-[860px]">
                  <input
                    id="Description"
                    name="Description"
                    type="text"
                    value={formik.values.Description}
                    onChange={formik.handleChange}
                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                    placeholder="john@doe.com"
                  />
                  <label
                    htmlFor="Description"
                    className="absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                  >
                    Description
                    {/* <span className="text-red-700">*</span> */}
                  </label>
                  {
                    //   formik.errors.Description && (
                    //   <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                    //     {formik.errors.Description}{" "}
                    //   </div>
                    // )
                  }
                </div>
              </div>



              <div className="flex flex-row justify-between shadow-[buttonshadow]   mt-[42px]">
                <div className="mr-[45px] shadow-[buttonshadow] ">
                  <button onClick={() => setOpen(o => !o)} className="w-[200px] btnshadow  h-[25px] rounded text-sm font-secondaryFont text-[14px]  font-medium not-italic   bg-[#FFFFFF] text-[#2E3A59] ">
                    Add Manpower & Machinery
                  </button>
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
                    <button onClick={() => { naviagte("/job_cards") }} className="w-[100px] btnshadow  h-[25px] rounded text-sm font-secondaryFont text-[14px] text-center font-medium not-italic items-center  bg-[#F42424] text-[#000000] ">
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
