const express = require('express');
const exprssLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');


const app = express();


// DB Config 
const db = require('./config/keys.js').MongoURI;

// connect to mongo 
mongoose.connect(db, { useNewUrlParser: true })
      .then(() => console.log('Mongo db connected!'))
      .catch((err) => console.log(err));

// EJS
app.use(exprssLayouts);
app.set('view engine', 'ejs');


//  BodyParser
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running at on PORT ${PORT}`));
