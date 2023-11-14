require('dotenv').config();
const express = require('express');
const app     = express();
const path    = require('path');
const { logger } = require('./middleware/logger');

const mongoose   = require('mongoose');
const dbConnect  = require('./config/dbConnection');

const port = process.env.PORT || 3000;

dbConnect;

app.use( logger );

app.use( express.json() );

app.use('/', express.static(path.join(__dirname,'/public' )));

app.use('/',      require('./routes/rootRoutes' ));
app.use('/about', require('./routes/aboutRoutes'));
app.use('/tasks', require('./routes/taskRoutes' ));

app.listen( port, () => console.log( `Server running on http://localhost:${port}` ) );
