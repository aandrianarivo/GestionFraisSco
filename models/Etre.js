const { DataTypes , Model} = require('sequelize');
const sequelize = require('./__sequelize.js');
const Etudiant = require('./Etudiant.js');
const Classe = require('./Classe.js');

class Etre extends Model{};
Etre.init({
    idEtr : {
        type : DataTypes.INTEGER,
        autoIncrement:true,
        allowNull : true,
        primaryKey : true
    },
    idCl : {
        type : DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:"Classes",
            key:"idCl"
        }
    },
    idEt : {
        type : DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:"Etudiants",
            key:"idEt"
        }
    }

}, { sequelize });

Etre.belongsTo(Etudiant,{foreignKey:"idEt"});
Etre.belongsTo(Classe,{foreignKey:"idCl"});


module.exports = Etre; 