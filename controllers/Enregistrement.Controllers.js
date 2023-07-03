//IMPORTS
const{Enregistrer,Borderaux,Etudiant}=require("../models/index");
const PDFDocument = require('pdfkit');
const fs = require('fs');
const nodemailer = require('nodemailer');
const { addMonths } = require('date-fns');
const path = require('path');
//CTRLS
module.exports = {
    async getListEnr(req,res){
        let data,err;
        try {
            const listEnr = await Enregistrer.findAll({
                // include:[{
                //     model: Borderaux,
                //     through:Enregistrer,
                //     attributes:["montantBord"]
                // }],
                include : Borderaux
            });
        data =listEnr.map(v=>v.toJSON());
        } catch (error) {
            err = error;
            console.error(err);
        }
        res.json(data);
        console.log(data);
        
    },


    async delByEnr( req, res ){
        const { idEn } = req.params;
        let err, data;

        try{
            const delEnr = await Enregistrer.destroy({
                where: { idEn },
            });
            data = delEnr;
        }
        catch(error){
            err = error ;
            console.log(error);
        }

        res.json({ data, err })
    },
    async createEnr(req,res){
        const { idAd, statusEn,dateEn, idEt, refBord, montantBord, dateBord } = req.body;
        let data, err;
        try {

        const [newBord,created] = await Borderaux.findOrCreate({
            where:{refBord},
            defaults :{
                refBord,
                idEt,
                montantBord,
                dateBord
            },
              
        });
        if (!created) {
            throw new Error('La valeur refBord est déjà utilisée.');
        }
        if (!idEt) {
            throw new Error('Le champ idEt est requis.');
        }
        const etudiant = await Etudiant.findOne({
            where: {idEt},
            attributes: ['nomEt', 'emailEt']
        });
        const {nomEt,emailEt}=etudiant;
            const newEnr = await Enregistrer.create({
                idAd,
                statusEn,           
                refBord,
                dateEn
            });

            if(statusEn != "COMPLET"){
                const payement2eT = addMonths(new Date(), 2);
                newEnr.payement2eT = payement2eT;
                await Etudiant.update(
                    {status:'1T'},
                    {where : {idEt}},)
            }
            await newEnr.save();

        const enr = await newEnr.setBorderaux(newBord);
        data = {
            ...enr.toJSON(),
            nom:nomEt,
            email:emailEt
            }
        


        const doc = new PDFDocument();
        const imagePath = path.join(__dirname, 'emit.jpg'); // Spécifiez le nom du fichier correct s'il diffère

        doc.image(imagePath, {
            width: 200,
            height: 200,
            align: 'center',
            valign: 'top'
        });

        doc.fontSize(20).text('Recu de votre Borderaux', { align: 'center' });
        doc.fontSize(16).text(`Admin: ${data.idAd}`);
        doc.fontSize(16).text(`Etudiant: ${data.nom}`);
        doc.fontSize(16).text(`Nom: ${data.nom}`);
        doc.fontSize(16).text(`Statut de votre frais de scolarite: ${data.statusEn}`);
        doc.fontSize(16).text(`Reference de votre Borderaux : ${data.refBord}`);
        if(data.statusEn!='COMPLET'){
            doc.fontSize(16).text(`Date de payement du 2e Tranche ${data.payement2eT}`);
        }

            // Récupérer la hauteur de la page

        // Déplacer le curseur vers le bas de la page

        // Ajouter le texte en bas de la page


        doc.fontSize(12).text("L'EMIT vous remercie", { align: 'center' });
        doc.end(); // Terminer la création du PDF
        doc.pipe(fs.createWriteStream('Confirmation.pdf'));
        

        const pdfPath = path.resolve(__dirname, '..', 'Confirmation.pdf');
        const pdfContent = fs.readFileSync(pdfPath);
        const transporter = nodemailer.createTransport({
            service: 'gmail', // par exemple, 'gmail' pour Gmail
            auth: {
              user: 'hulkratah@gmail.com',
              pass: 'pswhrmvitamywrgn'
            }
        });
        const mailOptions = {
            from: 'hulkratah@gmail.com', // Votre adresse e-mail
            to: data.email, // Adresse e-mail du destinataire
            subject: 'Confirmation de votre Borderaux',
            text: 'Bonjour, Veuillez trouver ci-joint la confirmation de votre Borderaux. Cordialement, L\'EMIT',
            attachments: [
                {
                  filename: 'Confirmation.pdf',
                  content: pdfContent
                }
              ]
          };
          
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
            } else {
              console.log('E-mail envoyé : ' + info.response);
            }
          });

      


        

        } catch (error) {
            console.error(error);
            err = error.message;
        }

        res.json({ message:'Create Enr succes' });
        


    },
    async updateEnr(req, res) {
        const { idEn } = req.params;
        const { idAd, statusEn, dateEn, idEt, refBord, montantBord, dateBord } = req.body;
        let data, err;
        console.log({idEn})
      
        try {
          const enregistrement = await Enregistrer.findByPk(idEn);
          if (!enregistrement) {
            throw new Error('Enregistrement non trouvé.');
          }
      
          // Mettez à jour les propriétés de l'enregistrement
          enregistrement.idAd = idAd;
          enregistrement.statusEn = statusEn;
          enregistrement.dateEn = dateEn;
          enregistrement.idEt = idEt;
          enregistrement.refBord = refBord;
          enregistrement.montantBord = montantBord;
          enregistrement.dateBord = dateBord;

          if(statusEn != "Complet"){
            const payement2eT = addMonths(new Date(), 2);
            enregistrement.payement2eT = payement2eT;
            }else if(statusEn == "Complet"){
                enregistrement.payement2eT = null;
            }
        
      
          // Enregistrez les modifications
          await enregistrement.save();
      
          data = enregistrement.toJSON();
        } catch (error) {
          err = error;
          console.error(err);
        }
      
        res.json({ data, err });
      }
      

}


