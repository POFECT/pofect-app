import axios from "axios";
import { Platform  } from 'react-native';

const DEV = Platform.OS === 'android' ?
            "http://10.0.2.2:8080/api": "http://localhost:8080/api";
const HOST = "https://52.79.114.216:8080/api/";

function axiosApi() {
  const api = axios.create({
    baseURL: DEV,
  });
  return api;
}

export { axiosApi };
