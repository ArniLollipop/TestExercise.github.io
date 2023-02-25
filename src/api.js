import axios from "axios";

const api = axios.create({
  timeout: 1000 * 30,
  baseURL: "https://test-assignment.emphasoft.com/api/v1",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

api.defaults.headers.common = {
  Authorization: `Token ${window.localStorage.getItem("token")}`,
};

export default api;
