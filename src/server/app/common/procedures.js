export const queryAllResult = (db, collection) => {
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

export const queryLastResult = (db, collection) => {
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

export const queryOneResult = (db, res, collection, details) => {
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

export const insertToCollection = (db, res, collection, message) => {
  return db.collection(collection).insert(message, (err, result) => {
    if (err) {
      res.send(err);
      res.end();
    } else {
      res.send(result.ops[0]);
      res.end();
    }
  });
};
