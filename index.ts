import express from "express";
import dotenv from "dotenv";
import routes from "./src/routes";
import logger from "./src/middlewares/logRequest";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(logger);
app.get("/", (req, res) => {
  res.send("Olá mundo!");
});

app.use(express.json());
app.use(routes);
app.listen(port, () => {
  return console.log(`Servidor rodando na porta ${port}`);
});
