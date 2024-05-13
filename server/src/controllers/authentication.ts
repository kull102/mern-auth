import express from "express";
import { createUser, getUserByEmail, getUserBySessionToken } from "../db/user";
import { authentication, random } from "../helpers";

export const logout = async (req: express.Request, res: express.Response) => {
  try {
    const sessionToken = req.cookies["AUTH"];
    const user = await getUserBySessionToken(sessionToken);
    user.authentication.sessionToken = undefined;
    await user.save();

    res.cookie("AUTH", "", {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(true).end();
  } catch (error) {
    console.log(error);
    res.cookie("AUTH", "", {
      domain: "localhost",
      path: "/",
    });
    return res.sendStatus(400);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.status(403).json({ message: "User does not exist" });
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (expectedHash !== user.authentication.password) {
      return res
        .status(401)
        .json({ message: "Your email or password is not correct" });
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();
    res.cookie("AUTH", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong!" });
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(403).json({ message: "Account is existed!" });
    }

    const salt = random();

    const user = await createUser({
      email,
      name,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong!" });
  }
};
