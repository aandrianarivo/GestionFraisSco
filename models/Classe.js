const { DataTypes , Model} = require('sequelize');
const sequelize = require('./__sequelize.js');

class Classe extends Model{};
Classe.init({
    idCl : {
        type : DataTypes.INTEGER,
        autoIncrement:true,
        allowNull : false,
        primaryKey : true
    },
    niveauCl : {
        type : DataTypes.STRING,
        allowNull: false,
    },
    parcoursCl : {
        type : DataTypes.STRING,
        allowNull: false,
    },
    mentionCl : {
        type : DataTypes.STRING,
        allowNull: false,
    }

}, { sequelize ,
    timestamps :false });


module.exports = Classe; 