const axios = require('axios');

const buildReport = (req, res) => {
    axios.get('https://' + req.body.jiraHost +'/rest/tempo-timesheets/3/worklogs/', {
            params: {
                dateFrom: req.body.jiraDate,
                dateTo: req.body.jiraDate,
                username: req.body.jiraWorklogUsername,
            },
            auth: {
                username: req.body.jiraUsername,
                password: req.body.jiraPassword
            }
        })
        .then(function (response) {
            res.success(response.data);
        })
        .catch(function (response) {
            res.error(response.message);
        });
};

module.exports = {
    buildReport
}