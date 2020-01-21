// routes/index.js

const chatRoutes = require("./chat");

module.exports = function(app, db) {
  app.get("/", (req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    res.sendFile("index.html");
    res.end();
  });

  chatRoutes(app, db);
};
