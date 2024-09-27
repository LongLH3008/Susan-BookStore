import { API } from "../config";

import { SendRequest } from "@/config";

export const login = async (args: ILogin) => {
  return await SendRequest("POST", "auth/login", args);
};

export const logout = async () => {
  return await SendRequest("POST", "auth/logout");
};

export const register = async (args: IRegister) => {
  return await SendRequest("POST", "auth/register", args);
};

export const requestOTP = async (args: IForgotPassword["user_email"]) => {
  return await SendRequest("POST", "auth/request-otp", args);
};

export const checkOTP = async (args: {
  user_name: string;
  user_otp: string;
}) => {
  return await SendRequest("POST", "auth/check-otp", args);
};

export const confirmNewPassword = async (args: {
  user_name: string;
  newPassword: string;
  confirmedPassword: string;
}) => {
  return await SendRequest("POST", "auth/forgot-pw", args);
};

export const changePassword = async (args: {
  user_id: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  return await SendRequest("POST", "auth/change-pw", args);
};

const checkAuthentication = async () => {
  if ((window.location.href = "https://accounts.google.com"))
    console.log("aaa");
};

export const loginByGoogle = () => {
  setTimeout(() => {
    window.addEventListener("onload", checkAuthentication);
  }, 500);
  window.location.href = `${API.GOOGLE_LOGIN}`;
};

export const getUsers = async () => {
  return await SendRequest("GET", "user");
};
