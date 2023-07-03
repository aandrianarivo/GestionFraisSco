const etudiantR = require("express").Router();
const {etudiantCtrl} = require("../controllers");
const {etudiant} = etudiantCtrl;


//Routes

etudiantR.post("/create-etudiant",etudiant.createEtudiant);
etudiantR.get("/list-etudiant",etudiant.getListEtudiant);
etudiantR.get("/count-complet-etudiant",etudiant.countEtudiantsComplets);
etudiantR.get("/count-t-etudiant",etudiant.countEtudiants1T);
etudiantR.get("/count-paspaye-etudiant",etudiant.countEtudiantsPasPaye);

etudiantR.put("/update-etudiant/:idEt",etudiant.updateEtudiant);
etudiantR.delete("/delete-etudiant/:idEt",etudiant.delEtudiant);


module.exports = etudiantR;