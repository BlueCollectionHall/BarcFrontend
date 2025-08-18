import axios from 'axios';

export const baseHttp = axios.create(
  {
    baseURL: "https://api.barc.work",
    timeout: 10000
  }
);
