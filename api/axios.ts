import axiosClient from "axios";

const baseURL = "https://pokeapi.co/api/v2/";

export const axios = axiosClient.create({
  baseURL,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // console.dir(error.response.data.errors, { depth: null })
    return Promise.reject(error);
  }
);
