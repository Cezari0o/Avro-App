import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Olá mundo!");
});

// app.use(express.json());
app.listen(port, () => {
  return console.log(`Servidor rodando na porta ${port}`);
});
