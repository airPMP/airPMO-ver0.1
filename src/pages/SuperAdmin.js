import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import Popup from "reactjs-popup";
import { reactLocalStorage } from "reactjs-localstorage";
import Header from "../components/layout/Header";
import SideBar from "../components/layout/SideBar";

const SuperAdmin = () => {
  const { addToast } = useToasts();
  const [open, setOpen] = useState(false);
  const [name, setNameData] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [organizationid, setOrganizationId] = useState(null);
  // const [hrmsdata, setHRMSData] = useState("AIzaSyDoh4Gj_-xV033rPKneUFSpQSUpbqDqfDw");
  const [hrmsdata, setHRMSData] = useState(
    `${process.env.REACT_APP_BASE_URL}/api/hrms-api/`
  );
  const [spread_sheet, setSpreadSheet] = useState(
    "1LtpGuZdUivXEA4TqUvK9T3qRr1HER6TKzdSxTYPEAQ8"
  );
  // const [spread_sheet_id_1, setSpreadSheet_1] = useState('AT - HRMS format');
  const [spread_sheet_id_1, setSpreadSheet_1] = useState("59");
  const [spread_sheet_id_2, setSpreadSheet_2] = useState(
    "AT - Equipment List format"
  );
  const [spread_sheet_id_3, setSpreadSheet_3] = useState(
    "AT - HRMS Std Salaries"
  );
  const [spread_sheet_id_4, setSpreadSheet_4] = useState(
    "AT - HRMS Std Rentals"
  );

  const [title, setTitle] = useState(null);
  let urlTitle = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if (urlTitle.pathname === "/super_admin") {
      setTitle("Super Admin");
    }
  }, [urlTitle.pathname]);
  
  useEffect(()=>{
    const role_name = reactLocalStorage.get("roles", false);
    if(role_name !== "Airpmo Super Admin"){
      console.log("role_namerole_namerole_namerole_name",role_name);
      navigate("/dashboard")
    }
  },[])

  const [sheetdata, setSheetData] = useState(null);
  const [sheetdata_2, setSheetData_2] = useState(null);
  const [sheetdata_3, setSheetData_3] = useState(null);
  const [sheetdata_4, setSheetData_4] = useState(null);
  const [sheetdata_1_open, setSheetData_1_open] = useState(false);
  const [sheetdata_2_open, setSheetData_2_open] = useState(false);
  const [sheetdata_3_open, setSheetData_3_open] = useState(false);
  const [sheetdata_4_open, setSheetData_4_open] = useState(false);

  const [nameErr, setNameDataErr] = useState("");
  const [locationErr, setLocationErr] = useState("");
  const [addressErr, setAddressErr] = useState("");
  const [rolleiddata, setRolleIdData] = useState(null);

  const [showpassword, setshowpassword] = useState("password");
  const [showeye, setShowEye] = useState(" ");
  const [assignproject, setAssignProject] = useState(false);
  const [designationdata, setDesignationData] = useState(null);

  const [rolesdata, setRolesData] = useState(null)
  const Login = () => {
    navigate("/dashboard");
  };

  const initialValue = {
    phone_number: "",
    email: "",
    location: "",
    address: "",
    hrms: `${process.env.REACT_APP_BASE_URL}/api/hrms-api/`,
    companyName: "",
    spreadsheetURL: "",
    spreadsheetID1: "",
    spreadsheetID2: "",
    spreadsheetID3: "",
    spreadsheetID4: "",
    licenceKey: "",
    projects: "",
    password: "",
  };

  const validate = (values) => {
    const errors = {};
    if (!values.companyName) {
      errors.companyName = "Please fill company name ";
    } else if (!values.location) {
      errors.location = "Please fill location";
    } else if (!values.address) {
      errors.address = "Please fill address ";
    } else if (!values.hrms) {
      errors.hrms = "Please fill HRMS(API) ";
    } else if (!values.spreadsheetURL) {
      errors.spreadsheetURL = "Please fill Spreadsheet URL ";
    }    
  };

  //   const SubmitForm = (e) => {};

  const ShowPasswordButton = (e, sheet2) => {
    if (sheet2 === "sheet_2") {
      setSheetData_1_open(false);
      setSheetData_2_open(true);
      setSheetData_3_open(false);
      setSheetData_4_open(false);
      console.log("sheet 2");
      if (showeye) {
        setshowpassword("input");
        const feach = async () => {
          try {
            const data1 = await axios.get(
              `https://sheets.googleapis.com/v4/spreadsheets/${spread_sheet}/values/${spread_sheet_id_2}?key=${hrmsdata}`
            );
            setSheetData_2(data1?.data?.values);
          } catch (error) {
            console.log(error);
          }
        };
        feach();
      }
    } else if (sheet2 === "sheet_3") {
      setSheetData_1_open(false);
      setSheetData_2_open(false);
      setSheetData_3_open(true);
      setSheetData_4_open(false);

      if (showeye) {
        setshowpassword("input");
        const feach = async () => {
          try {
            const data1 = await axios.get(
              `https://sheets.googleapis.com/v4/spreadsheets/${spread_sheet}/values/${spread_sheet_id_3}?key=${hrmsdata}`
            );
            setSheetData_3(data1?.data?.values);
          } catch (error) {
            console.log(error);
          }
        };
        feach();
      }
    } else if (sheet2 === "sheet_4") {
      setSheetData_1_open(false);
      setSheetData_2_open(false);
      setSheetData_3_open(false);
      setSheetData_4_open(true);

      if (showeye) {
        setshowpassword("input");
        const feach = async () => {
          try {
            const data1 = await axios.get(
              `https://sheets.googleapis.com/v4/spreadsheets/${spread_sheet}/values/${spread_sheet_id_4}?key=${hrmsdata}`
            );
            setSheetData_4(data1?.data?.values);
          } catch (error) {
            console.log(error);
          }
        };
        feach();
      }
    } else {
      setSheetData_1_open(true);
      setSheetData_2_open(false);
      setSheetData_3_open(false);
      setSheetData_4_open(false);
      if (showeye) {
        setshowpassword("input");
        const feach = async () => {
          const token = reactLocalStorage.get("access_token", false);
          try {
            // const data1 = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${spread_sheet}/values/${spread_sheet_id_1}?key=${hrmsdata}`,)
            const data1 = await axios.get(`${hrmsdata}${spread_sheet_id_1}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log(data1);
            setSheetData(data1?.data);
            // setSheetData(data1?.data?.values)

            // let storedDesignamtion = []
            // data1?.data?.values.map((items, id) => {
            //     storedDesignamtion.push(items[3])
            // })
          } catch (error) {
            console.log(error);
          }
        };
        feach();
      }
    }
    setShowEye((o) => !o);
    setOpen((o) => !o);
  };

  const CancelButton = (e) => {
    setOpen((o) => !o);
    setShowEye((o) => !o);
  };

  useEffect(() => {
    if (organizationid) {
      userApi();
    }
  }, [organizationid]);

  const userApi = () => {
    console.log(organizationid);
    const token = reactLocalStorage.get("access_token", false);
    const user_id = reactLocalStorage.get("user_id", false);
    axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/api/users/${user_id}`,
        {
          organization_id: organizationid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);

        if (response.status === 201) {
          // addToast("form submitted Sucessfully", {
          //     appearance: "success",
          //     autoDismiss: true,
          // })
        }
      })
      .catch((error) => {
        addToast(error.response.data.message, {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const formik = useFormik({
    initialValues: initialValue,
    validate,
    onSubmit: async (values) => {
      const token = reactLocalStorage.get("access_token", false);
      const user_id = reactLocalStorage.get("user_id", false);
      let user_payload = {
        "Email": values?.email,
        "Password": values?.password,
        "PhoneNumber": values?.phoneNumber,
        "FirstName": "",
        "LastName": "",
        "organization_id": "",
        "spread_sheet_user_id": ""
    }

      if (values && values.email) {
        let role_id = null;
        try {
          const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/roles/`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          })
          data?.data?.filter((role)=>{
            if(role.name.toLowerCase() == "super admin"){
              setRolesData(role)
              role_id = role._id
            }
          })
        } catch (error) {
            console.log(error)
        }

        let newAdminUser = await AddNewAdminUser(user_payload, token)
        if(newAdminUser){
          let role_payload = {
            role_id: role_id,
            user_id: newAdminUser.data._id
          }
          let role_data = await  AddNewRole(role_payload, token);
          let org_payload ={
            hrms_api_url: values.hrms,
            location: values.location,
            discription: "",
            logo_url: "",
            spread_sheet_id: values.spreadsheetID1,
            user_id: newAdminUser.data._id,
            address: values.address,
            contact_details: values.phoneNumber,
            name: values.companyName,
            hrms_format: "",
            equipments_list: "", 
            hrms_salary: "",
            hrms_rental: "",
            hrms_url_api: "",
            hrms_api_url_id: "",
            hrms_api_or_sheet: false,
            organization_image_url: ""
          }
          let newOrganization = await AddNewOrganization(org_payload, token)
          if(newOrganization){
            let user_up_payload = {
              organization_id: newOrganization?.data?._id
            }
            await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/users/${newAdminUser.data._id}`, user_up_payload, {
              headers: {
                  Authorization: `Bearer ${token}`,
              }
            })
            .then((response) => {
              if (response.status === 200) {
                addToast("organization created Sucessfully", {
                    appearance: "success",
                    autoDismiss: true,
                })
                navigate('/organization')
            }
            })
            .catch((error) => {
              addToast(error.response.data.message, {
                  appearance: "error",
                  autoDismiss: true,
              })
            })
          }
        }
      }
    },
  });


  const AddNewAdminUser = async (user_payload, token) => {
    let user_res;
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/users/register/`, user_payload, {
      headers: {
          Authorization: `Bearer ${token}`,
      }
    })
    .then((response) => {
      user_res = response
    })
    .catch((error) => {
      addToast(error.response.data.message, {
          appearance: "error",
          autoDismiss: true,
      })
    })
    return user_res
  }

  const AddNewOrganization = async (org_payload, token) => {
    let org_res;
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/organization/`, org_payload, {
      headers: {
          Authorization: `Bearer ${token}`,
      }
    })
    .then((response) => {
      org_res = response
    })
    .catch((error) => {
      addToast(error.response.data.message, {
          appearance: "error",
          autoDismiss: true,
      })
    })
    return org_res
  }

  const AddNewRole = async (role_payload, token) => {
    let role_res;
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/assign_user_roles/`, role_payload, {
      headers: {
          Authorization: `Bearer ${token}`,
      }
    })
    .then((response) => {
      role_res = response
    })
    .catch((error) => {
      addToast(error.response.data.message, {
          appearance: "error",
          autoDismiss: true,
      })
    })
    return role_res
  }

  return (
    <>
    <div className="flex flex-row justify-start overflow-hidden">
        <div>
          <SideBar />
        </div>
        <div className="flex flex-col">
          <Header title={title} />

              <div className="flex flex-col  justify-center overflow-hidden w-[100%]  h-[100%]">
                <div className="flex flex-row  place-items-start">
                  <img
                    src="/logo1.svg"
                    alt="logo"
                    className="ml-[4.313rem] mt-[48px]  w-[150px] h-[50px]  right-[765px]"
                  />
                </div>
                <div
                  className="max-w-[1099px] max-h-[632.01px]  bg-[#FFFFFF] justify-center 
                        lg:ml-[171px] md:ml-[100px] lg:mr-[170px] md:mr-[100px]  mt-[19px] mb-[110.99px] pb-[20px] rounded-[31.529px]"
                >
                  <div className="flex flex-row items-center ">
                    <div className=" font-secondaryFont ml-[27.92px] mt-[31.51px] text-[#000000]  font-medium not-italic text-[28.09px] tracking-[-0.02em]">
                      Super Admin
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

                          <div></div>
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
                            id="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            name="password"
                            type="text"
                            className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                            placeholder="john@doe.com"
                          />
                          <label
                            htmlFor="password"
                            className="after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                          >
                            Password
                          </label>
                          {formik.errors.password && (
                            <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                              {formik.errors.password}
                            </div>
                          )}
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
                            id="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            name="email"
                            type="text"
                            className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                            placeholder="john@doe.com"
                          />
                          <label
                            htmlFor="email"
                            className="after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                          >
                            Email
                          </label>
                          {formik.errors.email && (
                            <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                              {formik.errors.email}
                            </div>
                          )}
                        </div>
                        {/* <div className=" relative w-[350px]">
                                            <input
                                                id="spread_sheet"
                                                type="text"
                                                name="spread_sheet"
                                                value={spread_sheet}
                                                onChange={(e) => setSpreadSheet(e.target.value)}
                                                className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                                                placeholder="Password"
                                            />
                                            <label
                                                htmlFor="spread_sheet"
                                                className=" after:content-['*'] after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                            >
                                                Spreadsheet URL


                                            </label>

                                        </div>  */}
                        {/* <div className="relative w-[350px]"> */}
                        <div className="flex relative w-[350px]">
                          <input
                            id="spread_sheet_id_1"
                            name="spread_sheet_id_1"
                            type="text"
                            value={spread_sheet_id_1}
                            onChange={(e) => setSpreadSheet_1(e.target.value)}
                            className="peer h-10 w-full border-b font-medium 
                                                    font-secondaryFont border-[#000000] text-[#000000] 
                                                        focus:outline-none focus:border-[#000000]"
                            placeholder="Spreadsheet ID 1"
                          />
                          <div>
                            {showeye ? (
                              <div
                                onClick={(e) => ShowPasswordButton(e)}
                                className="cursor-pointer"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                  />
                                </svg>
                              </div>
                            ) : (
                              <div
                                onClick={(e) => ShowPasswordButton(e)}
                                className="cursor-pointer"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* <div className="flex flex-row space-x-40 pb-[36px]">
                                        <div className="relative w-[350px]">
                                            <div className="flex">
                                                <input
                                                    id="spread_sheet_id_2"
                                                    name="spread_sheet_id_2"
                                                    type="text"
                                                    value={spread_sheet_id_2}
                                                    onChange={(e) => setSpreadSheet_2(e.target.value)}
                                                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                                                    placeholder="Spreadsheet ID 2"
                                                />

                                                <div>
                                                    {showeye ? (<div onClick={(e) => ShowPasswordButton(e, "sheet_2")}
                                                        className="cursor-pointer">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                            viewBox="0 0 24 24" stroke="currentColor">

                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                        </svg>
                                                    </div>)
                                                        :
                                                        (<div onClick={(e) => ShowPasswordButton(e, "sheet_2")} className="cursor-pointer">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </div>
                                                        )}
                                                </div>
                                            </div>

                                        </div>
                                        <div className=" relative w-[350px]">
                                            <div className="flex">
                                                <input
                                                    id="spread_sheet_id_3"
                                                    type="text"
                                                    name="spread_sheet_id_3"
                                                    value={spread_sheet_id_3}
                                                    onChange={(e) => setSpreadSheet_3(e.target.value)}
                                                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                                                    placeholder="Password"
                                                />
                                                <div>
                                                    {showeye ? (<div onClick={(e) => ShowPasswordButton(e, "sheet_3")}
                                                        className="cursor-pointer">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                            viewBox="0 0 24 24" stroke="currentColor">

                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                        </svg>
                                                    </div>)
                                                        :
                                                        (<div onClick={(e) => ShowPasswordButton(e, "sheet_3")} className="cursor-pointer">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </div>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}

                      {/* <div className="flex flex-row space-x-40 ">
                                        <div className="relative w-[350px]">
                                            <div className="flex">

                                                <input
                                                    id="spread_sheet_id_4"
                                                    name="spread_sheet_id_4"
                                                    type="text"
                                                    value={spread_sheet_id_4}
                                                    onChange={(e) => setSpreadSheet_4(e.target.value)}
                                                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                                                    placeholder="john@doe.com"
                                                />
                                                <div>
                                                    {showeye ? (<div onClick={(e) => ShowPasswordButton(e, "sheet_4")}
                                                        className="cursor-pointer">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                            viewBox="0 0 24 24" stroke="currentColor">

                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                        </svg>
                                                    </div>)
                                                        :
                                                        (<div onClick={(e) => ShowPasswordButton(e, "sheet_4")} className="cursor-pointer">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </div>
                                                        )}
                                                </div>
                                            </div>

                                        </div>
                                        <div className=" relative w-[350px]">
                                            <input
                                                id="spread_sheet_id_5"
                                                type="text"
                                                name="spread_sheet_id_5"
                                                // value={spread_sheet_id_4}
                                                // onChange={(e) => setSpreadSheet_4(e.target.value)}
                                                className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                                                placeholder="Password"
                                            />
                                            <label
                                                htmlFor="spread_sheet_id_5"
                                                className="   after:ml-0.5 after:text-red-500 absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                                            >
                                                Spreadsheet ID 5

                                            </label>

                                        </div>
                                    </div> */}

                      <div className="flex flex-row justify-end shadow-[buttonshadow]  content-center pb-[38px] mt-[53px] mr-[-60px]">
                        <div className="mr-[45px] shadow-[buttonshadow] ">
                          <button
                            onClick={() => Login()}
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
                            Next
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
        </div>
    </div>
      <Popup open={open} position="right center" model>
        <div className="p-7 ">
          <div className="flex pb-3">
            <div style={{ marginLeft: "95%" }}>
              <span
                className="text-[red] text-[19px] cursor-pointer"
                onClick={(e) => CancelButton(e)}
              >
                <b>X</b>
              </span>
            </div>
          </div>
          <div className="mt-3 ex1">
            <table
              className="table-auto   text-center   
                            text-[#8F9BBA] text-[12px] font-sans
                         font-normal not-italic  w-[100%]"
            >
              {/* {sheetdata_3_open ? sheetdata_3?.map((item, i) => {
                                if (i <= 0) {
                                    return (
                                        <tr className="max-h-[52.84px] text-center  ">
                                            <th className="w-[11%] py-[13px]">{item[0]}</th>
                                            <th className="w-[20%] py-[13px]">{item[1]}</th>
                                            <th className="w-[30%] py-[13px] px-5">{item[8]}</th>

                                        </tr>
                                    )
                                }
                                else {
                                    return (
                                        <tbody className=" mb-[10px]   ">
                                            <tr className="bg-[#e4eeec]  text-[#8F9BBA] text-[12px] font-sans  ">
                                                <td className=" pt-[15px] w-[11%] pb-[14.83px]">{item[0]} </td>
                                                <td className="pt-[15px] w-[20%] pb-[14.83px]">{item[1]}</td>
                                                <td className="pt-[15px] w-[30%] pb-[14.83px]">{item[8]}</td>

                                            </tr>
                                            <tr>
                                                <td className="p-[10px]"></td>
                                            </tr>
                                        </tbody>
                                    )
                                }
                            })
                                :
                                <>
                                </>
                            } */}

              {/* <>
                                 {sheetdata_2_open ? sheetdata_2?.map((item, i) => {
                                    if (i <= 0) {
                                        return (
                                            <tr className="max-h-[52.84px] text-center  ">
                                                <th className="w-[11%] py-[13px]">{item[0]}</th>
                                                <th className="w-[20%] py-[13px]">{item[4]}</th>
                                                <th className="w-[30%] py-[13px] px-5">{item[10]}</th>

                                            </tr>
                                        )
                                    }
                                    else {
                                        return (
                                            <tbody className=" mb-[10px]   ">
                                                <tr className="bg-[#e4eeec]  text-[#8F9BBA] text-[12px] font-sans  ">
                                                    <td className=" pt-[15px] w-[11%] pb-[14.83px]">{item[0]} </td>
                                                    <td className="pt-[15px] w-[20%] pb-[14.83px]">{item[4]}</td>
                                                    <td className="pt-[15px] w-[30%] pb-[14.83px]">{item[10]}</td>

                                                </tr>
                                                <tr>
                                                    <td className="p-[10px]"></td>
                                                </tr>
                                            </tbody>
                                        )
                                    }
                                })
                                    :
                                    <>
                                    </>
                                }
                            </> */}

              <>
                {sheetdata_1_open ? (
                  sheetdata?.map((item, i) => {
                    if (i <= 0) {
                      return (
                        <tr className="max-h-[52.84px] text-center w-[100%] ">
                          {/* <th className="w-[15%] py-[13px]">{item[0]}</th>
                                                <th className="w-[15%] py-[13px]">{item[1]}</th>
                                                <th className="w-[20%] py-[13px]">{item[2]}</th>
                                                <th className="w-[30%] py-[13px]">{item[3]}</th>
                                                <th className="w-[20%] py-[13px]">{item[4]}</th>
                                                <th className="w-[30%] py-[13px] px-5">{item[11]}</th> */}

                          <th className="w-[35%] py-[13px]"> User ID</th>
                          <th className="w-[35%] py-[13px]">User Name</th>
                          <th className="w-[30%] py-[13px]">Designation</th>
                          {/* <th className="w-[30%] py-[13px]">{item[3]}</th>
                                                <th className="w-[20%] py-[13px]">{item[4]}</th>
                                                <th className="w-[30%] py-[13px] px-5">{item[11]}</th> */}
                        </tr>
                      );
                    } else {
                      return (
                        <tbody className=" mb-[10px]  w-[100%] ">
                          <tr className="bg-[#e4eeec]  text-[#8F9BBA] text-[12px] font-sans  ">
                            {/* <td className=" pt-[15px] w-[15%] pb-[14.83px]">{item[0]} </td>
                                                    <td className="pt-[15px] w-[15%] pb-[14.83px]">{item[1]}</td>
                                                    <td className="pt-[15px] w-[20%] pb-[14.83px]">{item[2]}</td>
                                                    <td className="pt-[15px] w-[30%] pb-[14.83px]">{item[3]}</td>
                                                    <td className="pt-[15px] w-[20%] pb-[14.83px]">{item[4]}</td>
                                                    <td className="pt-[15px] w-[30%] pb-[14.83px]">{item[11]}</td> */}

                            <td className=" pt-[15px] w-[35%]  pb-[14.83px]">
                              {item.UserID}{" "}
                            </td>
                            <td className="pt-[15px] w-[35%]  pb-[14.83px]">
                              {item.UserName}
                            </td>
                            <td className="pt-[15px] w-[30%]  pb-[14.83px]">
                              {item.designation}
                            </td>
                            {/* <td className="pt-[15px] w-[30%] pb-[14.83px]">{item[3]}</td>
                                                    <td className="pt-[15px] w-[20%] pb-[14.83px]">{item[4]}</td>
                                                    <td className="pt-[15px] w-[30%] pb-[14.83px]">{item[11]}</td> */}
                          </tr>
                          <tr>
                            <td className="p-[10px]"></td>
                          </tr>
                        </tbody>
                      );
                    }
                  })
                ) : (
                  <></>
                )}
              </>

              {/* <>
                                {sheetdata_4_open ? sheetdata_4?.map((item, i) => {
                                    if (i <= 0) {
                                        return (
                                            <tr className="max-h-[52.84px] text-center  ">
                                                <th className="w-[15%] py-[13px]">{item[0]}</th>
                                                <th className="w-[15%] py-[13px]">{item[1]}</th>
                                                <th className="w-[20%] py-[13px]">{item[7]}</th>
                                            </tr>
                                        )
                                    }
                                    else {
                                        return (
                                            <tbody className=" mb-[10px]   ">
                                                <tr className="bg-[#e4eeec]  text-[#8F9BBA] text-[12px] font-sans  ">
                                                    <td className=" pt-[15px] w-[15%] pb-[14.83px]">{item[0]} </td>
                                                    <td className="pt-[15px] w-[15%] pb-[14.83px]">{item[1]}</td>
                                                    <td className="pt-[15px] w-[20%] pb-[14.83px]">{item[7]}</td>

                                                </tr>
                                                <tr>
                                                    <td className="p-[10px]"></td>
                                                </tr>
                                            </tbody>
                                        )
                                    }
                                })
                                    :
                                    <>
                                    </>
                                }
                            </> */}
            </table>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default SuperAdmin;
