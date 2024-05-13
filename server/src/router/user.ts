import express from "express";

import { getUserInfo } from "controllers/user";
import { isAuthenticated } from "middlewares";

export default (router: express.Router) => {
  router.get("/user", isAuthenticated, getUserInfo);
};
