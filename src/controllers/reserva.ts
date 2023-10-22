import express from "express";
import { checkSchema, matchedData } from "express-validator";
import validationMiddleware from "../util/validationMiddleware";

import ReservaService from "../services/reservaService";
import { StatusCodes } from "http-status-codes";

const reserva = express.Router();
const reservaService = new ReservaService();

reserva.post(
  "/",
  checkSchema(
    {
      horario: { isISO8601: true },
      quant_pessoas: { isNumeric: true },
      numero_mesa: { isNumeric: true },
      cliente: { isString: true },
      descricao_adicional: { isString: true, optional: true },
    },
    ["body"]
  ),
  validationMiddleware(),
  (req: express.Request, res: express.Response) => {
    const novaReserva = matchedData(req);

    try {
      novaReserva["horario"] = new Date(novaReserva["horario"]);
      reservaService.save(novaReserva).then(() => {
        res.status(StatusCodes.CREATED).json(novaReserva);
      });
    } catch (err) {
      res.json({ error: err.message });
    }
  }
);

reserva.get("/", (req, res) => {
  try {
    reservaService.getReservas().then((reservas) => res.json(reservas));
  } catch (err) {
    res.json({ error: err.message });
  }
});

reserva.get(
  "/:id",
  checkSchema(
    {
      id: {
        isInt: true,
      },
    },
    ["params"]
  ),
  validationMiddleware(),
  (req: express.Request, res: express.Response) => {
    const { id } = matchedData(req);

    reservaService
      .getReservaById(Number(id))
      .then((data) => res.json(data))
      .catch((err) => {
        res.json({ error: err.message });
      });
  }
);

export default reserva;
