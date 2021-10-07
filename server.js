const http = require('http');
const app = require('./app')
const mongoose = require('mongoose');
const { success, error } = require("consola");
const { connect } = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);


/************************ Mongoose uri credential *************************/


const DATABASE_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.swdno.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

const startApp = async () => {
  try {
    // Connection With DB
    await connect(DATABASE_URL);

    success({
      message: `Successfully connected with the Database \n${DATABASE_URL}`,
      badge: true
    });

    // Start Listenting for the server on PORT
    server.listen(PORT, () =>
      success({ message: `Server started on PORT ${PORT}`, badge: true })
    );
  } catch (err) {
    error({
      message: `Unable to connect with Database \n${err}`,
      badge: true
    });
    startApp();
  }
};
mongoose.Promise = global.Promise;

startApp();
