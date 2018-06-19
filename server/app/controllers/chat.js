const ObjectID = require("mongodb").ObjectID;
const collection = "messages";

exports.create = (req, res, db) => {
  if (req.body.text === "" || req.body.user === "") {
    res.send("Prohibido mandar fruta");
  } else {
    const message = { user: req.body.user, text: req.body.text };
    db.collection(collection).insert(message, (err, result) => {
      if (err) {
        res.send(err);
        res.end();
      } else {
        res.send(result.ops[0]);
        res.end();
      }
    });
  }
};

exports.findAll = (req, res, db) => {
  db.collection(collection)
    .find()
    .toArray((err, results) => {
      if (err) {
        res.send(err);
        res.end();
      } else {
        res.send(results);
        res.end();
      }
    });
};

exports.findOne = (req, res, db) => {
  const id = req.params.id;
  const details = { _id: new ObjectID(id) };
  db.collection(collection).findOne(details, (err, item) => {
    if (err) {
      res.send(err);
      res.end();
    } else {
      res.send(item);
      res.end();
    }
  });
};
