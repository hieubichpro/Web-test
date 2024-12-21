import axios from "axios";

const url = "host.docker.internal:8081/api/v1";

export const API = axios.create({ baseURL: url });
