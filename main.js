const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes");
const {sequelize} = require("./models/index");
const app = express();
const corse = require('cors')
const port = 3450;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(corse());



app.use("/api/" , route);

app.use(express.json());
sequelize.sync({
  alter:false,
  force:false
})
    .then(() => {
      app.listen(port,console.log("the server is listen on",port))})