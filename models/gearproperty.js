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
        field_id: {
          type: DataTypes.UUID,
          allowNull:false,
            model: 'GearTemplate',
            key: 'id'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {});
    GearProperty.associate = function(models) {
      GearProperty.belongsTo(models.Gear,{foreignKey: 'gear_id'});
      GearProperty.belongsTo(models.GearTemplate,{foreignKey: 'field_id',targetKey: 'id'});
    };
    return GearProperty;
};
