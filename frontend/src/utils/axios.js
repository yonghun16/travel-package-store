import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD ? '' : 'http://localhost:3000',   // meta.env.PROD ? 배포서버주소 : 테스트서버주소 
});

axiosInstance.interceptors.request.use(     // Axios에서 모든 요청(Request)이 서버로 보내지기 전에 가로채서(request intercept) 특정 작업을 하도록 해주는 기능
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if(error.response.data === 'jwt expired') {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export default axiosInstance
