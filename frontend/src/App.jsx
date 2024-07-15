import { Route, Routes } from "react-router-dom";
import UserForm from "./components/UserForm";
import UpdateForm from "./components/UpdateForm";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/update/:userId" element={<UpdateForm />} />
      </Routes>
    </>
  )
}

export default App
