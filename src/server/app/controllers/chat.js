import {
  queryAllResult,
  queryLastResult,
  insertToCollection,
  queryOneResult
} from "../common/procedures";

const ObjectID = require("mongodb").ObjectID;

const collection = "messages";

const getLastResult = async db => {
  const result = await queryLastResult(db, collection);
  return result;
};

const getAllResult = async db => {
  const result = await queryAllResult(db, collection);
  return result;
};

const sendAllResult = async (db, res) => {
  const allResults = await getAllResult(db, collection);

  res.send(allResults);
  res.end();
};

const poll = async (id, res, db) => {
  if (id) {
    var i = 0;

    let timeout = async () => {
      let lastResult = await getLastResult(db);

      if (lastResult && lastResult != id) {
        i = 100;
        await sendAllResult(db, res);
      }

      if (++i < 100) {
        setTimeout(timeout, 1000);
      }
    };

    timeout();
  } else {
    await sendAllResult(db, res);
  }
};

exports.create = (req, res, db) => {
  if (!req.body.text || !req.body.user) {
    res.send("Prohibido mandar fruta");
  } else {
    const message = {
      user: req.body.user,
      text: req.body.text,
      timestamps: new Date().toUTCString()
    };

    insertToCollection(db, res, collection, message);
  }
};

exports.findAll = (req, res, db) => {
  poll(req.query.id, res, db);
};

exports.findOne = (req, res, db) => {
  const id = req.params.id;
  const details = {
    _id: new ObjectID(id)
  };

  queryOneResult(db, res, collection, details);
};
