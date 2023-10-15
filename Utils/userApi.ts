import { loginUser, registerUser } from "../Types/Types";

const apiUrl = "https://todo-app-api-nine.vercel.app";
export const register = async (userObj:registerUser) => {
  try {
    const { email, password, userName } = userObj;
    const newUser = JSON.stringify({ email, password, userName });
    const req = await fetch(`${apiUrl}/register`, {
      method: "POST",
      body: newUser,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res =await req.json();
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const login = async (userObj:loginUser) => {
  try {
    const { email, password } = userObj;
    const user = JSON.stringify({ email, password });
    const req = await fetch(`${apiUrl}/login`, {
      method: "POST",
      body: user,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await req.json();
    return res;
  } catch (err) {
    console.log(err);
  }
};
