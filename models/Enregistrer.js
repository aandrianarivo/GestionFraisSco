const { DataTypes , Model} = require('sequelize');
const Borderaux = require("./Borderaux");
const Admin = require("./Admin");
const sequelize = require('./__sequelize.js');

class Enregistrer extends Model{};
Enregistrer.init({
    idEn : {
        type : DataTypes.INTEGER,
        autoIncrement:true,
        allowNull : false,
        primaryKey : true
    },
    refBord : {
        type : DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:"Borderaux",
            key:"refBord"
        }
    },
    idAd : {
        type : DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:"Admin",
            key:"idAd"
        }
    },
    statusEn:{
        type:DataTypes.STRING,
        allowNull:false
    },
    dateEn:{
        type:DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
    },
    payement2eT:{
        type:DataTypes.DATEONLY
    }
    

}, { sequelize ,
    timestamps :false
});
Enregistrer.belongsTo(Borderaux, {foreignKey : "refBord"});
Enregistrer.belongsTo(Admin, {foreignKey :"idAd"});

module.exports = Enregistrer; 