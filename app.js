const express = require('express');
const exprssLayouts = require('express-ejs-layouts');

const app = express();

// EJS
app.use(exprssLayouts);
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running at on PORT ${PORT}`));
