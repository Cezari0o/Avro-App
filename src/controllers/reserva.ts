import express from "express";
import avro from "avro-js";
import assertValid from "../util/assertValid";
import path from "path";
import DateType from "../avro-types/DateType";

const reserva = express.Router();
const reservaSchema = avro.parse(
  path.resolve(__dirname, "../util/reserva.avsc"),
  { logicalTypes: { horario: DateType } }
);

reserva.post("/", (req, res) => {
  const novaReserva = req.body;

  try {
    // TODO: consertar o tipo date. Nao ta conseguindo ler a data
    novaReserva['horario'] = new Date(novaReserva['horario']);
    assertValid(reservaSchema, novaReserva);

    const teste = reservaSchema.fromBuffer(reservaSchema.toBuffer(novaReserva));
    res.json({ teste: teste });
  } catch (err) {
    res.json({ error: err.message });
  }
});

export default reserva;
