import { useRef } from "react";
import { useAppDispatch } from "../store/store";
import { Department, addEmployee } from "../store/features/employeeSlice";

const TempAddEmployee = () => {
  const name = useRef<string>("");
  const salary = useRef<number>();
  const department = useRef<Department>();
  const dispatch = useAppDispatch(); // use to send the addPerson() action with parameter name to the redux store, to insert a new person to the redux store

  return (
    <div>
      <label htmlFor="">Employee Name:</label>
      {/* update the current name with the input value */}
      <input onChange={(e) => (name.current = e.target.value)} />
      {/* dispatches the addPerson action with the payload of name.current. */}
      {/* AKA dispatch send action to store to update state  */}
      <button
        onClick={() =>
          dispatch(
            addEmployee({
              name: name.current,
              salary: 3,
              department: Department.HR,
            })
          )
        }
      >
        Add Person
      </button>
    </div>
  );
};

export default TempAddEmployee;
