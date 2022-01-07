import "./App.css";
import Login from "./components/register/Login";
import SignUp from "./components/register/SignUp";
import SideBar from "./components/layout/SideBar";
import Header from "./components/layout/Header";
import Card from "./components/layout/Card";
import AdminLayout from "./components/layout/AdminLayout";
import NotificationBar from "./components/layout/NotificationBar";
import SignUpTemplate from "./components/layout/SignUpTemplate";
import TableDesign from "./components/Tablelayouts/TableDesign";
import NewJobCard from "./components/Tablelayouts/NewJobCard";
import ManpowerAndMachinery from "./components/Tablelayouts/ManpowerAndMachinery";
import Clients from "./components/Master/Clients";
import Projects from "./components/Master/Projects";
import Categories from "./components/Master/Categories";
import UserRoles from "./components/Management/UserRoles";
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
      <Route path="/job_cards/table" element={<TableDesign/>}/>
      <Route path="/job_cards/new_job_card" element={<NewJobCard/>}/>
      <Route path="/manpower" element={<ManpowerAndMachinery/>}/>
      <Route path="/master/clients" element={<Clients/>}/>
      <Route path="/master/projects" element={<Projects/>}/>
      <Route path="/master/categories" element={<Categories/>}/>
      <Route path="/UserRoles" element={<UserRoles/>}/>
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
      
      </Routes>
    </div>
  );
}

export default App;
