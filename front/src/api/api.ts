import axios from 'axios';
import { API_URL } from '@variables/config';

export const axiosAuthorized = axios.create({
  withCredentials: true,
  baseURL: new URL(API_URL).origin,
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer: { indexes: null },
});

export const axiosPublic = axios.create({
  withCredentials: true,
  baseURL: new URL(API_URL).origin,
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer: { indexes: null },
});
