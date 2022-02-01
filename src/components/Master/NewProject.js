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
  // if (!values.category) {
  //   errors.category = "Category Required";
  // }
  if (!values.client_name) {
    errors.client_name = "Client Name Required";
  }
  // if (!values.uploadLogoFile) {
  //   errors.uploadLogoFile = "uploadLogoFile Required";
  // }

  // if (!values.project_name) {
  //   errors.project_name = "project_name Required";
  // }
  // if (!values.addNewField) {
  //   errors.addNewField = "Add New Field Required";
  // }
  // if (!values.addNewField2) {
  //   errors.addNewField2 = "Company Name Required";
  // }
  // if (!values.discription) {
  //   errors.discription = "discription Required";
  // }

  return errors;
};
const NewProject = () => {
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState(false);
  const [client_name_data, setdeta] = useState("");

  const closeModal = () => setOpen(false);
  const closeModalSub = () => setOpenSub(false);
  const [title, setTitle] = useState(null); // the lifted state
  const [projectdata, setProjectData] = useState(null)
  const [categoriesdata, setCategoriesData] = useState(null)
  const [category, setCategory] = useState(null)
  const [subcategory, setSubCategory] = useState(null)


  let urlTitle = useLocation();
  let naviagte = useNavigate();
  const { addToast } = useToasts();



  useEffect(() => {
    if (urlTitle.pathname === "/master/projects/new_project") {
      setTitle("Master");
    }

    const token = reactLocalStorage.get("access_token", false);
    const feach = async () => {
      try {
        const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/client/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setProjectData(data?.data)
      } catch (error) {
        console.log(error)
      }
    }
    feach();


    const feach1 = async () => {
      try {
        const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/categories/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setCategoriesData(data?.data)
      } catch (error) {
        console.log(error)
      }
    }
    feach1();

  }, [urlTitle.pathname]);


  const formik = useFormik({
    initialValues: {
      project_name: "",
      min_hours: "",
      max_hours: "",
      start_date: "",
      end_date: "",
      zone_name: "",
      project_id: "",
      project_value: "",
      subzone_name: "",
      subzone_discription: "",
      client_name: "",
      category: "",
      sub_category: "",
      discription: "",
      uploadLogoFile: "",
      jobtitle: "",
      addNewField2: "",
      client: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      console.log(`Form data`, values);
      values.client_name = client_name_data
      values.category = category
      values.sub_category = subcategory
      // const formData = new FormData();
      // formData.append('img', fileName[0]);
      // console.log(`Form data`, values);
      // values.upload_logo_file = formData
      axios.post(`${process.env.REACT_APP_BASE_URL}/api/projects/`, values)
        .then((response) => {
          console.log(response)
          if (response.status === 201) {
            addToast("Project is Added Sucessfully", {
              appearance: "success",
              autoDismiss: true,
            })
            // navigate('/')
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
              Create new Project
            </div>
          </div>
          <div className="pl-[120px] pr-[26px] pt-[33.49px]">

            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-row space-x-20 pb-[16px]">
                <div className="flex flex-row relative justify-between space-x-2  w-[350px]">
                  <div className="relative w-[165px] border-b border-black ">
                    <select
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }} className=" font-secondaryFont font-medium not-italic text-[14px] leading-[
                    37.83px] border-none bg-[#ffffff] w-full focus:outline-none text-[#2E3A59] ">
                      {categoriesdata?.map((item, id) => {
                        return <option key={id}
                        > {item.category}</option>
                      })}
                    </select>
                  </div>
                  <div className="relative w-[165px] border-b border-black ">
                    <select
                      onChange={(e) => {
                        setSubCategory(e.target.value);
                      }} className=" font-secondaryFont font-medium not-italic text-[14px] leading-[
                    37.83px] border-none bg-[#ffffff] w-full focus:outline-none text-[#2E3A59] ">
                      {categoriesdata?.map((item, id) => {
                        return <option key={id}
                        > {item.sub_category}</option>
                      })}
                    </select>
                  </div>
                </div>
                <div className="relative w-[350px]">
                  <input
                    id="project_name"
                    name="project_name"
                    type="text"
                    value={formik.values.project_name}
                    onChange={formik.handleChange}
                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#2E3A59] text-[#2E3A59] placeholder-transparent focus:outline-none focus:border-[#2E3A59]"
                    placeholder="john@doe.com"
                  />
                  <label
                    htmlFor="project_name"
                    className="absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-sm"
                  >
                    Project Name
                  </label>
                  {
                    formik.errors.project_name && (
                      <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                        {formik.errors.project_name}{" "}
                      </div>
                    )
                  }
                </div>
              </div>
              <div className="flex flex-row space-x-20 pb-[16px]">
                <div className="relative w-[350px]  border-b border-black">
                  <select
                    onChange={(e) => {
                      setdeta(e.target.value);
                    }} className=" font-secondaryFont font-medium not-italic text-[14px] leading-[
                    37.83px] border-none bg-[#ffffff] w-full focus:outline-none text-[#2E3A59] ">
                    {projectdata?.map((item, id) => {
                      return <option key={id}
                      > {item.client_name}</option>
                    })}
                  </select>
                </div>
                <div className=" relative w-[350px]">
                  <input
                    id="project_id"
                    type="text"
                    name="project_id"
                    value={formik.values.project_id}
                    onChange={formik.handleChange}
                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#2E3A59] text-[#2E3A59] placeholder-transparent focus:outline-none focus:border-[#2E3A59]"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="project_id"
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-sm"
                  >
                    Project ID
                  </label>
                  {
                    formik.errors.project_id && (
                      <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                        {formik.errors.project_id}{" "}
                      </div>
                    )
                  }
                </div>
              </div>
              <div className="flex flex-row space-x-20 pb-[16px]">
                <div className="flex flex-row relative justify-between space-x-2  w-[350px]">
                  <div className="relative w-[165px]">
                    <input
                      id="start_date"
                      name="start_date"
                      type="date"
                      value={formik.values.start_date}
                      onChange={formik.handleChange}
                      className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="start_date"
                      className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                    >
                      Start Date
                    </label>
                    {
                      formik.errors.start_date && (
                        <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                          {formik.errors.start_date}{" "}
                        </div>
                      )
                    }
                  </div>
                  <div className="relative w-[165px]">
                    <input
                      id="end_date"
                      name="end_date"
                      type="date"
                      value={formik.values.end_date}
                      onChange={formik.handleChange}
                      className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#2E3A59] text-[#2E3A59] placeholder-transparent focus:outline-none focus:border-[#2E3A59]"
                      placeholder="john@doe.com"
                    />
                    <label
                      htmlFor="end_date"
                      className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-sm"
                    >
                      End Date
                    </label>
                    {
                      formik.errors.end_date && (
                        <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                          {formik.errors.end_date}{" "}
                        </div>
                      )
                    }
                  </div>
                </div>
                <div className=" relative w-[350px]">
                  <input
                    id="discription"
                    type="text"
                    name="discription"
                    value={formik.values.discription}
                    onChange={formik.handleChange}
                    className="peer h-10 w-full font-medium font-secondaryFont border-b border-[#2E3A59] text-[#2E3A59] placeholder-transparent focus:outline-none focus:border-[#2E3A59]"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="discription"
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-sm"
                  >
                    Project Discription
                  </label>
                  {
                    formik.errors.discription && (
                      <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                        {formik.errors.discription}{" "}
                      </div>
                    )
                  }
                </div>
              </div>
              <div className="flex flex-row space-x-20 pb-[16px]">
                <div className="relative w-[350px]">
                  <div className="flex flex-row relative justify-between space-x-2  w-[350px]">
                    <div className="relative w-[165px]">
                      <input
                        id="min_hours"
                        name="min_hours"
                        type="text"
                        value={formik.values.min_hours}
                        onChange={formik.handleChange}
                        className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                        placeholder="john@doe.com"
                      />
                      <label
                        htmlFor="min_hours"
                        className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                      >
                        Min hours
                      </label>
                      {
                        formik.errors.min_hours && (
                          <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                            {formik.errors.min_hours}{" "}
                          </div>
                        )
                      }
                    </div>
                    <div className="relative w-[165px]">
                      <input
                        id="max_hours"
                        name="max_hours"
                        type="text"
                        value={formik.values.max_hours}
                        onChange={formik.handleChange}
                        className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#2E3A59] text-[#2E3A59] placeholder-transparent focus:outline-none focus:border-[#2E3A59]"
                        placeholder="john@doe.com"
                      />
                      <label
                        htmlFor="max_hours"
                        className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-sm"
                      >
                        Max hours
                      </label>
                      {
                        formik.errors.max_hours && (
                          <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                            {formik.errors.max_hours}{" "}
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>
                <div className=" relative w-[350px]">
                  <input
                    id="project_value"
                    type="text"
                    name="project_value"
                    value={formik.values.project_value}
                    onChange={formik.handleChange}
                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#2E3A59] text-[#2E3A59] placeholder-transparent focus:outline-none focus:border-[#2E3A59]"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="project_value"
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-sm"
                  >
                    Project value
                  </label>
                  {
                    formik.errors.project_value && (
                      <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                        {formik.errors.project_value}{" "}
                      </div>
                    )
                  }
                </div>
              </div>
              <div className="flex flex-row space-x-20 pb-[16px]">
                <div className="relative w-[350px]">
                  <input
                    id="subzone_name"
                    name="subzone_name"
                    type="text"
                    value={formik.values.subzone_name}
                    onChange={formik.handleChange}
                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#2E3A59] text-[#2E3A59] placeholder-transparent focus:outline-none focus:border-[#2E3A59]"
                    placeholder="john@doe.com"
                  />
                  <label
                    htmlFor="subzone_name"
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-sm"
                  >
                    Time Sheet ID
                  </label>
                  {
                    formik.errors.addNewField && (
                      <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                        {formik.errors.addNewField}{" "}
                      </div>
                    )
                  }
                </div>
                <div className=" relative w-[350px]">
                  <input
                    id="subzone_discription"
                    type="text"
                    name="subzone_discription"
                    value={formik.values.subzone_discription}
                    onChange={formik.handleChange}
                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#2E3A59] text-[#2E3A59] placeholder-transparent focus:outline-none focus:border-[#2E3A59]"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="subzone_discription"
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-sm"
                  >
                    Spreadsheet ID
                  </label>
                  {
                    formik.errors.subzone_discription && (
                      <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                        {formik.errors.subzone_discription}{" "}
                      </div>
                    )
                  }
                </div>
              </div>
              <div className="flex flex-row justify-between shadow-[buttonshadow] mr-[-30px] pb-[45.01px] content-center mt-[42px]">
                <div className="flex flex-row">
                  <div className="mr-[45px] shadow-[buttonshadow] ">
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
                    <button onClick={() => { naviagte("/master/clients") }} className="w-[100px] btnshadow  h-[25px] rounded text-sm font-secondaryFont text-[14px] text-center font-medium not-italic items-center  bg-[#FFFFFF] text-[#2E3A59] ">
                      Add Delay
                    </button>
                  </div>
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
                    <button onClick={() => { naviagte("/master/projects") }} className="w-[100px] btnshadow  h-[25px] rounded text-sm font-secondaryFont text-[14px] text-center font-medium not-italic items-center  bg-[#F42424] text-[#000000] ">
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

export default NewProject;
