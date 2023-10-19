import express from "express";

const logger = express.Router();

logger.use((req, res, next) => {
  const request: { [key: string]: any } = {};

  request["method"] = req.method;
  request["url"] = req.url;
  request["time"] = new Date().toTimeString();
  request["user"] = req.headers["user-agent"];
  request["ip_address"] = req.ip;

  console.log(request);
  next();
});

export default logger;
