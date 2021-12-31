import "./App.css";
import Login from "./components/register/Login";
import SignUp from "./components/register/SignUp";
import SideBar from "./components/layout/SideBar";
import Header from "./components/layout/Header";
import Card from "./components/layout/Card";
import AdminLayout from "./components/layout/AdminLayout";
import NotificationBar from "./components/layout/NotificationBar";
import SignUpTemplate from "./components/layout/SignUpTemplate";
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
      </Routes>
    </div>
  );
}

export default App;
