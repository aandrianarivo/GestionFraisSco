const { DataTypes , Model} = require('sequelize');
const sequelize = require('./__sequelize.js');

class Etudiant extends Model{};
Etudiant.init({
    idEt : {
        type : DataTypes.INTEGER,
        autoIncrement:true,
        allowNull : false,
        primaryKey : true

    },
    nomEt : {
        type : DataTypes.STRING,
        allowNull: false
    },
    prenomEt : {
        type : DataTypes.STRING,
        allowNull: false
    },
    emailEt : {
        type : DataTypes.STRING,
        allowNull: false
    },
    adresseEt : {
        type : DataTypes.STRING,
        allowNull: false
    },
    telEt: {
        type : DataTypes.INTEGER,
        allowNull: false
    },
    status:{
        type : DataTypes.STRING,
        defaultValue :"pas paye"
    }

    

}, { sequelize ,
    timestamps :false });


module.exports = Etudiant; 