import axios from 'axios';
import { generateHeaders } from './GenerateHeaders';

export const fetchAxios = (endpoint, params = {}, cache = true) => {
  return axios({
    method: 'get',
    url: endpoint,
    headers: generateHeaders(),
    responseType: 'json',
    params,
  });
};
