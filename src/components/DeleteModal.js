import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import api from "../api";

function DeleteModal(props) {
  const { setDel, id } = props;
  const [err, setErr] = useState(false);

  console.log(id);

  function delFunc() {
    const formData = new FormData();
    setErr(false);
    formData.append("id", id);
    api
      .delete(`/users/${id}`, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((data) => {
        if (data.status === 204) {
          setDel(false);
        }
      })
      .catch((err) => {
        setErr(true);
      });
  }

  return (
    <>
      <Box
        onClick={() => setDel(false)}
        className=" lg:p-0"
        sx={{
          position: "fixed",
          background: "rgba(0, 0, 0, 0.7) !important",
          width: "100%",
          height: "100%",
          zIndex: "30",
        }}
      ></Box>
      <Box
        className="max-w-[450px] min-w-[300px] fixed"
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
          onClick={() => setDel(false)}
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
        <Typography className="text-center mt-4">
          Вы точно хотите удалить этого Юзера?
        </Typography>
        <Button
          onClick={() => delFunc()}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
        >
          Подтвердить
        </Button>
        {err && (
          <p className="text-base font-semibold text-red-500 text-center">
            Не удалось удалить, попробуйте позже
          </p>
        )}
      </Box>
    </>
  );
}

export default DeleteModal;
