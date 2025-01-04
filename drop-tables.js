import db from './models/index.js'; // Import the database instance

(async () => {
  try {
    // Access the query interface
    const queryInterface = db.sequelize.getQueryInterface();

    // Drop all tables
    await queryInterface.dropAllTables();
    console.log('All tables dropped.');
  } catch (error) {
    console.error('Error dropping tables:', error);
  }
})();