const express = require("express");
const cors = require("cors");

const accountsRouter = require("../accounts/accountsRouter.js");
const customerRouter = require("../customers/customerRouter");

const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/accounts", accountsRouter);
server.use("/api/customers", customerRouter);

server.use((req, res, next) => next({ code: 404, message: `There is no ${req.method} method for ${req.url}` }));

server.use((err, req, res, next) => {
    res.status(err.code).json({ message: err.message });
});

module.exports = server;
