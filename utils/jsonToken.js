import jwt from "jsonwebtoken";
const signToken = (id) => {
  const jwtSecret = "abc123";
  return  jwt.sign({ id }, jwtSecret, {
    expiresIn: "30d",
  });
};
export default signToken;
