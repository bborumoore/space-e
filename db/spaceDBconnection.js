require('dotenv').config();
const mysql = require('mysql2');

const createConnection = () => mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = { createConnection };

if (require.main === module) {
  const connection = createConnection();
  connection.connect((err) => {
    if (err) {
      console.error('Unable to connect to database:', err.message);
      process.exit(1);
    }
    console.log(`connected as id ${connection.threadId}`);
    connection.end();
  });
}

