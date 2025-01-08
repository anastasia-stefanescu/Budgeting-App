'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class GroupBudgetPay extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      GroupBudgetPay.belongsTo(models.Account, {
        foreignKey: 'accountId',
        as: "account",
      });
      GroupBudgetPay.belongsTo(models.GroupBudget, {
        foreignKey: 'budgetId',
        as: "groupBudget",
      });
    }
  }
  GroupBudgetPay.init({
    amount: DataTypes.NUMBER,
    accountId: DataTypes.INTEGER,
    budgetId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GroupBudgetPay',
  });
  return GroupBudgetPay;
};