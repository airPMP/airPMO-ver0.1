import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { getOrganizationById } from "../../../AllApi/Api";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import SideBar from "../../layout/SideBar";
import Header from "../../layout/Header";

const initialValue = {
    companyName: "",
    location: "",
    address: "",    
    hrms: "",
    spreadsheetURL: "",
    spreadsheetID1: "",
    spreadsheetID2: "",
    spreadsheetID3: "",
    spreadsheetID4: "",
    phoneNumber: "",
    domain: "",
    logo_url: ""
};

const EditOrganization = () => {
  let navigate = useNavigate();
  let useperma = useParams()
  const [title, setTitle] = useState(null);
  const [initialFormValues, setInitialFormValues] = useState();
  const { addToast } = useToasts();

  const formik = useFormik({
    initialValues: initialValue,
    // validate,
    onSubmit: async (values) => {
      const token = reactLocalStorage.get("access_token", false);
      const organizationId = reactLocalStorage.get("organization_id", false);

      let error = validate(values)
      if(Object.keys(error).length !== 0){
      }else{
        let org_payload = {
            location: values?.location,
            address: values?.address,
            hrms_api_url: values?.hrms,
            name: values?.companyName,
            spread_sheet_id: values?.spreadsheetURL,
            spread_sheet_id1: values?.spreadsheetID1,
            spread_sheet_id2: values?.spreadsheetID2,
            spread_sheet_id3: values?.spreadsheetID3,
            spread_sheet_id4: values?.spreadsheetID4,
            contact_details: values?.phoneNumber,
            domain: values?.domain,
            logo_url: values?.logo_url
        }
        let orgUp = await UpdateOrganization(organizationId, org_payload, token)
      }
    },
  });

  const UpdateOrganization = async (organizationId, org_payload, token) => {
    let updateOrg
    await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/organization/${organizationId}`, org_payload, {
      headers: {
          Authorization: `Bearer ${token}`,
      }
    })
    .then((response) => {
      if (response.status === 200) {
        updateOrg = response?.data
        if(response?.data){
          addToast("Profile Updated Sucessfully", {
              appearance: "success",
              autoDismiss: true,
          })
          navigate('/organization')
        }
    }
    })
    .catch((error) => {
      addToast(error.response?.data?.message, {
          appearance: "error",
          autoDismiss: true,
      })
    })
    return updateOrg;
  }

  useEffect(() => {
    getOrganizationById(useperma.id).then((o_data) => { 
        let org = o_data?.data;
      setInitialFormValues({
        hrms: org?.hrms_api_url,
        companyName: org?.name,
        location: org?.location,
        address: org?.address,
        spreadsheetURL: org?.spread_sheet_url,
        spreadsheetID1: org?.spread_sheet_id1,
        spreadsheetID2: org?.spread_sheet_id2,
        spreadsheetID3: org?.spread_sheet_id3,
        spreadsheetID4: org?.spread_sheet_id4,
        phoneNumber: org?.contact_details,
        logo_url: org?.logo_url,
        domain: org?.domain,
      })
    })
  },[]);

  useEffect(() => {
    if(initialFormValues){
      formik.setValues({
        ...initialFormValues
      });
    }
  },[initialFormValues]);

  const validate = (values) => {
    const errors = {};
    if (!values.companyName) {
      errors.companyName = "Please fill company name ";
    } if (!values.location) {
      errors.location = "Please fill location";
    } if (!values.address) {
      errors.address = "Please fill address ";
    } if (!values.hrms) {
      errors.hrms = "Please fill HRMS(API) ";
    } if (!values.domain) {
      errors.domain = "Please fill Domain ";
    } if (!values.spreadsheetURL) {
      errors.spreadsheetURL = "Please fill Spreadsheet URL ";
    }  if(values.domain){
      let urlPattern = /^(?:(http(s)?)?(sftp)?(ftp)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
      values.domain.match(urlPattern)
      if(!values.domain.match(urlPattern)) { 
        errors.domain = "Please fill Domain In Url Format "; 
      }
    } 
    return errors
  };

  return (
    <>
      <div className="flex flex-row justify-start overflow-hidden">
        <div>
          <SideBar />
        </div>
        <div className="flex flex-col">
          <Header title={title} />
          <div className=" flex flex-col max-w-[1099px] mh-[632.01px] mt-[103px] ml-[27px] mr-[80px] rounded-[31.529px] bg-[#FFFFFF] py-[50px] px-[27px]">
              <div className="flex">
                <div className=" ml-[26.8px] mt-[31.94px]   h-[88.28px] w-[88.28px] bg-[#F4F7FE] rounded-[50%]">
                  <img
                    src="/Group8.png"
                    alt="logo"
                    className="ml-[23px] mt-[16.57px] h-[44px]  w-[42.79px]"
                  />
                </div>
                <div className="font-secondaryFont font-medium not-italic text-[28.09px] leading-[37.83px] text-[#000000] mt-[51.51px] ml-[27.92px] ">
                    Edit Organization
                </div>
              </div>
            <div className="pl-[120px] pr-[96px] pt-[33.49px]">
            <form onSubmit={formik.handleSubmit}>
                      <div className="flex flex-row space-x-40 pb-9">
                        <div className="relative w-[350px]">
                          <input
                            id="companyName"
                            name="companyName"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.companyName}
                            className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                            placeholder="john@doe.com"
                          />
                          <label
                            htmlFor="companyName"
                            className=" after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                          >
                            Company Name
                          </label>
                          {formik.errors.companyName && (
                            <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                              {formik.errors.companyName}
                            </div>
                          )}
                        </div>
                        <div className="relative w-[350px]">
                          <input
                            id="location"
                            name="location"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.location}
                            className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                            placeholder="john@doe.com"
                          />
                          <label
                            htmlFor="location"
                            className=" after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                          >
                            Location
                          </label>
                          {formik.errors.location && (
                            <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                              {formik.errors.location}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-row space-x-40 pb-9">
                        <div className=" relative w-[350px]">
                          <input
                            id="address"
                            type="text"
                            name="address"
                            onChange={formik.handleChange}
                            value={formik.values.address}
                            className="peer h-10 w-full font-medium font-secondaryFont border-b border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                            placeholder="Password"
                          />
                          <label
                            htmlFor="address"
                            className=" after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                          >
                            Address
                          </label>
                          {formik.errors.address && (
                            <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                              {formik.errors.address}
                            </div>
                          )}
                        </div>
                        <div className="relative w-[350px]">
                          <input
                            id="hrms"
                            name="hrms"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.hrms}
                            className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                            placeholder="john@doe.com"
                          />
                          <label
                            htmlFor="hrms"
                            className=" after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                          >
                            HRMS (API)
                          </label>
                          {formik.errors.hrms && (
                            <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                              {formik.errors.hrms}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-row space-x-40 pb-9">
                        <div className="relative w-[350px]">
                          <input
                            id="spreadsheetURL"
                            onChange={formik.handleChange}
                            value={formik.values.spreadsheetURL}
                            name="spreadsheetURL"
                            type="text"
                            className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                            placeholder="john@doe.com"
                          />
                          <label
                            htmlFor="spreadsheetURL"
                            className="after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                          >
                            SpreadsheetURL
                          </label>
                          {formik.errors.spreadsheetURL && (
                            <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                              {formik.errors.spreadsheetURL}{" "}
                            </div>
                          )}
                        </div>
                        <div className="relative w-[350px]">
                          <input
                            id="spreadsheetID1"
                            onChange={formik.handleChange}
                            value={formik.values.spreadsheetID1}
                            name="spreadsheetID1"
                            type="text"
                            className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                            placeholder="john@doe.com"
                          />
                          <label
                            htmlFor="spreadsheetID1"
                            className="absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                          >
                            Spreadsheet ID 1
                          </label>
                        </div>
                      </div>
                      <div className="flex flex-row space-x-40 pb-9">
                        <div className="relative w-[350px]">
                          <input
                            id="spreadsheetID2"
                            onChange={formik.handleChange}
                            value={formik.values.spreadsheetID2}
                            name="spreadsheetID2"
                            type="text"
                            className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                            placeholder="john@doe.com"
                          />
                          <label
                            htmlFor="spreadsheetID2"
                            className="absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                          >
                            Spreadsheet ID 2
                          </label>
                        </div>
                        <div className="relative w-[350px]">
                          <input
                            id="spreadsheetID3"
                            onChange={formik.handleChange}
                            value={formik.values.spreadsheetID3}
                            name="spreadsheetID3"
                            type="text"
                            className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                            placeholder="john@doe.com"
                          />
                          <label
                            htmlFor="spreadsheetID3"
                            className="absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                          >
                            Spreadsheet ID 3
                          </label>
                        </div>
                      </div>
                      <div className="flex flex-row space-x-40 pb-9">
                        <div className="relative w-[350px]">
                            <input
                                id="spreadsheetID4"
                                onChange={formik.handleChange}
                                value={formik.values.spreadsheetID4}
                                name="spreadsheetID4"
                                type="text"
                                className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                                placeholder="john@doe.com"
                            />
                            <label
                                htmlFor="spreadsheetID4"
                                className="absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                            >
                                Spreadsheet ID 4
                            </label>
                            </div>
                        <div className="relative w-[350px]">
                          <input
                            id="phoneNumber"
                            onChange={formik.handleChange}
                            value={formik.values.phoneNumber}
                            name="phoneNumber"
                            type="text"
                            className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                            placeholder="john@doe.com"
                          />
                          <label
                            htmlFor="phoneNumber"
                            className="absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                          >
                            Phone Number
                          </label>
                        </div>
                      </div>
                      <div className="flex flex-row space-x-40 pb-9">
                        <div className="relative w-[350px]">
                          <input
                            id="domain"
                            onChange={formik.handleChange}
                            value={formik.values.domain}
                            name="domain"
                            type="text"
                            className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                            placeholder="https://"
                          />
                          <label
                            htmlFor="domain"
                            className="after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                          >
                            Domain
                          </label>
                          {formik.errors.domain && (
                            <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                              {formik.errors.domain}
                            </div>
                          )}
                        </div>
                        <div className="relative w-[350px]">
                          <input
                            id="logo_url"
                            onChange={formik.handleChange}
                            value={formik.values.logo_url}
                            name="logo_url"
                            type="text"
                            className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                            placeholder="https://"
                          />
                          <label
                            htmlFor="logo_url"
                            className="after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                          >
                            Company Logo URL
                          </label>
                        </div>
                    </div>
                      <div className="flex flex-row justify-end shadow-[buttonshadow]  content-center pb-[38px] mt-[53px] mr-[-60px]">
                        <div className="mr-[45px] shadow-[buttonshadow] ">
                          <button
                            onClick={() => navigate('/organization')}
                            type="button"
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
                            save
                          </button>
                        </div>
                      </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditOrganization;
