'use strict';
module.exports = (sequelize, DataTypes) => {
  const Option = sequelize.define('Option', {
    id: {type:DataTypes.UUID,primaryKey:true,allowNull:false},
    field: {type:DataTypes.STRING,allowNull:false},
    option: {type:DataTypes.STRING,allowNull:false}
  }, {});
  Option.associate = function(models) {
    // associations can be defined here
  };
  return Option;
};
