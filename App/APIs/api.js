import axios from "axios";
import { Platform  } from 'react-native';

const DEV = Platform.OS === 'android' ?
            "http://192.168.163.131:8080/api": "http://192.168.0.3:8080/api";
const HOST = "https://gateway.pofect.store/service-pofect/api";

function axiosApi() {
  const api = axios.create({
    baseURL: HOST,
  });
  return api;
}

export { axiosApi };
