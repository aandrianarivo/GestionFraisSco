const { DataTypes , Model} = require('sequelize');
const sequelize = require('./__sequelize.js');
const {Etudiant} = require('./Etudiant.js');

class Borderaux extends Model{};
Borderaux.init({
    refBord : {
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey : true
    },
    idEt : {
        type : DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:"Etudiants",
            key:"idEt"
        }
    },
    montantBord : {
        type : DataTypes.INTEGER,
        allowNull: false,
    },
    dateBord:{
        type:DataTypes.DATEONLY,
        allowNull:false
    }

}, { sequelize ,
    timestamps :false });





module.exports = Borderaux; 