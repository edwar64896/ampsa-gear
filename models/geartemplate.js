'use strict';
module.exports = (sequelize, DataTypes) => {
  const GearTemplate = sequelize.define('GearTemplate', {
    id: {type:DataTypes.UUID, primaryKey:true, validate: {isUUID:4}},
    category: {type:DataTypes.STRING, allowNull:false},
    field: {type:DataTypes.STRING, allowNull:false},
    property: {type:DataTypes.STRING, allowNull:false},
    icon: {type:DataTypes.STRING, allowNull:false},
    mandatory: {type:DataTypes.BOOLEAN, allowNull:false},
    autocomplete: {type:DataTypes.BOOLEAN, allowNull:false}
  }, {});
  GearTemplate.associate = function(models) {
    GearTemplate.hasMany(models.GearProperty,{foreignKey: 'field_id'});
    // associations can be defined here
  };
  return GearTemplate;
};
