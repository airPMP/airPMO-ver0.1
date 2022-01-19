import React, { useState, } from "react";
import { useSearchParams } from "react-router-dom";

import { useToasts } from "react-toast-notifications";

import axios from "axios";


const ResetPassword = () => {

  const { addToast } = useToasts();
  const [NewPassword, setNewPassword] = useState("");
  const [ConformPassword, setConformPassword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const tokenData = searchParams.get("token")



  const onSubmitit = (e) => {
    e.preventDefault();
    if (tokenData) {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/api/changepassword/`,
          {
            Password: NewPassword,
            Confirm_Password: ConformPassword
          },
          {
            headers: {
              Authorization: `Bearer ${tokenData}`,
            },
          }
        )
        .then((response) => {
          console.error(response);
          if (response.status === 201) {
           
            addToast("Reset Password Sucessfully", {
              appearance: "success",
              autoDismiss: true,
            })

          }
          else{
            
            addToast("Login fail", {
              appearance: "error",
              autoDismiss: true,
            })
          }
        })
        .catch((error) => {
          
          addToast(error?.response?.data?.message , {
            appearance: "error",
            autoDismiss: true,
          })
        });
    }
  }



  return (
    <>
      <div class="flex flex-row justify-around lg:pt-40 md:pt-44 pt-52 mb-16 bg-indigo-100"  >
        <div class="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
          <div className="mb-4">
            <label class="block mb-2 text-indigo-500" for="username">  New Password</label>
            <input
              type="text"
              className="form-control p-3"
              placeholder="Enter New Password"
              id="email"
              onChange={(event) => setNewPassword(event.target.value)}
              value={NewPassword}
            />
          </div>
          <div className="mb-4">
            <label class="block mb-2 text-indigo-500" for="password"> Conform Password</label>
            <input
              type="text"
              className="form-control p-3"
              placeholder="Conform Your Password"
              id="email1"
              onChange={(event) => setConformPassword(event.target.value)}
              value={ConformPassword}
            />
          </div>
          <div>
            <button
              className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold
                    py-2 px-4 mb-6 rounded"
              onClick={(e) => onSubmitit(e)}
            >
              Submit
            </button>

          </div>

        </div>
      </div>
    </>
  );
};

export default ResetPassword;
