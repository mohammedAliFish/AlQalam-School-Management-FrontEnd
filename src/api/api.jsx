import axios from 'axios';


    const baseUrl = axios.create({baseURL : 'https://localhost:7025/'});
  
    export default baseUrl