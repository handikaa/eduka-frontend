import axios from "axios";

import { API_BASE_URL, STORAGE_KEY } from "./constans";
import { storage } from "./storage";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = storage.getItem(STORAGE_KEY.TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
