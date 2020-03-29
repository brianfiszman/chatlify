#!/usr/bin/env node
import { MongoClient } from "mongodb";
import express from "express";
import bodyParser from "body-parser";
import db from "./config/db";

const app = express();

app.set("port", process.env.PORT || 5000);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(
  db.url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.log(err);
    require(__dirname + "/app/routes")(app, client.db("chatlify"));

    app.listen(app.get("port"), () => {
      console.log("We are live on ", app.get("port"));
    });
  }
);
