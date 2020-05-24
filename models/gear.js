'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gear = sequelize.define('Gear', {
    id: {type: DataTypes.UUID, primaryKey:true, defaultValue:sequelize.UUIDV4, validate: {isUUID:4}},
    user_id: { type: DataTypes.UUID, allowNull:false, model: 'Users', key:'id'},
  }, {freezeTableName: true});
  Gear.associate = function(models) {
    Gear.hasMany(models.GearProperty,{foreignKey: 'gear_id'});
    Gear.belongsTo(models.User,{foreignKey: 'user_id'});
  };
  return Gear;
};
