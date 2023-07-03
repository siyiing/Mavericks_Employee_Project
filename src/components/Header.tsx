import AddEmployee from "./AddEmployeeButton";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <h2 className="title">Employees</h2>
      <div className="button-add">
        <AddEmployee />
      </div>
    </div>
  );
};

export default Header;
