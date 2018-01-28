const axios = require('axios');

const buildReport = (req, res) => {
    const getWorklog = function () {
        return axios.get('https://' + req.body.jiraHost +'/rest/tempo-timesheets/3/worklogs/', {
            params: {
                dateFrom: req.body.jiraDate,
                dateTo: req.body.jiraDate,
                username: req.body.jiraWorklogUsername,
            },
            auth: {
                username: req.body.jiraUsername,
                password: req.body.jiraPassword
            }
        });
    }

    let promises = [];
    let issueIds = [];

    if (req.body.jiraPendingTasks) {
        issueIds = req.body.jiraPendingTasks.split(',');
    }

    promises.push(getWorklog());

    for (let i = 0; i < issueIds.length; ++i) {
        let request = function () {
            return axios.get('https://' + req.body.jiraHost + '/rest/api/2/issue/' + issueIds[i], {
                auth: {
                    username: req.body.jiraUsername,
                    password: req.body.jiraPassword
                },
            });
        };
        promises.push(request());
    }

    axios.all(promises)
        .then(axios.spread(function (worklog, ...issueData) {
            let responseData = {};
            responseData.pendingIssues = [];
            responseData.worklog = worklog.data;

            issueData.forEach(function (element) {
                responseData.pendingIssues.push(element.data);
            });

            res.success(responseData);
        })).catch(function (response) {
            let errorMessages = response.message;

            if (response.response.data.errorMessages && response.response.data.errorMessages.length > 0) {
                errorMessages = response.response.data.errorMessages.join();
            } else if (response.response.status === 401) {
                errorMessages = 'Invalid credentials. Unauthorized';
            }

            res.error(response.response.status, 'Jira response: ' + errorMessages, response.response.status);
        });
};

module.exports = {
    buildReport
}