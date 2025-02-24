import App from "./Services/ExpressApp";
import express from "express";
import DbCon from "./Services/Database";
import { PORT } from "./config";

const StartSever = async () => {
  const app = express();
  await DbCon();
  await App(app);
  app.listen(PORT, () => {
    console.log(`Connected on ${PORT} !!!! DONE`);
  });
};

StartSever();
