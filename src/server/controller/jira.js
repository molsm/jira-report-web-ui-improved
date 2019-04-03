const axios = require('axios');

const buildReport = (req, res) => {
    const getWorklog = function () {
        return axios.get('https://api.tempo.io/core/3/worklogs/user/' + req.body.jiraWorklogUsername, {
            params: {
                from: req.body.jiraDate,
                to: req.body.jiraDate,
            },
            headers: {'Authorization': "Bearer " + req.body.token}
        });
    }

    const promises = [];
    let issueIds = [];

    if (req.body.jiraPendingTasks) {
        issueIds = req.body.jiraPendingTasks.split(',');
    }

    promises.push(getWorklog());

    // TODO: Figure out how to retrieve issue in progress
    // for (let i = 0; i < issueIds.length; ++i) {
    //     const request = function () {
    //         return axios.get('https://api.tempo.io/2/worklogs/issue/key/' + issueIds[i], {
    //             headers: { 'Authorization': "Bearer " + req.body.token }
    //         });
    //     };
    //     promises.push(request());
    // }

    axios.all(promises)
        .then(axios.spread(function (worklog, ...issueData) {
            let responseData = {};
            responseData.pendingIssues = [];
            responseData.worklog = worklog.data.results;

            issueData.forEach(function (element) {
                responseData.pendingIssues.push(element.data);
            });

            res.success(responseData);
        })).catch(function (response) {
            let errorMessages = response.message;

            if (response.response.data.errors && response.response.data.errors.length > 0) {
                errorMessages = response.response.data.errors[0].message;
            } else if (response.response.status === 401) {
                errorMessages = 'Invalid credentials. Unauthorized';
            }

            res.error(response.response.status, 'Jira response: ' + errorMessages, response.response.status);
        });
};

module.exports = {
    buildReport
}