import {
  queryAllResult,
  queryLastResult,
  insertToCollection,
  queryOneResult,
  sendResponse
} from "../common/procedures";

const ObjectID = require("mongodb").ObjectID;

const collection = "messages";

const getLastResult = async db => await queryLastResult(db, collection);
const getAllResult = async db => await queryAllResult(db, collection);
const sendAllResult = async (db, res) =>
  await getAllResult(db, collection).then(result => sendResponse(res, result));

const poll = async (id, res, db) => {
  if (id) {
    var i = 0;

    let timeout = async () => {
      let lastResult = await getLastResult(db);

      if (lastResult && lastResult != id) {
        await sendAllResult(db, res);

        i = 100;
      }

      if (++i < 100) setTimeout(timeout, 1000);
    };

    timeout();
  } else await sendAllResult(db, res);
};

exports.create = (req, res, db) => {
  if (!req.body.text || !req.body.user)
    sendResponse(res, "Prohibido mandar fruta");
  else {
    const message = {
      user: req.body.user,
      text: req.body.text,
      timestamps: new Date().toUTCString()
    };

    insertToCollection(db, res, collection, message);
  }
};

exports.findAll = (req, res, db) => poll(req.query.id, res, db);
exports.findOne = (req, res, db) =>
  queryOneResult(db, res, collection, { _id: new ObjectID(req.params.id) });
