'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.NUMBER
      },
      recipient: {
        type: Sequelize.STRING
      },
      accountId: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references: {
          model: {
            tableName: 'Accounts',
          },
          key: 'id',
        }
      },
      budgetId: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references: {
          model: {
            tableName: 'Budgets',
          },
          key: 'id',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};