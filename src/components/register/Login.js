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
        if (response.status === 201) {

          addToast("Login  Sucessfully", {
            appearance: "success",
            autoDismiss: true,
          })
          reactLocalStorage.set("access_token", response?.data?.token);
          navigate('/dashboard')
        }
        else {
          
          addToast("login fail", {
            appearance: "error",
            autoDismiss: true,
          })
        }
      })
      .catch((error) => { 
        addToast("login fail", {
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
  return (
    <div className="flex flex-row overflow-hidden w-[100%] h-[100vh]  lg:w-[100vw] xl:w[100vw] sm:w-[100vw] ">
      <div className="flex flex-col justify-center place-items-start w-[50%]">
        <img
          src="/logo1.svg"
          alt="logo"
          className="ml-[4.313rem] w-[150px] h-[50px]  right-[765px] mt-[70px]"
        />
        <div className="font-secondaryFont capitalize text-[#000000] mt-[18px] tracking-tighter not-italic leading-[73px] font-medium text-7xl max-w-[508px] max-h-[128px] ml-[4.313rem]">
          Promote PMO/
          <br />
          PMC Globally
        </div>
        <div className="mt-[50px] ml-[121px]  mb-[130px]">
          <img
            src="/Layer2.svg"
            width="454px"
            height="295.84px"
            alt="imagee"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center px-[116px] w-[50%] mb-[50px] ">
        <div className=" flex flex-col justify-center  max-w-[507px] max-h-[431px] px-[50px] py-[34px] border border-solid left-[817px] border-[#236F57] rounded-xl bg-[#FFFFFF] mt-[259px] mb-[210px] ml-[9.86%]  ">
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
                className="w-[227px] h-[20px] focus:outline-none"
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
                className="w-[101px] h-[20px] focus:outline-none "
                type="password"
                placeholder="**************"
                value={userpassword}
                onChange={(e) => setPassword(e.target.value)}
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
                    strokellinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="   border-[1px] border-solid border-[#000000] rounded bg-[#FFFFFF] mt-[37px]">
              <button onClick={() => { signUp() }} className="w-[161px] h-[37px] font-mainFont text-[15px] font-normal not-italic leading-[18px] text-[#000000] ">
                Sign Up
              </button>
            </div>
            <div className=" ml-[28px]  border-[1px] border-solid border-[#000000] rounded bg-[#0FCC7C] mt-[37px]">
              <button onClick={(e) => { submit(e) }} className="w-[161px] h-[37px] font-mainFont text-[15px] font-normal not-italic leading-[18px] text-[#000000] ">
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
