const express = require('express');
const app = express();
require('./services/passport'); // because we're not requiring anything from it
var indexRouter = require('./routes/index');
app.use('/v1/easy-survey',indexRouter(app));

const PORT = process.env.PORT || 5000;
app.listen(PORT);