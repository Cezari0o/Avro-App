import express from "express";
import test from "./controllers/test";
import reserva from "./controllers/reserva";

const routes = express.Router();

routes.use("/teste", test);
routes.use("/reserva", reserva);

export default routes;
