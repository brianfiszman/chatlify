export const queryAllResults = (db, collection) =>
  db
    .collection(collection)
    .find()
    .toArray()
    .then(result => result)
    .catch(err => err);

export const queryLastResult = (db, collection) =>
  db
    .collection(collection)
    .find()
    .sort({ _id: -1 })
    .limit(1)
    .toArray()
    .then(([{ _id }]) => _id)
    .catch(err => err);

export const queryOneResult = (db, res, collection, details) =>
  db
    .collection(collection)
    .findOne(details, (err, item) => sendResponse(res, err || item));

export const insert = (db, res, collection, message) =>
  db
    .collection(collection)
    .insertOne(message, (err, result) => sendResponse(res, err || result.ops[0]));

export const sendResponse = (res, data) => {
  res.send(data);
  res.end();
};
