'use strict';
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account.belongsTo(models.User, {
        foreignKey: 'userId',
        //as: "user",// the alias not necessary!
      });
      Account.hasMany(models.Budget, {
        foreignKey: "accountId",
        as: "budgets",// the alias not necessary!
      });
      Account.hasMany(models.Transaction, {
        foreignKey: "accountId",
        as: "transactions",// the alias not necessary!
      });
      Account.belongsToMany(models.Group, {
        through: models.Member,
      });
    }
  }
  Account.init({
    IBAN: DataTypes.STRING,
    cardNo: DataTypes.STRING,
    balance: DataTypes.NUMBER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};