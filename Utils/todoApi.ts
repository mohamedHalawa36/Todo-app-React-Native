import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import { taskCrudObj } from "../Types/Types";


const baseUrl = "https://todo-app-api-nine.vercel.app";

export const todoAxios = axios.create({
  baseURL: baseUrl,
  headers: {},
});
todoAxios.interceptors.request.use(
  async function (config) {
    const token = await AsyncStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const getTodos = async (userId:string) => {
  const res = await todoAxios.get(`/${userId}/todo`);
  return res.data;
};

export const deleteTask = async ({ userId, taskId }:{userId:string,taskId:string}) => {
  try {
    const res = await todoAxios.delete(`/${userId}/todo`, {
      data: { taskId },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const addTask = async ({ userId, task }:taskCrudObj) => {
  try {
    const { id, title, done } = task;
    const res = await todoAxios.post(`/${userId}/todo`,{ id, title, done });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateTask = async ({ userId, task }:taskCrudObj) => {
  try {
    const { id, title, done } = task;
    const res = await todoAxios.put(`/${userId}/todo`, {
      id,
      title,
      done,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
