import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import SideBar from "../../layout/SideBar";
import Header from "../../layout/Header";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { reactLocalStorage } from "reactjs-localstorage";


 
const EditCategories = () => {

  const [title, setTitle] = useState(null); // the lifted state
  const [fileName, setFileName] = useState();
  let urlTitle = useLocation();
  let naviagte = useNavigate();
  const { addToast } = useToasts();
  const [editdata, setEditData] = useState(null)
  const [truedata,setTrueData]= useState(false)

  
  const [namedata, setName] = useState("")
  const [typedata, setType] = useState("")
   

  let useperma = useParams()

  console.log(useperma)

  useEffect(() => {
    if (urlTitle.pathname === "/master/clients/new_client") {
      setTitle("Master");
    }

    const token = reactLocalStorage.get("access_token", false);
    const feach = async () => {
        try {
          const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/categories/${useperma.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setType(data?.data?.type)
        setName(data?.data?.name)
         
      } catch (error) {
        console.log(error)
      }
    }

    feach();

  }, [urlTitle.pathname]);



  const SaveButton =  (e) => {

    e.preventDefault()

    const token = reactLocalStorage.get("access_token", false);

      axios.patch(`${process.env.REACT_APP_BASE_URL}/api/categories/${useperma.id}/`, {
        name: namedata,
        type: typedata,
        
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response)  => { 
        if (response.status === 200) { 
          addToast("Categierie is Edit Sucessfully", {
            appearance: "success",
            autoDismiss: true,
          })
           
        }
        
      })
      .catch((error) => {
        console.log(error)
        addToast(error.response.data.message, {
          appearance: "error",
          autoDismiss: true,
        })
         

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
              Edit categories
            </div>
          </div>
          <div className="pl-[120px] pr-[26px] pt-[33.49px]">
            <form  >
               
               
              <div className="flex flex-row space-x-20 pb-[16px]">
                <div className="relative w-[350px]">
                  <input

                    type="text"
                    value={namedata}
                    onChange={(e) => setName(e.target.value)}

                    className="peer h-10 w-full border-b font-medium font-secondaryFont border-[#000000] text-[#000000] placeholder-transparent focus:outline-none focus:border-[#000000]"
                    placeholder="john@doe.com"
                  />
                  <label
                    htmlFor="add_new_feild"
                    className="  absolute left-0 -top-3.5 font-medium font-secondaryFont text-[#000000] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#000000] peer-focus:text-sm"
                  >
                    Add Name
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
                    value={typedata}
                    onChange={(e) => setType(e.target.value)}
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

export default EditCategories;
  