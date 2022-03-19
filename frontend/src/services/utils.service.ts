import axios from "axios";

const BASEURL = "http://localhost:5001";

const api = axios.create();

const buildHeaders = (): any => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  return headers;
};

export const post = async (route: string, object?: any) => {
  const headers = buildHeaders();

  return await api.post(BASEURL + route, object, { headers });
};

export const patch = async (route: string, object?: any) => {
  const headers = buildHeaders();

  return await api.patch(BASEURL + route, object, { headers });
};

export const get = async (route: string) => {
  const headers = buildHeaders();

  return await api.get(BASEURL + route, {
    headers,
  });
};

export const del = async (route: string) => {
  const headers = buildHeaders();

  return await api.delete(BASEURL + route, {
    headers,
  });
};
