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
  if (!values.category) {
    errors.category = "Client Name Required";
  }
   

  if (!values.sub_category) {
    errors.sub_category = "Type Required";
  }

  if (!values.discription) {
    errors.discription = "Discription Type Required";
  }
   
  return errors;
};
const AddConsultant = () => {

  const [title, setTitle] = useState(null); // the lifted state
  const [fileName, setFileName] = useState();
  const [organization_id_data, setOrganization_Id] = useState();
  let urlTitle = useLocation();
  let naviagte = useNavigate();
  const { addToast } = useToasts();

  useEffect(() => {
    if (urlTitle.pathname === "/master/clients/new_client") {
      setTitle("Master");
    }
    const organization_Id = reactLocalStorage.get("organizationId", false);
    setOrganization_Id(organization_Id)

  }, [urlTitle.pathname]);
 

  const formik = useFormik({
    initialValues: { 
      category: "",
      sub_category: "",
      discription:"" ,
      organization_id:'' 
    },
    validate,
    onSubmit: (values, { resetForm }) => { 
     values.organization_id= organization_id_data
      const token = reactLocalStorage.get("access_token", false);
      axios.post(`${process.env.REACT_APP_BASE_URL}/api/categories/`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        }})
        .then((response) => {
          console.log(response)
          if (response.status === 201) {
            addToast("Categorie is Added Sucessfully", {
              appearance: "success",
              autoDismiss: true,
            }) 
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
              Create new Consultant
            </div>
          </div>
          <div className="pl-[120px] pr-[26px] pt-[33.49px]">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-row space-x-20 pb-[16px]">
                 
                <div className="relative w-[350px]"> 
                  <input
                    id="category"
                    name="category"
                    type="text"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                    placeholder="john@doe.com"
                  />
                  <label
                    htmlFor="category"  
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                  >
                  Name
                  </label>
                  {formik.errors.category && (
                    <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                      {formik.errors.category}{" "}
                    </div>
                  )}
                </div>
                <div className="relative w-[350px]"> 
                   <input
                     id="discription"
                     name="discription"
                     type="text"
                     value={formik.values.discription}
                     onChange={formik.handleChange}
                     className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                     placeholder="john@doe.com"
                   />
                   <label
                     htmlFor="name"
                     className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                   >
                  Description
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
                      naviagte("/master/categories");
                    }}
                    className="w-[100px] btnshadow  h-[25px] rounded text-sm font-secondaryFont text-[14px] text-center font-medium not-italic items-center  bg-[#F42424] text-[#000000] "
                  >
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddConsultant;
