const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

router.post("/", (req, res, next) => {
    const newAccount = req.body;

    if(!(newAccount.name && newAccount.budget)) {
        next({ code: 400, message: "Please provide a name and budget for the account" });
    } else {
        db("accounts")
            .insert(newAccount)
            .then(accountID => {
                db("accounts")
                    .where({ id: accountID })
                    .first()
                    .then(account => {
                        res.status(201).json(account);
                    })
                    .catch(err => next({ code: 500, message: "Error retrieving new post created" }));
            })
            .catch(err => next({ code: 500, message: "Error creating new post" }));
    }
});

router.get("/", (req, res, next) => {
    const { limit = 100, sortby = "id", sortdir = "asc" } = req.query;

    db("accounts")
        .orderBy(sortby, sortdir)
        .limit(limit)
        .then(accounts => res.status(200).json(accounts))
        .catch(err => next({ code: 500, message: "There was an error retrieving the accounts data." }));
});

router.get("/:id", (req, res, next) => {
    db("accounts")
        .where({ id: req.params.id })
        .first()
        .then(account => {
            if(account) {
                res.status(200).json(account);
            } else {
                next({ code: 404, message: `The account with id: ${req.params.id} is not found.` });
            }
        })
        .catch(err => next({ code: 500, message: "Error retrieving account data." }));
});

router.put("/:id", (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    changes.id = id;

    if(!(changes.name && changes.budget)) {
        next({ code: 400, message: "Please provide a name and budget for the account" });
    } else {
        db("accounts")
            .where({ id: id })
            .update(changes)
            .then(() => {
                db("accounts")
                    .where({ id: id })
                    .first()
                    .then(account => {
                        res.status(200).json(account);
                    })
                    .catch(err => next({ code: 500, message: "Error retrieving updated account data." }));
            })
            .catch(err => next({ code: 500, message: "Error updating account data." }));
    }
});

router.delete("/:id", (req, res, next) => {
    const { id } = req.params;

    db("accounts")
        .where({ id: id })
        .first()
        .then(account => {
            if(account) {
                db("accounts")
                .where({ id: account.id })
                .delete()
                .then(count => {
                    res.status(200).json({ removed: count });
                })
                .catch(err => next({ code: 500, message: "Error removing account data." }));
            } else {
                next({ code: 404, message: `Account with ID: ${id} not found.` });
            }
        })
        .catch(err => next({ code: 500, message: "Error retrieving account data." }));
});

module.exports = router;