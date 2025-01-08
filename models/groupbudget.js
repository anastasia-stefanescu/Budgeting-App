'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class GroupBudget extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      GroupBudget.belongsTo(models.Account, {
        foreignKey: 'accountId',
        as: "account",
      });
      GroupBudget.belongsTo(models.Group, {
        foreignKey: 'groupId',
        as: "group",
      });
    }
  }
  GroupBudget.init({
    description: DataTypes.STRING,
    amount: DataTypes.NUMBER,
    amountPaid: DataTypes.NUMBER,
    userContribution: DataTypes.NUMBER,
    accountId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GroupBudget',
  });
  return GroupBudget;
};