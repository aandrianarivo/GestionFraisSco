const root = require("express").Router();
root.use("/admin",require("./adminR"));
root.use("/etudiant",require("./etudiantR"));
root.use("/borderaux",require("./borderauxR"));
root.use("/enregister",require("./enregistrerR"));


module.exports = root;