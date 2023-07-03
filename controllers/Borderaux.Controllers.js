//IMPORTS
const{Borderaux, Etudiant}=require("../models/index");


//CTRLS
module.exports = {
    async getListBord(req,res){
        let data,err;
        try {
            const ListBord = await Borderaux.findAll({
                attributes:["nomAd", "prenomAd", "adresseAd","telAd"]
            });
            data = await ListBord.map(v=>v.toJSON());
        } catch (error) {
            err = error;
            console.error(err);
        }
        res.json({ data, err });
    },
    async searchBor( req, res ){
        const { idBord,nomEt } = req.params;
        let err, data;

        try{
            let whereClause ={};
            if(idBord){
                whereClause.id = idBord;
            }
            if(nomEt){
                whereClause['$Etudiant.nomEt']=nomEt
            }    
            const findBord = await Borderaux.findAll({
                where: whereClause,
                include:[{
                    model:Etudiant
                }]
            });
            data = await findBord.map(v=>v.toJSON());
        }
        catch(error){
            err = error ;
            console.log(error);
        }

        res.json({ data, err });
    }

}


