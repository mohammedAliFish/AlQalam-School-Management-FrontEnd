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
  
    export default baseUrl