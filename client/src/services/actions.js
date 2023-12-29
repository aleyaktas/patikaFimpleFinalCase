import { get, post, put } from ".";

export const createForm = async (data) => {
  const result = await post("/forms", "", data, true);
  return result;
};

export const getFormByCode = async (code) => {
  const result = await get(`/forms/${code}`, "");
  return result;
};

export const adminLogin = async (authData) => {
  const result = await post("/auth/login", "", authData, false);
  return result;
};

export const getForms = async (
  pageNumber = 1,
  searchText = "",
  status = ""
) => {
  const params = `?page=${pageNumber}&search=${searchText}&status=${status}`;
  const result = await get("/forms", params);
  return result;
};

export const getStatistics = async () => {
  const result = await get("/forms/statistics", "");
  return result;
};

export const updateFormStatus = async (code, status) => {
  const result = await put(`/forms/${code}`, "", { status });
  return result;
};
