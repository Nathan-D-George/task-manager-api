require('dotenv').config();
const express = require('express');
const app     = express();
const path    = require('path');
const { logger }   = require('./middleware/logger');
// const errorHandler = require( './middleware/errorHandler' );

const mongoose   = require('mongoose');
const dbConnect  = require('./config/dbConnection');

const port = process.env.PORT || 3000;

dbConnect();

app.use( logger );

app.use( express.json() );

app.use('/', express.static(path.join(__dirname,'/public' )));

app.use('/',      require('./routes/rootRoutes' )); 
app.use('/about', require('./routes/aboutRoutes')); 
app.use('/tasks', require('./routes/taskRoutes' ));
app.use('/users', require('./routes/userRoutes' ));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
      res.sendFile(path.join( __dirname, 'views', '404.html' ));
    } else if (req.accepts('json')) {
      res.json({ 'error': '404 Not Found' });
    } else {
      res.type('txt').send("404 Not found");
    }
  }
);

mongoose.connection.once('open', () => {
  console.log("Connected to MongoDB");
  app.listen( port, () => console.log( `Server running on http://localhost:${port}` ) );
});
