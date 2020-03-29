// routes/note_routes.js
const { create, findAll, findOne } = require("../controllers/chat");

const chatRoutes = (app, io, db) => {
  app.post("/api/chat", (req, res) => create(req, res, db, io));
  app.get("/api/chat", (req, res) => findAll(req, res, db));
  app.get("/api/chat/:id", (req, res) => findOne(req, res, db));
};

module.exports = chatRoutes;
