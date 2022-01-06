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
      <Route path="/admin/edit" element={<SignUpTemplate/>}/>
      <Route path="/table" element={<TableDesign/>}/>
      <Route path="/newjobcard" element={<NewJobCard/>}/>
      <Route path="/manpower" element={<ManpowerAndMachinery/>}/>
      <Route path="/clients" element={<Clients/>}/>
      <Route path="/projects" element={<Projects/>}/>
      <Route path="/categories" element={<Categories/>}/>
      <Route path="/UserRoles" element={<UserRoles/>}/>
      </Routes>
    </div>
  );
}

export default App;
