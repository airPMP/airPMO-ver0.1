import "./App.css";
import Login from "./components/register/Login";
import SignUp from "./components/register/SignUp";
import SideBar from "./components/layout/SideBar";
import Header from "./components/layout/Header";
import Card from "./components/layout/Card";
import AdminLayout from "./components/layout/AdminLayout";
import NotificationBar from "./components/layout/NotificationBar";
import SignUpTemplate from "./components/layout/SignUpTemplate";
import NewJobCard from "./components/Tablelayouts/NewJobCard";
import ManpowerAndMachinery from "./components/Tablelayouts/ManpowerAndMachinery";
import Clients from "./components/Master/Clients";
import Projects from "./components/Master/Projects";
import Categories from "./components/Master/Categories";
import DashBoard from "./pages/DashBoard";
import JobCards from "./pages/JobCards";
import Master from "./pages/Master";
import NewClientProfile from "./components/Master/NewClientProfile";
import ClientName from "./components/Master/ClientName";
import NewProject from "./components/Master/NewProject";
import EditNewProject from "./components/Master/EditNewProject";
import ZoneList from "./components/Master/ZoneList";
import TimeLine from "./pages/TimeLine";
import ClientTimeLine from "./components/Timeline/ClientTimeLine";
import { Routes, Route } from "react-router-dom";
import UserManagement from "./pages/UserManagement";
import UserRole1 from "./components/Management/UserRole1";
import UserRole2 from "./components/Management/UserRole2";
import UserRole3 from "./components/Management/UserRole3";
import DataInjestion from "./pages/DataInjestion";
import ProductivitySheet from "./components/Injestion/ProductivitySheet";
import UserRole1Details from "./components/Management/UserRole1Details";
import AllJobCards from "./components/Tablelayouts/AllJobCards";
import JobCardAssigned from "./components/Tablelayouts/JobCardAssigned";
import MyJobCards from "./components/Tablelayouts/MyJobCards";
import HRMS from "./components/Injestion/HRMS";
import QuantitySheet from "./components/Injestion/QuantitySheet";
function App() {
  return (
    <div className="bg-[#ECF1F0]">
      <Routes>
      <Route path="/" element={ <Login />} />
      <Route path="/sign-up" element={ <SignUp />} />
      <Route path="/sidebar" element={ <SideBar />} />
      <Route path="/header" element={<Header/>}/> 
      <Route path="/card" element={<Card/>}/> 
      <Route path="/admin" element={<AdminLayout/>}/>
      <Route path="/notification" element={<NotificationBar/>}/> 
      <Route path="/dashboard/user" element={<SignUpTemplate/>}/>
      <Route path="/job_cards/new_job_card" element={<NewJobCard/>}/>
      <Route path="/manpower" element={<ManpowerAndMachinery/>}/>
      <Route path="/master/clients" element={<Clients/>}/>
      <Route path="/master/projects" element={<Projects/>}/>
      <Route path="/master/categories" element={<Categories/>}/> 
      <Route path="dashboard" element={<DashBoard/>}/>
      <Route path="job_cards" element={<JobCards/>}/>
      <Route path="master" element={<Master/>}/>
      <Route path="/master/clients/new_client" element={<NewClientProfile/>}/>
      <Route path="/master/clients/new_client/client_name" element={<ClientName/>}/>
      <Route path="/master/Projects/new_project" element={<NewProject/>}/>
      <Route path="/master/Projects/Edit_Project" element={<EditNewProject/>}/>
      <Route path="/master/Projects/zone_list" element={<ZoneList/>}/>
      <Route path="timeline" element={<TimeLine/>}/>
      <Route path="/timeline/client" element={<ClientTimeLine/>}/>
      
      <Route path="UserManagement" element={<UserManagement/>}/>
      <Route path="/UserManagement/UserRole1" element={<UserRole1/>}/>
      <Route path="/UserManagement/UserRole2" element={<UserRole2/>}/>
      <Route path="/UserManagement/UserRole3" element={<UserRole3/>}/> 
      <Route path="/DataInjestion" element={<DataInjestion/>}/>
      <Route path="/DataInjestion/ProductivitySheet" element={<ProductivitySheet/>}/> 
      <Route path="/DataInjestion/HRMS" element={<HRMS/>}/>
      <Route path="/DataInjestion/QuantitySheet" element={<QuantitySheet/>}/>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sidebar" element={<SideBar />} />
        <Route path="/header" element={<Header />} />
        <Route path="/card" element={<Card />} />
        <Route path="/admin" element={<AdminLayout />} />
        <Route path="/notification" element={<NotificationBar />} />
        <Route path="/dashboard/user" element={<SignUpTemplate />} />
        <Route path="/job_cards/my-job-cards" element={<MyJobCards />} />
       
       
        <Route path="/job_cards/new_job_card" element={<NewJobCard />} />
        <Route path="/job_cards/All-job-cards" element={<AllJobCards />} />
        <Route path="/job_cards/job-cards-assigned" element={<JobCardAssigned />} />
        <Route path="/manpower" element={<ManpowerAndMachinery />} />
        <Route path="/master/clients" element={<Clients />} />
        <Route path="/master/projects" element={<Projects />} />
        <Route path="/master/categories" element={<Categories />} />
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="job_cards" element={<JobCards />} />
        <Route path="master" element={<Master />} />
        <Route
          path="/master/clients/new_client"
          element={<NewClientProfile />}
        />
        <Route
          path="/master/clients/new_client/client_name"
          element={<ClientName />}
        />
        <Route path="/master/Projects/new_project" element={<NewProject />} />
        <Route
          path="/master/Projects/Edit_Project"
          element={<EditNewProject />}
        />
        <Route path="/master/Projects/zone_list" element={<ZoneList />} />
        <Route path="timeline" element={<TimeLine />} />
        <Route path="/timeline/client" element={<ClientTimeLine />} />

        <Route path="UserManagement" element={<UserManagement />} />
        <Route path="/UserManagement/UserRole1" element={<UserRole1 />} />
        <Route path="/UserManagement/UserRole2" element={<UserRole2 />} />
        <Route path="/UserManagement/UserRole3" element={<UserRole3 />} />
        <Route path="/UserManagement/UserRole1/Details" element={<UserRole1Details />} />
        <Route path="/DataInjestion" element={<DataInjestion />} />
        <Route
          path="/DataInjestion/ProductivitySheet"
          element={<ProductivitySheet />}
        />
      </Routes>
    </div>
  );
}

export default App;
