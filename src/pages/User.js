import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { useNavigate } from "react-router-dom";

function User(props) {
  const navigate = useNavigate();
  const { id, setId } = props;
  const [user, setUser] = useState();
  const [userName, setUserName] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [err, setErr] = React.useState(false);

  useEffect(() => {
    api
      .get(`/users/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        setUserName(data.data.username);
        setFirstName(data.data.first_name);
        setLastName(data.data.last_name);
        setPass(data.data.password);
        setErr(false);
      })
      .catch(() => {
        setErr(true);
      });
  }, []);

  const newclass = {
    backgroundColor: "#16172d",
    color: "white",
    width: "100%",
    margin: "0 auto",
    display: "block",
    mt: 1,
    zIndex: "0",
    ":hover": {
      backgroundColor: "#16172d",
      color: "white",
    },
  };

  function handleChange() {
    const formData = new FormData();
    formData.append("username", userName);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("password", pass);
    formData.append("is_active", true);

    api
      .put(`/users/${id}`, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((data) => {
        if (data.status === 200) {
          navigate("/");
        }
      })
      .catch(() => {
        setErr(true);
      });
  }

  return (
    <div className="p-5 max-w-[400px] mx-auto">
      {!err && (
        <div>
          <TextField
            sx={{ mt: 0.5 }}
            size="medium"
            margin="normal"
            required
            fullWidth
            id="userName"
            label="userName"
            name="userName"
            autoComplete="userName"
            autoFocus
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            sx={{ mt: 0.5 }}
            size="medium"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="firstName"
            name="firstName"
            autoComplete="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            sx={{ mt: 0.5 }}
            size="medium"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="lastName"
            name="lastName"
            autoComplete="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            sx={{ mt: 0.5, mb: 0 }}
            size="medium"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
          <Button onClick={handleChange} sx={newclass}>
            Изменить
          </Button>
        </div>
      )}
      {err && (
        <div>
          <p className="text-xl font-semibold text-center">
            Что то пошло не так...
          </p>
          <Link
            to="/"
            className="p-3 rounded-[10px] mt-3 bg-[#16172d] text-white font-semibold border-none bg-transparent text-start cursor-pointer outline-none no-underline w-fit mx-auto block"
          >
            на главную
          </Link>
        </div>
      )}
    </div>
  );
}

export default User;
