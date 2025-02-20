import axios from "axios";
import { getUrlDevLinkV3 } from "./helper";

const myInterceptor = axios;
myInterceptor.interceptors.request.use(function (config) {
  if (
    typeof window !== "undefined" &&
    typeof localStorage !== "undefined" &&
    localStorage
  ) {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export async function axiosPOST(type = "", Url: any, param = {}) {
  const URL_BASE_ADMIN = getUrlDevLinkV3(type);
  return myInterceptor
    .post(URL_BASE_ADMIN + Url, param)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return Promise.reject(err?.response);
    });
}

export async function axiosGET(type: any, Url: any) {
  const URL_BASE_ADMIN = getUrlDevLinkV3(type);
  return myInterceptor
    .get(URL_BASE_ADMIN + Url)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return Promise.reject(err?.response);
    });
}

// export async function axiosGET(type, Url) {
//   try {
//     let URL_BASE_ADMIN = getUrlDevLinkV3(type); // Lấy URL cơ bản dựa vào loại API
//     const token = localStorage.getItem("jwt"); // Lấy token từ localStorage
//     toast(token + "Null");
//     // Gọi API với header Authorization
//     const res = await myInterceptor.get(URL_BASE_ADMIN + Url, {
//       headers: {
//         'Authorization': `Bearer ${token}`, // Thêm token vào Authorization header
//         'accept': 'application/json',       // Đảm bảo định dạng nhận về là JSON
//       }
//     });

//     return res; // Trả về kết quả nếu thành công
//   } catch (err) {
//     return err?.response; // Trả về thông tin lỗi từ response nếu có lỗi
//   }
// }

export async function axiosPUT(type = "", Url: any, param = {}) {
  const URL_BASE_ADMIN = getUrlDevLinkV3(type);
  return myInterceptor
    .put(URL_BASE_ADMIN + Url, param)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return Promise.reject(err?.response);
    });
}
export async function axiosDELETE(type = "", Url: any) {
  const URL_BASE_ADMIN = getUrlDevLinkV3(type);
  return myInterceptor
    .delete(URL_BASE_ADMIN + Url, {})
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return Promise.reject(err?.response);
    });
}

export const TOKEN_KEY = "bank-token";

export function getAuthToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
}

export function setAuthToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

export function removeAuthToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function clearAuthToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
}
