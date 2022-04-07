
import { useFormik } from "formik";
import React, { useState } from 'react'
import { ViewSubZoneData } from '../../SimplerR/auth'
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { reactLocalStorage } from "reactjs-localstorage";


const validate = (values) => {
  const errors = {};

  if (!values.subzone_name) {
    errors.subzone_name = "Subzone  Required";
  }
  if (!values.discription) {
    errors.discription = "Description Required";
  }

  // console.log(errors);
  return errors;
};
const SubZoneList = ({ closeModal, zone_id }) => {



  const { addToast } = useToasts();
  const viewsubzonedata = ViewSubZoneData.use()



  const formik = useFormik({
    initialValues: {

      subzone_name: "",
      discription: "",
      zone_id: " ",
      organization_id: " "

    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      const token = reactLocalStorage.get("access_token", false);
      const organization_Id = reactLocalStorage.get("organization_id", false);
      

      if (organization_Id !== "undefined" && organization_Id !== null) { 
        values.organization_id = organization_Id
      } 


      values.zone_id = zone_id

      axios.post(`${process.env.REACT_APP_BASE_URL}/api/subzone/`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((response) => {
          console.log(response)
          if (response.status === 201) {
            addToast("Subzone is Added Sucessfully", {
              appearance: "success",
              autoDismiss: true,
            })
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
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#2E3A59] text-[9.35px] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2E3A59] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#2E3A59] peer-focus:text-[9.35px]"
                  >
                    Sub Zone
                  </label>
                  {formik.errors.subzone_name && (
                    <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                      {formik.errors.subzone_name}
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
                    Subzone Description
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
                    onClick={() => ViewSubZoneData.set(o => !o)}>
                    <button className="w-[100px] btnshadow 
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

export default SubZoneList
