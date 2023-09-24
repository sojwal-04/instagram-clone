import axios from "axios";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const makeRequest = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export { makeRequest };
