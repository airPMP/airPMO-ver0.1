import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams  } from "react-router-dom";
import { useFormik } from "formik";
import SideBar from "../../layout/SideBar";
import Header from "../../layout/Header";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { reactLocalStorage } from "reactjs-localstorage";


 
const EditClientProfile = () => {

  // const history = useHistory();
  const [title, setTitle] = useState(null); // the lifted state
  const [fileName, setFileName] = useState();
  let urlTitle = useLocation(); 
  let navigate = useNavigate();
  const { addToast } = useToasts();
  const [editdata, setEditData] = useState(null)
  const [truedata,setTrueData]= useState(false)

  const [clintnamedata, setClintName] = useState("")
  const [location, setLocation] = useState("")
  const [uploadlogofile, setUploadLogoFile] = useState("")
  const [addnewfield, setAddNewField] = useState("")
  const [contactno, setContactNo] = useState("")
  const [discription, setDiscription] = useState("")

  let useperma = useParams()

  console.log(useperma)

  useEffect(() => {
    if (urlTitle.pathname === "/master/clients/new_client") {
      setTitle("Master");
    }

    const token = reactLocalStorage.get("access_token", false);
    const feach = async () => {
        try {
          const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/client/${useperma.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setEditData(data?.data)
        setClintName(data?.data?.client_name)
        setLocation(data?.data?.location)
        setUploadLogoFile(data?.data?.upload_logo_file)
        setAddNewField(data?.data?.add_new_feild)
        setContactNo(data?.data?.contact_no)
        setDiscription(data?.data?.discription)
      } catch (error) {
        console.log(error)
      }
    }

    feach();

  }, [urlTitle.pathname]);



  const SaveButton =  (e) => {

    e.preventDefault()

    const token = reactLocalStorage.get("access_token", false);

      axios.patch(`${process.env.REACT_APP_BASE_URL}/api/client/${useperma.id}/`, {
        add_new_feild: addnewfield,
        category: " ",
        client_id: " ",
        client_name: clintnamedata,
        contact_no: contactno,
        createdAt: " ",
        discription: discription,
        location: location,
        orgainization_id: " ",
        updatedAt: " ",
        upload_logo_file: uploadlogofile,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response)  => { 
        if (response.status === 200) { 
          addToast("Profile is Edit Sucessfully", {
            appearance: "success",
            autoDismiss: true,
          })
          navigate("/master/clients/")
          // history.push("/master/edit_client");
        }
        // else {

        //   addToast("login fail", {
        //     appearance: "error",
        //     autoDismiss: true,
        //   })
        // }
      })
      .catch((error) => {
        console.log(error)
        addToast(error.response.data.message, {
          appearance: "error",
          autoDismiss: true,
        })
        // navigate('/');

      });

  }
  
  if(truedata){
    console.log("done deta")
  }

  console.log(truedata)

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
            <form  >
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

                    type="text"
                    value={clintnamedata}
                    onChange={(e) => setClintName(e.target.value)}
                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                    placeholder="john@doe.com"
                  />
                  <label
                    htmlFor="client_name"
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                  >
                    Client Name
                  </label>

                </div>
              </div>
              <div className="flex flex-row space-x-20 pb-[16px]">
                <div className="relative w-[350px]">
                  <input

                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-gray-900 placeholder-transparent focus:outline-none focus:border-[#000000]"
                    placeholder="john@doe.com"
                  />
                  <label
                    htmlFor="location"
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                  >
                    Location
                  </label>
                  {/* {formik.errors.location && (
                    <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                      {formik.errors.location}{" "}
                    </div>
                  )} */}
                </div>
                <div className=" relative w-[350px]">
                  {
                    <>
                      <input
                        type="text"
                        value={uploadlogofile}
                        onChange={(e) => setUploadLogoFile(e.target.value)}
                        className="peer h-10 w-full  font-medium font-secondaryFont border-b border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                        placeholder="Password"
                      />
                    </>
                  }
                  <label
                    htmlFor="upload_logo_file"
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                  >
                    {/* {` ${fileName
                      ? `Uploaded Logo File - ${fileName}`
                      : "Upload Logo File"
                      }  `} */}
                  </label>
                  {/* {formik.errors.upload_logo_file && (
                    <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                      {formik.errors.upload_logo_file}{" "}
                    </div>
                  )} */}
                </div>
              </div>
              <div className="flex flex-row space-x-20 pb-[16px]">
                <div className="relative w-[350px]">
                  <input

                    type="text"
                    value={addnewfield}
                    onChange={(e) => setAddNewField(e.target.value)}

                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                    placeholder="john@doe.com"
                  />
                  <label
                    htmlFor="add_new_feild"
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                  >
                    Add new field
                  </label>
                  {/* {formik.errors.add_new_feild && (
                    <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                      {formik.errors.add_new_feild}{" "}
                    </div>
                  )} */}
                </div>
                <div className=" relative w-[350px]">
                  <input

                    type="text"
                    value={contactno}
                    onChange={(e) => setContactNo(e.target.value)}
                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="contact_no"
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                  >
                    Add new field
                  </label>
                  {/* {formik.errors.contact_no && (
                    <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                      {formik.errors.contact_no}{" "}
                    </div>
                  )} */}
                </div>
              </div>
              <div className="flex flex-col ">
                <div className="relative max-w-[860px]">
                  <input

                    type="text"
                    value={discription}
                    onChange={(e) => setDiscription(e.target.value)}
                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                    placeholder="john@doe.com"
                  />
                  <label
                    htmlFor="discription"
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                  >
                    Discription
                  </label>
                  {/* {formik.errors.discription && (
                    <div className="text-red-700 text-xs font-secondaryFont mt-[1px]">
                      {formik.errors.discription}{" "}
                    </div>
                  )} */}
                </div>
              </div>
              <div className="flex flex-row justify-end shadow-[buttonshadow] mr-[-30px] pb-[45.01px] content-center mt-[42px]">
                <div className="mr-[45px] shadow-[buttonshadow] ">
                  <button
                    onClick={() => {
                      navigate("/master/clients");
                    }}
                    className="w-[100px] btnshadow  h-[25px] rounded text-sm font-secondaryFont text-[14px] text-center font-medium not-italic items-center  bg-[#F42424] text-[#000000] "
                  >
                    Cancel
                  </button>
                </div>
                <div>
                  <button
                    onClick={(e) => SaveButton(e)}
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

export default EditClientProfile;
 