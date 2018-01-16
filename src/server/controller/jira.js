const axios = require('axios');

const buildReport = (req, res) => {
    axios.get(req.body.jiraHost +'/rest/tempo-timesheets/3/worklogs/', {
        dateFrom: req.body.jiraDate,
        dateTo: req.body.jiraDate,
        username: req.body.jiraWorklogUsername
    })
        .then(function (data) {
            res.success({ x: 1});
        })
        .catch(function (data) {
            res.error(111);
        });
};

module.exports = {
    buildReport
}