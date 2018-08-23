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
