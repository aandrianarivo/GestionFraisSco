const borderauxR = require("express").Router();
const {borderauxCtrl} = require("../controllers");
const {borderaux} = borderauxCtrl;


//Routes

borderauxR.post("/search-borderaux",borderaux.searchBor);
borderauxR.get("/liste-borderaux",borderaux.getListBord);



module.exports = borderauxR;