const express = require("express");

const db = require("../data/dbconfig");
const { orWhereNotExists } = require("../data/dbconfig");

const router = express.Router();

router.get("/", (req, res, next) => {
    const { limit = 100, sortby = "customer_id", sortdir = "asc" } = req.query;

    db("customers").orderBy(sortby, sortdir).limit(limit)
        .then(customers => {
            res.json(customers);
        })
        .catch(() => next({ code: 500, message: "Error retrieving customers from Northwind database" }));
})

module.exports = router;