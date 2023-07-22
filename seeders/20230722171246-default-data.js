'use strict'
const bcrypt = require('bcryptjs')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678',
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .bulkInsert(
        'Users',
        [
          {
            name: SEED_USER.name,
            email: SEED_USER.email,
            password: bcrypt.hashSync(
              SEED_USER.password,
              bcrypt.genSaltSync(10),
              null
            ),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      )
      .then((userId) =>
        queryInterface.bulkInsert(
          'Todos',
          Array.from({ length: 10 }, (_, i) => ({
            name: `name-${i}`,
            UserId: userId,
            createdAt: new Date(),
            updatedAt: new Date(),
          })),
          {}
        )
      )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface
      .bulkDelete('Todos', null, {})
      .then(() => queryInterface.bulkDelete('Users', null, {}))
  },
}