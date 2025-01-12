'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.belongsToMany(models.User, {
        through: models.Member,
      });
      Group.hasMany(models.GroupBudget, {
        foreignKey: "groupId",
      });
    }
  }
  Group.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};