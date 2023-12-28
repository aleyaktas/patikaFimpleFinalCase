import { get, post } from ".";

export const createForm = async (data) => {
  const result = await post("/forms", "", data, true);
  return result;
};

export const getFormByCode = async (code) => {
  const result = await get(`/forms/${code}`, "");
  return result;
};