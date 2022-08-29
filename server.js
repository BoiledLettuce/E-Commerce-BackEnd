const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001; //HEROKU COMPTABILE https://coding-boot-camp.github.io/full-stack/heroku/deploy-with-heroku-and-mysql

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() =>{

  app.listen(PORT, () => { console.log(`App listening on port ${PORT}!`); });

});

// app.listen(PORT, () => { console.log(`App listening on port ${PORT}!`); });