import {
  insert,
  queryAllResults,
  queryLastResult,
  queryOneResult,
  sendResponse
} from "../common/procedures";

const collection = "messages";
const ObjectID = require("mongodb").ObjectID;

const genObjId = id => ({ _id: new ObjectID(id) });
const genMessage = req => ({
  user: req.body.user,
  text: req.body.text,
  timestamps: new Date().toUTCString()
});

const poll = async (id, res, db) => {
  res.header("Access-Control-Allow-Origin", "https://www.apoyoescolarna.com.ar");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );

  if (id) {
    const waitForNewResults = async i => {
      const lastResult = await getLastResult(db);

      if (lastResult && lastResult != id) {
        await sendAllResults(db, res);

        i = 100;
      }

      if (++i < 100) setTimeout(waitForNewResults.bind(null, i), 1000);
    };

    waitForNewResults(0);
  } else await sendAllResults(db, res);
};

const getLastResult = async db => await queryLastResult(db, collection);
const getAllResults = async db => await queryAllResults(db, collection);
const sendAllResults = async (db, res) =>
  await getAllResults(db, collection).then(result => sendResponse(res, result));

const create = (req, res, db) => {
  if (!req.body.text || !req.body.user) sendResponse(res, "Prohibido mandar fruta");
  else insert(db, res, collection, genMessage(req));
};

const findAll = (req, res, db) => poll(req.query.id, res, db);
const findOne = (req, res, db) =>
  queryOneResult(db, res, collection, genObjId(req.params.id));

module.exports = { create, findAll, findOne };
