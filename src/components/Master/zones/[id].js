
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import React, { useState } from 'react'
import { ViewZoneData } from '../../SimplerR/auth'
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { reactLocalStorage } from "reactjs-localstorage";


const validate = (values) => {
  const errors = {};
  if (!values.zone_name) {
    errors.zone_name = "Zone Required";
  }
  if (!values.discription) {
    errors.discription = "Desciption Required";
  }

  return errors;
};
const ZoneById = ({ closeModal, projectidzone }) => {

  const { addToast } = useToasts();
  
  const viewzonedata = ViewZoneData.use() 

  let useperma = useParams()

  console.log(useperma)


  const formik = useFormik({
    initialValues: {
      zone_name: "",
      discription: "",
      organization_id: "",
      project_id: ""
    },

    validate,
    onSubmit: async (values, { resetForm }) => {
      const token = reactLocalStorage.get("access_token", false);
      const organization_Id = reactLocalStorage.get("organizationId", false);
      values.organization_id = organization_Id
      values.project_id = projectidzone
      axios.post(`${process.env.REACT_APP_BASE_URL}/api/project//zone`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((response) => {
          console.log(response)
          if (response.status === 201) {
            addToast("Zone is Added Sucessfully", {
              appearance: "success",
              autoDismiss: true,
            })
           ViewZoneData.set(o => !o) 
            // window.location.reload(false)
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
    <div className="flex flex-row  overflow-hidden">
      <div className="flex flex-col">
        <div className=" flex flex-col      w-[100%] max-h-[40%] bg-[#FFFFFF] pl-[26px] 
        pr-[46.02px]    rounded-[31.53px] ">
          <div className="pl-[40px] pr-[26px] pt-[33.49px]">
            <form onSubmit={formik.handleSubmit}>

              <div className=" flex-row   pb-[10px] w-[100%]">
                <div className="relative w-[350px] mb-10">
                  <input
                    id="zone_name"
                    name="zone_name"
                    type="text"
                    value={formik.values.zone_name}
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
                  {formik.errors.zone_name && (
                    <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                      {formik.errors.zone_name}
                    </div>
                  )}
                </div>
                <div className=" relative w-[350px]">
                  <input
                    id="discription"
                    type="text"
                    name="discription"
                    value={formik.values.discription}
                    onChange={formik.handleChange}
                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#2E3A59] text-[#2E3A59] placeholder-transparent focus:outline-none focus:border-[#2E3A59]"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="discription"
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-[9.35px] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-[9.35px]"
                  >
                    Description
                  </label>
                  {formik.errors.discription && (
                    <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                      {formik.errors.discription}
                    </div>
                  )}
                </div>
              </div>

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

export default ZoneById
