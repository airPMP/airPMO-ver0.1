import React, { useState, useEffect,useLayoutEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "../components/layout/Header";
import SideBar from "../components/layout/SideBar";
import InjestionCardOnline from "../components/Injestion/InjestionCardOnline";
import InjestionCardOffine from "../components/Injestion/InjestionCardOffine";
import { CategorieLengthSet } from '../SimplerR/auth'
import { getCategorieApi, getClientApi, getProjectApi } from "../AllApi/Api";

const Master = () => {

  const [title, setTitle] = useState(null);
  let urlTitle = useLocation();
  const CategorieLengthget = CategorieLengthSet.use()

  const [clientapi, setClientApi] = useState(null);
  const [projectapi, setProjectApi] = useState(null);
  const [categoriesapi, setCategoriesApi] = useState(null);

  

  useEffect(() => {
    if (urlTitle.pathname === "/master") {
      setTitle("Master");
    }
  }, [urlTitle.pathname]);

  console.log(CategorieLengthget);


  useLayoutEffect(() => {

    const userData = getClientApi().then((data) => {
      setClientApi(data?.data.length)

    })

    const userData1 = getProjectApi().then((data) => {
      setProjectApi(data?.data.length)

    })

    const userData2 = getCategorieApi().then((data) => {
      setCategoriesApi(data?.data?.length)
    })


  }, [])

  return (
    <>
      <div className="flex flex-row justify-start overflow-hidden">
        <div>
          <SideBar />
        </div>
        <div className="flex flex-col">
          <Header title={title} />

          <div className="grid grid-cols-2 gap-4 mt-[62px]  px-[20px] ">
            <Link to={`/master/projects`}>
              <InjestionCardOnline
                title={"Projects"}
                
                totalNumber={projectapi?projectapi:"0"}
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
            </Link>
            <Link to={`/master/clients`}>
              <InjestionCardOffine
                title={"Clients"}
                
                 
                totalNumber={clientapi?clientapi:"0"}
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
            <Link to={`/master/categories`}>
              <InjestionCardOnline
                title={"Categories"}
                totalNumber={categoriesapi?categoriesapi:"0"}
                iconn={
                  <svg
                    width="45.64px"
                    height="30.84px"
                    viewBox="0 0 38 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.59401 6.2778V4.24245C6.59401 3.1167 7.50661 2.20411 8.63235 2.20411H14.7557C15.2951 0.845217 16.6512 0.165771 18.824 0.165771C20.9969 0.165771 22.357 0.845217 22.9043 2.20411H29.0157C30.1415 2.20411 31.0541 3.1167 31.0541 4.24245V6.2778H35.1307C36.2565 6.2778 37.1691 7.19039 37.1691 8.31613V42.9709C37.1691 44.0966 36.2565 45.0092 35.1307 45.0092H2.51734C1.3916 45.0092 0.479004 44.0966 0.479004 42.9709V8.31613C0.479004 7.19039 1.3916 6.2778 2.51734 6.2778H6.59401ZM6.59401 10.3575H4.55568V40.9325H33.0924V10.3575H31.0541C31.0541 11.4832 30.1415 12.3958 29.0157 12.3958H8.63235C7.50661 12.3958 6.59401 11.4832 6.59401 10.3575ZM14.7474 29.8965L16.1887 31.3378C16.9847 32.1339 16.9847 33.4245 16.1887 34.2205C15.3927 35.0165 14.1021 35.0165 13.306 34.2205L9.22937 30.1438C8.43335 29.3478 8.43335 28.0572 9.22937 27.2612C10.0254 26.4652 11.316 26.4652 12.112 27.2612L14.7474 29.8965L25.5361 19.1078C26.3321 18.3118 27.6227 18.3118 28.4187 19.1078C29.2147 19.9038 29.2147 21.1944 28.4187 21.9905L16.1887 34.2205C15.3927 35.0165 14.1021 35.0165 13.306 34.2205C12.51 33.4245 12.51 32.1339 13.306 31.3378L14.7474 29.8965ZM8.63235 4.24245V10.3575H29.0157V4.24245H20.8987C20.8987 2.8882 20.2071 2.21108 18.824 2.21108C17.4409 2.21108 16.7582 2.8882 16.7759 4.24245H8.63235Z"
                      fill="#0FCC7C"
                    />
                  </svg>
                }
              />
            </Link>


            <Link to={`/master/consultant`}>
              <InjestionCardOffine
                title={"Consultant"}
                totalNumber={800}
                iconn={
                  <svg width="40px"
                    className="-mt-[7px]"
                    height="32.79px" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="path-1-inside-1_1822_2936" fill="white">
                      <path d="M0.0625 37.3829C0.0625 36.7844 0.233462 35.4566 0.436576 34.477C1.59537 28.8889 5.45277 24.1369 10.7124 21.8181C12.4696 21.0435 14.3216 20.5669 16.3177 20.3756C17.1068 20.3 18.7243 20.3 19.5134 20.3756C22.3131 20.6438 24.8218 21.4685 27.184 22.897C27.7672 23.2496 28.4495 23.7134 28.4488 23.7567C28.4488 23.7716 28.2801 23.8355 28.0743 23.8986C27.3765 24.1127 26.5586 24.5574 25.9206 25.0697C24.2104 26.4426 23.2497 28.6825 23.4477 30.835C23.7269 33.87 25.8418 36.2499 28.8365 36.8989C29.1948 36.9766 29.3513 36.9871 30.1532 36.9871C31.1714 36.9871 31.4853 36.9412 32.2808 36.6761C33.346 36.3211 34.4352 35.6087 35.1458 34.8023L35.4093 34.5033L35.4926 34.9719C35.6433 35.8205 35.7686 36.915 35.7686 37.3829V37.5897H17.9155H0.0625V37.3829ZM29.5737 36.3084C26.385 36.0014 23.9764 33.2305 24.1235 30.0381C24.1922 28.5464 24.7684 27.1997 25.7937 26.1342C26.9835 24.8976 28.4546 24.2679 30.1532 24.2679C31.8518 24.2679 33.3229 24.8976 34.5128 26.1342C37.118 28.8415 36.6267 33.2327 33.4837 35.3332C32.6678 35.8785 31.7083 36.2121 30.674 36.3102C30.2039 36.3548 30.0533 36.3545 29.5737 36.3083V36.3084ZM30.889 34.8736C31.3039 34.8148 31.8568 34.6306 32.2842 34.4085C33.5538 33.749 34.4413 32.5477 34.7072 31.1285C34.7426 30.9393 34.7684 30.5947 34.7684 30.3092C34.7684 30.0237 34.7426 29.679 34.7072 29.4899C34.4441 28.0861 33.5623 26.8818 32.3164 26.2249C31.6257 25.8607 30.9466 25.6941 30.1532 25.6941C29.5939 25.6941 29.1689 25.7619 28.6693 25.9307C27.0863 26.4658 25.9105 27.8289 25.5992 29.4899C25.5197 29.9142 25.5197 30.7042 25.5992 31.1285C25.8652 32.5477 26.7526 33.749 28.0222 34.4085C28.9183 34.874 29.8356 35.0228 30.889 34.8736ZM27.907 32.6215C27.907 32.0249 28.1206 31.5222 28.5621 31.0797C29.0229 30.6178 29.5387 30.4073 30.1919 30.4145C31.3987 30.4279 32.3993 31.4389 32.3993 32.6449V32.9038H30.1532H27.907V32.6215ZM29.8627 29.7717C29.1818 29.5919 28.8219 28.8599 29.1037 28.228C29.3524 27.6704 30.0407 27.4205 30.5889 27.6887C31.2647 28.0194 31.4307 28.9138 30.9161 29.451C30.6655 29.7126 30.1887 29.8577 29.8627 29.7717ZM17.212 17.7228C14.1395 17.4465 11.486 15.6356 10.1477 12.9018C9.53771 11.6556 9.267 10.483 9.267 9.08722C9.267 8.25658 9.33559 7.69758 9.53052 6.93985C9.69881 6.28575 9.84448 5.89217 10.1477 5.27269C10.9922 3.54773 12.376 2.16393 14.1009 1.31953C15.3471 0.709515 16.5198 0.438782 17.9155 0.438782C18.7462 0.438782 19.3052 0.507369 20.063 0.702301C20.7171 0.87059 21.1106 1.01629 21.7301 1.31953C23.4551 2.16393 24.839 3.54773 25.6834 5.27269C26.2934 6.51886 26.5641 7.69147 26.5641 9.08722C26.5641 10.1431 26.3944 11.1281 26.0502 12.0692C25.64 13.1906 24.8984 14.347 24.0369 15.2085C22.4652 16.7802 20.4063 17.6646 18.1479 17.7382C17.839 17.7482 17.4179 17.7413 17.212 17.7228Z" />
                    </mask>
                    <path d="M0.436576 34.477L-2.50093 33.8679L-2.50095 33.868L0.436576 34.477ZM10.7124 21.8181L9.50217 19.0731H9.50217L10.7124 21.8181ZM16.3177 20.3756L16.6038 23.362L16.3177 20.3756ZM19.5134 20.3756L19.2273 23.362H19.2273L19.5134 20.3756ZM27.184 22.897L28.7365 20.3299H28.7365L27.184 22.897ZM28.4488 23.7567L25.4491 23.7094L25.4488 23.7331V23.7567H28.4488ZM28.0743 23.8986L28.9544 26.7666L28.9544 26.7666L28.0743 23.8986ZM25.9206 25.0697L24.0425 22.7302L24.0425 22.7303L25.9206 25.0697ZM23.4477 30.835L20.4603 31.1098V31.1098L23.4477 30.835ZM28.8365 36.8989L28.201 39.8309H28.201L28.8365 36.8989ZM32.2808 36.6761L31.3323 33.83L31.3323 33.83L32.2808 36.6761ZM35.1458 34.8023L32.895 32.8189L32.895 32.8189L35.1458 34.8023ZM35.4093 34.5033L38.363 33.9784L37.2739 27.8495L33.1585 32.5199L35.4093 34.5033ZM35.4926 34.9719L38.4463 34.4472L38.4463 34.447L35.4926 34.9719ZM35.7686 37.5897V40.5897H38.7686V37.5897H35.7686ZM0.0625 37.5897H-2.9375V40.5897H0.0625V37.5897ZM29.5737 36.3084L29.2862 39.2946L32.5737 39.611V36.3084H29.5737ZM24.1235 30.0381L27.1203 30.1761L27.1203 30.1761L24.1235 30.0381ZM25.7937 26.1342L27.9554 28.2143L27.9554 28.2143L25.7937 26.1342ZM34.5128 26.1342L36.6745 24.054L36.6745 24.054L34.5128 26.1342ZM33.4837 35.3332L35.1506 37.8275L35.1506 37.8275L33.4837 35.3332ZM30.674 36.3102L30.9572 39.2968H30.9572L30.674 36.3102ZM29.5737 36.3083L29.8612 33.3222L26.5737 33.0056V36.3083H29.5737ZM32.2842 34.4085L33.6671 37.0708L33.6672 37.0707L32.2842 34.4085ZM34.7072 31.1285L37.6559 31.681L37.6559 31.681L34.7072 31.1285ZM34.7072 29.4899L37.6559 28.9373L37.6559 28.9373L34.7072 29.4899ZM32.3164 26.2249L33.7156 23.5712L33.7156 23.5712L32.3164 26.2249ZM28.6693 25.9307L29.6299 28.7728L29.63 28.7728L28.6693 25.9307ZM25.5992 29.4899L22.6505 28.9373L22.6505 28.9374L25.5992 29.4899ZM25.5992 31.1285L22.6505 31.681L22.6505 31.681L25.5992 31.1285ZM28.0222 34.4085L29.4051 31.7463L29.4051 31.7463L28.0222 34.4085ZM28.5621 31.0797L26.4384 28.9608L26.4383 28.9608L28.5621 31.0797ZM30.1919 30.4145L30.1588 33.4144H30.1588L30.1919 30.4145ZM32.3993 32.9038V35.9038H35.3993V32.9038H32.3993ZM27.907 32.9038H24.907V35.9038H27.907V32.9038ZM29.1037 28.228L31.8436 29.4499L31.8437 29.4498L29.1037 28.228ZM30.5889 27.6887L29.2704 30.3835L29.2705 30.3835L30.5889 27.6887ZM30.9161 29.451L33.0825 31.5263L33.0825 31.5262L30.9161 29.451ZM17.212 17.7228L16.9432 20.7107H16.9433L17.212 17.7228ZM10.1477 12.9018L7.45325 14.2208L7.45326 14.2208L10.1477 12.9018ZM9.53052 6.93985L6.62514 6.19234L6.62513 6.1924L9.53052 6.93985ZM10.1477 5.27269L7.45327 3.95365L7.45325 3.95369L10.1477 5.27269ZM14.1009 1.31953L12.782 -1.37497L12.782 -1.37496L14.1009 1.31953ZM20.063 0.702301L20.8105 -2.20308L20.8104 -2.2031L20.063 0.702301ZM21.7301 1.31953L20.4111 4.01402L20.4111 4.01402L21.7301 1.31953ZM25.6834 5.27269L22.9889 6.59169L22.9889 6.59169L25.6834 5.27269ZM26.0502 12.0692L23.2327 11.0387L23.2327 11.0387L26.0502 12.0692ZM24.0369 15.2085L26.1582 17.3298L26.1582 17.3298L24.0369 15.2085ZM18.1479 17.7382L18.2455 20.7366H18.2456L18.1479 17.7382ZM3.0625 37.3829C3.0625 37.0798 3.18881 35.9798 3.3741 35.0861L-2.50095 33.868C-2.72188 34.9335 -2.9375 36.4891 -2.9375 37.3829H3.0625ZM3.37408 35.0862C4.33436 30.4554 7.54243 26.4942 11.9225 24.5632L9.50217 19.0731C3.36311 21.7795 -1.14361 27.3224 -2.50093 33.8679L3.37408 35.0862ZM11.9225 24.5632C13.3738 23.9234 14.9124 23.524 16.6038 23.362L16.0317 17.3893C13.7308 17.6097 11.5654 18.1635 9.50217 19.0731L11.9225 24.5632ZM16.6038 23.362C17.2026 23.3046 18.6285 23.3046 19.2273 23.362L19.7994 17.3893C18.8201 17.2955 17.011 17.2955 16.0317 17.3893L16.6038 23.362ZM19.2273 23.362C21.5875 23.5881 23.6621 24.2731 25.6316 25.4641L28.7365 20.3299C25.9815 18.6639 23.0387 17.6996 19.7994 17.3893L19.2273 23.362ZM25.6316 25.4641C25.8761 25.6119 26.1478 25.7873 26.3489 25.9239C26.4533 25.9949 26.5105 26.0364 26.5263 26.0483C26.5421 26.0602 26.4965 26.0271 26.4271 25.9654C26.4007 25.9421 26.2977 25.8507 26.1784 25.7136C26.1222 25.6491 25.9976 25.5012 25.8713 25.2897C25.8063 25.181 25.7116 25.007 25.6289 24.7795C25.5501 24.5629 25.4416 24.1878 25.4491 23.7094L31.4484 23.8039C31.462 22.9377 31.0949 22.3344 31.0224 22.2131C30.8935 21.9973 30.7651 21.8443 30.7038 21.7739C30.5742 21.6251 30.4561 21.519 30.41 21.4781C30.3011 21.3814 30.1978 21.3022 30.1406 21.2591C30.0105 21.1608 29.8608 21.0562 29.7218 20.9618C29.4362 20.7676 29.0751 20.5347 28.7365 20.3299L25.6316 25.4641ZM25.4488 23.7567C25.4488 23.0559 25.6909 22.5326 25.8538 22.252C26.0218 21.9626 26.2032 21.7626 26.3112 21.6531C26.5235 21.4379 26.7198 21.3059 26.7925 21.2581C26.959 21.1486 27.0965 21.0834 27.1281 21.0683C27.1815 21.0429 27.2215 21.0261 27.2386 21.019C27.2584 21.0108 27.2715 21.0058 27.2758 21.0042C27.2839 21.0011 27.2541 21.0122 27.1943 21.0306L28.9544 26.7666C29.1003 26.7218 29.2577 26.6695 29.4016 26.615C29.4635 26.5915 29.5806 26.5461 29.7103 26.4842C29.7609 26.4601 29.9133 26.3869 30.0897 26.2709C30.1674 26.2198 30.3676 26.0848 30.5824 25.867C30.6549 25.7936 31.4488 25.037 31.4488 23.7567H25.4488ZM27.1943 21.0306C26.0919 21.3688 24.941 22.0089 24.0425 22.7302L27.7986 27.4091C28.1763 27.106 28.6611 26.8566 28.9544 26.7666L27.1943 21.0306ZM24.0425 22.7303C21.5613 24.7222 20.1685 27.9374 20.4603 31.1098L26.4351 30.5601C26.3309 29.4275 26.8596 28.163 27.7987 27.4091L24.0425 22.7303ZM20.4603 31.1098C20.8604 35.4586 23.936 38.9064 28.201 39.8309L29.472 33.967C27.7477 33.5933 26.5934 32.2814 26.4351 30.5601L20.4603 31.1098ZM28.201 39.8309C28.8957 39.9814 29.3279 39.9871 30.1532 39.9871V33.9871C29.9556 33.9871 29.816 33.9864 29.709 33.9846C29.6021 33.9829 29.5512 33.9803 29.5288 33.9788C29.5144 33.9779 29.5215 33.978 29.5355 33.9802C29.5434 33.9814 29.533 33.9802 29.4719 33.967L28.201 39.8309ZM30.1532 39.9871C30.6793 39.9871 31.1983 39.9778 31.7344 39.8995C32.3002 39.8168 32.7735 39.6741 33.2293 39.5222L31.3323 33.83C30.9926 33.9432 30.9112 33.956 30.8666 33.9625C30.7923 33.9734 30.6453 33.9871 30.1532 33.9871V39.9871ZM33.2293 39.5222C34.7738 39.0075 36.3198 38.0077 37.3967 36.7857L32.895 32.8189C32.5507 33.2097 31.9182 33.6347 31.3323 33.83L33.2293 39.5222ZM37.3967 36.7857L37.6601 36.4867L33.1585 32.5199L32.895 32.8189L37.3967 36.7857ZM32.4556 35.0282L32.5388 35.4967L38.4463 34.447L38.363 33.9784L32.4556 35.0282ZM32.5388 35.4965C32.6019 35.8517 32.6624 36.2756 32.7066 36.6613C32.7284 36.8525 32.7449 37.0225 32.7556 37.1602C32.7609 37.2287 32.7644 37.2838 32.7664 37.3257C32.7686 37.3698 32.7686 37.3871 32.7686 37.3829H38.7686C38.7686 36.6499 38.6068 35.3508 38.4463 34.4472L32.5388 35.4965ZM32.7686 37.3829V37.5897H38.7686V37.3829H32.7686ZM35.7686 34.5897H17.9155V40.5897H35.7686V34.5897ZM17.9155 34.5897H0.0625V40.5897H17.9155V34.5897ZM3.0625 37.5897V37.3829H-2.9375V37.5897H3.0625ZM29.8611 33.3222C28.2575 33.1678 27.0471 31.7652 27.1203 30.1761L21.1267 29.9001C20.9058 34.6957 24.5125 38.835 29.2862 39.2946L29.8611 33.3222ZM27.1203 30.1761C27.1559 29.4039 27.4403 28.7496 27.9554 28.2143L23.632 24.054C22.0964 25.6497 21.2285 27.689 21.1267 29.9001L27.1203 30.1761ZM27.9554 28.2143C28.5863 27.5587 29.2796 27.2679 30.1532 27.2679V21.2679C27.6295 21.2679 25.3808 22.2366 23.632 24.054L27.9554 28.2143ZM30.1532 27.2679C31.0268 27.2679 31.7202 27.5587 32.3511 28.2143L36.6745 24.054C34.9256 22.2365 32.6768 21.2679 30.1532 21.2679V27.2679ZM32.3511 28.2143C33.645 29.559 33.4255 31.7638 31.8167 32.839L35.1506 37.8275C39.8279 34.7016 40.5909 28.124 36.6745 24.054L32.3511 28.2143ZM31.8168 32.839C31.4385 33.0917 30.9602 33.2696 30.3908 33.3236L30.9572 39.2968C32.4565 39.1546 33.8971 38.6652 35.1506 37.8275L31.8168 32.839ZM30.3908 33.3236C30.1748 33.3441 30.138 33.3433 30.1325 33.3433C30.125 33.3433 30.0846 33.3437 29.8612 33.3222L29.2861 39.2945C29.9516 39.3586 30.2934 39.3598 30.9572 39.2968L30.3908 33.3236ZM26.5737 36.3083V36.3084H32.5737V36.3083H26.5737ZM31.3097 37.844C32.1065 37.7311 32.9829 37.4262 33.6671 37.0708L30.9013 31.7463C30.8448 31.7756 30.7474 31.8182 30.6332 31.8563C30.5797 31.8741 30.5338 31.8871 30.4991 31.8958C30.4625 31.9049 30.4523 31.9055 30.4683 31.9033L31.3097 37.844ZM33.6672 37.0707C35.764 35.9815 37.2219 33.9969 37.6559 31.681L31.7585 30.5759C31.6606 31.0984 31.3436 31.5165 30.9013 31.7463L33.6672 37.0707ZM37.6559 31.681C37.7375 31.2452 37.7684 30.7003 37.7684 30.3092H31.7684C31.7684 30.3694 31.7653 30.452 31.7594 30.5316C31.7566 30.5695 31.7538 30.5973 31.7519 30.613C31.7496 30.6332 31.7507 30.6177 31.7585 30.5759L37.6559 31.681ZM37.7684 30.3092C37.7684 29.9181 37.7375 29.3732 37.6559 28.9373L31.7585 30.0424C31.7507 30.0006 31.7496 29.9851 31.7519 30.0054C31.7538 30.0211 31.7566 30.0488 31.7594 30.0868C31.7653 30.1663 31.7684 30.2489 31.7684 30.3092H37.7684ZM37.6559 28.9373C37.2269 26.6481 35.7848 24.6622 33.7156 23.5712L30.9172 28.8786C31.3397 29.1014 31.6614 29.5241 31.7585 30.0425L37.6559 28.9373ZM33.7156 23.5712C32.5864 22.9758 31.426 22.6941 30.1532 22.6941V28.6941C30.4671 28.6941 30.665 28.7457 30.9173 28.8787L33.7156 23.5712ZM30.1532 22.6941C29.2871 22.6941 28.536 22.809 27.7086 23.0887L29.63 28.7728C29.8017 28.7147 29.9007 28.6941 30.1532 28.6941V22.6941ZM27.7086 23.0887C25.0833 23.9761 23.1588 26.2249 22.6505 28.9373L28.5479 30.0424C28.6621 29.433 29.0893 28.9555 29.6299 28.7728L27.7086 23.0887ZM22.6505 28.9374C22.5026 29.7268 22.5026 30.8915 22.6505 31.681L28.5479 30.576C28.556 30.6193 28.552 30.612 28.547 30.5413C28.5426 30.4791 28.5396 30.3985 28.5396 30.3092C28.5396 30.2199 28.5426 30.1392 28.547 30.0771C28.552 30.0063 28.556 29.999 28.5479 30.0424L22.6505 28.9374ZM22.6505 31.681C23.0845 33.9969 24.5424 35.9815 26.6392 37.0707L29.4051 31.7463C28.9628 31.5165 28.6458 31.0984 28.5479 30.5759L22.6505 31.681ZM26.6392 37.0707C28.1205 37.8402 29.6729 38.0758 31.3097 37.844L30.4683 31.9033C29.9983 31.9698 29.716 31.9078 29.4051 31.7463L26.6392 37.0707ZM30.907 32.6215C30.907 32.6924 30.8919 32.8204 30.8301 32.9658C30.7698 33.1078 30.6998 33.1846 30.6858 33.1986L26.4383 28.9608C25.4654 29.9359 24.907 31.1893 24.907 32.6215H30.907ZM30.6857 33.1987C30.675 33.2094 30.5918 33.2862 30.4384 33.3488C30.2851 33.4114 30.1726 33.4145 30.1588 33.4144L30.225 27.4147C28.7646 27.3986 27.4709 27.9259 26.4384 28.9608L30.6857 33.1987ZM30.1588 33.4144C29.9203 33.4117 29.7323 33.3105 29.6159 33.1928C29.4994 33.0751 29.3993 32.8852 29.3993 32.6449H35.3993C35.3993 29.793 33.0737 27.4462 30.225 27.4147L30.1588 33.4144ZM29.3993 32.6449V32.9038H35.3993V32.6449H29.3993ZM32.3993 29.9038H30.1532V35.9038H32.3993V29.9038ZM30.1532 29.9038H27.907V35.9038H30.1532V29.9038ZM30.907 32.9038V32.6215H24.907V32.9038H30.907ZM30.6285 26.8711C31.6734 27.1469 32.341 28.3347 31.8436 29.4499L26.3639 27.0061C25.3029 29.3851 26.6903 32.0369 29.0969 32.6723L30.6285 26.8711ZM31.8437 29.4498C31.4008 30.443 30.2487 30.8621 29.2704 30.3835L31.9074 24.994C29.8327 23.9789 27.304 24.8978 26.3638 27.0061L31.8437 29.4498ZM29.2705 30.3835C28.1679 29.8441 27.8234 28.3427 28.7496 27.3758L33.0825 31.5262C35.0379 29.4848 34.3614 26.1946 31.9073 24.994L29.2705 30.3835ZM28.7497 27.3757C29.0557 27.0563 29.3598 26.9278 29.544 26.8718C29.7136 26.8201 30.1019 26.732 30.6285 26.8711L29.0969 32.6723C29.9495 32.8974 30.7392 32.7798 31.2914 32.6117C31.8581 32.4392 32.5258 32.1073 33.0825 31.5263L28.7497 27.3757ZM17.4807 14.7349C15.4357 14.5509 13.7117 13.3589 12.8422 11.5827L7.45326 14.2208C9.26033 17.9122 12.8434 20.342 16.9432 20.7107L17.4807 14.7349ZM12.8422 11.5828C12.4345 10.7499 12.267 10.0287 12.267 9.08722H6.267C6.267 10.9373 6.64093 12.5613 7.45325 14.2208L12.8422 11.5828ZM12.267 9.08722C12.267 8.49318 12.3076 8.18624 12.4359 7.6873L6.62513 6.1924C6.36362 7.20892 6.267 8.01998 6.267 9.08722H12.267ZM12.4359 7.68736C12.5524 7.23439 12.6267 7.03204 12.8422 6.59169L7.45325 3.95369C7.06232 4.75229 6.84518 5.3371 6.62514 6.19234L12.4359 7.68736ZM12.8422 6.59173C13.3936 5.46528 14.2935 4.56542 15.4199 4.01402L12.782 -1.37496C10.4584 -0.23756 8.59069 1.63018 7.45327 3.95365L12.8422 6.59173ZM15.4199 4.01403C16.2529 3.60628 16.9741 3.43878 17.9155 3.43878V-2.56122C16.0654 -2.56122 14.4414 -2.18724 12.782 -1.37497L15.4199 4.01403ZM17.9155 3.43878C18.5096 3.43878 18.8166 3.47935 19.3156 3.6077L20.8104 -2.2031C19.7939 -2.46461 18.9827 -2.56122 17.9155 -2.56122V3.43878ZM19.3155 3.60769C19.7683 3.72419 19.9706 3.79839 20.4111 4.01402L23.0491 -1.37496C22.2506 -1.76582 21.6659 -1.98301 20.8105 -2.20308L19.3155 3.60769ZM20.4111 4.01402C21.5376 4.56546 22.4375 5.46534 22.9889 6.59169L28.3779 3.95369C27.2404 1.63012 25.3726 -0.237593 23.0491 -1.37496L20.4111 4.01402ZM22.9889 6.59169C23.3966 7.42461 23.5641 8.14576 23.5641 9.08722H29.5641C29.5641 7.23718 29.1902 5.61311 28.3779 3.95369L22.9889 6.59169ZM23.5641 9.08722C23.5641 9.81069 23.4497 10.4453 23.2327 11.0387L28.8677 13.0996C29.339 11.8109 29.5641 10.4754 29.5641 9.08722H23.5641ZM23.2327 11.0387C22.9756 11.7417 22.475 12.5278 21.9156 13.0872L26.1582 17.3298C27.3219 16.1662 28.3045 14.6396 28.8677 13.0996L23.2327 11.0387ZM21.9156 13.0872C20.8925 14.1103 19.5612 14.6905 18.0502 14.7398L18.2456 20.7366C21.2514 20.6387 24.038 19.45 26.1582 17.3298L21.9156 13.0872ZM18.0502 14.7398C17.9544 14.7429 17.8219 14.7438 17.6906 14.7416C17.6269 14.7406 17.5715 14.7389 17.5283 14.7371C17.4803 14.7351 17.467 14.7336 17.4807 14.7349L16.9433 20.7107C17.3146 20.7441 17.8679 20.7489 18.2455 20.7366L18.0502 14.7398Z" fill="#0FCC7C" mask="url(#path-1-inside-1_1822_2936)" />
                  </svg>
                }
              />
            </Link>

          </div>
        </div>
      </div>
    </>
  );
};

export default Master;
