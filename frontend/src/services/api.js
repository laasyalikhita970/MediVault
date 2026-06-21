import axios from "axios";

const API = axios.create({
  baseURL: "https://medivault-xorl.onrender.com/api"
});

export default API;