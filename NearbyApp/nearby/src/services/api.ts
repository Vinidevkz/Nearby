import axios from "axios";
import { TIMEOUT } from "dns";

export const api = axios.create({
    baseURL: "http://192.168.18.197:3333",
    timeout: 700,
})