const express = require('express');
const connection = require('./mongodb');
const userRoutes = require('./routes/user/user');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', userRoutes);

connection().then(() => {
  console.log('Connection DB');
});

app.listen(3000, () => {
  console.log('Express server started on port 3000');
});
