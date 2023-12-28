import { post } from ".";

export const createForm = async (data) => {
  const result = await post("/forms", "", data, true);
  return result;
};
