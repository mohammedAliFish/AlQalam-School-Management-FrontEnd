import axios from 'axios';


    const baseUrl = axios.create({baseURL : 'https://localhost:7025'});

    baseUrl.interceptors.request.use(
        (config) => {
          
          const token = localStorage.getItem("token");
          
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      baseUrl.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          if (error.response && error.response.status === 401) {
            window.location.href = '/';
          }
      
          return Promise.reject(error);
        }
      );
  
    export default baseUrl