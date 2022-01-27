import "dotenv/config";

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;

module.exports = {
  url: `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}/retryWrites=true&w=majority`
};
