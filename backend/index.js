const express = require('express');
const app = express();
const Connection = require("./database/db");
const cors = require('cors');
const bodyparser = require('body-parser');
const morgan = require('morgan');
app.use(morgan('dev'))

require('dotenv').config();
Connection();

app.use(cors());
app.use(express.json());
app.use(bodyparser({extended:true}));

app.use(require("./router/routes"));


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("Listening To The Server");
})