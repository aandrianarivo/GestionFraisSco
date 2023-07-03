const adminR = require("express").Router();
const {adminCtrl} = require("../controllers/");
const {admin} = adminCtrl;


//Routes
adminR.post("/create-admin",admin.createAdmin);
adminR.get("/list-admin",admin.getListAdmin);
adminR.post("/login-admin",admin.logInAdmin);
adminR.post("/update-admin",admin.updateAd);




module.exports = adminR;