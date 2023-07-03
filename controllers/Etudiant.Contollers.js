//IMPORTS
const{Etudiant,Etre,Classe}=require("../models/index");
const sequelize = require("../models/__sequelize");
const { count } = require("../models/Admin");



//CTRLS

module.exports = {
    async createEtudiant(req, res) {
        const { nomEt, prenomEt, emailEt, adresseEt, telEt, niveauCl, parcoursCl, mentionCl } = req.body;
      
        console.log({ nomEt, prenomEt, emailEt, adresseEt, telEt, niveauCl, parcoursCl, mentionCl });
      
        let transaction;
        let isCommitted = false;
      
        try {
          // Début de la transaction
          transaction = await sequelize.transaction();
      
          // Vérification de l'existence de l'étudiant
          const existingEtudiant = await Etudiant.findOne({
            where: {
              nomEt,
              prenomEt,
              emailEt
            }
          });
      
          if (existingEtudiant) {
            console.log("L'étudiant existe déjà dans la base de données.");
            return res.status(400).json({ success: false, error: "L'étudiant existe déjà dans la base de données." });
          }
      
          // Création de l'étudiant
          const newEtudiant = await Etudiant.create({
            nomEt,
            prenomEt,
            emailEt,
            adresseEt,
            telEt
          }, { transaction });
      
          // Création de la classe
          const newClasse = await Classe.create({
            niveauCl,
            parcoursCl,
            mentionCl
          }, { transaction });
      
          // Association de l'étudiant à la classe via la table d'association Etre
          await Etre.create({
            idEt: newEtudiant.idEt,
            idCl: newClasse.idCl
          }, { transaction });
      
          // Validation de la transaction
          await transaction.commit();
          isCommitted = true;
      
          console.log("Création de l'étudiant et de la classe réussie");
          res.json({ success: true, message: "Création de l'étudiant et de la classe réussie" });
      
        } catch (error) {
          // Annulation de la transaction en cas d'erreur
          if (transaction && !isCommitted) {
            await transaction.rollback();
          }
      
          console.error(error);
          res.status(500).json({ success: false, error: "Erreur lors de la création de l'étudiant et de la classe" });
        }
    
    },  
    async getListEtudiant(req,res){
        let data,err;
        try {
            const listEtudiant = await Etudiant.findAll({
                include: [{
                    model: Classe,
                    through: Etre,
                    attributes: ['niveauCl', 'parcoursCl','mentionCl']
                  }],
                attributes:["idEt","nomEt", "prenomEt","emailEt", "adresseEt","telEt","status"]
            });
            
            data = listEtudiant.map(etudiant=>{

              const etudiantData = {
                  idEt: etudiant.idEt,
                  idCl: etudiant.idCl,
                  nomEt: etudiant.nomEt,
                  prenomEt: etudiant.prenomEt,
                  emailEt: etudiant.emailEt,
                  adresseEt: etudiant.adresseEt,
                  telEt: etudiant.telEt,
                  status: etudiant.status
              };
              if(etudiant.Classes.length>0){
                etudiantData.niveauCl = etudiant.Classes[0].niveauCl;
                etudiantData.parcoursCl = etudiant.Classes[0].parcoursCl;
                etudiantData.mentionCl = etudiant.Classes[0].mentionCl;

              }
              return etudiantData;
              
            });
              
        } catch (error) {
            err = error;
            console.error(err);
        }
        res.json(data);
        console.log("Data Send")
        

    },
      async delEtudiant(req, res) {
    const { idEt } = req.params;
    const idEtN = parseInt(idEt, 10);
    console.log({ idEtN });
    let err, data;

    try {
      // Supprimer les enregistrements associés dans la table de jointure EtudiantClasse
      await Etre.destroy({
        where: { idEt: idEtN } // Remplacez "EtudiantId" par le nom correct de la colonne dans la table de jointure
      });

      // Supprimer l'étudiant lui-même
      const delEt = await Etudiant.destroy({
        where: { idEt: idEtN }
      });

      data = delEt;
    } catch (error) {
      err = error;
      console.log(error);
    }

    res.json({ success: true, message: "Etudiant supprimé" });
  }
  ,
    async updateEtudiant(req, res) {
      const { idEt } = req.params;
      const { nomEt, prenomEt, emailEt, adresseEt, telEt, niveauCl, parcoursCl, mentionCl } = req.body;
    
      let transaction;
      let isCommitted = false;
    
      try {
        transaction = await sequelize.transaction();
    
        const etudiant = await Etudiant.findByPk(idEt);
    
        if (!etudiant) {
          return res.status(404).json({ success: false, error: "Étudiant non trouvé" });
        }
    
        etudiant.nomEt = nomEt;
        etudiant.prenomEt = prenomEt;
        etudiant.emailEt = emailEt;
        etudiant.adresseEt = adresseEt;
        etudiant.telEt = telEt;
    
        await etudiant.save({ transaction });
    
        let classe;
    
        if (niveauCl && parcoursCl && mentionCl) {
          // Vérification de l'existence de la classe
          classe = await Classe.findOne({
            where: {
              niveauCl,
              parcoursCl,
              mentionCl
            },
            transaction
          });
    
          if (!classe) {
            classe = await Classe.create({
              niveauCl,
              parcoursCl,
              mentionCl
            }, { transaction });
          }
        }
    
        await Etre.destroy({ where: { idEt }, transaction });
    
        if (classe) {
          await Etre.create({
            idEt: etudiant.idEt,
            idCl: classe.idCl
          }, { transaction });
        }
    
        await transaction.commit();
        isCommitted = true;
    
        res.json({ success: true, message: "Mise à jour de l'étudiant réussie" });
    
      } catch (error) {
        if (transaction && !isCommitted) {
          await transaction.rollback();
        }
        console.error(error);
        res.status(500).json({ success: false, error: "Erreur lors de la mise à jour de l'étudiant et de la classe" });
      }
    },

    async  countEtudiantsComplets(req,res) {
      try {
        const count = await Etudiant.count({
          where: { status: 'COMPLET' }
        });
        res.json(count)
      } catch (error) {
        console.error('Une erreur s\'est produite lors du comptage des étudiants complets :', error);
      }
    }
    ,
    async  countEtudiants1T(req,res) {
      try {
        const count = await Etudiant.count({
          where: { status: '1T' }
        });
      res.json({count})

      } catch (error) {
        console.error('Une erreur s\'est produite lors du comptage des étudiants complets :', error);
      }
    },
    async  countEtudiantsPasPaye(req,res) {
      try {
        const count = await Etudiant.count({
          where: { status: 'pas paye' }
        });
        res.json({count})
      } catch (error) {
        console.error('Une erreur s\'est produite lors du comptage des étudiants complets :', error);
      }
    }
    
    
  }

// const {nomEt,prenomEt,emailEt,adresseEt,telEt,niveauCl,parcoursCl,mentionCl}= req.body;
//         let data,err,newEtudiant;
//         try {
//             newEtudiant = await Etudiant.create({
//                 nomEt,
//                 prenomEt,
//                 emailEt,
//                 adresseEt,
//                 telEt
//             });
//         } catch (error) {
//             console.error(error);
//         }
//         try {
//             const newClasse = await Classe.create({
//                 niveauCl,
//                 parcoursCl,
//                 mentionCl

//             });
//             return newClasse;
//         } catch (error) {
//             console.error(error);
            
//         }
            
        
//         const final = await newEtudiant.addClasse(newClasse);
//         data = final.toJSON();
            
//         console.log("ADD ETUDIANT SUCCES")
//         res.setHeader('Access-Control-Allow-Origin','*');
//         res.json({data,err}); 
