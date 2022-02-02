import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import SideBar from "../layout/SideBar";
import Header from "../layout/Header";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { reactLocalStorage } from "reactjs-localstorage";


const validate = (values) => {

  console.log(values)

  const errors = {};
  // if (!values.category) {
  //   errors.category = "Category Required";
  // }
  if (!values.client_name) {
    errors.client_name = "Client Name Required";
  }
  // if (!values.upload_logo_file) {
  //   errors.upload_logo_file = "upload_logo_file Required";
  // }

  if (!values.location) {
    errors.location = "Location Required";
  }
  if (!values.address) {
    errors.address = "Add New Field Required";
  }
  if (!values.contact_no) {
    errors.contact_no = "Company Name Required";
  }
  if (!values.discription) {
    errors.discription = "discription Required";
  }
  // console.log(errors);
  return errors;
};
const NewClientProfile = () => {

  const [title, setTitle] = useState(null); // the lifted state
  const [fileName, setFileName] = useState();
  let urlTitle = useLocation();
  let naviagte = useNavigate();
  const { addToast } = useToasts();

  useEffect(() => {
    if (urlTitle.pathname === "/master/clients/new_client") {
      setTitle("Master");
    }
  }, [urlTitle.pathname]);
 

  const formik = useFormik({
    initialValues: {
      category: "",
      client_name: "",
      location: "",
      upload_logo_file: "",
      address: "",
      discription: "",
      contact_no: "",
      // jobtitle: "",
      client_id: "",
      orgainization_id: "",


      // category: category,
      // client_name: client_name,
      // location: location,
      // upload_logo_file: upload_logo_file, 
      // // jobtitle: jobtitle,
      // address: contact_no,

      // discription:discription,
      // contact_no:"",
      // client_id:"",
      // orgainization_id:"",
    },
    validate,
    onSubmit: (values, { resetForm }) => { 

      const token = reactLocalStorage.get("access_token", false);
      axios.post(`${process.env.REACT_APP_BASE_URL}/api/client/`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        }})
        .then((response) => {
          console.log(response)
          if (response.status === 201) {
            addToast("Client is Added Sucessfully", {
              appearance: "success",
              autoDismiss: true,
            })
            // navigate('/')
          }
          resetForm()
        })
        .catch((error) => { 
          addToast(error.response.data.message, {
            appearance: "error",
            autoDismiss: true,
          })
        })
    },
  });


  const SaveButton = () => {


  }


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
              Create new client profile
            </div>
          </div>
          <div className="pl-[120px] pr-[26px] pt-[33.49px]">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-row space-x-20 pb-[16px]">
                <div className="relative w-[350px] border-b border-black ">
                  <select
                    className=" font-secondaryFont font-medium not-italic text-[14px] leading-[
                    37.83px] border-none bg-[#ffffff] w-full focus:outline-none "
                  >
                    <option>Cateogry</option>
                  </select>
                </div>
                <div className="relative w-[350px]">
                {/* <div className="relative w-[350px] border-b border-black pb-[10px]"> */}
                  {/* <select
                    onChange={() => {
                      naviagte("/master/clients/new_client/client_name");
                    }}
                    className=" font-secondaryFont font-medium not-italic text-[14px] leading-[
                      37.83px] border-none bg-[#ffffff] w-full focus:outline-none "
                  >
                    <option>Client Name</option>
                    <option>Demo Name</option>
                  </select> */}
                  <input
                    id="client_name"
                    name="client_name"
                    type="text"
                    value={formik.values.client_name}
                    onChange={formik.handleChange}
                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                    placeholder="john@doe.com"
                  />
                  <label
                    htmlFor="client_name"
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                  >
                   Client Name
                  </label>
                  {formik.errors.client_name && (
                    <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                      {formik.errors.client_name}{" "}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-row space-x-20 pb-[16px]">
                <div className="relative w-[350px]">
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
                  {formik.errors.location && (
                    <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                      {formik.errors.location}{" "}
                    </div>
                  )}
                </div>
                <div className=" relative w-[350px]">
                  {
                    <>
                      {/* <input
                        type="file"
                        onChange={(e) => {
                          setFileName(e.target.files);
                        }}
                        name="uploadfile"
                        className=" absolute z-[10] opacity-0 "
                      /> */}
                      <input
                        id="upload_logo_file"
                        type="text"
                        name="upload_logo_file"
                        value={formik.values.upload_logo_file}
                        onChange={formik.handleChange}
                        className="peer h-10 w-full  font-medium font-secondaryFont border-b border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                        placeholder="Password"
                      />
                    </>
                  }
                  <label
                    htmlFor="upload_logo_file"
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                  >
                    {` ${fileName
                      ? `Uploaded Logo File - ${fileName}`
                      : "Upload Logo File"
                      }  `}
                  </label>
                  {formik.errors.upload_logo_file && (
                    <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                      {formik.errors.upload_logo_file}{" "}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-row space-x-20 pb-[16px]">
                <div className="relative w-[350px]">
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                    placeholder="john@doe.com"
                  />
                  <label
                    htmlFor="address"
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                  >
                     Address
                  </label>
                  {formik.errors.address && (
                    <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                      {formik.errors.address}{" "}
                    </div>
                  )}
                </div>
                <div className=" relative w-[350px]">
                  <input
                    id="contact_no"
                    type="text"
                    name="contact_no"
                    value={formik.values.contact_no}
                    onChange={formik.handleChange}
                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="contact_no"
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                  >
                    Contact Number
                     
                  </label>
                  {formik.errors.contact_no && (
                    <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                      {formik.errors.contact_no}{" "}
                    </div>
                  )}
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
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                  >
                    Discription
                  </label>
                  {formik.errors.discription && (
                    <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                      {formik.errors.discription}{" "}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-row justify-end shadow-[buttonshadow] mr-[-30px] pb-[45.01px] content-center mt-[42px]">
                <div className="mr-[45px] shadow-[buttonshadow] ">
                  <button
                    onClick={() => {
                      naviagte("/master/clients");
                    }}
                    className="w-[100px] btnshadow  h-[25px] rounded text-sm font-secondaryFont text-[14px] text-center font-medium not-italic items-center  bg-[#F42424] text-[#000000] "
                  >
                    Cancel
                  </button>
                </div>
                <div>
                  <button
                    // onClick={(e) => SaveButton(e)}
                    type="submit"
                    className="w-[110px] h-[25px] rounded btnshadow   text-sm font-secondaryFont text-[14px] font-medium not-italic  bg-[#0FCC7C] text-[#000000] "
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewClientProfile;
