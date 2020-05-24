'use strict';
module.exports = (sequelize, DataTypes) => {
    const GearProperty = sequelize.define('GearProperty', {
        id: {type: DataTypes.UUID, primaryKey:true, defaultvalue:sequelize.UUIDV4, validate: {isUUID:4}},
        gear_id: {
          type: DataTypes.UUID,
          allowNull:false,
          model: 'Gear',
          key: 'id'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {});
    GearProperty.associate = function(models) {
      GearProperty.belongsTo(models.Gear,{foreignKey: 'gear_id'});
    };
    return GearProperty;
};
