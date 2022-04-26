const express = require("express");
const app = express();

require("dotenv").config();

//Forma de ler JSON
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//rotas da API
const postsRoutes = require("./route/postsRoute");

app.use("/", postsRoutes);

app.listen(3333);
