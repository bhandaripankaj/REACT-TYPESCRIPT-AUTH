import axios from "axios";
let SERVER_URL = 'http://localhost:4001/'

const axiosInstance =  axios.create({
    baseURL:SERVER_URL
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        localStorage.clear();
        window.location.href = "/";
      }
      return Promise.reject(
        (error.response && error.response) || "Something went wrong!"
      );
    }
  );
  
  axiosInstance.interceptors.request.use(
    (config) => {
      // Do something before request is sent
      config.headers["token"] = localStorage.token;
      config.headers["TimeZone"] =
        Intl.DateTimeFormat().resolvedOptions().timeZone;
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

export default axiosInstance