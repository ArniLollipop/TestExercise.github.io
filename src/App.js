import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import User from "./pages/User";

function App(props) {
  const navigate = useNavigate();
  const [id, setId] = React.useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login id={id} setId={setId} />} />
        <Route path="/" element={<Main id={id} setId={setId} />} />
        <Route path={"/user/" + id} element={<User id={id} setId={setId} />} />
      </Routes>
    </div>
  );
}

export default App;
