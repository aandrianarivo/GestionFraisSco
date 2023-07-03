const enregistrerR = require("express").Router();
const {enregistrementCtrl} = require("../controllers");
const {enregister} = enregistrementCtrl;


//Routes

enregistrerR.post("/create-enregister",enregister.createEnr);
enregistrerR.post("/search-enregister",enregister.getListEnr);
enregistrerR.get("/liste-enregister",enregister.getListEnr);
enregistrerR.put("/update-enregister/:idEn",enregister.updateEnr);
enregistrerR.delete("/delete-enregister/:idEn",enregister.delByEnr);






module.exports = enregistrerR;