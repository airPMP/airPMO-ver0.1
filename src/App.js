import "./App.css";
import Login from "./components/register/Login";
import SignUp from "./components/register/SignUp";
import SideBar from "./components/layout/SideBar";
import Header from "./components/layout/Header";
import Card from "./components/layout/Card";
import AdminLayout from "./components/layout/AdminLayout";
import NotificationBar from "./components/layout/NotificationBar";
import SignUpTemplate from "./components/layout/SignUpTemplate";
import NewJobCard from "./components/JobCards/NewJobCard";
import ManpowerAndMachinery from "./components/JobCards/ManpowerAndMachinery";
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
import UserRole1 from "./components/Management/UserRole";
import UserRole2 from "./components/Management/UserRole2";
import UserRole3 from "./components/Management/UserRole3";
import DataInjestion from "./pages/DataInjestion";
import ProductivitySheet from "./components/Injestion/ProductivitySheet";
import UserRole1Details from "./components/Management/UserRole1Details";
import AllJobCards from "./components/JobCards/AllJobCards";
import JobCardAssigned from "./components/JobCards/JobCardAssigned";
import MyJobCards from "./components/JobCards/MyJobCards";
import HRMS from "./components/Injestion/HRMS";
import QuantitySheet from "./components/Injestion/QuantitySheet";
import ResetPassword from "./pages/ResetPassword";
import EditClientProfile from "./components/Master/edit_client/[id]";
import EditProject from "./components/Master/edit_project/[id]";
import AddCategories from "./components/Master/AddCategories";
import EditCategories from "./components/Master/edit_categories/[id]";
import SuperAdmin from "./pages/SuperAdmin";
import UserEmpolyee from "./pages/UserEmpolyee";
import AddNewUser from "./components/Management/AddNewUser";
import EditAccess from "./components/Management/EditAccess";
import SuperAdminId from "./components/SuperAdmin/[id]";
import AddUserRole1 from "./components/Management/AddUserRole1";
import Consultant from "./components/Master/Consultant";
import AddConsultant from "./components/Master/Add_Consultant";
import LightQuantity from "./components/Injestion/LightQuantity";
import FireQuantity from "./components/Injestion/FireQuantity";
import ViewZones from "./components/Master/ViewZones";
// import NewJobCardMulti from "./components/JobCards/NewJobCardMulti"; 
import NewJobCardMultiId from "./components/JobCards/CardAssignId/[id]";
import ZoneById from "./components/Master/zones/[id]";

function App() {
  return (
    <div className="bg-[#ECF1F0]">
      <Routes>
        {
          // login And Signup Routes
        }
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        {
          // layout Routes
        }
        <Route path="/sidebar" element={<SideBar />} />
        <Route path="/header" element={<Header />} />
        <Route path="/card" element={<Card />} />
        <Route path="/admin" element={<AdminLayout />} />
        <Route path="/notification" element={<NotificationBar />} />
        {
          // Dashboard 
        }
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="/dashboard/user" element={<SignUpTemplate />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        {
          // JobCards Routes
        }
        <Route path="daily_task" element={<JobCards />} />
        {/* <Route path="/daily_task/new_daily_task" element={<NewJobCard />} /> */}
        <Route path="/manpower" element={<ManpowerAndMachinery />} />
        <Route path="/daily_task/my-daily-task" element={<MyJobCards />} /> 
        {/* MyJobCards this is arab electricals after status conform */}
        <Route path="/daily_task/new_daily_task" element={<NewJobCard />} />
         {/* NewJobCard this is Create new Job */}
        <Route path="/daily_task/All-daily-task" element={<AllJobCards />} />
         {/* AllJobCards this is arab electricals before status conform */}
        <Route path="/daily_task/daily-task-assigned" element={<JobCardAssigned />} />
          {/* JobCardAssigned this is arab electricals  drop down */}
        {/* <Route path="/manpowermulti" element={<ManpowerAndMachineryMulti />} /> */}

        {/* <Route path="/daily_task/new_daily_task_multi" element={<NewJobCardMulti />} /> */}

        <Route path="/daily_task/CardAssignId/:id" element={<NewJobCardMultiId />} />
         {/* NewJobCardMulti this is Create new Job */}


        {
          // Master
        }
        <Route path="master" element={<Master />} />
        <Route path="/master/clients" element={<Clients />} />
        <Route path="/master/projects" element={<Projects />} />
        <Route path="/master/categories/add_categories" element={<AddCategories />} />
        <Route path="/master/edit_categories/:id" element={<EditCategories />} />
        <Route path="/master/categories" element={<Categories />} />
        <Route path="/master/clients/new_client/" element={<NewClientProfile />} />
        <Route path="/master/edit_client/:id" element={<EditClientProfile />} />
        <Route path="/master/clients/new_client/client_name" element={<ClientName />} />
        <Route path="/master/Projects/new_project" element={<NewProject />} />
        <Route path="/master/edit_project/:id" element={<EditProject />} />
        <Route path="/master/Projects/Edit_Project" element={<EditNewProject />} />
        <Route path="/master/Projects/zone_list" element={<ZoneList />} />
        <Route path="/master/zones/:id" element={<ZoneById />} />
        <Route path="/master/consultant" element={<Consultant/>}/>
        <Route path="/master/consultant/add_consultant" element={<AddConsultant />} />

        <Route path="/master/Projects/new_project/view_zones" element={<ViewZones />} />
        {
          // timeline
        }
        <Route path="timeline" element={<TimeLine />} />
        <Route path="/timeline/client" element={<ClientTimeLine />} />
        {
          // User Management
        }
        <Route path="UserManagement" element={<UserManagement />} />
        <Route path="/UserManagement/UserRole" element={<UserRole1 />} />
        <Route path="/UserManagement/UserRole2" element={<UserRole2 />} />
        <Route path="/UserManagement/UserRole3" element={<UserRole3 />} />
        <Route path="/UserManagement/AddNewUser" element={<AddNewUser/>} />
        <Route path="/UserManagement/AddUserRole" element={<AddUserRole1/>} />
        <Route path="/UserManagement/UserRole1/Details" element={<UserRole1Details />} /> 
        <Route path="/UserManagement/EditAccess" element={<EditAccess />} />
        {
          // DataInjestion
        }
        <Route path="/DataInjestion" element={<DataInjestion />} />
        <Route path="/DataInjestion/ProductivitySheet" element={<ProductivitySheet />} />
        <Route path="/DataInjestion/HRMS" element={<HRMS />} />
        <Route path="/DataInjestion/QuantitySheet" element={<QuantitySheet />} /> 
        <Route path="/DataInjestion/LightQuantity" element={<LightQuantity />} /> 
        <Route path="/DataInjestion/FireQuantity" element={<FireQuantity />} />

        {/* superAmin pages */}
        <Route path="super_admin" element={<SuperAdmin/>}/>
        <Route path="user_empolyee" element={<UserEmpolyee/>}/>
        <Route path="/SuperAdmin/:id" element={<SuperAdminId />} />
          {
          /*<Route path="/master/clients" element={<Clients />} />
         <Route path="/master/projects" element={<Projects />} />
         <Route path="/master/categories" element={<Categories />} />
         <Route path="dashboard" element={<DashBoard />} />
         <Route path="daily_task" element={<JobCards />} />
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
        
         <Route path="/DataInjestion" element={<DataInjestion />} />
         <Route
           path="/DataInjestion/ProductivitySheet"
           element={<ProductivitySheet />}
         />*/
        }
      </Routes>
    </div>
  );
}

export default App;
