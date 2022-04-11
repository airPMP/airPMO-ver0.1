import React, { useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Popup from "reactjs-popup";

const Login = () => {

  const { addToast } = useToasts();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [userdetail, setDetail] = useState([]);
  const [userdetailemail, setDetailEmail] = useState([]);
  const [userName, setName] = useState("");
  const [userpassword, setPassword] = useState("");

  const [showpassword, setshowpassword] = useState("password");
  const [showeye, setShowEye] = useState(" ");

  let navigate = useNavigate();

  const signUp = () => {
    navigate('/sign-up');
  };

  const submit = (e) => {
    e.preventDefault();

    const allData = { Email: userName, Password: userpassword };
    setDetail([...userdetail, allData]);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/login/`, {

        Email: userName,
        Password: userpassword,
      })
      .then((response) => {
        console.log(response)
        console.log(response?.data?.roles)
        if (response.status === 201) {

          
             if(response?.data?.user?.organization_id){
               if(response?.data?.roles[0]==="Airpmo Super Admin"){
              navigate('/dashboard')}
              else{
                 
                navigate('/daily_task')
                window.location.reload(false)
              }
             }
             else{
              navigate('/super_admin')
             }
             
          
          addToast("Login  Sucessfully", {
            appearance: "success",
            autoDismiss: true,
          })
          reactLocalStorage.set("access_token", response?.data?.access_token);
          reactLocalStorage.set("user_id", response?.data?.user?._id);
          reactLocalStorage.set("organization_id", response?.data?.user?.organization_id);
          reactLocalStorage.set("roles", response?.data?.roles);
          reactLocalStorage.set("permisions", response?.data?.permissions); 
           
        }
        else {

          addToast("login fail", {
            appearance: "error",
            autoDismiss: true,
          })
        }
      })
      .catch((error) => {
        console.log(error)
        addToast(error?.response?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        })
        navigate('/');

      });

    // navigate('/dashboard');
  };

  const Forget = () => {
    const allData = { Email: email };
    setDetail([...userdetailemail, allData]);
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/forget/`, { Email: email })

      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          addToast("Please Check Your Email", {
            appearance: "success",
            autoDismiss: true,
          })
        }
      })
      .catch((error) => {
        addToast(error.response.data.message, {
          appearance: "error",
          autoDismiss: true,
        })
      });
  }

  const CancelButton = (e) => {
    setOpen(o => !o)
  }




  const ShowPasswordButton = () => {
    setShowEye(o => !o)
    if (showeye) {
      setshowpassword("input")
    }
    else {
      setshowpassword("password")
    }
  }


  return (
    <div className="md:flex flex-row overflow-hidden w-[100%] md:h-[100vh]  lg:w-[100vw]     ">
      <div className="  md:flex-col justify-center place-items-start w-[50%]  md:block hidden">
        <img
          src="/logo1.svg"
          alt="logo"
          className="ml-[4.313rem] w-[150px] h-[50px]  right-[765px] mt-[70px] "
        />
        <div className="font-secondaryFont capitalize text-[#000000] mt-[18px] 
        tracking-tighter not-italic leading-[73px] font-medium 
        lg:text-7xl md:text-4xl max-w-[100%] max-h-[128px] ml-[4.313rem]">
          Promote PMO/
          <br />
          PMC Globally
        </div>
        <div className="mt-[50px] ml-[121px]  mb-[130px]">
          <img
            src="/Layer2.svg"
            width="74%"
            height="295.84px"
            alt="imagee"
          />
        </div>
      </div>
      <div className="md:hidden block">
        <img
          src="/logo1.svg"
          alt="logo"
          className="  w-[200px] h-[50px]  pl-5 mt-[70px] "
        />
      </div>

      <div className="flex flex-col justify-center items-center lg:p-0 p-5 
       lg:px-[116px] md:w-[50%] w-[100%] 
     mb-[50px] ">
        <div className=" flex flex-col justify-center   w-[100%] max-h-[431px]
       px-[50px] py-[34px] border border-solid left-[817px] border-[#236F57] 
       rounded-xl bg-[#FFFFFF] md:mt-[259px] mb-[210px] lg:ml-[9.86%]  ">
          <div className="font-mainFont font-normal not-italic w-[93px] h-[30px]  tracking-[1.5px] text-[32px]">
            Login
          </div>
          <div className=" mt-[39px]">
            <span className=" font-secondaryFont leading-5 font-normal text-[15px] text-[#4D627A] not-italic w-[109px] h-[20px]">
              <a href="/sign-up">
                Email Or Mobile{" "}
              </a>

            </span>
          </div>
          <div className=" flex 10px items-center mt-[10px]">
            <div className=" flex justify-between w-[350px]  pl-4 pt-[15px] pb-[13px] pr-[22px] h-[48px]  border-[1px] border-solid border-[#EBF2FB] font-secondaryFont bg-[#FBFCFE] text-[#7B8A9B]">
              <input
                className="w-[100%] h-[20px] focus:outline-none"
                type="text"
                placeholder="Enter your email or phone number"
                onChange={(event) => setName(event.target.value)}
                value={userName}
              />
              <div>
                <svg
                  className="text-[#4D627A]"
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 9L5 5L1 1"
                    stroke="#4D627A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="mt-[24px]">
            <span className=" font-secondaryFont leading-5 font-normal text-[15px] text-[#4D627A] not-italic w-[109px] h-[20px]">
              Password{" "}
            </span>
          </div>
          <div className="flex items-center mt-[10px]">
            <div className=" flex justify-between w-[350px]  h-[48px]  pl-4 pt-[15px] pb-[13px] pr-[22px] font-secondaryFont border-[1px] border-solid border-[#EBF2FB] bg-[#FBFCFE] text-[#7B8A9B]">
              <input
                className="w-[100%] h-[20px] focus:outline-none "
                type={showpassword}
                placeholder="**************"
                value={userpassword}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div>

                {showeye ? (<div onClick={() => ShowPasswordButton()} className="cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">

                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </div>)
                  :
                  (<div onClick={() => ShowPasswordButton()} className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>)}
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="   border-[1px] border-solid border-[#000000] rounded bg-[#FFFFFF] mt-[37px]">
              <button onClick={() => { signUp() }} className="lg:w-[161px] 
              w-[100px] responcev_btn h-[37px] font-mainFont text-[15px] font-normal not-italic leading-[18px] text-[#000000] ">
                Sign Up
              </button>
            </div>
            <div className=" ml-[28px]  border-[1px] border-solid border-[#000000] rounded bg-[#0FCC7C] mt-[37px]">
              <button onClick={(e) => { submit(e) }} className="lg:w-[161px]  
              w-[100px] responcev_btn h-[37px] font-mainFont text-[15px] font-normal not-italic leading-[18px] text-[#000000] ">
                Login
              </button>
            </div>

          </div>
          <div className="mt-3 " >
            <div className="float-right text-[14px] text-[blue] cursor-pointer" onClick={() => setOpen(o => !o)}>
              Forget Password ?
            </div>

            <Popup
              open={open}
              position="right center"
              model
            >
              <div className="p-7">
                <div className="flex pb-3">
                  <div>
                    <label
                      htmlFor="email"
                      className="font-size-4 text-black-2 font-weight-semibold  "
                    >
                      Email
                    </label>
                  </div>
                  <div style={{ marginLeft: "90%" }}>
                    <span className="text-[red] text-[19px] cursor-pointer" onClick={(e) => CancelButton(e)} >
                      <b>X</b>
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <input
                    type="email"
                    className="form-control w-[100%] py-2 px-2"
                    placeholder="Enter Your Email"
                    id="email"
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                    style={{ border: "1px solid gray" }}
                  />
                </div>
                <div className=" w-[70px] text-center border-[1px] border-solid border-[#000000] rounded bg-[#09a061] mt-[30px]">
                  <button
                    onClick={() => { Forget() }}
                    className="  h-[37px] font-mainFont text-[15px] font-normal not-italic leading-[18px]   text-[#ffffff] ">
                    Submit
                  </button>
                </div>
              </div>

            </Popup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
