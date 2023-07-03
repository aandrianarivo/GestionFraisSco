//IMPORTS
const { update } = require("../models/Admin");
const{Admin}=require("../models/index");


//CTRLS
module.exports = {
    async createAdmin(req,res){
        const {nomAd,prenomAd,emailAd,adresseAd,telAd,mdpAd}= req.body;

        let data,err;
        try {
            const newUser = await Admin.create({
                nomAd,
                prenomAd,
                emailAd,
                adresseAd,
                telAd,
                mdpAd
            });
            
            data = newUser.toJSON();
            
        } catch (error) {
            err = error
            console.error(err);
        }  
        res.json({data,err}); 
    },
    async getListAdmin(req,res){
        let data,err;
        try {
            const listAdmin = await Admin.findAll({
                attributes:["nomAd", "prenomAd", "adresseAd","telAd"]
            });
            data = await listAdmin.map(v=>v.toJSON());
        } catch (error) {
            err = error;
            console.error(err);
        }
        res.json({ data, err });
    },
    async delByAdmin( req, res ){
        const { idAd } = req.params;
        let err, data;

        try{
            const delAd = await Admin.destroy({
                where: { idAd },
            });
            data = await delAd;
        }
        catch(error){
            err = error ;
            console.log(error);
        }

        res.json({ data, err })
    },
    async logInAdmin(req,res){
        const{emailAd,mdpAd} = req.body;
        let data,err,msg;
        try {
            const loginAd = await Admin.findOne({
            // attributs: ["pseudo"],
                where : {
                    emailAd,
                    mdpAd
                }
            });
        data = await loginAd.toJSON();
        if(!loginAd){
            const result =  { 
                err : 'Authentification Failed!!!',
                data : {},
                msg : "Please, verify your information"
            }
            res.json(result);
        }else{
            const result = { 
                err : {},
                data : loginAd,
                msg : "Authentification reussi"
            }
            res.json(result);
        }

        } catch (error) {
            err = error ;
            console.log(error);
        }
        
    },
    async updateAd(req,res){
        const {idAd,nomAd,prenomAd,emailAd,adresseAd,telAd,mdpAd} = req.body;
        let data,err
        
        try{           
                await Admin.update({
                    nomAd,
                    prenomAd,
                    emailAd,
                    adresseAd,
                    telAd,
                    mdpAd
                },{ where: { idAd } })

                const updateAd = await Admin.findOne({
                    where: { idAd },
                    attributes:[
                        "idAd",
                        "nomAd",
                        "prenomAd",
                        "emailAd",
                        "adresseAd",
                        "telAd",
                        "mdpAd"
                    ]
                })

            data = updateAd.toJSON();
        }
        catch (error) {
            err = error ;
            console.log(error);
        }
        res.json({data,err})

    }

}




