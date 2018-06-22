const ObjectID = require("mongodb").ObjectID;
const collection = "messages";
const getAllResults = function(db) {
  db.collection(collection)
    .find()
    .toArray((err, results) => {
      this.r = results;
      this.e = err;
    });

  return this.e ? this.e : this.r;
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

const poll = (id, res, db) => {
  if (id) {
    var i = 0;
    var timeout = async () => {
      var lastResult = await getLastResult(db);
      if (lastResult && lastResult != id) {
        i = 100;
        res.send(getAllResults(db));
        res.end();
      }
      if (++i < 100) {
        setTimeout(timeout, 1000);
      }
    };

    timeout();
  } else {
    res.send(getAllResults(db));
    res.end();
  }
};

exports.create = (req, res, db) => {
  if (req.body.text === "" || req.body.user === "") {
    res.send("Prohibido mandar fruta");
  } else {
    const message = {
      user: req.body.user,
      text: req.body.text,
      timestamps: new Date().toLocaleString()
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
