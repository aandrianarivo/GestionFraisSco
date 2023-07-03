const sequelize = require("./__sequelize");
const Admin = require("./Admin");
const Borderaux = require("./Borderaux");
const Classe = require("./Classe");
const Enregistrer = require("./Enregistrer");
const Etre = require("./Etre");
const Etudiant = require("./Etudiant");

Etudiant.belongsToMany(Classe,{through:Etre,foreignKey:"idEt"});
Classe.belongsToMany(Etudiant,{through:Etre,foreignKey:"idCl"});

Borderaux.belongsTo(Etudiant);
Etudiant.hasMany(Borderaux);

Borderaux.belongsToMany(Admin,{through:Enregistrer ,foreignKey:'refBord'});
Admin.belongsToMany(Borderaux,{through:Enregistrer ,foreignKey:'idAd'});


exports.sequelize = sequelize;
exports.Admin = Admin;
exports.Borderaux = Borderaux;
exports.Classe = Classe;
exports.Enregistrer = Enregistrer;
exports.Etre = Etre;
exports.Etudiant = Etudiant;

