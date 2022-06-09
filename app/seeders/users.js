'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [
    {
        id:'466396ca-68a2-4b9a-ac73-f73b6592f0fd',
        credit:999.99,
        email:'user1@gmail.com',
        lat:-16.86753,
        long:162.62627,
        role:'user',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        id:'18f79503-9982-47cb-b6cf-4b6ae7163c50',
        credit:999.99,
        email:'user2@gmail.com',
        lat:-16.86753,
        long:162.62627,
        role:'user',
        createdAt:new Date(),
        updatedAt:new Date()
    },
    {
        id:'9fa53ba2-5269-4772-bca1-79042204bf12',
        credit:999.99,
        email:'user3@gmail.com',
        lat:-16.86753,
        long:162.62627,
        role:'user',
        createdAt:new Date(),
        updatedAt:new Date()
    },
    {
        id:'09f90935-0aff-40eb-9256-01a230aa25e1',
        credit:999.99,
        email:'admin@gmail.com',
        lat:-16.86753,
        long:162.62627,
        role:'admin',
        createdAt:new Date(),
        updatedAt:new Date()
    }
    

    ]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
    }
  };