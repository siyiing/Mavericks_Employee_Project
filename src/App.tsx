import "./App.css";
import Header from "./components/Header";
import EmployeeList from "./components/EmployeeList";
import TempAddEmployee from "./components/TempAddEmployee";

function App() {
  return (
    <div className="App">
      <Header />
      <TempAddEmployee />
      <EmployeeList />
    </div>
  );
}

export default App;
