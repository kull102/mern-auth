import express from "express";
import authentication from "./authentication";
import user from "./user";

const router = express.Router();

export default () => {
  authentication(router);
  user(router);
  return router;
};
