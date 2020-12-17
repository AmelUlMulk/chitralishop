const bcrypt = require("bcryptjs");

const user = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Sadia",
    email: "sadia@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Sania",
    email: "sania@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Asad",
    email: "asad@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];
module.exports = user;
