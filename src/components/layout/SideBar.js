import React, { useLayoutEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserApiOrgnization_id, getUserApi } from "../../AllApi/Api";
import axios from "axios";
import { ProjectLogoSet } from "../../SimplerR/auth";

const SideBar = ({ sendDataToParent }) => {
  const [style, setStyle] = useState(1);
  const [Rolesdata, setRolesdata] = useState(null);
  const [title, setTitle] = useState(null);
  const [userData, setUserData] = useState(null);
  const [funTrue, setFunTrue] = useState(true);
  const projectLogoSet=ProjectLogoSet.use()
  let navigate = useNavigate();
  let param = useLocation();
  let urlTitle = useLocation();

  useEffect(() => {

    if (urlTitle.pathname === "/dashboard") {
      setTitle("Dashboard");
    }


  }, [urlTitle.pathname])

  const gotoDashboard = () => {
    navigate("/dashboard");
  };
  const gotoJobCards = () => {
    navigate("/daily_task");
  };

  const gotoJobMaster = () => {
    navigate("/master");
  };

  const gotoJobTimeLine = () => {
    navigate("/timeline");
  };

  useEffect(() => {
    const rolesData = reactLocalStorage.get("roles", "roles");
    setRolesdata(rolesData)
  })

  useEffect(() => {

    const token = reactLocalStorage.get("access_token", false)
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((responce) => {
      console.log(responce)
      setUserData(responce?.data[0])
      ProjectLogoSet.set(responce?.data[0]?.logo_url)
    })  

  }, [Rolesdata])

 

  return (
    <div className="flex flex-col max-w-[252px] w-[252px] px-[26px] overflow-hidden  h-[100vh] bg-[#FFFFFF]">
      <div className="divide-solid">

        <img
          src={projectLogoSet ? projectLogoSet : "/abe_logo.jpg"}
          alt="logo"
          width="182px"
          height="60.67px"
          className="px-[35px] pt-[26px]"
        />

        <hr className=" mt-[30.33px] border  border-[#000000] " />
      </div>

      {Rolesdata === "Airpmo Super Admin" || urlTitle.pathname === "/dashboard" ? <div
        className={`flex flex-row justify-start mt-[55px] max-w-[200px] max-h-[50px]  py-[11px] px-[15px]  rounded cursor-pointer space-x-4 ${param.pathname === "/dashboard" ||
          param.pathname === "/dashboard/user"
          ? "bg-[#136C57]"
          : ""
          } `}
        onClick={() => {
          gotoDashboard();
        }}
      >
        <div className="">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.66667 15.1667H11.6667C12.3083 15.1667 12.8333 14.6417 12.8333 14V4.66667C12.8333 4.025 12.3083 3.5 11.6667 3.5H4.66667C4.025 3.5 3.5 4.025 3.5 4.66667V14C3.5 14.6417 4.025 15.1667 4.66667 15.1667ZM4.66667 24.5H11.6667C12.3083 24.5 12.8333 23.975 12.8333 23.3333V18.6667C12.8333 18.025 12.3083 17.5 11.6667 17.5H4.66667C4.025 17.5 3.5 18.025 3.5 18.6667V23.3333C3.5 23.975 4.025 24.5 4.66667 24.5ZM16.3333 24.5H23.3333C23.975 24.5 24.5 23.975 24.5 23.3333V14C24.5 13.3583 23.975 12.8333 23.3333 12.8333H16.3333C15.6917 12.8333 15.1667 13.3583 15.1667 14V23.3333C15.1667 23.975 15.6917 24.5 16.3333 24.5ZM15.1667 4.66667V9.33333C15.1667 9.975 15.6917 10.5 16.3333 10.5H23.3333C23.975 10.5 24.5 9.975 24.5 9.33333V4.66667C24.5 4.025 23.975 3.5 23.3333 3.5H16.3333C15.6917 3.5 15.1667 4.025 15.1667 4.66667Z"
              fill={`${param.pathname === "/dashboard" ||
                param.pathname === "/dashboard/user"
                ? "white"
                : "black"
                }`}
            />
          </svg>
        </div>



        <div
          className={`${param.pathname === "/dashboard" ||
            param.pathname === "/dashboard/user"
            ? "text-white"
            : "text-[#000000]"
            }  font-secondaryFont not-italic font-bold text-base leading-7 tracking-[-0.02em]`}
        >
          Dashboard
        </div>
      </div> : null}
      <div
        className={` flex flex-row justify-start mt-[15px] max-w-[200px] max-h-[50px]  py-[11px] px-[15px]  rounded cursor-pointer space-x-4 ${param.pathname.includes("/daily_task") ? "bg-[#136C57]" : ""
          }`}
        onClick={() => {
          gotoJobCards();
        }}
      >
        <div>
          <svg
            width="23"
            height="28"
            viewBox="0 0 23 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.2686 26.6797V2.92108C22.2686 2.90806 22.2686 2.89178 22.2654 2.87875V2.87549C22.223 2.28283 21.7606 1.84973 21.1615 1.83671C21.0377 1.83345 20.914 1.83671 20.7902 1.83671H14.424V3.80682H15.2934C15.7493 3.80682 16.088 4.1813 16.1075 4.62092C16.1271 5.06053 15.72 5.43501 15.2934 5.43501H6.97663C6.52073 5.43501 6.18207 5.06053 6.16253 4.62092C6.14299 4.1813 6.55004 3.80682 6.97663 3.80682H7.49114V1.83345H2.24184C1.84456 1.83345 1.44077 1.81066 1.04349 1.83671C0.447572 1.87578 0.0177292 2.3447 0.00144728 2.93736C0.00144728 2.99924 0.00144728 3.06436 0.00144728 3.12624V26.4843C0.00144728 26.6243 -0.0018091 26.7676 0.00144728 26.9076C0.0209856 27.5198 0.493161 27.979 1.10211 27.9953C1.17375 27.9953 1.24864 27.9953 1.32028 27.9953H20.7251C20.9563 27.9953 21.2136 28.0181 21.4415 27.9627C21.9365 27.8422 22.2621 27.3896 22.2654 26.8881C22.2686 26.8165 22.2686 26.7481 22.2686 26.6797ZM8.46154 9.88324C9.39287 8.82491 11.0308 8.57417 12.3366 8.96494C12.9814 9.16032 13.561 9.5348 13.9648 10.0754C14.4207 10.6811 14.5966 11.4398 14.6031 12.1855V12.1888C14.6031 12.4004 14.5868 12.6088 14.5608 12.8205C14.3589 14.3315 13.3722 15.888 11.8156 16.2658C10.2721 16.6402 8.83928 15.6503 8.16521 14.3054C7.48788 12.9508 7.40973 11.0783 8.46154 9.88324ZM17.8334 23.7652C17.8334 23.8531 17.7585 23.928 17.6706 23.928C17.6641 23.928 17.6543 23.928 17.6478 23.928C17.1235 23.9508 16.5895 23.928 16.0652 23.928H4.59946C4.55062 23.928 4.51154 23.9118 4.48875 23.8824L4.48549 23.8792C4.48549 23.8792 4.48224 23.8792 4.48224 23.8759C4.45618 23.8499 4.43665 23.8141 4.43665 23.7652V21.2741C4.43665 20.7042 4.5897 20.1571 4.93813 19.698C5.22144 19.3235 5.59592 19.0662 6.01925 18.8774C6.81055 18.5257 7.60185 18.174 8.39316 17.8256C8.67646 17.7018 8.95651 17.5716 9.23982 17.4478C9.55569 17.3111 9.70222 17.5878 9.8683 17.8028C10.2916 18.3564 10.7117 18.9067 11.135 19.4603C11.6137 18.8448 12.0892 18.2294 12.5678 17.6139C12.6525 17.5064 12.7274 17.399 12.887 17.4022C12.9781 17.4022 13.0726 17.4576 13.154 17.4934C13.4959 17.6465 13.8378 17.7963 14.1798 17.9493C14.9059 18.2717 15.6321 18.5941 16.355 18.9197C16.9021 19.1672 17.3547 19.597 17.6055 20.1474C17.7976 20.5707 17.8334 21.0038 17.8334 21.4597V23.7652Z"
              fill={`${param.pathname.includes("/daily_task") ? "white" : "black"
                }`}
            />
            <path
              d="M12.806 0.377741C12.8028 0.371228 12.7995 0.364715 12.7995 0.354946C12.7995 0.364715 12.7995 0.374485 12.7995 0.384254V3.80672H9.11979V0.801071C9.11979 0.651277 9.11979 0.50474 9.12305 0.354946C9.11979 0.361459 9.11654 0.367972 9.11328 0.377741C9.11979 0.367972 9.12305 0.358203 9.12305 0.345177C9.12305 0.328895 9.12305 0.309357 9.12305 0.293075C9.12305 0.286562 9.12305 0.280049 9.12305 0.273537C9.11654 0.283306 9.11979 0.276793 9.12631 0.263767C9.12631 0.257255 9.12956 0.253998 9.13282 0.250742C9.14259 0.23446 9.15236 0.211665 9.15887 0.195383C9.16538 0.185614 9.16864 0.175845 9.16864 0.169332C9.16864 0.175845 9.16538 0.182358 9.16538 0.188871C9.17515 0.179101 9.18492 0.169332 9.19143 0.156307C9.19143 0.15305 9.19469 0.15305 9.19469 0.149794C9.20446 0.133512 9.21423 0.120486 9.22074 0.113974C9.21097 0.120486 9.21423 0.113974 9.25656 0.0814097C9.28587 0.058615 9.2989 0.0488458 9.30215 0.0488458C9.2989 0.0488458 9.2989 0.0488458 9.29564 0.0521021C9.20772 0.0814096 9.42589 -0.0227947 9.38031 0.0130256C9.41613 0.00976921 9.44869 0.00325639 9.48451 0C9.478 0.00325639 9.46823 0.00651287 9.4552 0.00976926C9.46823 0.00976926 9.48451 0.00976926 9.49754 0.00976926C10.1456 9.89888e-08 10.7968 0.00976926 11.4481 0.00976926C11.7607 0.00976926 12.0733 0.00651287 12.386 0.00976926C12.4022 0.00976926 12.4185 0.00976921 12.4348 0.0130256C12.4478 0.0130256 12.4674 0.0130255 12.4902 0.0162819C12.4967 0.0162819 12.5032 0.0162819 12.5097 0.0162819C12.5129 0.0162819 12.5129 0.0162819 12.5162 0.0162819C12.526 0.0162819 12.539 0.0162819 12.5488 0.0162819C12.539 0.0162819 12.5292 0.0162819 12.5195 0.0195383C12.5292 0.0227947 12.539 0.0260511 12.552 0.0325639C12.5553 0.0358203 12.5618 0.0390767 12.5651 0.0423331C12.5813 0.0488459 12.5976 0.0553587 12.6139 0.0586151C12.5553 -0.00976906 12.7572 0.146537 12.679 0.110717C12.6921 0.126999 12.7181 0.156307 12.7344 0.172589C12.7344 0.169332 12.7344 0.169332 12.7344 0.166076C12.7344 0.169332 12.7344 0.169332 12.7344 0.172589C12.7507 0.188871 12.7572 0.19864 12.7344 0.179101C12.7376 0.192127 12.7409 0.205152 12.7474 0.221434C12.7474 0.221434 12.7474 0.224691 12.7507 0.224691C12.7702 0.257255 12.7767 0.283306 12.7735 0.289818C12.7735 0.289818 12.7735 0.289818 12.7735 0.293075C12.7767 0.3061 12.78 0.332152 12.7832 0.35169C12.7832 0.332152 12.7832 0.312613 12.78 0.293075C12.7767 0.263767 12.7767 0.247485 12.7767 0.244229C12.7767 0.247485 12.78 0.276793 12.7865 0.325639C12.8028 0.341921 12.8028 0.361459 12.806 0.377741Z"
              fill={`${param.pathname.includes("/daily_task") ? "white" : "black"
                }`}
            />
          </svg>
        </div>
        <div
          className={` ${param.pathname.includes("/daily_task")
            ? "text-white"
            : "text-[#000000]"
            } font-secondaryFont not-italic font-bold text-base leading-7 tracking-[-0.02em]`}
        >
          Activities
        </div>
      </div>
      <div
        className={`flex flex-row justify-start greenball mt-[15px] max-w-[200px] max-h-[50px] px-[15px] py-[11px]   rounded cursor-pointer space-x-4 ${param.pathname.includes("/master") ? "bg-[#136C57]" : ""
          } `}
        onClick={() => {

          gotoJobMaster();
        }}
      >

        <div>
          <svg
            width="27"
            height="28"
            viewBox="0 0 27 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.19935 10.7779C2.1978 10.6695 2.20969 10.5614 2.23476 10.456C2.27982 10.25 2.37959 9.99576 2.55661 9.92817C2.60348 9.91372 2.65243 9.90719 2.70144 9.90886C2.95573 9.93441 3.19937 10.0241 3.40952 10.1696L13.5543 15.9114L21.5813 11.2381H21.607L25.2536 9.08813V11.7241L13.3837 18.7372C9.69528 16.6388 4.33001 13.5715 3.99529 13.343C2.8334 12.4772 2.19935 11.56 2.19935 10.7779Z"
              fill={`${param.pathname.includes("/master") ? "white" : "black"}`}
            />
            <path
              d="M25.7652 8.09315L25.7588 8.08993L25.7652 8.0835V8.09315Z"
              fill={`${param.pathname.includes("/master") ? "white" : "black"}`}
            />
            <path
              d="M16.2484 0.420539C14.6745 -0.422712 13.4869 0.262832 13.4869 0.262832L1.21146 7.57852C1.21146 7.57852 0.0624492 8.06451 0.00129736 10.2402C-0.0598544 12.4159 2.06115 14.5337 2.06115 14.5337C2.06115 14.5337 0.181534 15.0777 0.545227 17.7522C0.908919 20.4268 3.81202 22.3386 3.81202 22.3386L13.7476 28L26.8952 20.1018V6.55503C26.8952 6.55503 17.8254 1.28632 16.2484 0.420539ZM1.23721 10.2241C1.30162 9.89597 1.44774 9.58934 1.66205 9.33261C1.80527 9.17116 1.98678 9.04831 2.18989 8.97535C2.96233 8.68891 3.79915 9.20709 3.96651 9.32295L13.5448 14.7301L21.5654 10.0664L22.061 9.76389L26.2644 7.31782V12.329L13.3903 19.9215L13.1328 19.7767C11.5654 18.8852 3.73478 14.4275 3.40649 14.1765C1.69746 12.9019 0.934667 11.5051 1.23721 10.2241ZM26.3127 19.1845L13.5191 26.8188L3.86352 21.3892C3.78305 21.3441 1.79079 20.2112 1.79079 17.8488C1.79079 17.0699 2.03218 16.5389 2.50852 16.2621C3.3389 15.7857 4.43963 16.4069 4.57803 16.4777L13.9117 21.5372L26.3835 14.0381L26.3127 19.1845ZM4.07272 17.3789C3.81436 17.2199 3.52216 17.1239 3.21981 17.0989C3.14838 17.0955 3.07732 17.111 3.01383 17.1439C2.88187 17.2148 2.80784 17.4658 2.80784 17.8391C2.80784 19.6093 4.34308 20.4848 4.35917 20.4912L13.5191 25.6344L25.2924 18.5955L25.3246 15.8469L13.9343 22.6959L13.5191 22.4899L4.07272 17.3789Z"
              fill={`${param.pathname.includes("/master") ? "white" : "black"}`}
            />
            <path
              d="M25.7652 8.0835V8.09315L25.7588 8.08993L25.7652 8.0835Z"
              fill={`${param.pathname.includes("/master") ? "white" : "black"}`}
            />
          </svg>
        </div>
        <div
          className={`${param.pathname.includes("/master")
            ? "text-white"
            : "text-[#000000]"
            } font-secondaryFont not-italic font-bold text-base leading-7 tracking-[-0.02em] greenball1`}
        >

          {param.pathname === ("/master") ?
            (<div className="greenballavailable1">
              <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="23.6866" cy="23.6866" r="23.6866" fill="#0FCC7C" />
              </svg>
            </div>)
            : (<>
            </>)}

          Master
        </div>
      </div>
      <div
        className={`flex flex-row justify-start mt-[15px] max-w-[200px] max-h-[50px]  py-[11px] px-[12px]  rounded cursor-pointer space-x-4 ${param.pathname.includes("/timeline") ? "bg-[#136C57]" : ""
          } `}
        onClick={() => {
          gotoJobTimeLine();
        }}
      >
        <div>
          <svg
            width="30"
            height="28"
            viewBox="0 0 30 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.28525 0C5.04289 0 4.84597 0.196352 4.84597 0.438532V1.45602H2.12429C0.9528 1.45602 0 2.40924 0 3.58093V22.6556C0 24.0219 1.11176 25.1336 2.47817 25.1336H20.617C21.3429 26.8179 23.0192 28 24.9667 28C27.5771 28 29.7007 25.8761 29.7007 23.2657C29.7007 21.2858 28.4782 19.5873 26.749 18.8816V3.58093C26.749 2.40953 25.7962 1.45602 24.6248 1.45602H21.9031V0.438532C21.9031 0.196352 21.7067 0 21.4647 0C21.2223 0 21.026 0.196352 21.026 0.438532V1.45602H16.51V0.438532C16.51 0.196352 16.3137 0 16.0713 0C15.8293 0 15.6329 0.196352 15.6329 0.438532V1.45602H11.1169V0.438532C11.1169 0.196352 10.9206 0 10.6783 0C10.4362 0 10.2399 0.196352 10.2399 0.438532V1.45602H5.72357V0.438532C5.72357 0.196352 5.52725 0 5.28519 0H5.28525ZM2.1242 2.3332H4.84589V2.99731C4.03446 3.19482 3.43005 3.92754 3.43005 4.79896C3.43005 5.82185 4.26197 6.65377 5.28457 6.65377C6.30716 6.65377 7.13967 5.82185 7.13967 4.79896C7.13967 3.92754 6.53467 3.19482 5.72325 2.99731V2.3332H10.2392V2.99731C9.42752 3.19482 8.82311 3.92754 8.82311 4.79896C8.82311 5.82185 9.65503 6.65377 10.6776 6.65377C11.7002 6.65377 12.5327 5.82185 12.5327 4.79896C12.5327 3.92754 11.9277 3.19482 11.1163 2.99731V2.3332H15.6323V2.99731C14.8206 3.19482 14.2162 3.92754 14.2162 4.79896C14.2162 5.82185 15.0481 6.65377 16.0707 6.65377C17.0936 6.65377 17.9258 5.82185 17.9258 4.79896C17.9258 3.92754 17.3217 3.19482 16.51 2.99731V2.3332H21.026V2.99731C20.2142 3.19482 19.6092 3.92754 19.6092 4.79896C19.6092 5.82185 20.4418 6.65377 21.4646 6.65377C22.4872 6.65377 23.3192 5.82185 23.3192 4.79896C23.3192 3.92754 22.7147 3.19482 21.903 2.99731V2.3332H24.6242C25.3121 2.3332 25.8719 2.89306 25.8719 3.58093V7.14799H0.876974L0.877004 3.58093C0.877004 2.89306 1.43636 2.3332 2.1242 2.3332V2.3332ZM4.84589 3.92665V4.79896C4.84589 5.04132 5.0428 5.23764 5.28516 5.23764C5.52722 5.23764 5.72354 5.04132 5.72354 4.79896V3.92665C6.04283 4.08763 6.26261 4.4179 6.26261 4.79896C6.26261 5.33803 5.82423 5.77641 5.28516 5.77641C4.74609 5.77641 4.30711 5.33803 4.30711 4.79896C4.30711 4.4179 4.5269 4.08763 4.84589 3.92665ZM10.2398 3.92665V4.79896C10.2398 5.04132 10.4362 5.23764 10.6782 5.23764C10.9206 5.23764 11.1163 5.04132 11.1163 4.79896V3.92665C11.4353 4.08763 11.6557 4.4179 11.6557 4.79896C11.6557 5.33803 11.2173 5.77641 10.6782 5.77641C10.1392 5.77641 9.70018 5.33803 9.70018 4.79896C9.70018 4.4179 9.92056 4.08763 10.2398 3.92665V3.92665ZM15.6329 3.92665V4.79896C15.6329 5.04132 15.8292 5.23764 16.0713 5.23764C16.3136 5.23764 16.51 5.04132 16.51 4.79896V3.92665C16.829 4.08763 17.0487 4.4179 17.0487 4.79896C17.0487 5.33803 16.6104 5.77641 16.0713 5.77641C15.5322 5.77641 15.0932 5.33803 15.0932 4.79896C15.0932 4.4179 15.3136 4.08763 15.6329 3.92665ZM21.026 3.92665V4.79896C21.026 5.04132 21.2223 5.23764 21.4646 5.23764C21.7067 5.23764 21.903 5.04132 21.903 4.79896V3.92665C22.2223 4.08763 22.4421 4.4179 22.4421 4.79896C22.4421 5.33803 22.0034 5.77641 21.4646 5.77641C20.9256 5.77641 20.4866 5.33803 20.4866 4.79896C20.4866 4.4179 20.7067 4.08763 21.026 3.92665ZM4.29078 9.60573H5.30536C5.96471 9.60573 6.5017 10.1421 6.5017 10.8012V11.8158C6.5017 12.4751 5.96471 13.0115 5.30536 13.0115H4.29078C3.63172 13.0115 3.09532 12.4751 3.09532 11.8158V10.8012C3.09532 10.1421 3.63172 9.60573 4.29078 9.60573V9.60573ZM8.57897 9.60573H9.59415C10.2532 9.60573 10.7896 10.1421 10.7896 10.8012V11.8158C10.7896 12.4751 10.2532 13.0115 9.59415 13.0115H8.57897C7.91962 13.0115 7.38382 12.4751 7.38382 11.8158V10.8012C7.38382 10.1421 7.91962 9.60573 8.57897 9.60573V9.60573ZM12.8669 9.60573H13.882C14.5414 9.60573 15.0778 10.1421 15.0778 10.8012V11.8158C15.0778 12.4751 14.5414 13.0115 13.882 13.0115H12.8669C12.2078 13.0115 11.672 12.4751 11.672 11.8158V10.8012C11.672 10.1421 12.2078 9.60573 12.8669 9.60573V9.60573ZM17.1557 9.60573H18.1702C18.8293 9.60573 19.3657 10.1421 19.3657 10.8012V11.8158C19.3657 12.4751 18.8293 13.0115 18.1702 13.0115H17.1557C16.4963 13.0115 15.9593 12.4751 15.9593 11.8158V10.8012C15.9593 10.1421 16.4963 9.60573 17.1557 9.60573V9.60573ZM21.4436 9.60573H22.4581C23.1175 9.60573 23.6539 10.1421 23.6539 10.8012V11.8158C23.6539 12.4751 23.1175 13.0115 22.4581 13.0115H21.4436C20.7845 13.0115 20.2475 12.4751 20.2475 11.8158V10.8012C20.2475 10.1421 20.7845 9.60573 21.4436 9.60573V9.60573ZM4.29078 10.4828C4.11525 10.4828 3.97239 10.6257 3.97239 10.8012V11.8158C3.97239 11.9916 4.11525 12.1345 4.29078 12.1345H5.30536C5.48118 12.1345 5.62464 11.9916 5.62464 11.8158V10.8012C5.62464 10.6257 5.48118 10.4828 5.30536 10.4828H4.29078ZM8.57897 10.4828C8.40344 10.4828 8.26088 10.6257 8.26088 10.8012V11.8158C8.26088 11.9916 8.40344 12.1345 8.57897 12.1345H9.59415C9.76968 12.1345 9.91254 11.9916 9.91254 11.8158V10.8012C9.91254 10.6257 9.76968 10.4828 9.59415 10.4828H8.57897ZM12.8669 10.4828C12.6913 10.4828 12.5491 10.6257 12.5491 10.8012V11.8158C12.5491 11.9916 12.6913 12.1345 12.8669 12.1345H13.882C14.0576 12.1345 14.2004 11.9916 14.2004 11.8158V10.8012C14.2004 10.6257 14.0576 10.4828 13.882 10.4828H12.8669ZM17.1557 10.4828C16.9798 10.4828 16.837 10.6257 16.837 10.8012V11.8158C16.837 11.9916 16.9798 12.1345 17.1557 12.1345H18.1702C18.3458 12.1345 18.4886 11.9916 18.4886 11.8158V10.8012C18.4886 10.6257 18.3458 10.4828 18.1702 10.4828H17.1557ZM21.4436 10.4828C21.268 10.4828 21.1252 10.6257 21.1252 10.8012V11.8158C21.1252 11.9916 21.268 12.1345 21.4436 12.1345H22.4581C22.6337 12.1345 22.7768 11.9916 22.7768 11.8158V10.8012C22.7768 10.6257 22.6337 10.4828 22.4581 10.4828H21.4436ZM4.29078 13.9337H5.30536C5.96471 13.9337 6.5017 14.4701 6.5017 15.1295V16.1441C6.5017 16.8031 5.96471 17.3395 5.30536 17.3395H4.29078C3.63172 17.3395 3.09532 16.8031 3.09532 16.1441V15.1295C3.09532 14.4701 3.63172 13.9337 4.29078 13.9337ZM8.57897 13.9337H9.59415C10.2532 13.9337 10.7896 14.4701 10.7896 15.1295V16.1441C10.7896 16.8031 10.2532 17.3395 9.59415 17.3395H8.57897C7.91962 17.3395 7.38382 16.8031 7.38382 16.1441V15.1295C7.38382 14.4701 7.91962 13.9337 8.57897 13.9337ZM12.8669 13.9337H13.882C14.5414 13.9337 15.0778 14.4701 15.0778 15.1295V16.1441C15.0778 16.8031 14.5414 17.3395 13.882 17.3395H12.8669C12.2078 17.3395 11.672 16.8031 11.672 16.1441V15.1295C11.672 14.4701 12.2078 13.9337 12.8669 13.9337V13.9337ZM17.1557 13.9337H18.1702C18.8293 13.9337 19.3657 14.4701 19.3657 15.1295V16.1441C19.3657 16.8031 18.8293 17.3395 18.1702 17.3395H17.1557C16.4963 17.3395 15.9593 16.8031 15.9593 16.1441V15.1295C15.9593 14.4701 16.4963 13.9337 17.1557 13.9337ZM21.4436 13.9337H22.4581C23.1175 13.9337 23.6539 14.4701 23.6539 15.1295V16.1441C23.6539 16.8031 23.1175 17.3395 22.4581 17.3395H21.4436C20.7845 17.3395 20.2475 16.8031 20.2475 16.1441V15.1295C20.2475 14.4701 20.7845 13.9337 21.4436 13.9337ZM4.29078 14.8108C4.11525 14.8108 3.97239 14.9539 3.97239 15.1295V16.1441C3.97239 16.3196 4.11525 16.4624 4.29078 16.4624H5.30536C5.48118 16.4624 5.62464 16.3196 5.62464 16.1441V15.1295C5.62464 14.9539 5.48118 14.8108 5.30536 14.8108H4.29078ZM8.57897 14.8108C8.40344 14.8108 8.26088 14.9539 8.26088 15.1295V16.1441C8.26088 16.3196 8.40344 16.4624 8.57897 16.4624H9.59415C9.76968 16.4624 9.91254 16.3196 9.91254 16.1441V15.1295C9.91254 14.9539 9.76968 14.8108 9.59415 14.8108H8.57897ZM12.8669 14.8108C12.6913 14.8108 12.5491 14.9539 12.5491 15.1295V16.1441C12.5491 16.3196 12.6913 16.4624 12.8669 16.4624H13.882C14.0576 16.4624 14.2004 16.3196 14.2004 16.1441V15.1295C14.2004 14.9539 14.0576 14.8108 13.882 14.8108H12.8669ZM17.1557 14.8108C16.9798 14.8108 16.837 14.9539 16.837 15.1295V16.1441C16.837 16.3196 16.9798 16.4624 17.1557 16.4624H18.1702C18.3458 16.4624 18.4886 16.3196 18.4886 16.1441V15.1295C18.4886 14.9539 18.3458 14.8108 18.1702 14.8108H17.1557ZM21.4436 14.8108C21.268 14.8108 21.1252 14.9539 21.1252 15.1295V16.1441C21.1252 16.3196 21.268 16.4624 21.4436 16.4624H22.4581C22.6337 16.4624 22.7768 16.3196 22.7768 16.1441V15.1295C22.7768 14.9539 22.6337 14.8108 22.4581 14.8108H21.4436ZM4.29078 18.2626H5.30536C5.96471 18.2626 6.5017 18.7984 6.5017 19.4575V20.4726C6.5017 21.132 5.96471 21.6681 5.30536 21.6681H4.29078C3.63172 21.6681 3.09532 21.132 3.09532 20.4726V19.4575C3.09532 18.7981 3.63172 18.2626 4.29078 18.2626ZM8.57897 18.2626H9.59415C10.2532 18.2626 10.7896 18.7981 10.7896 19.4575V20.4726C10.7896 21.132 10.2532 21.6681 9.59415 21.6681H8.57897C7.91962 21.6681 7.38382 21.132 7.38382 20.4726V19.4575C7.38382 18.7981 7.91962 18.2626 8.57897 18.2626ZM12.8669 18.2626H13.882C14.5414 18.2626 15.0778 18.7981 15.0778 19.4575V20.4726C15.0778 21.132 14.5414 21.6681 13.882 21.6681H12.8669C12.2078 21.6681 11.672 21.132 11.672 20.4726V19.4575C11.672 18.7981 12.2078 18.2626 12.8669 18.2626V18.2626ZM17.1301 18.2626H18.1447C18.8038 18.2626 19.3402 18.7981 19.3402 19.4575V20.4726C19.3402 21.132 18.8038 21.6681 18.1447 21.6681H17.1301C16.4708 21.6681 15.9344 21.132 15.9344 20.4726V19.4575C15.9344 18.7981 16.4708 18.2626 17.1301 18.2626V18.2626ZM4.29078 19.1391C4.11525 19.1391 3.97239 19.2819 3.97239 19.4575V20.4726C3.97239 20.6482 4.11525 20.791 4.29078 20.791H5.30536C5.48118 20.791 5.62464 20.6482 5.62464 20.4726V19.4575C5.62464 19.2819 5.48118 19.1391 5.30536 19.1391H4.29078ZM8.57897 19.1397C8.40344 19.1397 8.26088 19.2825 8.26088 19.4581V20.4726C8.26088 20.6482 8.40344 20.791 8.57897 20.791H9.59415C9.76968 20.791 9.91254 20.6482 9.91254 20.4726V19.4581C9.91254 19.2825 9.76968 19.1397 9.59415 19.1397H8.57897ZM12.8669 19.1397C12.6913 19.1397 12.5491 19.2825 12.5491 19.4581V20.4726C12.5491 20.6482 12.6913 20.791 12.8669 20.791H13.882C14.0576 20.791 14.2004 20.6482 14.2004 20.4726V19.4581C14.2004 19.2825 14.0576 19.1397 13.882 19.1397H12.8669ZM17.1301 19.1397C16.9546 19.1397 16.8117 19.2825 16.8117 19.4581V20.4726C16.8117 20.6482 16.9546 20.791 17.1301 20.791H18.1447C18.3202 20.791 18.4631 20.6482 18.4631 20.4726V19.4581C18.4631 19.2825 18.3202 19.1397 18.1447 19.1397H17.1301ZM24.9667 19.4088C27.0932 19.4088 28.8236 21.1391 28.8236 23.2657C28.8236 25.3926 27.0932 27.1229 24.9667 27.1229C22.8398 27.1229 21.1094 25.3926 21.1094 23.2657C21.1094 22.5122 21.3268 21.7821 21.7376 21.1549C21.7581 21.1237 21.772 21.1002 21.8062 21.058C22.1204 20.6211 22.4709 20.3114 22.8793 20.0185C22.893 20.0117 22.9063 20.0046 22.9194 19.9962C23.5318 19.6122 24.2396 19.4088 24.9667 19.4088V19.4088ZM24.9676 20.2297C24.7255 20.2297 24.5292 20.426 24.5292 20.6681V23.2547C24.5292 23.4971 24.7255 23.6934 24.9676 23.6934H27.5637C27.8058 23.6934 28.0021 23.4971 28.0021 23.2547C28.0021 23.0127 27.8058 22.8163 27.5637 22.8163H25.4062V20.6681C25.4062 20.426 25.2099 20.2297 24.9676 20.2297Z"
              fill={`${param.pathname.includes("/timeline") ? "white" : "black"
                }`}
            />
          </svg>
        </div>
        <div
          className={`${param.pathname.includes("/timeline")
            ? "text-white"
            : "text-[#000000]"
            } font-secondaryFont not-italic font-bold text-base leading-7 tracking-[-0.02em]`}
        >
          Timeline
        </div>
      </div>
      <div
        className={`flex flex-row justify-start mt-[15px] max-w-[200px] max-h-[50px]  py-[11px] px-[15px] rounded cursor-pointer space-x-4 ${param.pathname.includes("/DataInjestion") ? "bg-[#136C57]" : ""
          }`}
        onClick={() => {
          setStyle(5);
          navigate("/DataInjestion");
        }}
      >
        <div>
          <svg
            width="29"
            height="28"
            viewBox="0 0 29 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.04783 27.9999L6.69614 22.3766L7.04542 22.7308C7.09204 22.7771 7.14734 22.8137 7.20813 22.8385C7.26892 22.8633 7.33402 22.8759 7.39969 22.8755C7.50993 22.8752 7.61696 22.8384 7.70406 22.7708L9.75481 21.1791C9.66999 21.1092 9.59015 21.0393 9.51531 20.9645L7.39969 18.8489C7.32484 18.774 7.25498 18.6942 7.18513 18.6094L5.59342 20.6601C5.51876 20.756 5.48162 20.8757 5.48897 20.997C5.49632 21.1182 5.54765 21.2327 5.63334 21.3188L5.98761 21.668L0 27.6557L1.04783 27.9999Z"
              fill={`${param.pathname.includes("/DataInjestion") ? "white" : "black"
                }`}
            />
            <path
              d="M21.1607 0.147594C21.1143 0.100826 21.0591 0.063706 20.9983 0.038374C20.9375 0.0130421 20.8723 0 20.8064 0C20.7405 0 20.6753 0.0130421 20.6145 0.038374C20.5537 0.063706 20.4985 0.100826 20.4521 0.147594L19.3943 1.2054C19.3086 1.29151 19.2573 1.40592 19.2499 1.52718C19.2426 1.64844 19.2797 1.76821 19.3544 1.86404L21.5548 4.69319L20.1028 6.14518L22.2185 8.2608L23.6705 6.80881L26.4996 9.00925C26.5867 9.07685 26.6937 9.11369 26.804 9.11404C26.8696 9.11442 26.9347 9.10183 26.9955 9.077C27.0563 9.05217 27.1116 9.01558 27.1582 8.96934L28.2161 7.91152C28.2628 7.86514 28.2999 7.80995 28.3253 7.74915C28.3506 7.68835 28.3636 7.62313 28.3636 7.55726C28.3636 7.49139 28.3506 7.42617 28.3253 7.36537C28.2999 7.30456 28.2628 7.24938 28.2161 7.20299L21.1607 0.147594Z"
              fill={`${param.pathname.includes("/DataInjestion") ? "white" : "black"
                }`}
            />
            <path
              d="M10.2241 20.261C10.692 20.7287 11.3264 20.9915 11.988 20.9915C12.6495 20.9915 13.284 20.7287 13.7518 20.261L21.1615 12.8513L21.865 13.5549C21.9116 13.6011 21.9669 13.6377 22.0277 13.6625C22.0885 13.6874 22.1536 13.7 22.2193 13.6996C22.285 13.7 22.35 13.6874 22.4108 13.6625C22.4716 13.6377 22.5269 13.6011 22.5736 13.5549L23.9806 12.1428C24.0736 12.0493 24.1257 11.9229 24.1257 11.791C24.1257 11.6592 24.0736 11.5328 23.9806 11.4393L16.9252 4.38387C16.8318 4.29093 16.7053 4.23877 16.5735 4.23877C16.4417 4.23877 16.3152 4.29093 16.2217 4.38387L14.8346 5.79095C14.7878 5.83734 14.7507 5.89252 14.7254 5.95333C14.7 6.01413 14.687 6.07935 14.687 6.14522C14.687 6.21109 14.7 6.27631 14.7254 6.33711C14.7507 6.39792 14.7878 6.4531 14.8346 6.49949L15.5381 7.20303L8.1035 14.6127C7.63579 15.0805 7.37305 15.715 7.37305 16.3765C7.37305 17.0381 7.63579 17.6725 8.1035 18.1404L10.2241 20.261ZM17.6338 14.967L16.576 13.9092L19.3951 11.085L20.4529 12.1428L17.6338 14.967ZM17.2795 8.97935L14.4554 11.7985L13.3975 10.7407L16.2217 7.92154L17.2795 8.97935ZM11.9855 12.1428L16.2217 16.379L15.5132 17.0826L11.2819 12.8513L11.9855 12.1428Z"
              fill={`${param.pathname.includes("/DataInjestion") ? "white" : "black"
                }`}
            />
          </svg>
        </div>
        <div
          className={`${param.pathname.includes("/DataInjestion")
            ? "text-white"
            : "text-[#000000]"
            } font-secondaryFont not-italic font-bold text-base leading-7 tracking-[-0.02em]`}
        >
          Data Injestion
        </div>
      </div>
      {/* <div
        className={`flex flex-row justify-center mt-[15px] max-w-[170px] max-h-[50px]  py-[11px]  rounded cursor-pointer  ${style === 6 ? "bg-[#136C57]" : ""
          } `}
        onClick={() => {
          setStyle(6);
          sendDataToParent("QA/QC");
        }}
      >

        <div
          className={`${style === 6 ? "text-white" : "text-[#000000]"
            } font-secondaryFont not-italic font-bold text-base leading-7 tracking-[-0.02em]`}
        >
          QA/QC
        </div>
      </div> */}
      <div
        className={`flex flex-row justify-center mt-[15px] max-w-[200px] max-h-[50px]  py-[11px] px-[15px]  rounded cursor-pointer space-x-12 ${param.pathname.includes("UserManagement") ? "bg-[#136C57]" : ""
          }`}
        onClick={() => {
          navigate("/UserManagement");
        }}
      >
        <div></div>
        <div
          className={`${param.pathname.includes("UserManagement")
            ? "text-white"
            : "text-[#000000]"
            } font-secondaryFont not-italic font-bold text-base leading-7 tracking-[-0.02em]`}
        >
          User&#160;Management
        </div>
      </div>
    </div>
  );
};

export default SideBar;
