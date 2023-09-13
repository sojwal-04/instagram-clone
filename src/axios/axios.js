import axios from "axios";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const instance = axios.create({
  baseUrl: baseUrl,
  // withCredentials: true,
});

export default instance;
