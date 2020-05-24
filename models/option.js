'use strict';
module.exports = (sequelize, DataTypes) => {
  const Option = sequelize.define('Option', {
    id: {type:DataTypes.UUID,primaryKey:true,allowNull:false},
    category: {type:DataTypes.STRING,allowNull:false},
    name: {type:DataTypes.STRING,allowNull:false}
  }, {});
  Option.associate = function(models) {
    // associations can be defined here
  };
  return Option;
};
