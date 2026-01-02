/**
 * Server entry point
 */

require("dotenv").config();

const app = require("./app");
require("./config/db"); // initialize DB connection

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
