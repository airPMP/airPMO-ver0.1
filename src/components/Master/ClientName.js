import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import SideBar from "../layout/SideBar";
import Header from "../layout/Header";

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
  if (!values.location) {
    errors.location = "Location Required";
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
  return errors;
};

const ClientName = () => {
  const [title, setTitle] = useState(null);
  let urlTitle = useLocation();
  let naviagte = useNavigate();

  useEffect(() => {
    if (urlTitle.pathname === "/master/clients/new_client/client_name") {
      setTitle("Master");
    }
  }, [urlTitle.pathname]);

  const formik = useFormik({
    initialValues: {
      category: "",
      clientName: "",
      location: "",
      uploadLogoFile: "",
      jobtitle: "",
      addNewField2: "",
      description: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      
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
              Client Name
            </div>
          </div>
          <div className="flex flex-col mt-[70.49px]  pl-[120px]">
            <div className="relative w-[350px] border-b border-black pb-[10px]">
              <select
                className=" font-secondaryFont font-medium not-italic text-[14px] leading-[
            37.83px] border-none bg-[#ffffff] w-full focus:outline-none "
              >
                <option>Client Name</option>
                <option>Demo Name</option>
              </select>
            </div>
            <div className="relative w-[350px] mt-[40px] ">
              <input
                id="location"
                name="location"
                type="text"
                value={formik.values.location}
                onChange={formik.handleChange}
                className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                placeholder="john@doe.com"
              />
              <label
                htmlFor="location"
                className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
              >
                Location
              </label>
              {
              //   formik.errors.location && (
              //   <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
              //     {formik.errors.location}{" "}
              //   </div>
              // )
            }
            </div>
            <div className="relative w-[350px] mt-[40px]">
              <input
                id="addNewField"
                name="addNewField"
                type="text"
                value={formik.values.addNewField}
                onChange={formik.handleChange}
                className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                placeholder="john@doe.com"
              />
              <label
                htmlFor="addNewField"
                className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
              >
                Add new field
              </label>
              {
              //   formik.errors.addNewField && (
              //   <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
              //     {formik.errors.addNewField}{" "}
              //   </div>
              // )
            }
            </div>
            <div className="relative max-w-[860px] mt-[40px]">
              <input
                id="description"
                name="description"
                type="text"
                value={formik.values.description}
                onChange={formik.handleChange}
                className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                placeholder="john@doe.com"
              />
              <label
                htmlFor="description"
                className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
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
          <div className="flex flex-row justify-end shadow-[buttonshadow]  pb-[45.01px] content-center mt-[42px]">
            <div>
              <button
                onClick={() => {
                  naviagte("/master/clients/new_client");
                }}
                className="w-[110px] h-[25px] rounded btnshadow   text-sm font-secondaryFont text-[14px] font-medium not-italic  bg-[#FFFFFF] text-[#000000] "
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientName;
