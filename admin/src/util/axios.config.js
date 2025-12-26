import axios from "axios";

const instance = axios.create();

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before the request is sent
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    // Do something with the request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lies within the range of 2xx causes this function to trigger
    // Do something with response data
    const { authorization } = response.headers;
    authorization && localStorage.setItem("token", authorization);
    return response;
  },
  function (error) {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        localStorage.removeItem("token");
        window.location.href = "#/login";
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
