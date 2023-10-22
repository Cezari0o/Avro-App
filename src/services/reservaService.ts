import avro from "avro-js";
import path from "path";
import fs from "fs";

import IdCounter from "../util/idCounter";
import DateType from "../avro-types/DateType";
import assertValid from "../util/assertValid";
import Reserva from "../types/reserva";

export default class ReservaService {
  private counter = new IdCounter(1);
  private reservaSchema: any;
  private dataDirPath: string;

  constructor() {
    this.reservaSchema = avro.parse(
      path.resolve(__dirname, "../data/reserva.avsc"),
      { logicalTypes: { "timestamp-millis": DateType } }
    );
    this.dataDirPath = path.resolve(__dirname, "../data/reservas.avro");
    // console.log(fs.existsSync(dataDirPath));
  }

  async save(reserva: any) {
    try {
      reserva["id_pedido"] = this.counter.get();
      assertValid(this.reservaSchema, reserva);
      const fileEncoder = avro.createFileEncoder(
        this.dataDirPath,
        this.reservaSchema
      );

      await fileEncoder.write(reserva);
      fileEncoder.end();
    } catch (err) {
      throw new Error(`Erro: ${err.message}`);
    }
  }

  async getReservas() {
    try {
      const fileDecoder = avro.createFileDecoder(this.dataDirPath);
      let data: Reserva[];
      data = await fileDecoder.toArray();

      return data;
    } catch (err) {
      throw new Error(`Erro: ${err.message}`);
    }
  }

  async getReservaById(id: number) {
    try {
      const fileDecoder = avro.createFileDecoder(this.dataDirPath);

      const data = await fileDecoder.find(
        (reserva: Reserva) => reserva.id_pedido == id
      );

      if (!data) {
        throw new Error("Nenhuma reserva com o dado Id!");
      }
      return data;
    } catch (err) {
      throw new Error(`Erro: ${err.message}`);
    }
  }
}
