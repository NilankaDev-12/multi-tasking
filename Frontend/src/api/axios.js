import axios from "axios";

export const api = axios.create({
  baseURL: "https://multi-tasking.onrender.com/api",
  withCredentials: true
})