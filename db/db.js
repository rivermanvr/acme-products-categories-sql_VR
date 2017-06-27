const Sequelize = require( 'sequelize' );
const connectDB = process.env.DATABASE_URL || 'postgres://localhost/acme_sql';
const db = new Sequelize(connectDB, { logging: false });


// alternative way to setup connection:
/*
 const db = new Sequelize('acme_sql', 'userVin', 'pass123', {
   host: 'localhost',
   dialect: 'postgres'
 });

or

 const db = new Sequelize('acme_sql', null, null, {
   host: 'localhost',
   dialect: 'postgres',
   logging: false
 });

*/

module.exports = db;
