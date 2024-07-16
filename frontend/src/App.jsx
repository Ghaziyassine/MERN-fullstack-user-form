import { Route, Routes } from "react-router-dom";
import UserForm from "./components/userForm/UserForm";
import UpdateForm from "./components/userForm/UpdateForm";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/update/:id" element={<UpdateForm />} />
      </Routes>
    </>
  )
}

export default App
