const ObjectID = require("mongodb").ObjectID;
const collection = "messages";
const queryAllResult = db => {
  return db
    .collection(collection)
    .find()
    .toArray()
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
};

const queryLastResult = db => {
  return db
    .collection(collection)
    .find()
    .sort({ _id: -1 })
    .limit(1)
    .toArray()
    .then(result => {
      return result[0]._id;
    })
    .catch(err => {
      return err;
    });
};

const getLastResult = async db => {
  let result = await queryLastResult(db);
  return result;
};

const getAllResult = async db => {
  let result = await queryAllResult(db);
  return result;
};

const sendAllResult = async (db, res) => {
  let allResults = await getAllResult(db);
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
  poll(req.query.id, res, db);
};

exports.findOne = (req, res, db) => {
  const id = req.params.id;
  const details = {
    _id: new ObjectID(id)
  };
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
