import React, { useState, useEffect, useLayoutEffect } from "react";
import { useLocation, Link ,useNavigate} from "react-router-dom";
import Header from "../components/layout/Header";
import SideBar from "../components/layout/SideBar";
import SignUpTemplate from "../components/layout/SignUpTemplate";
import InjestionCardOnline from "../components/Injestion/InjestionCardOnline";
import InjestionCardOffine from "../components/Injestion/InjestionCardOffine";
import ProductSearch from "../components/Injestion/ProductSearch";

const DataInjestion = () => {
  const [title, setTitle] = useState(null);
  const [page, setPage] = useState(null);

  let navigate = useNavigate();

  let urlTitle = useLocation();

  useEffect(() => {
    if (urlTitle.pathname === "/DataInjestion") {
      setTitle("Data Injestion");
      // window.location.reload(false)
    }
    // window.location.reload(false)

  }, [urlTitle.pathname]);

   
  const sendPage = (pagename) => {
    setPage(pagename);
  };

  const ProductSheetPath =()=>{ 
    navigate('/DataInjestion/ProductivitySheet')
    window.location.reload(false)
  }

  




  console.log("DashBoard", urlTitle.pathname);
  return (
    <>
      <div className="flex flex-row justify-start overflow-hidden">
        <div>
          <SideBar />
        </div>
        <div className="flex flex-col">
          <Header title={title} sendPage={sendPage} />
          {page === "user" ? (
            <SignUpTemplate />
          ) : (
            <>
              <div className="flex flex-row justify-start space-x-10 mt-[63px] px-[30px]  ">
                <div className="mr-[70px]">
                  <ProductSearch
                    placeHolderName={"Choose Client"}

                  // value={client}
                  />
                </div>
                <div>
                  <ProductSearch
                    placeHolderName={"Choose Project"}

                  // value={client}
                  />
                </div>
              </div>
              <div className="w-10/12">
                <div className="grid grid-cols-2 gap-6 mt-[62px]  px-[20px]   ">
                  <Link to={`/DataInjestion/ProductivitySheet`}>

                    <span onClick={(e)=>  ProductSheetPath()}>
                    <InjestionCardOnline
                      title={"Productivity Sheet"}
                      // totalNumber={400}
                      
                      pathSet={"UserRole1"}
                      iconn={
                        <svg
                          width="54.64px"
                          height="
                                                36.84px"
                          viewBox="0 0 58 58"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M51.8912 0.400879H27.4501C27.2008 0.400879 26.9617 0.499919 26.7854 0.676211C26.6091 0.852503 26.5101 1.09161 26.5101 1.34092V5.10108C26.5101 5.3504 26.6091 5.5895 26.7854 5.76579C26.9617 5.94208 27.2008 6.04112 27.4501 6.04112H28.3902V9.80129H1.12901C0.879691 9.80129 0.640588 9.90033 0.464296 10.0766C0.288005 10.2529 0.188965 10.492 0.188965 10.7413V14.5015C0.188965 14.7508 0.288005 14.9899 0.464296 15.1662C0.640588 15.3425 0.879691 15.4415 1.12901 15.4415H2.06905V33.3023C2.06905 33.5516 2.16809 33.7907 2.34438 33.967C2.52067 34.1433 2.75977 34.2424 3.00909 34.2424H50.0111C50.2604 34.2424 50.4995 34.1433 50.6758 33.967C50.8521 33.7907 50.9511 33.5516 50.9511 33.3023V6.04112H51.8912C52.1405 6.04112 52.3796 5.94208 52.5559 5.76579C52.7322 5.5895 52.8312 5.3504 52.8312 5.10108V1.34092C52.8312 1.09161 52.7322 0.852503 52.5559 0.676211C52.3796 0.499919 52.1405 0.400879 51.8912 0.400879ZM2.06905 11.6814H28.3902V13.5615H2.06905V11.6814ZM3.94913 15.4415H28.3902V32.3623H26.5101V18.2617C26.5101 18.0123 26.4111 17.7732 26.2348 17.5969C26.0585 17.4207 25.8194 17.3216 25.5701 17.3216H6.76925C6.51993 17.3216 6.28083 17.4207 6.10454 17.5969C5.92825 17.7732 5.82921 18.0123 5.82921 18.2617V32.3623H3.94913V15.4415ZM7.70929 22.9619H24.63V24.8419H7.70929V22.9619ZM24.63 21.0818H7.70929V19.2017H24.63V21.0818ZM7.70929 26.722H24.63V28.6021H7.70929V26.722ZM7.70929 32.3623V30.4822H24.63V32.3623H7.70929ZM38.7306 28.6021V32.3623H34.9705V22.9619H38.7306V26.722C38.4813 26.722 38.2422 26.8211 38.0659 26.9974C37.8896 27.1736 37.7906 27.4128 37.7906 27.6621C37.7906 27.9114 37.8896 28.1505 38.0659 28.3268C38.2422 28.5031 38.4813 28.6021 38.7306 28.6021ZM40.6107 32.3623V28.6021C40.86 28.6021 41.0991 28.5031 41.2754 28.3268C41.4517 28.1505 41.5507 27.9114 41.5507 27.6621C41.5507 27.4128 41.4517 27.1736 41.2754 26.9974C41.0991 26.8211 40.86 26.722 40.6107 26.722V22.9619H44.3709V32.3623H40.6107ZM49.0711 32.3623H46.2509V22.0218C46.2509 21.7725 46.1519 21.5334 45.9756 21.3571C45.7993 21.1808 45.5602 21.0818 45.3109 21.0818H34.0304C33.7811 21.0818 33.542 21.1808 33.3657 21.3571C33.1894 21.5334 33.0904 21.7725 33.0904 22.0218V32.3623H30.2703V6.04112H49.0711V32.3623ZM50.9511 4.16104H28.3902V2.28096H50.9511V4.16104Z"
                            fill="#0FCC7C"
                          />
                        </svg>
                      }
                    />
                    </span>
                  </Link>
                  <Link to={`/DataInjestion/QuantitySheet`}>
                    <InjestionCardOffine
                      title={"Quantity Sheet"}
                      // totalNumber={800}
                      iconn={
                        <svg
                          width="
                                            40px"
                          height="32.79px"
                          viewBox="0 0 51 34"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.1966 31.9823C17.9516 33.5867 20.2148 33.6389 21.0431 32.0711L34.1774 7.20966L39.2726 17.0082C39.9585 18.3272 41.7441 18.5687 42.7558 17.4793L49.7435 9.95402C50.5515 9.08386 50.5011 7.72344 49.631 6.91544C48.7608 6.10744 47.4004 6.15782 46.5924 7.02798L41.6804 12.3178L36.1001 1.58635C35.3 0.0478411 33.1014 0.0406818 32.2914 1.57395L19.2532 26.2535L12.4871 11.8756C11.9157 10.6615 10.384 10.2616 9.292 11.0416L1.76675 16.4167C0.800477 17.1069 0.576672 18.4498 1.26686 19.416C1.95706 20.3823 3.29988 20.6061 4.26615 19.9159L9.69385 16.039L17.1966 31.9823Z"
                            fill="#0FCC7C"
                          />
                        </svg>
                      }
                    />
                  </Link>

                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DataInjestion;
