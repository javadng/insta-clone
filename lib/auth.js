import { compare, hash } from "bcrypt";

export const hashPassword = password => {
  const hashedPassword = hash(password, 12);
  return hashedPassword;
};

export const comparePassword = async (password, hashedPassword) => {
  const isvalid = await compare(password, hashedPassword);
  return isvalid;
};
