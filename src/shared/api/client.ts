import axios from "axios";

export const client = axios.create({
  baseURL: "https://bothubq.com/api/v2",
});