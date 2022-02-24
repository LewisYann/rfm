import axios from "axios";
import store, { rootState } from "../store"

const axiosService = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5002"
});

axiosService.interceptors.request.use(function (config) {
  if (store.getState().auth.token != null) {
    config.headers.Authorization = "Bearer " + store.getState().auth.token;
  } else {
    // axios.defaults.headers.common['Authorization'] = null;
    // delete axios.defaults.headers.common['Authorization'];
  }
  return config
});


export default axiosService;
