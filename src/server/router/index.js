const express = require('express');
const jira = require('../controller/jira');

module.exports = (() => {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.render('index');
    });

    router.post('/jira/buildReport', jira.buildReport);

    return router;
})();
