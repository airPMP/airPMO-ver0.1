
import { useFormik } from "formik";
import React, { useState} from 'react'
import { ViewZoneData } from '../../SimplerR/auth'


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
const ZoneList = ({ closeModal }) => {


  const viewzonedata = ViewZoneData.use()

  const formik = useFormik({
    initialValues: {
      client: "",
      startDate: "",
      endDate: "",
      zonename: "",
      subzonename: "",
      subzonedescription: "",
      zonedescription: "",
      category: "",
      clientName: "",
      projectName: "",
      uploadLogoFile: "",
      jobtitle: "",
      addNewField2: "",
      description: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      // console.log(`Form data`, values);
    },
  });
  return (
    <div className="flex flex-row  overflow-hidden">

      <div className="flex flex-col">


        <div className=" flex flex-col      w-[100%] max-h-[40%] bg-[#FFFFFF] pl-[26px] 
        pr-[46.02px]    rounded-[31.53px] ">
          {/* <div className="flex flex-row space-x-[27.92px] pt-[31.94px] items-center ">
            <div className="bg-[#F4F7FE] w-[58.96px] flex items-center justify-center h-[58.96px]   rounded-full">
              <img
                src="/Group8.png"
                alt="logo"
                width="28.58px"
                height="29.39px"
                className="content-center"
              />
            </div>
            <div className=" max-w-[100%] max-h-[59.44px]  font-secondaryFont font-medium not-italic text-[18.76px] leading-[37.83px] tracking-[-2%] ">
            Add Zones &  Description
            </div>
          </div> */}
          <div className="pl-[40px] pr-[26px] pt-[33.49px]">
            <form onSubmit={formik.handleSubmit}>


              <div className=" flex-row   pb-[10px] w-[100%]">
                <div className="relative w-[350px] mb-10">
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
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-[9.35px] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-[9.35px]"
                  >
                    Zone  
                  </label>
                  {formik.errors.zonename && (
                    <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                      {formik.errors.zonename}{" "}
                    </div>
                  )}
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
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-[9.35px] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-[9.35px]"
                  >
                    Description
                  </label>
                  {formik.errors.zonedescription && (
                    <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                      {formik.errors.zonedescription}{" "}
                    </div>
                  )}
                </div>
              </div>
              {/* <div className="flex flex-row space-x-20 pb-[10px]">
                <div className="relative w-[280px]">
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
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-[9.35px] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-[9.35px]"
                  >
                   Sub Zone
                  </label>
                  {formik.errors.zonename && (
                    <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                      {formik.errors.zonename}{" "}
                    </div>
                  )}
                </div>
                <div className=" relative w-[280px]">
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
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-[9.35px] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-[9.35px]"
                  >
                    Description
                  </label>
                  {formik.errors.zonedescription && (
                    <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                      {formik.errors.zonedescription}{" "}
                    </div>
                  )}
                </div>
              </div> */}
              
              <div className="flex flex-row justify-end shadow-[buttonshadow] mr-[-30px] pb-[45.01px] content-center mt-[50px]">

                <div className="flex flex-row float-right">
                  <div className="mr-[25px] shadow-[buttonshadow] " 
                  onClick={() => ViewZoneData.set(o => !o)}>
                    <button onClick={closeModal} className="w-[100px] btnshadow 
                     h-[25px] rounded   font-secondaryFont text-[12px] text-center 
                     font-medium not-italic items-center  bg-[#ffffff] text-[#000000] ">
                     Close
                    </button>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-[110px] h-[25px] rounded btnshadow     font-secondaryFont text-[12px] font-medium not-italic  bg-[#0FCC7C] text-[#000000] "
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ZoneList
