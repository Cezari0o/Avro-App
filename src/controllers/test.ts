import express from "express";
import avro from "avro-js";

const test = express.Router();

// Avro types
const stringType = new avro.types.StringType();
const intType = new avro.types.IntType();

const userSchema = avro.parse({
  name: "User",
  type: "record",
  fields: [
    { name: "name", type: "string" },
    { name: "favorite_number", type: ["int", "null"] },
    { name: "favorite_color", type: ["string", "null"] },
  ],
});
const someUser = {
  name: "Jefferson",
  favorite_number: null,
  favorite_color: null,
};

test.get("/", (req, res) => {

  const buff = userSchema.toBuffer(someUser);
  const obj = userSchema.fromBuffer(buff);
  res.json({
    buffer: buff,
    deserializado: obj,
    schema: userSchema,
    valido: userSchema.isValid(someUser),
  });
});

test.get("/types", (req, res) => {
  const buffers = [intType.toBuffer(1), stringType.toBuffer("Olá mundo!")];

  res.json({ result: stringType.fromBuffer(buffers[1]) });
});

test.get("/toString", (req, res) => {
  const someValues = ["Ola", 123132];

  res.json({
    result: [
      stringType.toString(someValues[0]),
      intType.toString(someValues[1]),
      userSchema.toString(someUser),
    ],
  });
});

export default test;
