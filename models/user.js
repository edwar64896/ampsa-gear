'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {type: DataTypes.UUID, primaryKey:true, validate: {isUUID:4}},
    firstName: {type: DataTypes.STRING, allowNull:false},
    lastName: {type: DataTypes.STRING, allowNull:false},
    email: {type: DataTypes.STRING, allowNull:false},
    username: {type: DataTypes.STRING, allowNull:false},
    password: {type: DataTypes.STRING, allowNull:false, validate: {isTooShort(value) {
			if (value.length<8) {
				throw new Error('Password too short');
			}
		}}},
    recoveryToken: {type: DataTypes.UUID, allowNull:true, validate: {isUUID:4}},
    rememberToken: {type: DataTypes.UUID, allowNull:true, validate: {isUUID:4}},
    validated: {type: DataTypes.BOOLEAN, defaultValue: false},
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Gear,{foreignKey: 'user_id'});
  }
  return User;
};
