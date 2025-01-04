'use strict';
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Account, {
        foreignKey: 'accountId',
      });
      Transaction.belongsTo(models.Budget, {
        foreignKey: 'budgetId',
      });
    }
  }
  Transaction.init({
    description: DataTypes.STRING,
    date: DataTypes.STRING,
    amount: DataTypes.NUMBER,
    recipient: DataTypes.STRING,
    accountId: DataTypes.INTEGER,
    budgetId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};