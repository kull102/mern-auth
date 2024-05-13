import express from "express";
import { getUserBySessionToken } from "db/user";

export const getUserInfo = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const sessionToken = req.cookies["AUTH"];

    const user = await getUserBySessionToken(sessionToken);
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
