'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
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
    await queryInterface.addColumn("Products","categoryId",{
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {         
        model: 'Categories',
        key: 'id'
      }       
    })

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Categories');
  }
};