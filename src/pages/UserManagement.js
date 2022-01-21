import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "../components/layout/Header";
import SideBar from "../components/layout/SideBar";
import SearchBox from "../components/layout/SearchBox"; 
import SignUpTemplate from "../components/layout/SignUpTemplate";
import UserRolesCard from "../components/layout/UserRolesCard";
import UserRolesCardCreate from "../components/layout/UserRolesCardCreate";

const UserManagement = () => {
  const [title, setTitle] = useState(null);
  const [client, setClient] = useState();
  const [project, setProject] = useState();
  const [page, setPage] = useState(null);
  let urlTitle = useLocation();

  useEffect(() => {

    if (urlTitle.pathname === "/UserManagement") {
      setTitle("User Roles");
    }
  }, [urlTitle.pathname])

  const handleChangeForClient = (event) => {
    setClient(event.target.value);
  };
  const handleChangeForProject = (event) => {
    setProject(event.target.value);
  };
  const sendPage = (pagename) => {
    setPage(pagename);
  };

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
              <div className="flex flex-row justify-start space-x-10 mt-[63px] px-[30px]">
                <SearchBox
                  placeHolderName={"Choose Client"}
                  handleChangeForClient={handleChangeForClient}
                  value={client}
                />
                <SearchBox
                  placeHolderName={"Choose Project"}
                  handleChangeForProject={handleChangeForProject}
                  value={project}
                />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-[62px]  px-[20px] ">
                <Link to={`/UserManagement/UserRole1`}>
                  <UserRolesCard
                    title={"Role 1"}
                    totalNumber={1500}
                    pathSet={"UserRole1"}
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

                      </svg>
                    }
                  />
                </Link>
                <Link to={`/UserManagement/UserRole2`}>
                  <UserRolesCard
                    title={"Role 2"}
                    totalNumber={800}
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

                      </svg>
                    }
                  />
                </Link>
                <Link to={`/UserManagement/UserRole3`}>
                  <UserRolesCard
                    title={"Role 3"}
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

                        </svg>
                      </div>
                    }
                  />
                </Link>
                <UserRolesCardCreate
                  title={"Create new role"}
                  // totalNumber={400}
                  iconn={
                    <div className="bg-[#F4F7FE] w-[58.28px] flex items-center justify-center h-[58.28px] rounded-full">

                      <svg width="40" height="40" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M26.1668 26.1666V45.1666H19.8335V26.1666H0.833496V19.8333H19.8335V0.833252H26.1668V19.8333H45.1668V26.1666H26.1668Z" fill="#2E3A59" />
                      </svg>


                    </div>
                  }
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserManagement;