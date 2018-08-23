// routes/note_routes.js
const chat = require("../controllers/chat");

module.exports = function(app, db) {
  app.post("/api/chat", (req, res) => {
    chat.create(req, res, db);
  });

  app.get("/api/chat/:id", (req, res) => {
    chat.findOne(req, res, db);
  });

  app.get("/api/chat", (req, res) => {
    chat.findAll(req, res, db);
  });
};
