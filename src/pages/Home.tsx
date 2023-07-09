import Header from "../components/Header";
import EmployeeList from "../components/EmployeeList";
import AddEmployee from "./AddEditEmployee";
import NotFound from "../pages/NotFound";
import { Routes, Route } from "react-router-dom";

const Home = () => {
  return (
    <div className="Home">
      <Header />
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/addEmployee" element={<AddEmployee />} />
        <Route path="/editEmployee" element={<AddEmployee />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Home;
