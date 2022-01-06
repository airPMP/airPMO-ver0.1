import React, {useState} from "react";
import Popup from "reactjs-popup";
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
    <div className="max-w-[1099px] max-h-[632.01px]  overflow-hidden bg-[#FFFFFF] justify-center mr-[50px] ml-[20px] my-[10px] mt-[20px]  pb-[20px] rounded-[31.529px]">
      <div className="flex flex-row justify-between content-center items-center px-[50px] ">
        <div className="bg-[#F4F7FE] w-[288.28px] flex items-center h-[68.28px] mt-[31.93px]  rounded-full">
          <img
            src="/Group 8.png"
            alt="logo"
            width="42.79px"
            height="44px"
            className="content-center"
          />
         
        </div>
        <div className=" font-secondaryFont ml-[30px]  mt-[11.51px] text-[#000000]  font-medium not-italic text-[28.09px] tracking-[-0.02em]">
        Create New Job Card
      </div>
      </div>
      <div className="pl-[120px] pr-[96px] pt-[33.49px]">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-row space-x-40 pb-[16px]">
            <div className="  relative w-[350px]">
              <svg
                className=" absolute  right-0 bottom-4 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm "
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.00023 7.71309L13.0102 1.70309L11.5972 0.288086L7.00023 4.88809L2.40423 0.288086L0.990234 1.70209L7.00023 7.71309Z"
                  fill="#2E3A59"
                />
              </svg>
              <input
                id="activityCode"
                name="activityCode"
                type="text"
                value={formik.values.activityCode}
                onChange={formik.handleChange}
                className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                placeholder="john@doe.com"
              />

              <label
                htmlFor="activityCode"
                className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
              >
                Activity Code
                {/* <span className="text-red-700">*</span> */}
              </label>
              {formik.errors.activityCode && (
                <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                  {formik.errors.activityCode}{" "}
                </div>
              )}
            </div>
            <div className="relative w-[350px]">
              <input
                id="activityName"
                name="activityName"
                type="text"
                value={formik.values.activityName}
                onChange={formik.handleChange}
                className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                placeholder="john@doe.com"
              />
              <label
                htmlFor="activityName"
                className=" absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
              >
                Activity Name
                {/* <span className="text-red-700">*</span> */}
              </label>
              {formik.errors.activityName && (
                <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                  {formik.errors.activityName}{" "}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row space-x-40 pb-[16px]">
            <div className="flex flex-row relative justify-between space-x-2  w-[350px]">
              <div className="w-[165px]">
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
                {formik.errors.jcCreation && (
                  <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                    {formik.errors.jcCreation}{" "}
                  </div>
                )}
              </div>
              <div className="w-[165px]">
                <svg
                  className=" absolute  right-0 bottom-4 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm "
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.00023 7.71309L13.0102 1.70309L11.5972 0.288086L7.00023 4.88809L2.40423 0.288086L0.990234 1.70209L7.00023 7.71309Z"
                    fill="#2E3A59"
                  />
                </svg>
                <input
                  id="zone"
                  name="zone"
                  type="text"
                  value={formik.values.zone}
                  onChange={formik.handleChange}
                  className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                  placeholder="john@doe.com"
                />

                <label
                  htmlFor="zone"
                  className="  absolute left-0 ml-[190px] -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                >
                  Zone
                  {/* <span className="text-red-700">*</span> */}
                </label>
                {formik.errors.zone && (
                  <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                    {formik.errors.zone}{" "}
                  </div>
                )}
              </div>
            </div>
            <div className=" relative w-[350px]">
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
              {formik.errors.qcRemarks && (
                <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                  {formik.errors.qcRemarks}{" "}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row space-x-40 pb-[16px]">
            <div className="relative w-[350px]">
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
              {formik.errors.hseRemarks && (
                <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                  {formik.errors.hseRemarks}{" "}
                </div>
              )}
            </div>
            <div className=" relative w-[350px]">
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
              {formik.errors.managerComments && (
                <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                  {formik.errors.managerComments}{" "}
                </div>
              )}
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
              {formik.errors.Description && (
                <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                  {formik.errors.Description}{" "}
                </div>
              )}
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
                <ManpowerAndMachinery closeModal={closeModal} />
              </Popup>
            </div>
            <div className="flex flex-row mr-[-50px]">
              <div className="mr-[45px] shadow-[buttonshadow] ">
                <button className="w-[100px] btnshadow  h-[25px] rounded text-sm font-secondaryFont text-[14px] text-center font-medium not-italic items-center  bg-[#F42424] text-[#000000] ">
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
  );
};

export default NewJobCard;
