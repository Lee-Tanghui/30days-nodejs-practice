import { message } from 'antd';
import axios from 'axios';

// axios全局设置
axios.defaults.withCredentials = true;

// axios实例设
const instance = axios.create();
instance.defaults.withCredentials = true;
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const data = error.response.data;
    if (data) {
      message.error(data.errMsg || '网络错误');
      return data;
    } else {
      return null;
    }
  }
);

export default instance;
