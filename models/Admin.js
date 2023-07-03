const { DataTypes , Model} = require('sequelize');
const sequelize = require('./__sequelize.js');

class Admin extends Model{};
Admin.init({
    idAd : {
        type : DataTypes.INTEGER,
        autoIncrement:true,
        allowNull : false,
        primaryKey : true

    },
    nomAd : {
        type : DataTypes.STRING,
        allowNull: false
    },
    prenomAd : {
        type : DataTypes.STRING,
        allowNull: false
    },
    emailAd : {
        type : DataTypes.STRING,
        allowNull: false
    },
    adresseAd : {
        type : DataTypes.STRING,
        allowNull: false
    },
    telAd : {
        type : DataTypes.INTEGER,
        allowNull: false
    },
    mdpAd:{
        type:DataTypes.STRING,
        allowNull:false
    }

}, { sequelize ,
    timestamps :false });


module.exports = Admin; 