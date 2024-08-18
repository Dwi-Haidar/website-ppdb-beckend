import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
import db from "../db/index";

export const login = async (
  username: string,
  password: string
): Promise<string> => {
  const user = await db.user.findFirst({
    where: {
      username: username,
    },
  });

  if (!user) {
    throw new Error("User or password is not valid");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("User or password is not valid");
  }

  const token = jwt.sign({ id: user.id }, `${process.env.SECRET_KEY}`, {
    expiresIn: "1d",
  });

  return token;
};

export const register = async (username: string, password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    return user;
  } catch (error) {
    console.error("Error during registration:", error);
    return null;
  }
};
export const getUser = async (id: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    console.error("Error during getUser:", error);
    return null;
  }
};
export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Error during getUsers:", error);
    return null;
  }
};
