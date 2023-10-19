import express from "express";
import test from "./controllers/test";

const routes = express.Router();

routes.use("/teste", test);

export default routes;
