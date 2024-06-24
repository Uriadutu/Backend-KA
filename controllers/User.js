import { argon2 } from "argon2";
import User from "../models/UserModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ msg: "Tidak ada user" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ msg: "Tidak ada user" });
  }
};

export const createUser = async (req, res) => {
  const { name, username, password, role } = req.body;
  if (password === "" || password === null) {
    return res.status(400).json({ msg: "Password harus diisi" });
  }

  if (password !== confirmPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      name: name,
      username: username,
      password: hashPassword,
      role: role,
    });
    res.status(200).json({ msg: "Dibuat" });
  } catch (error) {
    res.status(500).json({ msg: "Gagal" });
  }
};
