import axios from "axios";

import { config } from "../envs";

// const StatusCode = {
//   Unauthorized: 401,
//   Forbidden: 403,
//   TooManyRequests: 429,
//   InternalServerError: 500,
// };

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Credentials": true,
  "X-Requested-With": "XMLHttpRequest",
};

// We can use the following function to inject the JWT token through an interceptor
// We get the `accessToken` from the localStorage that we set when we authenticate
const injectToken = (config) => {
  try {
    const token = localStorage.getItem("accessToken");

    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    throw new Error(error);
  }
};

class Http {
  instance = null;

  get http() {
    return this.instance !== null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: config["API_URL"],
      headers,
      // timeout: 1000 * 10,
      // withCredentials: true,
    });

    http.interceptors.request.use(injectToken, (error) =>
      Promise.reject(error)
    );

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        return this.handleError(error?.response?.data?.error || error);
      }
    );

    this.instance = http;
    return http;
  }

  request(config) {
    return this.http.request(config);
  }

  get(url, config) {
    return this.http.get(url, config);
  }

  post(url, data, config) {
    return this.http.post(url, data, config);
  }

  put(url, data, config) {
    return this.http.put(url, data, config);
  }

  delete(url, config) {
    return this.http.delete(url, config);
  }

  // Handle global app errors
  // We can handle generic app errors depending on the status code
  handleError(error) {
    // const { status } = error;

    // switch (status) {
    //   case StatusCode.InternalServerError: {
    //     // Handle InternalServerError
    //     break;
    //   }
    //   case StatusCode.Forbidden: {
    //     // Handle Forbidden
    //     break;
    //   }
    //   case StatusCode.Unauthorized: {
    //     // Handle Unauthorized
    //     break;
    //   }
    //   case StatusCode.TooManyRequests: {
    //     // Handle TooManyRequests
    //     break;
    //   }
    // }

    return Promise.reject(error);
  }
}

export const http = new Http();
