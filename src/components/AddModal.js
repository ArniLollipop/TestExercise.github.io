import { Box, Typography } from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";
import api from "../api";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";

function AddModal(props) {
  const { setAdd } = props;
  const [userName, setUserName] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [error, setError] = React.useState(false);
  const [disable, setDisable] = React.useState(true);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  useEffect(() => {
    if (
      userName.length > 0 &&
      firstName.length > 0 &&
      pass.length > 8 &&
      lastName.length > 0
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  });

  function handleReg() {
    const formData = new FormData();
    formData.append("username", userName);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("password", pass);
    formData.append("is_active", true);

    api
      .post("/users/", formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((data) => {
        if (data.status === 201) {
          setAdd(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Box
        onClick={() => setAdd(false)}
        className="p-2 lg:p-0"
        sx={{
          position: "fixed",
          background: "rgba(0, 0, 0, 0.7) !important",
          width: "100%",
          height: "100%",
          zIndex: "30",
        }}
      ></Box>
      <Box
        className="max-w-[450px] min-w-[300px] fixed top-20"
        sx={{
          padding: "20px",
          paddingTop: "50px",
          borderRadius: "10px",
          backgroundColor: "white",
          top: "15%",
          left: "50%",
          translate: "-50%",
          zIndex: "40",
        }}
      >
        <Button
          onClick={() => setAdd(false)}
          color="primary"
          sx={{
            position: "absolute",
            top: "20px",
            right: "20px",
            padding: "0px 0px",
          }}
        >
          <CloseIcon />
        </Button>
        <Typography className="text-center sm:text-2xl text-lg">
          Добавить нового Юзера
        </Typography>
        <Box sx={{ mt: 0.5 }}>
          <TextField
            sx={{ mt: 0.5 }}
            size="small"
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
            size="small"
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
            size="small"
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
            size="small"
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
              setError(false);
            }}
          />
          {error && (
            <Typography
              sx={{ fontSize: "14px", color: "red", mt: 1, mb: 1, ml: 1.7 }}
            >
              Не удалось добавить юзера
            </Typography>
          )}
          <Button
            disabled={disable}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => handleReg()}
          >
            Добавить
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default AddModal;
