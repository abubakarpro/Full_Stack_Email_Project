const express = require("express");
const app = express();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();

//PORT

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`listening on Port ${port}`));
