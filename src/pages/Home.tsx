import Header from "../components/Header";
import EmployeeList from "../components/EmployeeList";
import AddEditEmployee from "./AddEditEmployee";
import NotFound from "../pages/NotFound";
import Login from "./Login";
import SignUp from "./SignUp";
import { Routes, Route } from "react-router-dom";


const Home = () => {
  return (
    <div className="Home">
      <Header />
      <Routes>
        <Route path="/employeelist" element={<EmployeeList />} />
        <Route path="/addEmployee" element={<AddEditEmployee />} />
        <Route path="/editEmployee" element={<AddEditEmployee />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default Home;
