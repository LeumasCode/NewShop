import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 12),
    isAdmin: true,
  },
  {
    name: "John man",
    email: "john@gmail.com",
    password: bcrypt.hashSync("123456", 12),
  },
  {
    name: "Akin woman",
    email: "akin@gmail.com",
    password: bcrypt.hashSync("123456", 12),
  },
];

export default users
