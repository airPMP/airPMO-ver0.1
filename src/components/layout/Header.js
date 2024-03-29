import React, { useEffect, useState } from "react";
import NotificationBar from "./NotificationBar";
import { useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { useToasts } from "react-toast-notifications";
import { getOrganizationByUserId } from "../../AllApi/Api";

const Header = ({ title, sendPage }) => {
  let navigate = useNavigate();
  const [dp, setDp] = useState(false);
  const [logoutbtn, setLogOutBtn] = useState(false);
  const [userOrg, setUserOrg] = useState(false);
  const { addToast } = useToasts();

  const sendStyle = (name) => { setDp(name); };

  useEffect(()=>{
    const user_id = reactLocalStorage.get("user_id", false);
    getOrganizationByUserId(user_id).then((o_data)=>{
      if(o_data?.data[0]){
        setUserOrg(o_data?.data[0])
      }
    })
  },[])

  const Logout = (e) => {
    reactLocalStorage.clear();
    navigate("/");
    document.title = "Airpmo";
    addToast("Logout  Sucessfully ", {
      appearance: "success",
      autoDismiss: true,
    });
  };

  return (
    <>
      <div
        className="flex flex-row w-[100%] max-h-[100px] justify-between  py-6
       mx-[20px] items-center border-b border-[#000000] lg:w-[100%] md:w-[100%]  sm:w-[100%]"
      >
        <div
          className="  font-secondaryFont font-medium    
        not-italic lg:text-[62px] md:text-[40px]  text-[20px] lg:w-[540px] md:w-[405px]    text-[#000000]"
        >
          {title}
        </div>
        <div
          className="  flex flex-row  items-center lg:w-[35%] md:w-[55%] h-[46px] mr-[10px] 
        ml-[10%]   bg-[#FFFFFF] rounded-[0.625rem] "
        >
          <div className="pl-[20px]">
            <svg
              width="11"
              height="12"
              viewBox="0 0 11 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="5"
                cy="5"
                r="4.3"
                stroke="#1B2559"
                strokeWidth="1.4"
              />
              <line
                x1="10.0101"
                y1="11"
                x2="8"
                y2="8.98995"
                stroke="#1B2559"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="bg-[#FFFFFF] pl-[7px]">
            <input
              type="text"
              placeholder="Search"
              className="outline-none w-[40%]"
            />
          </div>
        </div>
        <div className=" z-50">
          {dp === true ? (
            <div className=" absolute top-0 right-0 w-[full] h-[full] ">
              <NotificationBar sendStyle={sendStyle} />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-row    ">
          <svg
            className="cursor-pointer ml-[20px]"
            width="31"
            height="39"
            viewBox="0 0 46 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              setDp(true);
            }}
          >
            <path
              d="M22.9998 42.1667C20.8827 42.1667 19.1665 40.4504 19.1665 38.3333H26.8332C26.8332 40.4504 25.1169 42.1667 22.9998 42.1667ZM38.3332 36.4167H7.6665V32.5833L11.4998 30.6667V20.125C11.3989 17.4208 12.0095 14.7375 13.2708 12.3433C14.5263 10.1229 16.6723 8.54617 19.1665 8.01166V3.83332H26.1547C23.6637 6.61715 23.248 10.6881 25.1248 13.9179C27.0016 17.1478 30.7443 18.8024 34.3963 18.0167C34.4634 18.7009 34.496 19.4101 34.496 20.125V30.6667L38.3293 32.5833V36.4167H38.3332ZM32.5832 15.3333C29.5351 15.3286 27.0204 12.9462 26.851 9.90288C26.6816 6.85954 28.9164 4.2128 31.9451 3.86984C34.9738 3.52689 37.7439 5.6069 38.2593 8.61105C38.7747 11.6152 36.8563 14.4996 33.8865 15.1857C33.459 15.2839 33.0218 15.3334 32.5832 15.3333Z"
              fill="black"
            />
          </svg>
          <div>
            <svg
              className="cursor-pointer ml-[20px] mr-[30px]"
              width="31"
              height="39"
              viewBox="0 0 43 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                setLogOutBtn((o) => !o);
              }}
            >
              <path
                d="M0 43.7551C0 43.0462 0.202477 41.4737 0.443034 40.3135C1.81544 33.6951 6.38391 28.067 12.6131 25.3208C14.6942 24.4033 16.8876 23.8388 19.2518 23.6124C20.1862 23.5228 22.102 23.5228 23.0365 23.6124C26.3523 23.93 29.3235 24.9067 32.1212 26.5985C32.8118 27.0162 33.6198 27.5655 33.619 27.6167C33.619 27.6344 33.4192 27.7101 33.1756 27.7848C32.3491 28.0384 31.3805 28.5651 30.6248 29.1718C28.5994 30.7978 27.4615 33.4506 27.6961 36C28.0268 39.5945 30.5315 42.4131 34.0782 43.1819C34.5025 43.2738 34.6879 43.2863 35.6376 43.2863C36.8435 43.2863 37.2153 43.2319 38.1574 42.9179C39.419 42.4975 40.7091 41.6538 41.5506 40.6987L41.8627 40.3446L41.9613 40.8995C42.1398 41.9047 42.2882 43.2009 42.2882 43.7551V44H21.1441H0V43.7551ZM34.9513 42.4824C31.1748 42.1189 28.3223 38.8371 28.4964 35.0562C28.5778 33.2895 29.2602 31.6945 30.4745 30.4325C31.8837 28.968 33.6259 28.2222 35.6376 28.2222C37.6494 28.2222 39.3917 28.968 40.8009 30.4325C43.8863 33.639 43.3045 38.8398 39.5821 41.3275C38.6158 41.9733 37.4795 42.3684 36.2545 42.4846C35.6977 42.5374 35.5193 42.5371 34.9513 42.4824V42.4824ZM36.5091 40.7832C37.0005 40.7136 37.6553 40.4953 38.1615 40.2323C39.6651 39.4512 40.7162 38.0284 41.0311 36.3476C41.0731 36.1236 41.1036 35.7154 41.1036 35.3773C41.1036 35.0391 41.0731 34.6309 41.0311 34.4069C40.7196 32.7443 39.6752 31.318 38.1997 30.54C37.3816 30.1087 36.5773 29.9113 35.6376 29.9113C34.9752 29.9113 34.4719 29.9916 33.8802 30.1916C32.0053 30.8253 30.6128 32.4398 30.2442 34.4069C30.15 34.9094 30.15 35.8451 30.2442 36.3476C30.5592 38.0284 31.6102 39.4512 33.1138 40.2323C34.1751 40.7836 35.2615 40.9599 36.5091 40.7832ZM32.9774 38.1159C32.9774 37.4092 33.2304 36.8138 33.7532 36.2898C34.299 35.7428 34.9098 35.4935 35.6835 35.502C37.1127 35.5178 38.2978 36.7152 38.2978 38.1436V38.4503H35.6376H32.9774V38.1159ZM35.2936 34.7406C34.4872 34.5277 34.061 33.6608 34.3947 32.9123C34.6892 32.252 35.5044 31.956 36.1537 32.2737C36.954 32.6653 37.1506 33.7246 36.5412 34.3608C36.2443 34.6707 35.6798 34.8426 35.2936 34.7406ZM20.3108 20.4705C16.672 20.1432 13.5293 17.9984 11.9444 14.7606C11.2219 13.2847 10.9013 11.8959 10.9013 10.2428C10.9013 9.25907 10.9825 8.59702 11.2134 7.69959C11.4127 6.9249 11.5852 6.45876 11.9444 5.72508C12.9444 3.68211 14.5833 2.0432 16.6263 1.04312C18.1022 0.320645 19.491 0 21.1441 0C22.1278 0 22.79 0.0812321 23.6874 0.312102C24.4621 0.511415 24.9282 0.683975 25.6618 1.04312C27.7048 2.0432 29.3438 3.68211 30.3439 5.72508C31.0663 7.20099 31.387 8.58978 31.387 10.2428C31.387 11.4933 31.1859 12.66 30.7783 13.7745C30.2925 15.1028 29.4142 16.4723 28.3939 17.4926C26.5325 19.354 24.094 20.4015 21.4193 20.4887C21.0535 20.5006 20.5547 20.4924 20.3108 20.4705Z"
                fill="black"
              />
            </svg>
            <div className="relative" style={{ marginBottom: "-40px" }}>
              {logoutbtn && (
                <>
                <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1" role="none">
                  {userOrg && <div href="#" class="font-secondaryFont font-medium block px-4 py-2 text-sm cursor-pointer" role="menuitem" onClick={(e) => navigate("/userProfile")}>Account settings</div> }
                  <div href="#" class="font-secondaryFont font-medium block px-4 py-2 text-sm cursor-pointer" role="menuitem" onClick={(e) => Logout(e)}>Logout</div>
                </div>
                </div>
                  {/* <div>
                    <button
                      style={{ border: "2px solid red", background: "red" }}
                      className="text-[white] px-3 rounded-[3px]"
                      onClick={(e) => Logout(e)}
                    >
                      <b>Profile</b>
                    </button>
                  </div>

                  <div>
                    <button
                      style={{ border: "2px solid red", background: "red" }}
                      className="text-[white] px-3 rounded-[3px]"
                      onClick={(e) => Logout(e)}
                    >
                      <b>LogOut</b>
                    </button>
                  </div> */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
