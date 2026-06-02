import axios from "axios";

const api = axios.create({
  baseURL: "https://tnthpt-be.onrender.com/api"
});

export default api;