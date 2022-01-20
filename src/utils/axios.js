import axios from "axios";
 

const axiosService = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5002"
});

axiosService.interceptors.request.use(function (config) {
  if (JSON.parse(localStorage.getItem("user"))!=null) {
        config.headers.Authorization = "Bearer "+JSON.parse(localStorage.getItem("user")).token;
  } else {
    // axios.defaults.headers.common['Authorization'] = null;
    // delete axios.defaults.headers.common['Authorization'];
  }
  return config
});


export default axiosService;
