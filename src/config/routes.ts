import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


//==================================== Import Routes ==============================
import admin_routes from "../routes/admin";

//==================================== configureApp ==============================

const configureApp = (app: Application): void => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors());
  app.use("/admin", admin_routes);
};

export default configureApp;
