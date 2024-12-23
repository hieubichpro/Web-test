import axios from "axios";

// const url = "http://localhost:8081/api/v1";
const url = "http://localhost/api/v1";

export const API = axios.create({ baseURL: url });
