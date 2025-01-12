'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class GroupTransfer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      GroupTransfer.belongsTo(models.Account, {
        foreignKey: 'accountId',
        as: "account",
      });
      GroupTransfer.belongsTo(models.GroupBudget, {
        foreignKey: 'budgetId',
        as: "groupBudget",
      });
    }
  }
  GroupTransfer.init({
    amount: DataTypes.NUMBER,
    accountId: DataTypes.INTEGER,
    budgetId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GroupTransfer',
  });
  return GroupTransfer;
};