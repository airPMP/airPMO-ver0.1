import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import SideBar from "../components/layout/SideBar";
import { reactLocalStorage } from "reactjs-localstorage";
import SignUpTemplate from "../components/layout/SignUpTemplate";
import { useToasts } from "react-toast-notifications";
import { getAllJobCardApi, getMyJobCardApi } from "../AllApi/Api";

const DashBoard = () => {
  const [title, setTitle] = useState(null);
  const [client, setClient] = useState();
  const [project, setProject] = useState();
  const [page, setPage] = useState(null);
  const [alljobcardapi, setAllJobCardApi] = useState(null)
  const [myjobcardapi, setMyJobCardApi] = useState(null)

  let urlTitle = useLocation();
  let navigate = useNavigate();
  const { addToast } = useToasts();

  useEffect(() => {
    if (urlTitle.pathname === "/dashboard") {
      setTitle("Dashboard");
    }
  }, [urlTitle.pathname])
  
  useEffect(() => {
    const userData = getAllJobCardApi().then((data) => {
      setAllJobCardApi(data?.data?.length)  
    })
    const userData1 = getMyJobCardApi().then((data) => {   
      setMyJobCardApi(data?.data?.length) 
    })
    setTimeout(function(){
      if(reactLocalStorage.get("organization_id") == "6256bea8e25e1ec36f021392"){
        document.getElementById("dashboardCards").style.display = "none";
      } else {
        document.getElementById("reportFrame").style.display = "none";
      }
      document.getElementById("reportFrame").setAttribute("width", (window.innerWidth - 270));
      window.onresize = function(event) {
        document.getElementById("reportFrame").setAttribute("width", (window.innerWidth - 270));
      };
    },100);
  }, [])

  const handleChangeForClient = (event) => {
    setClient(event.target.value);
  };
  const handleChangeForProject = (event) => {
    setProject(event.target.value);
  };
  const sendPage = (pagename) => {
    setPage(pagename);
  };

  const Logout = (e) => {
    reactLocalStorage.clear();
    navigate('/')
    addToast("Logout  Sucessfully ", {
      appearance: "success",
      autoDismiss: true,
    })
  }

  return (
    <>
      <div className="flex flex-row justify-start overflow-hidden">
        <div>
          <SideBar />
        </div>
        <div className="flex flex-col " style={{overflow: 'auto'}}>
          <Header title={title} sendPage={sendPage} />
          {page === "user" ? ( <SignUpTemplate /> ) : (
            <>
              {/* <div className="ml-[90%] pt-3">
                <button style={{ border: "2px solid red", background: "red" }}
                  className="text-[white] px-3" onClick={(e) => Logout(e)}>
                  <b>LogOut</b></button>
              </div> */}
              <div className="flex flex-row justify-start space-x-10 mt-[63px] px-[30px]">
                {/* <SearchBox
                  placeHolderName={"Choose Client"}
                  handleChangeForClient={handleChangeForClient}
                  value={client}
                />
                <SearchBox
                  placeHolderName={"Choose Project"}
                  handleChangeForProject={handleChangeForProject}
                  value={project}
                /> */}
              </div>
              <div className="ml-[62px]">
              <iframe frameborder="0" width="1100" height="800" src="https://analytics.zoho.com/open-view/2402102000000483592"></iframe>
              </div>
              {/* <div id="dashboardCards" className="grid grid-cols-4 gap-4 mt-[62px]  px-[20px] ">
                <Card
                  title={"Total JC"}
                  totalNumber={alljobcardapi?alljobcardapi:"0"}
                  iconn={
                    <svg
                      width="58"
                      height="58"
                      viewBox="0 0 58 58"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="28.8266"
                        cy="28.8993"
                        r="28.5141"
                        fill="#F4F7FE"
                      />
                      <path
                        d="M43.5019 17.6973H27.8991C27.74 17.6973 27.5873 17.7605 27.4748 17.873C27.3623 17.9856 27.299 18.1382 27.299 18.2974V20.6978C27.299 20.857 27.3623 21.0096 27.4748 21.1221C27.5873 21.2347 27.74 21.2979 27.8991 21.2979H28.4992V23.6983H11.0962C10.937 23.6983 10.7844 23.7615 10.6719 23.8741C10.5593 23.9866 10.4961 24.1393 10.4961 24.2984V26.6988C10.4961 26.858 10.5593 27.0106 10.6719 27.1232C10.7844 27.2357 10.937 27.299 11.0962 27.299H11.6963V38.701C11.6963 38.8601 11.7595 39.0127 11.8721 39.1253C11.9846 39.2378 12.1373 39.3011 12.2964 39.3011H42.3017C42.4608 39.3011 42.6134 39.2378 42.726 39.1253C42.8385 39.0127 42.9018 38.8601 42.9018 38.701V21.2979H43.5019C43.661 21.2979 43.8137 21.2347 43.9262 21.1221C44.0387 21.0096 44.102 20.857 44.102 20.6978V18.2974C44.102 18.1382 44.0387 17.9856 43.9262 17.873C43.8137 17.7605 43.661 17.6973 43.5019 17.6973ZM11.6963 24.8985H28.4992V26.0987H11.6963V24.8985ZM12.8965 27.299H28.4992V38.1008H27.299V29.0993C27.299 28.9401 27.2358 28.7875 27.1233 28.6749C27.0107 28.5624 26.8581 28.4992 26.6989 28.4992H14.6968C14.5377 28.4992 14.385 28.5624 14.2725 28.6749C14.1599 28.7875 14.0967 28.9401 14.0967 29.0993V38.1008H12.8965V27.299ZM15.2969 32.0998H26.0988V33.3H15.2969V32.0998ZM26.0988 30.8996H15.2969V29.6994H26.0988V30.8996ZM15.2969 34.5002H26.0988V35.7004H15.2969V34.5002ZM15.2969 38.1008V36.9006H26.0988V38.1008H15.2969ZM35.1004 35.7004V38.1008H32.7V32.0998H35.1004V34.5002C34.9412 34.5002 34.7886 34.5634 34.6761 34.676C34.5635 34.7885 34.5003 34.9412 34.5003 35.1003C34.5003 35.2595 34.5635 35.4121 34.6761 35.5247C34.7886 35.6372 34.9412 35.7004 35.1004 35.7004ZM36.3006 38.1008V35.7004C36.4598 35.7004 36.6124 35.6372 36.7249 35.5247C36.8375 35.4121 36.9007 35.2595 36.9007 35.1003C36.9007 34.9412 36.8375 34.7885 36.7249 34.676C36.6124 34.5634 36.4598 34.5002 36.3006 34.5002V32.0998H38.701V38.1008H36.3006ZM41.7015 38.1008H39.9012V31.4997C39.9012 31.3405 39.838 31.1879 39.7255 31.0753C39.6129 30.9628 39.4603 30.8996 39.3011 30.8996H32.0999C31.9407 30.8996 31.7881 30.9628 31.6755 31.0753C31.563 31.1879 31.4998 31.3405 31.4998 31.4997V38.1008H29.6994V21.2979H41.7015V38.1008ZM42.9018 20.0977H28.4992V18.8975H42.9018V20.0977Z"
                        fill="#0FCC7C"
                      />
                    </svg>
                  }
                />
                <Card
                  title={"Assigned JC"}
                  totalNumber={alljobcardapi?alljobcardapi:"0"}
                  iconn={
                    <svg
                      width="58"
                      height="58"
                      viewBox="0 0 58 58"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="28.9672"
                        cy="28.8993"
                        r="28.5141"
                        fill="#F4F7FE"
                      />
                      <path
                        d="M22.6869 18.5439V17.2446C22.6869 16.5259 23.2695 15.9433 23.9882 15.9433H27.8972C28.2415 15.0758 29.1072 14.6421 30.4943 14.6421C31.8815 14.6421 32.7497 15.0758 33.0991 15.9433H37.0005C37.7192 15.9433 38.3018 16.5259 38.3018 17.2446V18.5439H40.9042C41.6229 18.5439 42.2055 19.1265 42.2055 19.8451V41.9681C42.2055 42.6867 41.6229 43.2693 40.9042 43.2693H20.0844C19.3658 43.2693 18.7832 42.6867 18.7832 41.9681V19.8451C18.7832 19.1265 19.3658 18.5439 20.0844 18.5439H22.6869ZM22.6869 21.1483H21.3857V40.6668H39.603V21.1483H38.3018C38.3018 21.8669 37.7192 22.4495 37.0005 22.4495H23.9882C23.2695 22.4495 22.6869 21.8669 22.6869 21.1483ZM27.8919 33.6217L28.812 34.5418C29.3201 35.0499 29.3201 35.8738 28.812 36.382C28.3038 36.8902 27.4799 36.8902 26.9718 36.382L24.3693 33.7795C23.8611 33.2714 23.8611 32.4475 24.3693 31.9393C24.8774 31.4311 25.7013 31.4311 26.2095 31.9393L27.8919 33.6217L34.7792 26.7344C35.2873 26.2262 36.1112 26.2262 36.6194 26.7344C37.1276 27.2425 37.1276 28.0664 36.6194 28.5746L28.812 36.382C28.3038 36.8902 27.4799 36.8902 26.9718 36.382C26.4636 35.8738 26.4636 35.0499 26.9718 34.5418L27.8919 33.6217ZM23.9882 17.2446V21.1483H37.0005V17.2446H31.8188C31.8188 16.38 31.3773 15.9478 30.4943 15.9478C29.6114 15.9478 29.1756 16.38 29.1868 17.2446H23.9882Z"
                        fill="#0FCC7C"
                      />
                    </svg>
                  }
                />
                <Card
                  title={"JC Progress"}
                  totalNumber={400}
                  iconn={
                    <div className="bg-[#F4F7FE] w-[58.28px] flex items-center justify-center h-[58.28px] rounded-full">
                      <svg
                        width="33"
                        height="22"
                        viewBox="0 0 33 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.2385 20.8594C11.7205 21.8836 13.1653 21.9169 13.694 20.9161L22.0787 5.04497L25.3315 11.3002C25.7693 12.1422 26.9092 12.2964 27.555 11.6009L32.0159 6.79692C32.5317 6.24142 32.4995 5.37296 31.944 4.85714C31.3885 4.34133 30.5201 4.37349 30.0042 4.92899L26.8685 8.30592L23.3061 1.45515C22.7954 0.472992 21.3919 0.468421 20.8748 1.44723L12.5514 17.2022L8.23206 8.02365C7.8673 7.24853 6.88944 6.99326 6.19235 7.49118L1.38836 10.9226C0.771513 11.3632 0.62864 12.2204 1.06925 12.8373C1.50985 13.4541 2.36709 13.597 2.98394 13.1564L6.44888 10.6815L11.2385 20.8594Z"
                          fill="#0FCC7C"
                        />
                      </svg>
                    </div>
                  }
                />
                <Card
                  title={"JC Completed"}
                  totalNumber={400}
                  iconn={
                    <div className="bg-[#F4F7FE] w-[58.28px] flex items-center justify-center h-[58.28px] rounded-full">
                      <svg
                        width="33"
                        height="22"
                        viewBox="0 0 33 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.2385 20.8594C11.7205 21.8836 13.1653 21.9169 13.694 20.9161L22.0787 5.04497L25.3315 11.3002C25.7693 12.1422 26.9092 12.2964 27.555 11.6009L32.0159 6.79692C32.5317 6.24142 32.4995 5.37296 31.944 4.85714C31.3885 4.34133 30.5201 4.37349 30.0042 4.92899L26.8685 8.30592L23.3061 1.45515C22.7954 0.472992 21.3919 0.468421 20.8748 1.44723L12.5514 17.2022L8.23206 8.02365C7.8673 7.24853 6.88944 6.99326 6.19235 7.49118L1.38836 10.9226C0.771513 11.3632 0.62864 12.2204 1.06925 12.8373C1.50985 13.4541 2.36709 13.597 2.98394 13.1564L6.44888 10.6815L11.2385 20.8594Z"
                          fill="#0FCC7C"
                        />
                      </svg>
                    </div>
                  }
                />
              </div> */}
		        {/* <iframe id="reportFrame" frameborder="0" width="1330" height="1700" src="https://analytics.zoho.com/open-view/2402102000000483592"></iframe> */}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DashBoard;
