import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Box, Button, Typography, TextField } from "@mui/material";
import DeleteModal from "../components/DeleteModal";
import AddModal from "../components/AddModal";

function Main(props) {
  const { id, setId } = props;
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchId, setSearchId] = useState();
  const [del, setDel] = useState(false);
  const [add, setAdd] = useState(false);

  const newclass = {
    backgroundColor: "#16172d",
    color: "white",
    zIndex: "0",
    ":hover": {
      backgroundColor: "#16172d",
      color: "white",
    },
  };

  useEffect(() => {
    if (
      localStorage.getItem("token") === null ||
      localStorage.getItem("token") === ""
    ) {
      navigate("/login");
    } else {
      api
        .get("/users", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(({ data }) => {
          setUsers(data.sort((a, b) => parseInt(a.id) - parseInt(b.id)));
        })
        .catch((error) => console.log(error));
    }
  }, [add, del, users]);

  return (
    <div className="relative">
      {del && <DeleteModal setDel={setDel} id={id} />}
      {add && <AddModal setAdd={setAdd} />}
      <div className="">
        <Box className="px-4">
          <Box className="pt-6 flex flex-wrap gap-y-2 items-center justify-between">
            <Box className=" flex items-center gap-x-2">
              <TextField
                id="filled-hidden-label-small"
                label="Поиск по Username"
                variant="outlined"
                size="small"
                onChange={(e) => setSearch(e.target.value)}
              />
              <TextField
                id="filled-hidden-label-small"
                label="Поиск по Id"
                variant="outlined"
                size="small"
                type="number"
                onChange={(e) => setSearchId(e.target.value)}
              />
            </Box>
            <Button onClick={() => setAdd(!add)} sx={newclass}>
              Добавить
            </Button>
          </Box>
          <Box className=" mt-4">
            <div className="grid grid-cols-4 pl-[12px]">
              <Typography className="col-span-1 sm:block hidden">id</Typography>
              <Typography className="sm:col-span-1 sm:block hidden">
                UserName
              </Typography>
              <Typography className="sm:col-span-1 sm:block hidden">
                FirstName
              </Typography>
              <Typography className="sm:col-span-1 sm:block hidden">
                LastName
              </Typography>
            </div>
            <Box
              sx={{
                width: "100%",
                border: "2px solid #16172d",
                borderRadius: "6px",
                fontSize: "18px",
                justifyContent: "space-between",
                mt: "5px",
              }}
            >
              {users
                .filter((filt) =>
                  searchId > 0
                    ? filt.id === parseInt(searchId)
                    : filt.id !== searchId
                )
                .filter((filt) =>
                  filt.username.toLowerCase().includes(search.toLowerCase())
                )
                .map((el) => {
                  return (
                    <Box
                      key={el.id}
                      className="w-full relative sm:py-5 py-2 last:border-0 border-b-2 border-black pl-[10px]"
                      sx={{ borderBottom: "2px solid #16172d" }}
                    >
                      <Link
                        onClick={() => setId(el.id)}
                        to={"/user/" + el.id}
                        className="w-full sm:grid grid-cols-4 p-0 border-none bg-transparent text-start cursor-pointer outline-none no-underline text-black"
                      >
                        <Typography className="sm:col-span-1 col-span-3">
                          {el.id}
                        </Typography>
                        <Typography className="sm:col-span-1 w-fit">
                          {el.username}
                        </Typography>
                        <Typography className="sm:col-span-1 w-fit">
                          {el.first_name}
                        </Typography>
                        <Typography className="sm:col-span-1 w-fit">
                          {el.last_name}
                        </Typography>
                      </Link>
                      <Box>
                        <Button
                          onClick={() => {
                            setDel(!del);
                            setId(el.id);
                          }}
                          color="error"
                          sx={{
                            position: "absolute",
                            minWidth: "0px",
                            padding: "0",
                            top: "50%",
                            right: "10px",
                            transform: "translateY(-50%)",
                          }}
                        >
                          <RemoveCircleOutlineIcon />
                        </Button>
                      </Box>
                    </Box>
                  );
                })}
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default Main;
