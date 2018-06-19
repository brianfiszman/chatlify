// routes/note_routes.js
const chat = require("../controllers/chat");

module.exports = function(app, db) {
  app.post("/chats", (req, res) => {
    chat.create(req, res, db);
  });

  app.get("/chats/:id", (req, res) => {
    chat.findOne(req, res, db);
  });

  app.get("/chats", (req, res) => {
    chat.findAll(req, res, db);
  });
};
