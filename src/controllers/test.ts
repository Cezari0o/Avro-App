import express from "express";
import avro from "avro-js";
import util from "util";

const test = express.Router();

// Avro types
const stringType = new avro.types.StringType();
const intType = new avro.types.IntType();

const userSchema = avro.parse({
  name: "User",
  type: "record",
  fields: [
    { name: "name", type: "string" },
    { name: "favorite_number", type: ["null", "int", "string"], default: null },
    { name: "favorite_color", type: ["null", "string"], default: null },
    { name: "someNum", type: "long" },
  ],
});
const someUser = {
  name: "Jefferson",
  favorite_number: null,
  favorite_color: { string: `red` },
};

function assertValid(type, val) {
  return type.isValid(val, { errorHook: hook });

  function hook(path, any) {
    throw new Error(util.format("invalid %s: %j", path.join(), any));
  }
}

test.post("/", (req, res) => {
  try {
    const { user } = req.body;
    assertValid(userSchema, user);

    const buff = userSchema.toBuffer(user);
    const obj = userSchema.fromBuffer(buff);

    res.json({ decodificado: obj, buffer: buff, random: userSchema.random() });
  } catch (err) {
    res.status(500).json({ erro: err.toString() });
  }

  // res.json({
  //   buffer: null,
  //   deserializado: null,
  //   schema: userSchema,
  //   valido: userSchema.isValid(someUser),
  // });
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

test.post("/array", (req, res) => {
  const array = req.body;

  const arraySchema = avro.parse({
    type: "array",
    items: "string",
    default: [],
  });

  try {
    res.json({ success: assertValid(arraySchema, array) });
  } catch (err) {
    res.json({ error: err.message });
  }
});

test.post("/map", (req, res) => {
  const array = req.body;

  const arraySchema = avro.parse({
    type: "map",
    values: ["long", "string", "int"],
    default: {},
  });

  try {
    res.json({ success: assertValid(arraySchema, array) });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// test.get(`/record`, (req, res) => {
//   res.json({
//     record_type: userSchema.getType()
//   })
// })

export default test;
