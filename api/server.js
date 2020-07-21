const express = require("express");

const accountsRouter = require("../accounts/accountsRouter.js");
const customerRouter = require("../customers/customerRouter");

const server = express();

server.use(express.json());

server.use("/api/accounts", accountsRouter);
server.use("/api/customers", customerRouter);

server.use((err, req, res, next) => {
    res.status(err.code).json({ message: err.message });
});

module.exports = server;
