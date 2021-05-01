const mysql = require('mysql');

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'Parth@123',
  database: 'spacee_db',
});

const displayData = () => {
  console.log('This for test...\n');
  const query = connection.query(
    'INSERT INTO space_Launch SET ?',
    {
      location: 'Rocky Mountain',
      description: 'Nice place',
      timezone: 50,
      date:'05/01/21',
      StartTime:'00:00:00',
      EndTime:'00:02:00'
    },
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} Data inserted!\n`);
     
    }
  );

  // logs the actual query being run
  console.log(query.sql);
};

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  displayData();
  
});

