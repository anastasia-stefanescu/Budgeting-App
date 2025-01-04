'use strict';
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Budget extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Budget.belongsTo(models.Account, {
        foreignKey: 'accountId',
      });
      Budget.hasMany(models.Transaction, {
        foreignKey: "budgetId",
      });
    }
  }
  Budget.init({
    name: DataTypes.STRING,
    balance: DataTypes.NUMBER,
    accountId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Budget',
  });
  return Budget;
};